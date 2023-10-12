"use client";
import Image from "next/image";
import userPlaceholder from "@/public/picture_placeholder.png";
import { user } from "../profile/dummyUserData";

export default function EditProfileInfo() {
  const hasProfilePicture = user.image !== ""; // Check if the user has a picture

  // Function to handle removing the user's profile picture
  const removeProfilePicture = () => {
    // If the API was ready, you would remove the picture from the user object here.
    // For now, let's set it to an empty string to simulate removal.
    user.image = "";
  };

  return (
    <div>
      <div className="mt-2 flex space-x-4 text-black ">
        <div className="w-1/2">
          <p className="font-bold">Firstname</p>
          <div className="mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
              placeholder="Enter your firstname"
            />
          </div>

          <p className="font-bold mt-2">Lastname</p>
          <div className="mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
              placeholder="Enter your lastname"
              //value={user.lastname}
            />
          </div>

          <p className="font-bold mt-2">Title</p>
          <div className="mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
              placeholder="Enter your location"
              //value={user.title}
            />
          </div>

          <p className="font-bold mt-2">City</p>
          <div className="mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
              placeholder="Enter your location"
              //value={user.city}
            />
          </div>

          <p className="font-bold mt-2">Country</p>
          <div className="mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
              placeholder="Enter your location"
              //value={user.country}
            />
          </div>

          <p className="font-bold mt-2">Work model:</p>
          <div className="mt-2">
            <select
              /*value={user.workModel}*/ className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Office">Office</option>
            </select>
          </div>
        </div>

        <div className="w-1/2">
          {hasProfilePicture ? (
            <>
              <Image
                src={user.image}
                alt="User-profile"
                width={500}
                height={300}
                style={{
                  borderRadius: 10,
                }}
              />
              <button
                onClick={removeProfilePicture}
                className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-md mt-2"
              >
                Remove
              </button>
            </>
          ) : (
            <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center h-72">
              <Image src={userPlaceholder} alt="User-placeholder" width={100} />
              <button className="bg-green-500 hover:bg-green-700 text-white p-1 rounded-md">
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
      </div>
    </div>
  );
}
