"use client";

import useUsers from "@/app/hook/useUsers";
import { Select, SelectItem } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/component";
import { error } from "console";

const AssigneSelect = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <Select.Root>
      <Select.Trigger placeholder="...Assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggetsions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneSelect;
