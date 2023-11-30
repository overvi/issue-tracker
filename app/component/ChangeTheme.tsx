"use client";
import { IconButton } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { FaRegLightbulb, FaRegMoon } from "react-icons/fa";
import { IoCloudyNightOutline } from "react-icons/io5";

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();
  const icon = theme === "light" ? <FaRegMoon /> : <FaRegLightbulb />;

  return (
    <IconButton
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="ghost"
    >
      <IoCloudyNightOutline size="25" />
      {icon}
    </IconButton>
  );
};

export default ChangeTheme;
