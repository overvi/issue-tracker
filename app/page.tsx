import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueCharts from "./IssueCharts";
import { Flex, Grid, Text } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueCharts open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssue />
      </Grid>
      <p className=" text-xs m-auto right-0 left-0 mb-3 max-w-fit absolute bottom-0">
        &copy; 2024 Ali028 All rights reserved.
      </p>
    </>
  );
}

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Issue Tracker  -Dashbord",
  description: "View a summary of project issue",
};
