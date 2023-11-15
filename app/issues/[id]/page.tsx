import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOptions";
import AssigneSelect from "./AssigneSelect";

interface Props {
  params: { id: string };
}
const IssuesDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOption);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      <Box className="space-y-5 md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="items-center">
          <Flex className="gap-4" direction="column">
            <AssigneSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: "Details of issues" + issue?.id,
  };
}

export default IssuesDetailsPage;
