"use client";

import { useParams } from "next/navigation";
import dummyData from "@/app/api/Projects";
import Image from "next/image";

export default function ProjectPage() {
  const params = useParams();
  const projectId = Number(params.id);

  const project = dummyData.find((project) => project.id === projectId);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">
          Project with id {projectId} does not exist.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-12 bg-yellow-500 flex flex-row items-center "></div>
      <div className="flex flex-col items-center mt-8">
        <Image
          src={project.logo}
          alt="Project Logo"
          className="w-32 h-32 object-contain  mb-4"
        />
        <h1 className="text-3xl font-bold mb-2 text-black">{project.name}</h1>
        <p className="text-lg mb-4 text-black">Project ID: {projectId}</p>
        <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <p className="font-bold">Owner:</p>
              <p>{project.owner}</p>
            </div>
            <div>
              <p className="font-bold">Industry:</p>
              <p>{project.industry.name}</p>
            </div>
            <div>
              <p className="font-bold">Status:</p>
              <p>{project.status.name}</p>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-bold">Skills Required:</p>
            <p>
              {project.skillsRequired.map((skill) => skill.name).join(", ")}
            </p>
          </div>
          <div className="mb-2">
            <p className="font-bold">Views:</p>
            <p>{project.viewCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
