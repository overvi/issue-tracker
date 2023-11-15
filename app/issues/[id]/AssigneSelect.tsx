"use client";

import { Skeleton } from "@/app/component";
import { axiosInstance } from "@/app/hook/useIssues";
import useUsers from "@/app/hook/useUsers";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";

const AssigneSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();

  const assigneUser = (userId: string) =>
    axiosInstance
      .patch(`/isshues/${issue.id}`, {
        assignedUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes Could Not Be Saved");
      });

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assigneUser}
      >
        <Select.Trigger placeholder="...Assign" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggetsions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneSelect;
