import axios from "axios";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "./Loader";

const AddUserModal = ({ setAddUserModal }) => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("Normal");
  const [loading, setLoading] = useState(false);
  const inputData = [
    {
      labelName: "User Name",
      inputType: "text",
      defaultValue: userName,
      setOnchange: setUserName,
      className: "",
    },
    {
      labelName: "User Password",
      inputType: "password",
      defaultValue: userPassword,
      setOnchange: setUserPassword,
      className: "",
    },
  ];

  // User Save Handler
  async function userSaveHandler(e) {
    e.preventDefault();

    if (!userName || !userPassword) {
      return toast.warning("All fields are required!");
    }
    setLoading(true);
    const data = {
      user_name: userName.toLowerCase().trim(),
      password: userPassword.trim(),
      user_role: userRole.trim(),
    };
    const response = await axios.post("/api/users/createuser", data);
    setAddUserModal(false);
    setLoading(false);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="w-full bg-black/80 px-6 h-[100vh] backdrop-blur-[2px] z-50 absolute top-0 left-0 flex justify-center items-center pointer-none overflow-hidden">
        <div className="w-full md:max-w-[500px] flex flex-col bg-purple-900 py-4 px-4 md:px-6 shadow-[0_10px_36px_0_rgba(0, 0, 0, 0.16), 0_0_0_1px_rgba(0, 0, 0, 0.06)] rounded-xl">
          <h2 className="text-2xl text-white font-bold text-center">
            Add New User
          </h2>
          <div className="w-full flex flex-col gap-2 items-center py-4">
            {/* All Inputs */}
            {inputData.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-0.5 text-white/90 tracking-wider"
              >
                <label>{item.labelName}</label>
                <input
                  type={item.inputType}
                  value={item.defaultValue}
                  onChange={(e) => item.setOnchange(e.target.value)}
                  className={`${item.className} bg-white/10 px-4 py-2  w-full text-white focus:outline-none  border-amber-50 border-1 rounded-full`}
                />
              </div>
            ))}
          </div>
          {/* User Role Selection */}
          <div className="w-full flex flex-col gap-0.5 text-white/90">
            <label>Choose User Role</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="bg-white/10 text-white/90 px-4 py-2 w-fulloutline-none appearance-none rounded-full border-amber-50 border-1 focus:outline-none"
            >
              <option value="Normal" className="text-black">
                Normal
              </option>
              <option value="Admin" className="text-black">
                Admin
              </option>
            </select>
          </div>

          {/* Save and close Button */}
          <div className="flex justify-center gap-2 mt-2 py-2">
            <button
              onClick={userSaveHandler}
              className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[green] cursor-pointer text-white text-sm md:text-lg"
            >
              <BiSave size={20} /> Save User
            </button>
            <button
              onClick={() => setAddUserModal(false)}
              className="w-full flex flex-1 py-2 gap-2 justify-center items-center rounded-full shadow-xl hover:opacity-90 transition-all duration-300 bg-[red] cursor-pointer text-white text-sm md:text-lg"
            >
              <IoIosCloseCircleOutline size={20} /> Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
