import Image from "next/image";
import { getUserById } from "../api/getUsersById"; // Import the updated function
import { useEffect, useState } from "react";
import placeholder from "@/public/placholderpp.jpg"

interface ProfileInfoProps {
  isProfileVisible: boolean; // Define the prop type
}

export default function ProfileInfo({ isProfileVisible }: ProfileInfoProps) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getUserById(1)
      .then((data) => {
        setUserData(data);
        console.log("Fetched userData data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  /*
  const limitRating = (rating: number) => {
    if (rating < 1) {
      return 1;
    } else if (rating > 5) {
      return 5;
    }
    return rating;
  };

 /* const ratingStars = (rating: number) => {
    // Apply the rating limit function to ensure rating is between 1 and 5
    const limitedRating = limitRating(rating);

    const starImages = [];
    for (let i = 0; i < limitedRating; i++) {
      starImages.push(
        <Image
          key={i}
          src={`/staricon.png`}
          alt={`Star ${i + 1}`}
          width={20}
          height={20}
        />
      );
    }
    return starImages;
  };
  */

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
