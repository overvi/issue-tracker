"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  Flex,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();
  const links = [
    { label: "Dashbord", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <nav className=" flex gap-5 p-4 border-y mb-5 justify-between">
      <Container>
        <Flex align="center" justify="between" gap="5">
          <Flex className="items-center gap-3">
            <Link href="/">
              <AiFillBug size={18} />
            </Link>
            <ul className="flex gap-6 text-lg">
              {links.map((link) => (
                <li key={link.herf}>
                  <Link
                    className={classNames({
                      "text-zinc-900": link.herf === currentPath,
                      "text-zinc-500": link.herf !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.herf}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    radius="full"
                    className="cursor-pointer"
                    src={session.user?.image!}
                    fallback="?"
                    size="3"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"api/auth/signout"}>Sign Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
