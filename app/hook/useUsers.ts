import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get("https://api.clerk.com/v1/users", {
          headers: {
            Authorization: `Bearer sk_testpKmBzh4lCeT5j6xemG52j4F7o`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data),

    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default useUsers;
