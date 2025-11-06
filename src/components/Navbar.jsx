import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logout from "./Logout";

const Navbar = ({ setIsMobileMenu }) => {
  return (
    <>
      <div className="w-full h-16 bg-transparent shadow-md flex justify-center items-center relative">
        <RxHamburgerMenu
          size={25}
          className="text-blue-600 absolute top-4 left-4 md:hidden"
          onClick={() => setIsMobileMenu(true)}
        />
        <Link
          href={"/"}
          className="w-full flex justify-center gap-2 items-center"
        >
          <img src="./logo.png" alt="Logo" width={40} />
          <h2 className="text-blue-600 font-bold md:text-2xl mt-2 text-shadow-xs">
            Dashboard Application
          </h2>
        </Link>

        <div className="absolute right-4 top-5">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Navbar;
