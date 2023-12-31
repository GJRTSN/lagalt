"use client";

import { useUserContext } from "@/app/contexts/userContext";
import ProfileProjects from "./ProfileProjects";
import ProfileSkills from "./ProfileSkills";
import ProfileInfo from "./ProfileInfo";
import Link from "next/link";

export default function Profile() {
  const { user } = useUserContext();
  const userId = user?.userId;

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-16 bg-[#67864e] flex flex-row items-center justify-center mb-8">
        <Link href="profile/edit">
          <button className=" border-2 border-yellow-500 hover:bg-gray-700 font-bold py-1 px-3 rounded">
            Edit profile
          </button>
        </Link>
      </div>
      <div className="flex space-x-2 justify-center items-center"></div>
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
