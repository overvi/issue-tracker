import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import { Comment } from "@prisma/client";
import { Box, Text } from "@radix-ui/themes";
import React from "react";

const Reply = async ({ comment }: { comment: Comment }) => {
  const replyComment = await prisma.comment.findUnique({
    where: { id: comment.repliedTo! },
  });

  const userRepliedTo = await clerkClient.users.getUser(replyComment?.userId!);
  return (
    <Box className="border-l-blue-600 border-l-2  rounded-r-md p-3 bg-white dark:bg-gray-900 mb-3">
      <Text className="font-mono ">
        To : {userRepliedTo.emailAddresses[0].emailAddress}
      </Text>

      <Text className="!block opacity-20">
        {comment.repliedTo && replyComment?.content}
      </Text>
    </Box>
  );
};

export default Reply;
