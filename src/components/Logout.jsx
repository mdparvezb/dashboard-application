import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";

const Logout = () => {
    const router = useRouter()
  async function logoutHandler() {
    const response = await axios.get("/api/logout");
    router.push('/login')
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
  return (
    <div
      onClick={logoutHandler}
      className="w-full flex items-center justify-end"
    >
      <IoMdLogOut size={30} className="text-red-600 cursor-pointer" />
    </div>
  );
};

export default Logout;
