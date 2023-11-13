"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/app/component";
import {
  Box,
  Container,
  Flex,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className=" flex gap-5 p-4 border-y mb-5 justify-between">
      <Container>
        <Flex align="center" justify="between" gap="5">
          <Flex className="items-center gap-3">
            <Link href="/">
              <AiFillBug size={18} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
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
              "nav-link": true,
              "!text-zinc-900": link.herf === currentPath,
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

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            radius="full"
            className="cursor-pointer"
            src={session!.user?.image!}
            fallback="?"
            size="3"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"api/auth/signout"}>Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
