"use client";

import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Container, Flex, IconButton } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { SkeletonTheme } from "react-loading-skeleton";
import ChangeTheme from "./component/ChangeTheme";
import { useTheme } from "next-themes";

const NavBar = () => {
  return (
    <nav className=" flex gap-5 p-4 border-y dark:border-zinc-800 mb-5 justify-between">
      <Container>
        <Flex align="center" justify="between" gap="5">
          <Flex className="items-center gap-3">
            <Link href="/">
              <AiFillBug size={18} />
            </Link>
            <NavLinks />
          </Flex>
          <Flex className="gap-5 items-center">
            <ChangeTheme />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashbord", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <ul className="flex gap-6 text-lg">
      {links.map((link) => (
        <li key={link.herf}>
          <Link
            className={classNames({
              "nav-link font-medium": true,
              "!text-zinc-900 font-medium dark:!text-zinc-50 ":
                link.herf === currentPath,
            })}
            href={link.herf}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Sign = () => {
  const { theme } = useTheme();
  return (
    <div>
      <SignUpButton mode="modal">
        <IconButton className="!bg-transparent " aria-label="signup">
          <FaGoogle color={theme == "light" ? "black" : "white"} size="25" />
        </IconButton>
      </SignUpButton>
    </div>
  );
};

const AuthStatus = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <SkeletonTheme />;
  return isSignedIn ? <UserButton /> : <Sign />;
};

export default NavBar;
