import { IssueStatusBadge, Link } from "@/app/component";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import Padgination from "../component/Padgination";
import IssueTable, { columnNames } from "./list/IssueTable";
import IssuesToolBar from "./list/IssuesToolBar";

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
    </Flex>
  );
};

export const revalidate = 0;

export default IssuesPage;
