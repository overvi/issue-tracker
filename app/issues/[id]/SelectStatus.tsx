"use client";

import { statusMap } from "@/app/component/IssueStatusBadge";
import { axiosInstance } from "@/app/hook/useIssues";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const SelectStatus = ({ issue }: Props) => {
  const router = useRouter();
  const assigneUser = (status: Status) => {
    axiosInstance
      .patch(`/issues/${issue.id}`, {
        status: status,
      })
      .catch(() => {
        toast.error("Changes Could Not Be Saved");
      });
    router.refresh();
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={assigneUser}>
        <Select.Trigger placeholder="...Assign" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggetsions</Select.Label>
            <Select.Item value="1">Unassigned</Select.Item>
            <Select.Item value="OPEN">{statusMap.OPEN.label}</Select.Item>
            <Select.Item value="IN_PROGRESS">
              {statusMap.IN_PROGRESS.label}
            </Select.Item>
            <Select.Item value="CLOSED">{statusMap.CLOSED.label}</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default SelectStatus;
