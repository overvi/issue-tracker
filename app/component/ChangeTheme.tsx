"use client";
import { IconButton } from "@radix-ui/themes";
import { useEffect } from "react";
import { FaRegLightbulb, FaRegMoon } from "react-icons/fa";
import { IoCloudyNightOutline } from "react-icons/io5";
import { create } from "zustand";

interface DarkLight {
  colorMode: "light" | "dark";
  setColorMode: (color: "light" | "dark") => void;
}

export const useColorMode = create<DarkLight>((set) => ({
  colorMode: "light",
  setColorMode: (color: "light" | "dark") => set({ colorMode: color }),
}));

const ChangeTheme = () => {
  const { setColorMode, colorMode } = useColorMode();
  const icon = colorMode === "light" ? <FaRegMoon /> : <FaRegLightbulb />;
  const setColorLogic = colorMode === "light" ? "dark" : "light";

  useEffect(() => {
    const savedTheme: "dark" | "light" = JSON.parse(
      localStorage.getItem("theme") || ""
    );
    setColorMode(savedTheme ?? "dark");
  }, [colorMode]);

  return (
    <IconButton
      onClick={() => {
        setColorMode(setColorLogic);
        localStorage.setItem("theme", setColorLogic);
      }}
      variant="ghost"
    >
      <IoCloudyNightOutline size="25" />
      {icon}
    </IconButton>
  );
};

export default ChangeTheme;
