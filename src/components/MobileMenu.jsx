"use client";
import React from "react";
import Sidebar from "./Sidebar";
import { RxCross2 } from "react-icons/rx";

const MobileMenu = ({
  setProductModalOpen,
  setIsMobileMenu,
  isMobileMenu,
  setAddUserModal,
  user,
}) => {
  return (
    <>
      {isMobileMenu && (
        <div className="w-[95%] h-full bg-linear-to-b from-blue-900 to-blue-700 shadow-3xl py-4 overflow-x-hidden fixed top-0 left-0 z-99 md:hidden">
          <RxCross2
            size={25}
            onClick={() => setIsMobileMenu(false)}
            className="absolute top-4 right-6 text-white"
          />
          <Sidebar
            user={user}
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
