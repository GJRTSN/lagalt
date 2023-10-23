"use client";
import ProfileInfo from "@/app/profile/ProfileInfo";
import ProfileProjects from "@/app/profile/ProfileProjects";
import Link from "next/link";
import ProfileSkills from "@/app/profile/ProfileSkills";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import { useParams } from "next/navigation";
import { getUserById } from "@/app/api/Users";
import Image from "next/image";
import placeholder from "@/public/placholderpp.jpg";
import privateProfile from "@/public/lock-solid.svg";
import { getUserData } from "@/app/api/user/get";

export default function Profile() {
  const params = useParams();
  const userId = Number(params.id);

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getUserData(userId)
      .then((data) => {
        setUserData(data.userData);
        setIsProfileVisible(data.isProfileVisible);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  if (!userData) {
    return null;
  }

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center"></div>
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-2/4">
          {isProfileVisible ? (
            <ProfileInfo userId={userId} />
          ) : (
            <div className="bg-gray-300 p-4 rounded-xl mt-10 text-black">
              {/* Row 1 */}
              <div className="flex space-x-4 mb-4">
                {/* Column 1 */}
                <div className="flex-1 p-4  rounded-lg">
                  <h2 className="text-2xl mb-4">
                    {userData.forName} {userData.lastName}
                  </h2>

                  <p className="font-bold text-lg mb-2">
                    User has set their profile to private.
                  </p>
                </div>
                {/* Column 2 */}
                <div className="flex-1 p-4  rounded-lg flex justify-center items-center">
                  <Image
                    src={privateProfile}
                    alt="User-picture"
                    width={100}
                    height={100}
                    className="rounded-lg opacity-30"
                  />
                </div>
              </div>
              {/* Row 2 */}
            </div>
          )}

          {isProfileVisible && <ProfileSkills userId={userId} />}
          {isProfileVisible && <ProfileProjects userId={userId} />}
        </div>
      </div>
    </div>
  );
}
