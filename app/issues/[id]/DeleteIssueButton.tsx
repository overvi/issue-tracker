"use client";

import { useDeleteIssue } from "@/app/hook/useIssues";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";

const DelteIssueButton = ({ issueId }: { issueId: string }) => {
  const deleteIssue = useDeleteIssue(issueId.toString());

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <form
          onSubmit={(event) => {
            deleteIssue.mutate();
            event.preventDefault();
          }}
          className="max-w-xs items-center m-auto flex-col flex space-y-4 p-3 "
        >
          <AlertDialog.Title>
            <Text className="text-3xl">Confirm Deletion</Text>
          </AlertDialog.Title>
          <AlertDialog.Description className="text-center italic font-medium">
            Are Sure You Want to Delete this issue This Action Cannot Be Undone
          </AlertDialog.Description>
          <Flex className="pt-5 gap-4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="blue">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                disabled={deleteIssue.isPending}
                variant="soft"
                color="red"
                type="submit"
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DelteIssueButton;
