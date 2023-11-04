import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashbord", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <nav className="flex gap-5 p-4 border-y mt-[.040rem] items-center ">
      <Link href="/">
        <AiFillBug size={18} />
      </Link>
      <ul className="flex gap-6 text-gray-600 text-lg">
        {links.map((link) => (
          <Link
            key={link.herf}
            className="hover:text-black transition-colors"
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
