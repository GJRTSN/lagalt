"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/Projects";
import { useParams } from "next/navigation";
import { CreateProjectDTO } from "@/app/api/types";

const EditProject: React.FC = () => {
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
            YOU ARE CURRENTLY <strong className="text-red-500">EDITING</strong>{" "}
            A PROJECT!
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
          YOU ARE CURRENTLY <strong className="text-red-500">EDITING</strong> A
          PROJECT!
        </p>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg">
          <h1 className="text-3xl font-bold mb-2 text-black">
            {project.title}
          </h1>
          <p className="text-lg mb-4 text-black">
            <strong>Project ID:</strong> {project.projectId}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Industry:</strong> {project.industryName}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Skills required:</strong>{" "}
            {project.skillsRequiredNames.map((skill, index) => (
              <span key={index}>
                {skill}
                {index < project.skillsRequiredNames.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Description:</strong> {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
