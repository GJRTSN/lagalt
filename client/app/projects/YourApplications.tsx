import React, { useEffect, useState } from "react";
import { deleteApplication } from "@/app/api/project/delete";
import { getAllProjects } from "@/app/api/project/get";
import { Project, ProjectComment } from "../types/ProjectTypes";
import { User } from "../types/UserTypes";
import Link from "next/link";

export default function YourApplications({ userId }: Partial<User>) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const allProjects = await getAllProjects();
    const appliedProjects = allProjects.filter((project: Project) =>
      project.workApplications.some(
        (application) => application.userId === userId
      )
    );
    setProjects(appliedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const handleWithdraw = async (applicationId: number) => {
    console.log(applicationId);
    try {
      await deleteApplication(applicationId);
      fetchProjects();
    } catch (error) {
      console.error("Failed to withdraw application:", error);
    }
  };

  return (
    <div
      id="applications"
      className="w-3/4 h-1/4 m-4 bg-[#CCCCCC] rounded-lg p-4"
    >
      <h3 className="text-black text-4xl font-bold font-roboto">
        Your applications
      </h3>
      <p className="text-black font-roboto">
        Projects you have applied to join
      </p>
      <div className="w-full rounded-lg p-2">
        {projects.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-black">ID</th>
                <th className="py-2 px-4 text-left text-black">Name</th>
                <th className="py-2 px-4 text-left text-black">Industry</th>
                <th className="py-2 px-4 text-left text-black">Status</th>
                <th className="py-2 px-4 text-center text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: Project, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } text-black`}
                  key={index}
                >
                  <td className="py-2 px-4">{project.projectId}</td>
                  <td className="py-2 px-4 font-medium">{project.title}</td>
                  <td className="py-2 px-4">{project.industryName}</td>
                  <td className="py-2 px-4">{project.status}</td>
                  <td className="py-2 px-4 flex justify-center">
                    <Link href={`/projects/${project.projectId}`}>
                      <button className="bg-green-700 hover:bg-green-500 py-1 mx-1 px-2 rounded-md text-white">
                        View
                      </button>
                    </Link>
                    {project.workApplications.map((application, appIndex) =>
                      application.userId === userId ? (
                        <button
                          key={appIndex}
                          onClick={() =>
                            handleWithdraw(application.applicationId)
                          }
                          className="bg-orange-600 hover:bg-yellow-500 py-1 mx-1 px-2 rounded-md text-white"
                        >
                          Withdraw
                        </button>
                      ) : null
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black text-center">
            You have not applied to any projects.
          </p>
        )}
      </div>
    </div>
  );
}
