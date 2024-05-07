import { User, auth } from "@clerk/nextjs/server";
import { Comment as C } from "@prisma/client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";
import DeleteCommentModal from "./DeleteCommentModal";
import Reply from "./Reply";
import ReplyTo from "./ReplyTo";

interface Props {
  user: User;
  comment: C;
}

const Comment = async ({ user, comment }: Props) => {
  const { userId } = auth();

  return (
    <Box className="border border-gray-300 dark:border-zinc-600 rounded-md p-5 mt-5">
      {comment.repliedTo && <Reply comment={comment} />}
      <Flex align="center" mb="5" justify="between">
        <Flex gap="4">
          <Avatar radius="full" src={user?.imageUrl} fallback />
          <Text size="4" weight="medium">
            {user?.firstName || user?.emailAddresses[0].emailAddress}
          </Text>
        </Flex>
        <Flex gap="5" align="center">
          <ReplyTo userId={comment.userId} commentId={comment.id} />
          {comment.userId == userId && (
            <DeleteCommentModal commentId={comment.id} />
          )}
        </Flex>
      </Flex>
      <ReactMarkDown className="dark:text-white">
        {comment.content}
      </ReactMarkDown>
    </Box>
  );
};

export default Comment;
