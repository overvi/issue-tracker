"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();
  const links = [
    { label: "Dashbord", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <nav className="flex gap-5 p-4 border-y  items-center mb-5 ">
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
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
