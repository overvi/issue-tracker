"use client";
import { ThemeProvider } from "next-themes";
import React, { PropsWithChildren } from "react";

const DarkModeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default DarkModeProvider;
