"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/app/contexts/userContext";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lagalt-case-1.azurewebsites.net/users/login",
        {
          username,
          password,
        }
      );
      setUser(response.data);
      router.push("/dashboard"); // Assuming you have a dashboard page to redirect to
    } catch (error) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="mb-4 text-3xl text-gray-800">Welcome to Lagalt!</h1>
      <div className="flex w-3/4 justify-between">
        <div className="w-1/2 bg-white p-8 rounded-lg text-black">
          <h2 className="text-2xl mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
              className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-lg text-gray-600">New to Lagalt?</p>
          <Link href="/register">
            <button className="py-2 px-4 mb-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
              Register
            </button>
          </Link>
          <p className="mb-2 text-gray-500">
            or browse as a guest with limited access
          </p>
          <Link href="/explore">
            <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
