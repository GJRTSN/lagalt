"use client";
import ProfileInfo from "@/app/profile/ProfileInfo";
import ProfileProjects from "@/app/profile/ProfileProjects";
import ProfileSkills from "@/app/profile/ProfileSkills";
import { useEffect, useState } from "react";
import { getUserData } from "@/app/api/user/get";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";
import privateProfile from "@/public/lock-solid.svg";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    return (
      <div className="h-screen bg-white">
        <div className="w-full h-16 bg-[#67864e] flex flex-row items-center justify-center">
          <div className="w-full h-16 bg-[#67864e] flex flex-row items-center text-2xl justify-center space-x-4"></div>
        </div>
        <div className="flex bg-white flex-col items-center justify-center mt-8">
          <MoonLoader color="#8cb669" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-16 bg-[#67864e] flex flex-row items-center justify-center">
        <div className="w-full h-16 bg-[#67864e] flex flex-row items-center text-2xl justify-center space-x-4">
          <a
            href="https://github.com/yourGithubUsername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-white hover:text-gray-300 cursor-pointer"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/yourLinkedinUsername/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-white hover:text-gray-300 cursor-pointer"
            />
          </a>
          <a
            href="https://instagram.com/yourInstagramUsername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-white hover:text-gray-300 cursor-pointer"
            />
          </a>
          <a
            href="https://instagram.com/yourInstagramUsername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="text-white hover:text-gray-300 cursor-pointer"
            />
          </a>
          <a href="mailto:yourEmail@example.com">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-white hover:text-gray-300 cursor-pointer"
            />
          </a>
        </div>
      </div>
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-2/4">
          {isProfileVisible ? (
            <ProfileInfo userId={userId} />
          ) : (
            <div className="bg-gray-300 p-4 rounded-xl mt-10 text-black">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 p-4  rounded-lg">
                  <h2 className="text-2xl mb-4">
                    {userData.forName} {userData.lastName}
                  </h2>

                  <p className="font-bold text-lg mb-2">
                    User has set their profile to private.
                  </p>
                </div>

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
            </div>
          )}

          {isProfileVisible && <ProfileSkills userId={userId} />}
          {isProfileVisible && <ProfileProjects userId={userId} />}
        </div>
      </div>
    </div>
  );
}
