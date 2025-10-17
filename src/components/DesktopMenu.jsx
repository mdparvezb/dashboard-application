import React from 'react'
import Sidebar from './Sidebar'

const DesktopMenu = ( {setProductModalOpen , setIsMobileMenu, setAddUserModal} ) => {
  return (
    <div className="h-screen bg-black/20 hidden md:flex md:flex-col md:w-[22%] shadow-3xl py-4 overflow-x-hidden">
        <Sidebar setProductModalOpen={setProductModalOpen} setIsMobileMenu={setIsMobileMenu} setAddUserModal={setAddUserModal} />
    </div>
  )
}

export default DesktopMenu