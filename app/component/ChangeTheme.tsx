"use client";
import { IconButton } from "@radix-ui/themes";
import { IoCloudyNightOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
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
  const icon =
    colorMode === "light" ? <IoCloudyNightOutline /> : <FaRegLightbulb />;
  return (
    <IconButton
      onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
      variant="ghost"
    >
      <IoCloudyNightOutline size="25" />
      {icon}
    </IconButton>
  );
};

export default ChangeTheme;
