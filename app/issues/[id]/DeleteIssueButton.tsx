"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@radix-ui/themes";
import React from "react";

const DelteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialogTrigger color="red">
        <Button color="red">Delete Issue</Button>;
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
      </AlertDialogContent>
    </AlertDialog.Root>
  );
};

export default DelteIssueButton;
