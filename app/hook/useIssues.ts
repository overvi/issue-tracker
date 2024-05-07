import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { PatchIssueSchema } from "../api/validation";

interface Props {
  title: string;
  description: string;
}

interface MutateProps {
  redirectUrl?: string;
}

type UpdateProps = z.infer<typeof PatchIssueSchema>;

export const axiosInstance = axios.create({
  baseURL: "/api",
});

interface AddIssueContext {
  previousIssue: Props[];
}

const useIssues = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<Props, Error, Props, AddIssueContext>({
    mutationFn: (newIssue: Props) =>
      axiosInstance.post("/issues", newIssue).then((res) => res.data),

    onMutate(newIssue: Props) {
      const previousIssue = queryClient.getQueryData<Props[]>(["issues"]) || [];
      queryClient.setQueryData<Props[]>(["issues"], (issues) => [
        ...(issues || []),
        newIssue,
      ]);

      return { previousIssue };
    },

    onSuccess(savedIssues, newIssue) {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
      router.push("/issues");
      router.refresh();
    },

    onError(error, newIssue, context) {
      error.message = "An Unexpected Error Occured";
      if (!context) return;
      queryClient.setQueryData<Props[]>(["issues"], context.previousIssue);
    },
  });
};

export const useUpdateIssues = (id: string, props?: MutateProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newIssue: UpdateProps) =>
      axiosInstance.patch(`/issues/${id}`, newIssue).then((res) => res.data),
    onSuccess(savedIssues, newIssue) {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
      router.push(props?.redirectUrl || "", { scroll: false });
      router.refresh();
    },

    onError(error) {
      error.message = "An Unexpected Error Occured";
    },
  });
};

export const useDeleteIssue = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosInstance.delete(`/issues/${id}`).then((res) => res.data),

    onMutate: () => {
      queryClient.clear();
    },

    onSuccess(savedIssues, newIssue) {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
      router.push("/issues");
      router.refresh();
    },

    onError(error) {
      error.message = "An Unexpected Error Occured";
    },
  });
};

export default useIssues;
