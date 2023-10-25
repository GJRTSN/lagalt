"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/project/get";
import { useParams } from "next/navigation";
import { Project } from "@/app/types/ProjectTypes";
import logo from "@/public/lock-solid.svg";
import Image from "next/image";

const ExploreProject: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const projectsData = await getAllProjects();
          const selectedProject = projectsData.find(
            (proj: Project) => proj.projectId === Number(id)
          );
          setProject(selectedProject || null);
        } catch (error) {
          console.error("There was an error fetching the projects", error);
        }
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="h-full min-h-screen bg-white pb-12">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center "></div>
        <div className="flex flex-col justify-center items-center mt-8">
          <p className="text-black">Loading project...</p>;
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center "></div>
      <div className="flex flex-col items-center mt-8 ">
        <div className="w-2/4 bg-gray-100 p-4 text-black rounded-lg mb-12">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-extrabold mb-4 text-black">
              {project.title}
            </h1>
            <div className="p-4 w-3/6 bg-white rounded-lg shadow-md mb-8">
              <div className="flex justify-between border-b-2 pb-4 mb-4">
                <span className="text-gray-700 font-semibold">ID:</span>
                <span className="text-black">{project.projectId}</span>
              </div>
              <div className="flex justify-between  pb-2 ">
                <span className="text-gray-700 font-semibold">Industry:</span>
                <span className="text-black">{project.industryName}</span>
              </div>
            </div>

            <div className="text-lg">
              <h2 className="text-2xl font-bold mb-1 text-center text-black">
                Skills required
              </h2>
              <div className="flex flex-wrap mt-2">
                {project.skillsRequiredNames.map((skill, index) => (
                  <span
                    key={index}
                    className="m-1 bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
          <div className="bg-[#FDFDFD] w-full h-auto rounded-md mb-4 p-2">
            {project.description}
          </div>
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg border border-gray-400">
            <Image
              src={logo}
              alt="content-lock"
              width={30}
              height={30}
              className="text-gray-300 opacity-25"
            />
            <p className="text-lg mt-2 text-black">
              Sign in to view more and join the project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProject;
