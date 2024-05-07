"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueCharts = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "InProgress", value: inProgress },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} fill="#5d9c40" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
