import React from "react";
import SolPrice from "../SolPriceNav/solPrice";
import Link from "next/link";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

export default function NavBar() {
  return (
    <div className="container mx-auto">
      <Navbar fluid rounded className="bg-black border-gray-200">
        <>
          <div className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <SolPrice />
          </div>
        </>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Link
            href="/"
            className="block py-2 px-3 text-white text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
            aria-current="page"
          >
            Home
          </Link>{" "}
          <Link
            href="/block"
            className="block py-2 px-3 text-white text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
          >
            Blocks
          </Link>{" "}
          <Link
            href="/transactions"
            className="block py-2 px-3 text-white text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
          >
            Transactions
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
