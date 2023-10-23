"use client";
import React, { ChangeEvent, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { registerNewUser } from "../api/user/post";
import logo from "@/public/lagalt_clean.png";
import Image from "next/image";
import { RegisterUserData } from "../types/UserTypes";

const Register = () => {
  const router = useRouter();

  const [registerUser, setRegisterUser] = useState<RegisterUserData>({
    forName: "",
    lastName: "",
    description: "",
    country: "",
    email: "",
    userRole: "",
    includeProjects: false,
    username: "",
    password: "",
    age: 18,
    skillIds: [14],
    skillNames: ["PHP"],
    profileVisible: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRegisterUser({
      ...registerUser,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await registerNewUser(registerUser as RegisterUserData);
      console.log("User created:", data);
      router.push("/explore");
    } catch (error) {
      if (error instanceof Error) {
        console.log(registerUser);
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center place-content-center bg-gray-100 text-black">
      <div className="w-2/6 bg-white p-8 rounded-lg shadow-lg text-black items-center flex flex-col justify-center">
        <div className="mb-8 mt-4 text-center flex items-center">
          <Image src={logo} alt="Lagalt logo" width={50} height={50} />
        </div>
        <h2 className="text-2xl mb-6 text-center font-bold">
          Create your free account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-md text-black"
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="forName"
                className="block text-sm font-medium  mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="forName"
                name="forName"
                className="w-full px-3 py-2 border rounded-md text-black"
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 border rounded-md text-black"
                onChange={handleChange}
                placeholder="Enter your lastname"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md text-black"
              onChange={handleChange}
              placeholder='E.g.: "email@mail.com"'
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium  mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium  mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="w-full px-3 py-2 border rounded-md text-black"
                onChange={handleChange}
                placeholder="Enter your country"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="userRole"
              className="block text-sm font-medium  mb-1"
            >
              Role
            </label>
            <input
              type="text"
              id="userRole"
              name="userRole"
              className="w-full px-3 py-2 border rounded-md text-black"
              onChange={handleChange}
              placeholder="Web Developer? Video Editor? Artist? ..."
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium  mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
