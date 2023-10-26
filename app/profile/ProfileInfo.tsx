import { useEffect, useState } from "react";
import { getUserById } from "@/app/api/user/get";
import { User } from "@/app/types/UserTypes";

export default function ProfileInfo({ userId }: Partial<User>) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userId)
      getUserById(userId)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [userId]);

  if (!userData) {
    return null;
  }

  return (
    <div className="bg-[#e7f7e9] p-4 rounded-xl mt-4 text-black">
      <div className="flex space-x-4 mb-4">
        <div className="flex-1 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {userData.forName} {userData.lastName}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-md">
            <div className="font-bold">Role</div>
            <div className="">{userData.userRole}</div>

            <div className="font-bold">Location</div>
            <div className="">{userData.country}</div>

            <div className="font-bold">Age</div>
            <div className="">{userData.age}</div>
          </div>
        </div>
        <div className="flex-1 p-4  rounded-lg flex justify-center items-center">
          <img
            src={userData?.profilePicture}
            alt="User-placeholder"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className=" p-4 rounded-lg">
        <p className="font-bold text-xl mb-2">Description</p>
        <div className="bg-white w-full h-auto p-8 rounded-md">
          {" "}
          <p className="font-light">{userData.description}</p>
        </div>
      </div>
    </div>
  );
}
