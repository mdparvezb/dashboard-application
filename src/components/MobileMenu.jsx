"use client";
import React from "react";
import Sidebar from "./Sidebar";
import { RxCross2 } from "react-icons/rx";

const MobileMenu = ({
  setProductModalOpen,
  setIsMobileMenu,
  isMobileMenu,
  setAddUserModal,
}) => {
  return (
    <>
      {isMobileMenu && (
        <div className="w-[95%] h-screen bg-purple-900 shadow-3xl py-4 overflow-x-hidden absolute top-0 left-0 z-[99] md:hidden">
          <RxCross2
            size={25}
            onClick={() => setIsMobileMenu(false)}
            className="absolute top-4 right-6 text-white"
          />
          <Sidebar
            setProductModalOpen={setProductModalOpen}
            setIsMobileMenu={setIsMobileMenu}
            setAddUserModal={setAddUserModal}
          />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
