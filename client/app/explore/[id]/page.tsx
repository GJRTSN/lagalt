"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/Projects";
import { useParams } from "next/navigation";
import { CreateProjectDTO } from "@/app/api/types";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/lock-solid.svg";

const ExploreProject: React.FC = () => {
  const [project, setProject] = useState<CreateProjectDTO | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const projectsData = await getAllProjects();
          const selectedProject = projectsData.find(
            (proj: CreateProjectDTO) => proj.projectId === Number(id)
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
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
          <p className="text-black">
            <strong className="text-black">
              YOU ARE CURRENTLY{" "}
              <span className="text-red-500 underline">VIEWING</span> A PROJECT
              AS{" "}
              <span className="text-purple-500 underline">
                NON-LOGGED IN VISITOR!
              </span>
            </strong>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <p className="text-black">Loading project...</p>;
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
        <p className="text-black">
          <strong className="text-black">
            YOU ARE CURRENTLY{" "}
            <span className="text-red-500 underline">VIEWING</span> A PROJECT AS{" "}
            <span className="text-purple-500 underline">
              NON-LOGGED IN VISITOR!
            </span>
          </strong>
        </p>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="w-2/4 bg-gray-100 p-4 text-black rounded-lg">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-bold mb-2 text-black">
              {project.title}
            </h1>
            <p className="text-lg text-black">
              <strong>Project ID:</strong> {project.projectId}
            </p>
            <p className="text-lg text-black mb-2">
              <strong>Industry:</strong> {project.industryName}
            </p>
            <div className="text-lg text-center">
              <h2 className="text-2xl font-bold mb-1 text-black">
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
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg border border-gray-400">
            <p className="text-lg mb-4 text-black">
              Please log in to view more details and apply to join
            </p>
            {/* <button
              type="button"
              disabled
              className="text-center w-1/4 bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
            >
              View all details
            </button> */}
            <Image
              src={logo}
              alt="content-lock"
              width={30}
              height={30}
              className="text-gray-300 opacity-25"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProject;
