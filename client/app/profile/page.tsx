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
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const handleToggle = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center">
        <div className="w-2/4 flex justify-between">
          <p className="text-black italic py-2">
            This is how your profile looks like to others
          </p>
          <div className="flex space-x-2 justify-center items-center">
            <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                checked={isProfileVisible}
                onChange={handleToggle}
                className="sr-only"
              />
              <span className="label flex items-center text-sm font-medium text-black">
                {isProfileVisible ? "Visible" : "Hidden"}
              </span>
              <span
                className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                  isProfileVisible ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <span
                  className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                    isProfileVisible ? "translate-x-[28px]" : ""
                  }`}
                ></span>
              </span>
            </label>
            <Link href="profile/edit">
              <button className="bg-gray-500 hover:bg-gray-700 font-bold py-1 px-3 rounded">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-2/4">
          <ProfileInfo isProfileVisible={isProfileVisible} userId={userId} />
          {isProfileVisible && <ProfileSkills userId={userId} />}
          {isProfileVisible && <ProfileProjects userId={userId} />}
        </div>
      </div>
    </div>
  );
}
