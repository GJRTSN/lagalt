// AdminProject.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Project, getProjects } from "@/app/api/Projects";
const AdminProject: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projectsData = getProjects();
    setProjects(projectsData);
  }, []);

  console.log(projects);

  return (
    <div id="admindash" className="w-3/4 h-full bg-[#CCCCCC] rounded-lg p-4 ">
      <div className="w-1/2 float-right">
        <Link href="/projects/create">
          <button className="w-auto h-8 bg-green-700 rounded-md px-2 float-right">
            New project
          </button>
        </Link>
      </div>
      <h3 className="text-black text-4xl font-bold font-roboto ">
        Administrator Dashboard
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
                <th className="py-3 px-6 text-left">Industry</th>
                <th className="py-3 px-6 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {projects.map((project, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{project.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.name || "Unnamed Project"}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.industry.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{project.status.name}</span>
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
};

export default AdminProject;
