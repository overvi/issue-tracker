"use client";

import { axiosInstance } from "@/app/hook/useIssues";
import { User } from "@clerk/nextjs/server";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
  users: User[];
}

const AssigneSelect = ({ issue, users }: Props) => {
  const router = useRouter();

  const assigneUser = (userId: string) => {
    axiosInstance
      .patch(`/issues/${issue.id}`, {
        assignedUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes Could Not Be Saved");
      });
    router.refresh();
  };

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
                {user.firstName || user.emailAddresses[0].emailAddress}
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
