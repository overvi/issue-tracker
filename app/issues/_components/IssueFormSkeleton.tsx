import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/component";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton baseColor="#a39190" highlightColor="#d4c8c7" height="2rem" />
      <Skeleton baseColor="#a39190" highlightColor="#d4c8c7" height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
