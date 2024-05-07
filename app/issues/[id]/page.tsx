import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

import Padgination from "@/app/component/Padgination";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { cache } from "react";
import AssigneSelect from "./AssigneSelect";
import CommentSection from "./CommentSection";
import SelectStatus from "./SelectStatus";

interface Props {
  params: { id: string; page: string };
  searchParams: { page: string; pageSize: number };
  props: { page: number; pageSize: number };
}

const fetchuUser = cache(({ params, props }: Props) =>
  prisma.issue.findUnique({
    where: { id: params.id },
    include: {
      comments: {
        skip: (props.page - 1) * props.pageSize,
        take: props.pageSize,
      },
    },
  })
);
const IssuesDetailsPage = async ({ params, searchParams }: Props) => {
  const comments = await prisma.comment.count({
    where: { issueId: params.id },
  });
  const session = auth();
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 3;

  const issue = await fetchuUser({
    params,
    searchParams,
    props: {
      page,
      pageSize,
    },
  });
  const users = await clerkClient.users.getUserList();

  if (!issue) notFound();

  return (
    <>
      <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
        <Box className="space-y-5 md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>

        {session && (
          <Box className="items-center">
            <Flex className="gap-4" direction="column">
              <AssigneSelect
                issue={issue}
                users={JSON.parse(JSON.stringify(users.data))}
              />
              <SelectStatus issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>

      <CommentSection
        commentCount={comments}
        users={JSON.parse(JSON.stringify(users.data))}
        comments={issue.comments}
      />
      <Padgination
        totalPages={pageSize}
        currentPage={page}
        itemSize={comments}
      />
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  return {
    title: issue?.title,
    description: "Details of issues" + issue?.id,
  };
}

export default IssuesDetailsPage;
