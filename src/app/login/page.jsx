"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  async function signInUser(e) {
    e.preventDefault();
    if (!userName || !userPassword) {
      toast.error("All fields are required!");
      return;
    }
    const response = await axios.post("api/login", { userName, userPassword });
    if (response.data.success) {
      router.push("/");
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col justify-center bg-blue-950 px-6 py-12 lg:px-8">
        <div className="">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-100">
                User Name
              </label>
              <div className="mt-2">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  name="user"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline -outline-offset-1 outline-white/10 placeholder:text-gray-500  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-100">
                  User Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline  -outline-offset-1 outline-white/10 placeholder:text-gray-500  focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={signInUser}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Forgot passwrod? Contact to your Administrator
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
