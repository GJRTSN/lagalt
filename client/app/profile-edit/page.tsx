"use client"
import React from "react";
import EditProfileAbout from "./EditProfileAbout";
import EditProfileInfo from "./EditProfileInfo";
import { useRouter } from "next/navigation"; // Import the Next.js router
import EditProfileSkills from "./EditProfileSkills";

export default function ProfileEdit() {
  const router = useRouter()


  const handleSaveChanges = () => {
    //Add code for saving data 
    router.push("/profile")
  };

  const handleDiscardChanges = () => {
    //Add code for discarding data
    router.push("/profile")
  }


  return (
    <div className="h-screen bg-white">
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-full h-12 bg-yellow-500 flex flex-row items-center justify-center">
          <div className="w-2/4 flex justify-between">
            <p className="text-black italic py-2">Editing</p>
          </div>
        </div>
        <div className="w-2/4 bg-gray-300 p-4 rounded-xl mt-10 mb-8">
          <EditProfileInfo />
          <EditProfileSkills />
          <EditProfileAbout />
          <div className="flex space-x-2 justify-center items-center">
            <button className="bg-green-500 hover:bg-green-700 font-bold py-1 px-3 rounded" onClick={handleSaveChanges}>
              Save
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 font-bold py-1 px-3 rounded" onClick={handleDiscardChanges}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
