import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";

import AssigneSelect from "./AssigneSelect";
import { cache } from "react";
import SelectStatus from "./SelectStatus";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface Props {
  params: { id: string };
}

const fetchuUser = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);
const IssuesDetailsPage = async ({ params }: Props) => {
  const session = auth();
  const issue = await fetchuUser(params.id);
  const users = await clerkClient.users.getUserList();

  if (!issue) notFound();

  return (
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
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchuUser(params.id);

  return {
    title: issue?.title,
    description: "Details of issues" + issue?.id,
  };
}

export default IssuesDetailsPage;
