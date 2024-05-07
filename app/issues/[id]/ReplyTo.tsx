"use client";

import useCommentType from "@/app/store/comment";
import React from "react";
import { BsReply } from "react-icons/bs";

interface Props {
  commentId: string;
  userId: string;
}

const ReplyTo = ({ userId, commentId }: Props) => {
  const { setUserId, setCommentId, setMode } = useCommentType();

  return (
    <BsReply
      onClick={() => {
        setUserId(userId);
        setCommentId(commentId);
        setMode("REPLY");
      }}
      color="lightblue"
      className="mb-2"
      cursor="pointer"
      size="25px"
    />
  );
};

export default ReplyTo;
