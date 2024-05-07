import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosInstance } from "./useIssues";

export const useDeleteComment = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axiosInstance.delete(`/comments/${id}`).then((res) => res.data),

    onMutate: () => {
      queryClient.clear();
    },

    onSuccess(savedComment, newComment) {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      router.refresh();
    },

    onError(error) {
      error.message = "An Unexpected Error Occured";
    },
  });
};
