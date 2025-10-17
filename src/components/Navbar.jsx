import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ setIsMobileMenu }) => {
  return (
    <div className="w-full h-16 bg-transparent shadow-md flex justify-center items-center relative">
      <RxHamburgerMenu
        size={25}
        className="text-white/90 absolute top-4 left-4 md:hidden"
        onClick={() => setIsMobileMenu(true)}
      />
      <h2 className="text-white/90 font-bold text-xl text-shadow-amber-50 text-shadow-xs">
        Dashboard Application
      </h2>
    </div>
  );
};

export default Navbar;
