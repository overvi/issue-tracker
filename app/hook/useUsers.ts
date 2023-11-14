import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { axiosInstance } from "./useIssues"
import { User } from "@prisma/client"

const useUsers = () => {
    return useQuery({
        queryKey : ['users'],
        queryFn : () => axiosInstance.get<User[]>('/users')
        .then(res => res.data)
    })
}

export default useUsers;