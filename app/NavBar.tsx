"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashbord", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <nav className="flex gap-5 p-4 border-y  items-center ">
      <Link href="/">
        <AiFillBug size={18} />
      </Link>
      <ul className="flex gap-6 text-lg">
        {links.map((link) => (
          <Link
            key={link.herf}
            className={classNames({
              "text-zinc-900": link.herf === currentPath,
              "text-zinc-500": link.herf !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.herf}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
