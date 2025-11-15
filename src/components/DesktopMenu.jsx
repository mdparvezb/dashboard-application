import React from "react";
import Sidebar from "./Sidebar";

const DesktopMenu = ({
  setProductModalOpen,
  setIsMobileMenu,
  setAddUserModal,
  addUserModal,
  user,
}) => {
  return (
    <div className="h-full bg-linear-to-br from-purple-800 to-blue-700 hidden md:flex md:flex-col md:w-[22%] shadow-md py-4 overflow-auto">
      <Sidebar
        user={user}
        setProductModalOpen={setProductModalOpen}
        setIsMobileMenu={setIsMobileMenu}
        setAddUserModal={setAddUserModal}
        addUserModal={addUserModal}
      />
    </div>
  );
};

export default DesktopMenu;
