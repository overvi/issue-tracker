import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
    title: string;
    description: string;
  }

export const axiosInstance = axios.create({
  baseURL : '/api'
})
  

const useIssues = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newIssue: Props) =>
          axiosInstance.post("/issues", newIssue).then((res) => res.data),
    
        onSuccess(savedIssues, newIssue) {
          
          queryClient.invalidateQueries({
            queryKey: ["issues"],
          });
          router.push("/issues");
          router.refresh()
        },
    
        onError(error) {
          error.message = "An Unexpected Error Occured";
        },
      });
}


export const useUpdateIssues = (id : string) => {
  const router = useRouter();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newIssue: Props) =>
    axiosInstance.put(`/issues/${id}`, newIssue).then((res) => res.data),
    onSuccess(savedIssues, newIssue) {
          
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
      router.push("/issues");
      router.refresh()
    },

    onError(error) {
      error.message = "An Unexpected Error Occured";
    },
  });
  }

export const useDeleteIssue = (id : string) => {
  const router = useRouter();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn : () => 
    axiosInstance.delete(`/issues/${id}`)
    .then(res => res.data),

    onMutate : () => {
      queryClient.clear()
    },

    onSuccess(savedIssues, newIssue) {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
      router.push("/issues");
      router.refresh()
    },

    onError(error) {
      error.message = "An Unexpected Error Occured";
    },
  })
}

export default useIssues