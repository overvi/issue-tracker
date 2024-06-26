"use client";

import { createIssueSchema } from "@/app/api/validation";
import { ErrorMessage } from "@/app/component";
import useIssues from "@/app/hook/useIssues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Callout, TextField } from "@radix-ui/themes";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import IssueFormSkeleton from "./IssueFormSkeleton";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue;
  onSubmit: (data: IssueFormData) => void;
  children: ReactNode;
}

const IssueForm = ({ issue, onSubmit, children }: Props) => {
  const { error } = useIssues();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
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
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {children}
      </form>
    </div>
  );
};

export default IssueForm;
