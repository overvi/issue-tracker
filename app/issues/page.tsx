import { IssueStatusBadge, Link } from "@/app/component";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssuesToolBar from "./list/IssuesToolBar";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue };
}) => {
  const columns: {
    label: string;
    className?: string;
    value: keyof Issue;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", className: "hidden md:table-cell", value: "status" },
    { label: "Created", className: "hidden md:table-cell", value: "createdAt" },
  ];

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =
    columns.map((column) => column.value).includes(searchParams.orderBy) &&
    searchParams.orderBy
      ? { [searchParams.orderBy]: "asc" }
      : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: status },

    orderBy: orderBy,
  });

  return (
    <div>
      <IssuesToolBar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const revalidate = 0;

export default IssuesPage;
