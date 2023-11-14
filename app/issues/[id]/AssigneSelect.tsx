"use client";

import { Select, SelectItem } from "@radix-ui/themes";
import React from "react";

const AssigneSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="...Assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggetsions</Select.Label>
          <SelectItem value="1">Alireza Zod</SelectItem>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneSelect;
