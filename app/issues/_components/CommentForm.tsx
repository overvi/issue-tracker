"use client";

import { ErrorMessage, Spinner } from "@/app/component";
import { useUpdateIssues } from "@/app/hook/useIssues";
import useCommentType from "@/app/store/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { z } from "zod";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        baseColor="#a39190"
        highlightColor="#d4c8c7"
        height="20rem"
        width="100%"
      />
    ),
  }
);

const schema = z.object({
  content: z.string(),
});

type IssueFormData = z.infer<typeof schema>;

const CommentForm = ({ createUserId }: { createUserId: string }) => {
  const pathname = usePathname();
  const issueId = pathname.slice(pathname.lastIndexOf("/") + 1);
  const mutate = useUpdateIssues(issueId);

  const { userId, commentId, mode } = useCommentType();

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema),
    defaultValues: userId ? { content: `@${userId} : ` } : { content: "" },
    values: userId ? { content: `@${userId} : ` } : { content: "" },
  });

  const onSubmit = (content: string) => {
    if (mode == "CREATE") {
      mutate.mutate({
        comment: {
          content,
          userId: createUserId,
        },
      });
    } else {
      mutate.mutate({
        comment: {
          content,
          userId,
          repliedTo: commentId,
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data.content.slice(data.content.indexOf(":") + 1));
        reset();
      })}
    >
      <ErrorMessage>{errors.content?.message}</ErrorMessage>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <div>
            <div className="wmde-markdown-var"> </div>
            <MarkdownEditor
              height="20rem"
              placeholder="Description"
              {...field}
            />
          </div>
        )}
      />
      <Flex mt="5">
        <Button type="submit">
          Comment {mutate.isPending && <Spinner />}{" "}
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;
