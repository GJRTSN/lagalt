import Image from "next/image";
import { getUserById } from "../api/Users";
import { useEffect, useState } from "react";
import placeholder from "@/public/placholderpp.jpg";

interface ProfileInfoProps {
  isProfileVisible: boolean;
  userId: number; // Add userId prop
}

export default function ProfileInfo({
  isProfileVisible,
  userId,
}: ProfileInfoProps) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getUserById(userId) // Use userId prop here
      .then((data) => {
        setUserData(data);
        // console.log("Fetched userData data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  if (!userData) {
    return null;
  }

  return (
    <div className="mt-10 flex space-x-4 text-black bg-gray-300 p-4 rounded-xl">
      <div className="w-1/2">
        <h2 className="text-2xl">
          {userData.forName} {userData.lastName}
        </h2>
        <div className="mt-2">
          {!isProfileVisible && (
            <p className="italic text-black mt-8">
              {userData.forName} {userData.lastName} has set the profile to
              hidden
            </p>
          )}
          {isProfileVisible && (
            <>
              <p className="font-bold text-lg">
                Title:{" "}
                <span className="font-light">{userData.description}</span>
              </p>
              <p className="font-bold text-lg">
                Location: <span className="font-light">{userData.country}</span>
              </p>
              <p className="font-bold text-lg">
                Age: <span className="font-light">{userData.age}</span>
              </p>
              {/*<p className="font-bold text-lg">
                Work model: <span className="font-light">{userData.workModel}</span>
              </p> 
              <br />
              <div>
                <p className="font-bold text-lg">
                  Rating:{" "}
                  <span className="font-light">
                    {limitRating(userData.rating)}/5
                  </span>
                </p>
                <div className="flex items-center">
                  {ratingStars(userData.rating)} {/* Render star images 
                </div> 
              </div> */}
            </>
          )}
        </div>
      </div>
      <div className="flex w-1/2 justify-end items-center">
        <Image
          src={placeholder}
          alt="User-picture"
          width={200}
          height={200}
          style={{
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
}
