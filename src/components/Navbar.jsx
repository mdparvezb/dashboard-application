import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ setIsMobileMenu }) => {
  return (
    <div className="w-full h-16 bg-transparent shadow-md flex justify-center items-center relative">
      <RxHamburgerMenu
        size={25}
        className="text-blue-600 absolute top-4 left-4 md:hidden"
        onClick={() => setIsMobileMenu(true)}
      />
      <h2 className="text-blue-600 font-bold text-xl  text-shadow-xs">
        Dashboard Application
      </h2>
    </div>
  );
};

export default Navbar;
