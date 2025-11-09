"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchUsers();
    getUser();
  }, []);

  async function fetchUsers() {
    const response = await axios.get("/api/users/fetchusers");
    setUsersList(response.data.data);
  }

  async function deleteUser(id) {
    const response = await axios.delete(`/api/users/deleteuserbyid/`, {
      params: {
        id: id,
      },
    });
    fetchUsers();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  // Get Current User Data
  async function getUser() {
    const response = await axios.get("/api/users/me");
    return setCurrentUser(response.data.data || "");
  }

  return (
    <>
      {!usersList.length > 0 && <Loader />}
      <div className="w-full flex justify-center pb-4">
        <div className="w-full px-2 md:px-8 mt-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
            <Link
              href={"/"}
              className="p-2 bg-blue-800/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-white rounded-full transition-all duration-300"
            >
              <FaArrowLeft size={16} />
            </Link>
            <h2 className="w-full text-center text-blue-700 font-bold text-shadow-xs text-3xl py-2 ">
              All Users
            </h2>
          </div>
          {/* Desktop Table */}
          {/* Table For Users View */}
          <div className="w-full hidden md:flex">
            <table className="w-full overflow-y-auto bg-gray-50">
              <thead>
                <tr className="text-white/90 font-semibold bg-blue-900">
                  <th className="text-center border border-orange-300 py-2 px-1">
                    Sl No.
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    User Name
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    User Role
                  </th>
                  <th className="text-center border border-orange-300 py-1 px-1">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user, index) => (
                  <tr key={user._id} className="text-black ">
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {index + 1}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {user.user_name}
                    </td>
                    <td className="text-center border border-orange-300 py-1 px-1">
                      {user.user_role}
                    </td>

                    <td className="text-center border border-orange-300 py-1 px-1">
                      {(currentUser.user_name || "") !== user.user_name && (
                        <div className="flex p-1 justify-center items-center gap-2">
                          <MdOutlineDelete
                            size={25}
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:bg-gray-200 rounded-full cursor-pointer"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Desktop Table Ends Here*/}

          {/* Mobile Table Starts Here*/}

          <div className="w-full md:hidden flex flex-col justify-center gap-4 mt-4">
            {/* Table Main */}
            {usersList.map((user, index) => (
              <div
                key={user._id}
                className="w-full bg-[bisque]/50 border border-orange-200 shadow-md"
              >
                {/* Mobile Table Headings and Data */}
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Sl No.</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {index + 1}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">User Name</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {user.user_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">User Role</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {user.user_role}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Actions</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {(currentUser.user_name || "") !== user.user_name && (
                      <div className="w-full flex items-center gap-4">
                        <MdOutlineDelete size={25} className="text-red-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
