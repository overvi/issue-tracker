import { Button } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { Spinner } from "../component";
import useIssues from "../hook/useIssues";

const ButtonPrimary = ({ children }: { children: ReactNode }) => {
  const { isPending } = useIssues();
  return (
    <Button type="submit">
      {children} {isPending && <Spinner />}
    </Button>
  );
};

export default ButtonPrimary;
