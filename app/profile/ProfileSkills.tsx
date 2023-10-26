import { useEffect, useState } from "react";
import { getUserById } from "@/app/api/user/get";
import { User } from "@/app/types/UserTypes";

export default function ProfileSkills({ userId }: Partial<User>) {
  const [user, setUser] = useState<Partial<User>>({ skillNames: [] });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await getUserById(userId);
        console.log(userData);
        setUser(userData);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div id="skills" className="mt-8 text-black bg-[#f3f3f3] p-4 rounded-xl">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="flex flex-wrap mt-2  mb-2">
        {user?.skillNames && user.skillNames.length > 0 ? (
          user.skillNames.map((skill, index) => (
            <span
              key={index}
              className=" bg-white border-2 border-green-700 px-2 my-1 py-1 rounded-md mr-2"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="italic text-gray-500">
            {user?.forName
              ? `${user.forName} has not added any skills yet.`
              : "User has not added any skills yet."}
          </p>
        )}
      </div>
    </div>
  );
}
