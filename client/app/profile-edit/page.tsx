import React from "react";
import EditProfileAbout from "./EditProfileAbout";
import EditProfileInfo from "./EditProfileInfo";
import Link from "next/link";
import EditProfileSkills from "./EditProfileSkills";

export default function ProfileEdit() {
  return (
    <div className="h-screen bg-white">
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-full h-12 bg-yellow-500 flex flex-row items-center justify-center">
          <div className="w-2/4 flex justify-between">
            <p className="text-black italic py-2">Editing</p>
            <div className="flex space-x-2">
              <Link href="/profile">
                <button className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded-full">
                  Save
                </button>
              </Link>
              <Link href="/profile">
                <button className="bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded-full">
                  Discard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-2/4">
          <EditProfileInfo />
          <EditProfileSkills />
          <EditProfileAbout />
        </div>
      </div>
    </div>
  );
}
