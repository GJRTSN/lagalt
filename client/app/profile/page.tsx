"use client";
import ProfileInfo from "./ProfileInfo";
import ProfileProjects from "./ProfileProjects";
import Link from "next/link";
import ProfileSkills from "./ProfileSkills";
import { useState } from "react";
import { useUserContext } from "@/app/contexts/userContext";

export default function Profile() {
  const { user } = useUserContext();
  const userId = user?.userId;

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center mb-8"></div>
      <div className="flex space-x-2 justify-center items-center">
        <Link href="profile/edit">
          <button className="bg-yellow-500 hover:bg-gray-700 font-bold py-1 px-3 rounded">
            Edit profile
          </button>
        </Link>
      </div>
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-2/4">
          <ProfileInfo userId={userId} />
          <ProfileSkills userId={userId} />
          <ProfileProjects userId={userId} />
        </div>
      </div>
    </div>
  );
}
