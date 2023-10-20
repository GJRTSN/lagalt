import { useEffect, useState } from "react";
import { getUserById } from "../api/Users";
import { User, Skill } from "../types/types";

interface ProfileSkillsProps {
  userId: number; // Define userId prop
}

export default function ProfileSkills({ userId }: ProfileSkillsProps) {
  const [user, setUser] = useState<Partial<User>>({ skills: [] });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(userId); // Use userId prop here
      setUser(userData);
    };
    fetchUser();
  }, [userId]);

  return (
    <div id="skills" className="mt-8 text-black bg-gray-300 p-4 rounded-xl">
      <h2 className="text-2xl">Skills</h2>
      <div className="flex flex-wrap mt-2 mb-2">
        {user?.skills && user.skills.length > 0 ? (
          user.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-300 text-blue-900 px-2 py-1 rounded mr-2"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="italic text-gray-500">
            {user?.forName
              ? `${user.forName} hasn't learned any skills yet.`
              : "User has no skills yet."}
          </p>
        )}
      </div>
    </div>
  );
}
