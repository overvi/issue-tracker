import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In progress", value: "IN_PROGRESS" },
];

const IssueStatusFiltet = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select an status ..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item value={status.value || ""} key={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFiltet;
