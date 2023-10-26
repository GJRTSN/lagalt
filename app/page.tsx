"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/contexts/userContext";
import axios from "axios";
import Link from "next/link";
import logo from "@/public/lagalt_dark.svg";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useUserContext();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://lagalt-case-1.azurewebsites.net/users/`
      );
      const users = response.data;
      const user = users.find(
        (user: any) => user.username === username && user.password === password
      );
      if (user) {
        setUser(user);
        router.push("/explore");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="mb-8 mt-4">
        <Image src={logo} alt="Lagalt logo" width={200} height={200} />
      </div>
      <div className="w-2/5 bg-white p-8 rounded-lg shadow-lg flex justify-between">
        <div
          id="loginContainer"
          className="flex flex-col w-2/4 text-black border-r border-gray-300 text-center "
        >
          <h2 className="text-2xl mb-6 text-center font-bold self-center">
            Welcome back!
          </h2>
          <div className="flex flex-col w-full bg-white p-8 rounded-lg  text-black ">
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full p-2 border rounded-lg"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full p-2 border rounded-lg"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 self-center"
              >
                Login
              </button>
            </form>
            {error && (
              <div className="text-red-500 mt-4 text-center">{error}</div>
            )}
          </div>
        </div>

        <div
          id="newUserContainer"
          className="flex flex-col w-2/4 text-black text-center "
        >
          <h2 className="text-2xl mb-6 text-center font-bold self-center">
            New here?
          </h2>
          <div className="flex flex-col space-y-4 h-full justify-center">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-gray-500">Create a new account</p>
              <Link href="/register">
                <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                  Register
                </button>
              </Link>
            </div>
            <p className="font-bold font-cursive">or</p>
            <div className="flex flex-col items-center">
              <p className="mb-2 text-gray-500">Continue as guest</p>
              <Link href="/explore">
                <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                  Browse
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
