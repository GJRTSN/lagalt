"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/getProjects";

export default function ProjectPage() {
  const params = useParams();
  const id = Number(params.id);

  const [project, setProject] = useState<Project | null>(null);

  interface Project {
    projectId: number;
    title: string;
    description: string;
    status: string;
    ownerUserId: number;
    ownerName: string;
    industry: string | null;
    skillsRequired: string[];
  }

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromApi = await getAllProjects();
      const matchedProject = projectsFromApi.find(
        (proj: Project) => proj.projectId === id
      );

      setProject(matchedProject || null);
    };

    getProjects();
  }, [id]);

  console.log(project);

  if (!project) {
    return (
      <div className="h-full min-h-screen bg-white">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center "></div>
        <div className="flex flex-col items-center mt-8 p-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-400">
            Loading project ...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center "></div>
      <div className="flex flex-col items-center mt-8 p-4">
        <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-black">
            {project.title}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Project ID:</p>
              <p>{project.projectId}</p>
            </div>

            <div>
              <p className="font-bold">Owner:</p>
              <p>{project.ownerName}</p>
            </div>
            <div>
              <p className="font-bold">Industry:</p>
              <p>{project.industry || "Not specified"}</p>
            </div>
            <div>
              <p className="font-bold">Status:</p>
              <p>{project.status}</p>
            </div>
            <div>
              <p className="font-bold">Skills Required:</p>
              <p>
                {project.skillsRequired.length
                  ? project.skillsRequired.join(", ")
                  : "Not specified"}
              </p>
            </div>
            <div className="w-3/4 mt-4">
              <p className="font-bold">Description:</p>
              <p className="text-black text-lg">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
