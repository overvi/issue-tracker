"use client";

import { Theme } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
import { useColorMode } from "./app/component/ChangeTheme";

const RadixUiProvider = ({ children }: PropsWithChildren) => {
  const { colorMode } = useColorMode();
  return (
    <Theme appearance={colorMode} accentColor="violet">
      {children}
    </Theme>
  );
};

export default RadixUiProvider;
