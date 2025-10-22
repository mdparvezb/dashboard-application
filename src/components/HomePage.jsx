"use client";
import AddUserModal from "./AddUserModal";
import DataEntry from "./DataEntry";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import Navbar from "./Navbar";

function HomePage() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  return (
    <>
      <MobileMenu
        isMobileMenu={isMobileMenu}
        setIsMobileMenu={setIsMobileMenu}
        productModalOpen={productModalOpen}
        setProductModalOpen={setProductModalOpen}
        setAddUserModal={setAddUserModal}
      />

      {addUserModal && <AddUserModal setAddUserModal={setAddUserModal} />}

      <div className="w-full flex justify-center overflow-hidden">
        <DesktopMenu
          productModalOpen={productModalOpen}
          addUserModal={addUserModal}
          setProductModalOpen={setProductModalOpen}
          setIsMobileMenu={setIsMobileMenu}
          setAddUserModal={setAddUserModal}
        />

        <div className="w-full flex flex-col items-center">
          <Navbar setIsMobileMenu={setIsMobileMenu} />
          <DataEntry
            productModalOpen={productModalOpen}
            setProductModalOpen={setProductModalOpen}
            addUserModal={addUserModal}
            setAddUserModal={setAddUserModal}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
