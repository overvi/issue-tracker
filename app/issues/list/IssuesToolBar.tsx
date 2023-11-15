import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFiltet from "./IssueStatusFiltet";

const IssuesToolBar = () => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueStatusFiltet />
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolBar;
