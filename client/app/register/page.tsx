"use client";
import React, { ChangeEvent, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "", 
    forName: "",
    lastName: "",
    description: "",
    country: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Your backend API URL
  const apiEndpoint = "https://lagalt-case-1.azurewebsites.net/users/";

  try {
    const response = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    console.log(response)

    if (response.status === 201) {
      const data = await response.json();
      console.log("User created:", data);
      
      // Log in the user
      signIn("Credentials", { 
        username: formData.username,
        password: formData.password,
        callbackUrl: "/explore",
      });
      
    }  else {
      // Handle errors, maybe update the component's state to display an error message
      console.error("Failed to register user:", response.status, await response.json());
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-1/3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-1"
            >
              Username:
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
                className="block text-sm font-medium text-white mb-1"
              >
                First Name:
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
                className="block text-sm font-medium text-white mb-1"
              >
                Last Name:
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email:
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
              <label
                htmlFor="age"
                className="block text-sm font-medium text-white mb-1"
              >
                Birthday:
              </label>
              <input
                type="text"
                id="age"
                name="age"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-white mb-1"
              >
                Country:
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
              htmlFor="description"
              className="block text-sm font-medium text-white mb-1"
            >
              Title:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded-md text-black"
              onChange={handleChange}
              placeholder="Enter your title"
            />
          </div>

         {/*<div className="mb-4">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-white mb-1"
            >
              About:
            </label>
            <textarea
              id="about"
              name="about"
              className="w-full px-3 py-2 border rounded-md text-black resize-none"
              onChange={handleChange}
              placeholder="Tells us more about yourself!"
            ></textarea>
          </div> */} 

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            />
          </div>

          <button type="submit" className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
