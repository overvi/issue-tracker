"use client";

import { Skeleton } from "@/app/component";
import { axiosInstance } from "@/app/hook/useIssues";
import useUsers from "@/app/hook/useUsers";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";

const AssigneSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => {
          axiosInstance
            .patch(`/issues/${issue.id}`, {
              assignedUserId: userId || null,
            })
            .catch((err) => {
              toast.error("Changes Could Not Be Saved");
            });
        }}
      >
        <Select.Trigger placeholder="...Assign" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggetsions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
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
