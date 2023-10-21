import React, { useState, useEffect } from "react";
import { getUserById } from "../api/Users"; // adjust the import path
import { User } from "../types/types";
import { getProjectsByUser } from "../api/project/get";
import { useUserContext } from "../contexts/userContext";

export default function ProfileProjects({ userId }) {
  const { user } = useUserContext();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      if (userId) {
        const projectsFromApi = await getProjectsByUser(userId);
        setProjects(projectsFromApi);
      }
    };
    getProjects();
  }, [userId]);

  return (
    <div className="mt-8 mb-8 bg-gray-300 p-4 rounded-xl text-black">
      <div>
        <h2 className="text-2xl">Projects</h2>
        <div className="text-black">
          {user && user.projects && user.projects.length > 0 ? (
            <div className="mt-2 bg-white p-2 rounded">
              {user?.projects?.map((project, index) => (
                <div key={index}>{project.name}</div>
              ))}
            </div>
          ) : (
            <p className="italic mt-2 text-gray-500">
              {user?.forName} does not dot own any projects
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
