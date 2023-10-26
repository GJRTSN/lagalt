import React, { useEffect, useState } from "react";
import { removeParticipant } from "@/app/api/participant/delete";
import { getAllProjects } from "@/app/api/project/get";
import { User } from "@/app/types/UserTypes";
import Link from "next/link";
import { Project } from "../types/ProjectTypes";

export default function YourCollaborations({ userId }: Partial<User>) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects();
      const participantProjects = allProjects.filter((project: Project) =>
        project.participants.some(
          (participant) => participant.userId === userId
        )
      );
      // Filter projects where the user is a participant
      setProjects(participantProjects);
    };

    fetchProjects();
  }, [userId]);

  // Function to handle leaving a project
  const handleLeaveProject = async (projectId: number, userId: number) => {
    try {
      await removeParticipant(projectId, userId);
      const updatedProjects = await getAllProjects();
      const participantProjects = updatedProjects.filter((project: Project) =>
        project.participants.some(
          (participant) => participant.userId === userId
        )
      );
      // Filter updated projects where the user is still a participant
      setProjects(participantProjects);
    } catch (error) {
      console.error("There was an error removing the participant:", error);
    }
  };

  return (
    <div id="collabs" className="w-3/4 h-1/4 m-4 bg-[#f3f3f3] rounded-lg p-4">
      <h3 className="text-black text-4xl font-bold  mb-2">Collaborations</h3>
      <p className="text-black font-roboto">
        This is an overview of other projects which you are currently
        collaborating on
      </p>
      <div className="w-full  rounded-lg p-2 my-6">
        {projects.length > 0 ? (
          <table className="min-w-full shadow-md table-auto">
            <thead className="bg-[#b0d3bb]">
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
                  className={"bg-white text-black hover:bg-gray-200"}
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
                    <button
                      type="button"
                      className="bg-red-700 hover:bg-red-500 py-1 mx-1 px-2 rounded-md text-white"
                      onClick={() => {
                        if (userId) {
                          handleLeaveProject(project.projectId, userId);
                        }
                      }}
                    >
                      Leave
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black text-center">
            You are not participating in any projects.
          </p>
        )}
      </div>
    </div>
  );
}
