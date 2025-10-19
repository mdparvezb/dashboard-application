"use client";
import AddUserModal from "@/components/AddUserModal";
import DataEntry from "@/components/DataEntry";
import DesktopMenu from "@/components/DesktopMenu";
import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ViewAllProducts from "./view-all-products/page";

export default function Home() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <MobileMenu
        isMobileMenu={isMobileMenu}
        setIsMobileMenu={setIsMobileMenu}
        productModalOpen={productModalOpen}
        setProductModalOpen={setProductModalOpen}
        setAddUserModal={setAddUserModal}
      />

      {addUserModal && <AddUserModal setAddUserModal={setAddUserModal} />}

      <div className="w-full flex h-screen justify-center overflow-hidden">
        <DesktopMenu
          productModalOpen={productModalOpen}
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
