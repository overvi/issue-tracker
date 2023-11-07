"use client";

import { createIssueSchema } from "@/app/api/issues/route";
import ErrorMessage from "@/app/component/ErrorMessage";
import Spinner from "@/app/component/Spinner";
import useIssues from "@/app/hook/useIssues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type Validation = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const addUser = useIssues();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Validation>({ resolver: zodResolver(createIssueSchema) });
  return (
    <div className="max-w-lg ">
      {addUser.error && (
        <Callout.Root color="red" className="mb-5">
          {addUser.error.message}
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => {
          addUser.mutate(data);
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit">
          Submit New Issue {addUser.isPending && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
