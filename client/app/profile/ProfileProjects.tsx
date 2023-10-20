import React, { useState, useEffect } from "react";
import { getUserById } from "../api/Users"; // adjust the import path
import { User } from "../api/types";

export default function ProfileProjects() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(1); // Replace 1 with the actual user ID
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <div className="mt-8 mb-8 bg-gray-300 p-4 rounded-xl text-black">
      <div>
        <h2 className="text-2xl">Projects:</h2>
        {user && user.projects && user.projects.length > 0 ? (
          <div className="mt-2 bg-white p-2 rounded">
            {user?.projects?.map(
              (
                project,
                index
              ) => (
                <div key={index}>{project.name}</div>
              )
            )}
          </div>
        ) : (
          <p className="italic mt-2 text-gray-500">
            {user?.forName} has no projects
          </p>
        )}
      </div>
    </div>
  );
}
