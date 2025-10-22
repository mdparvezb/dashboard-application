import React from 'react'
import Sidebar from './Sidebar'

const DesktopMenu = ( {setProductModalOpen , setIsMobileMenu, setAddUserModal} ) => {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-700 hidden md:flex md:flex-col md:w-[22%] shadow-md py-4 overflow-x-hidden">
        <Sidebar setProductModalOpen={setProductModalOpen} setIsMobileMenu={setIsMobileMenu} setAddUserModal={setAddUserModal} />
    </div>
  )
}

export default DesktopMenu