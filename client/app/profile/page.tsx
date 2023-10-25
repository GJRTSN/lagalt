"use client";

import { useUserContext } from "@/app/contexts/userContext";
import ProfileProjects from "./ProfileProjects";
import ProfileSkills from "./ProfileSkills";
import ProfileInfo from "./ProfileInfo";
import Link from "next/link";

export default function Profile() {
  const { user } = useUserContext();
  const userId = user?.userId;

  // Check if the user is authenticated (userId exists) or not
  if (userId || userId === undefined || userId === 0) {
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
            <ProfileInfo userId={userId as number} />
            <ProfileSkills userId={userId as number} />
            <ProfileProjects userId={userId as number} />
          </div>
        </div>
      </div>
    );
  }

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
          <ProfileInfo userId={userId as number} />
          <ProfileSkills userId={userId as number} />
          <ProfileProjects userId={userId as number} />
        </div>
      </div>
    </div>
  );
}
