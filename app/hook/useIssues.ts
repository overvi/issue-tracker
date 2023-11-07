import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
    title: string;
    description: string;
  }
  

const useIssues = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation({
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
}


export default useIssues