import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { ProjAdminList } from "../types/types";
import { UserContext } from "../contexts/userContext";
import { getProjectsByUser } from "../api/project/get";

type YourProjectsProps = {
  userId: number | null;
};

export default function YourProjects({ userId }: YourProjectsProps) {
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
    <div id="admindash" className="w-3/4 h-full bg-[#CCCCCC] rounded-lg p-4 ">
      <div className="w-1/2 float-right">
        <Link href="/projects/create">
          <button className="w-auto h-8 bg-green-600 rounded-md px-2 float-right">
            New project
          </button>
        </Link>
      </div>
      <h3 className="text-black text-4xl font-bold font-roboto ">
        Your projects
      </h3>
      <p className="text-black font-roboto">
        Projects you own and administrate
      </p>

      <div className="w-full p-5">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Project ID</th>
                <th className="py-3 px-6 text-left">Project Name</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {projects.map((project: ProjAdminList, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{project.projectId}</span>{" "}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.title || "Unnamed Project"}</span>{" "}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.status}</span>
                    </div>
                  </td>
                  <td className="py-3 text-left">
                    <div className="flex items-center">
                      <Link href={`/projects/${project.projectId}`}>
                        <button className="bg-green-700 py-1 mx-1 px-2 rounded-md text-white">
                          View
                        </button>
                      </Link>
                      <Link href={`/projects/edit/${project.projectId}`}>
                        <button className="bg-yellow-400 py-1 mx-1 px-2 rounded-md text-white">
                          Manage
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
