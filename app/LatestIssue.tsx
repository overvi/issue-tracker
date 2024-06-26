import prisma from "@/prisma/client";
import React from "react";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./component";
import { clerkClient } from "@clerk/nextjs/server";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issue
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(async (issue, index) => {
            const picture = issue.assignedToUserId
              ? (await clerkClient.users.getUser(issue.assignedToUserId))
                  .imageUrl
              : "";
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUserId && (
                      <Avatar size="2" radius="full" fallback src={picture} />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;

export const revalidate = 0;
