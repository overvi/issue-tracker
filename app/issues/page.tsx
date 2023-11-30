import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Padgination from "../component/Padgination";
import IssueTable, { columnNames } from "./list/IssueTable";
import IssuesToolBar from "./list/IssuesToolBar";
import { Metadata } from "next";
import NotFoundIssue from "./NotFoundIssue";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy =
    columnNames.includes(searchParams.orderBy) && searchParams.orderBy
      ? { [searchParams.orderBy]: "asc" }
      : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: status },

    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssuesToolBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Padgination
        totalPages={pageSize}
        currentPage={page}
        itemSize={issueCount}
      />
      {!issues && <NotFoundIssue />}
    </Flex>
  );
};

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Issue Tracker  -Issue List",
  description: "View all Project Issues",
};

export default IssuesPage;
