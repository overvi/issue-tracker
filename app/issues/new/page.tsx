"use client";

import { createIssueSchema } from "@/app/api/issues/route";
import ErrorMessage from "@/app/component/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

interface Props {
  title: string;
  description: string;
}

type Validation = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const addUser = useMutation({
    mutationFn: (newIssue: Props) =>
      axios.post("/api/issues", newIssue).then((res) => res.data),

    onSuccess(savedIssues, newIssue) {
      router.push("/issues");
      queryClient.invalidateQueries({
        queryKey: ["issue"],
      });
    },

    onError(error) {
      error.message = "An Unexpected Error Occured";
    },
  });

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
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
