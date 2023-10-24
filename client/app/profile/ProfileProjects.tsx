import React, { useState, useEffect } from "react";
import { getUserById } from "../api/Users"; // adjust the import path if necessary
import { User, Project } from "../types/types"; // adjust the import path if necessary
import Link from "next/link";

interface ProfileProjectsProps {
  userId: number;
}

export default function ProfileProjects({ userId }: ProfileProjectsProps) {
  const [userData, setUserData] = useState<Partial<User>>({ projects: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataFromApi = await getUserById(userId);
      setUserData(userDataFromApi);
    };
    fetchUserData();
  }, [userId]);

  return (
    <div className="mt-8 mb-8 bg-gray-300 p-4 rounded-xl text-black">
      <div>
        <h2 className="text-2xl mb-2">Projects</h2>
        <div className="text-black">
          {userData.projects && userData.projects.length > 0 ? (
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Industry</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {userData.projects.map((project, index) => (
                  <tr
                    className="border-b border-gray-200 bg-white hover:bg-gray-100"
                    key={index}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{project.projectId}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span>{project.title || "Unnamed Project"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span>{project.industryName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span>{project.status}</span>
                      </div>
                    </td>
                    <td className="py-3 text-left">
                      <div className="flex items-center justify-center">
                        <Link href={`/projects/${project.projectId}`}>
                          <button className="bg-green-700 hover:bg-green-500 py-1 mx-1 px-2 rounded-md text-white">
                            View
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="italic mt-2 text-gray-500">
              {userData.forName
                ? `${userData.forName} does not own any projects`
                : "User does not own any projects"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
