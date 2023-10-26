import React, { useEffect, useState } from "react";
import { getProjectsByUser } from "../api/project/get";
import { Project } from "../types/ProjectTypes";
import { User } from "../types/UserTypes";
import Link from "next/link";

export default function YourProjects({ userId }: Partial<User>) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!projects) {
      console.error("Project is undefined");
      return;
    }
    const getProjects = async () => {
      if (userId) {
        const projectsFromApi = await getProjectsByUser(userId);
        setProjects(projectsFromApi);
      }
    };
    getProjects();
  }, [userId]);

  return (
    <div
      id="admindash"
      className="w-3/4 h-full bg-[#f3f3f3] border-2 border-green-500 rounded-lg p-4 shadow-lg mb-4 "
    >
      <div className="w-1/2 float-right "></div>
      <h3 className="text-black text-4xl font-bold mb-2 ">Projects</h3>
      <p className="text-black font-roboto">
        This is an overview of the projects you own and administrate
      </p>

      <div className="w-full p-5">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-[#b0d3bb] text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Industry</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Participants</th>
                <th className="py-3 px-6 text-left">Applications</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {projects.map((project: Project, index) => (
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
                      <span>{project.industryName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.participants.length}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span
                        className={`${
                          project.workApplications.filter((app) => app.accepted)
                            .length > 0
                            ? "bg-red-500 py-1 px-2 rounded-lg text-white"
                            : ""
                        }`}
                      >
                        {
                          project.workApplications.filter((app) => app.accepted)
                            .length
                        }
                      </span>
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
          <Link href="/projects/create">
            <button className="w-auto h-8 bg-green-700 font-medium hover:bg-green-500 rounded-md px-2 float-right mt-6">
              New project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
