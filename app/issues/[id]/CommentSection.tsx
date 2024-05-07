import { User, auth } from "@clerk/nextjs/server";
import { Comment as C } from "@prisma/client";
import { Box, Heading } from "@radix-ui/themes";
import CommentForm from "../_components/CommentForm";
import Comment from "./Comment";

interface Props {
  comments: C[];
  users: User[];
  commentCount: number;
}

const CommentSection = ({ comments, users, commentCount }: Props) => {
  const { userId } = auth();

  return (
    <Box className="mt-[10rem]">
      <CommentForm createUserId={userId!} />
      {!!commentCount && <Box className="w-full my-9  h-[1px] bg-gray-200 " />}
      {!!commentCount && <Heading>{commentCount} Comments</Heading>}
      {comments.map((comment, index) => (
        <Comment
          key={comment.id}
          user={users.find((x) => x.id === comments[index].userId)!}
          comment={comment}
        />
      ))}
    </Box>
  );
};

export default CommentSection;
