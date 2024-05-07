"use client";

import { Spinner } from "@/app/component";
import { useDeleteComment } from "@/app/hook/useComments";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { BsTrash } from "react-icons/bs";

const DeleteCommentModal = ({ commentId }: { commentId: string }) => {
  const deleteIssue = useDeleteComment(commentId);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {deleteIssue.isPending ? (
          <Spinner className="mb-2 " />
        ) : (
          <BsTrash color="#FF7F7F" cursor="pointer" size="20px" />
        )}
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
            Are Sure You Want to Delete this Comment This Action Cannot Be
            Undone
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
                Delete Comment
              </Button>
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteCommentModal;
