"use client";

import React, { useEffect, useState } from "react";
import { Project, getProjects } from "@/app/api/Projects";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProjectAdmin: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
  const id = params.id;

  console.log(project);

  useEffect(() => {
    if (id) {
      const projectsData = getProjects();
      const selectedProject = projectsData.find(
        (proj: Project) => proj.id === id
      );
      setProject(selectedProject || null);
    }
  }, [id]);

  if (!project) {
    return <div>Loading project ...</div>;
  }

  console.log(project);

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-12 bg-[#8cb669] flex flex-row items-center "></div>
      <div className="flex flex-col items-center mt-8">
        <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg">
          <Image
            src={project.logo || "/default-image.jpg"}
            alt="Project Logo"
            width={100}
            height={100}
            className="w-32 h-32 object-contain mb-4"
          />
          <h1 className="text-3xl font-bold mb-2 text-black">{project.name}</h1>
          <p className="text-lg mb-4 text-black">
            <strong>Project ID:</strong> {project.id}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Industry:</strong> {project.industry.name}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Skills required:</strong>{" "}
            {project.skillsRequired.map((skill, index) => (
              <span key={index}>
                {skill.name}
                {index < project.skillsRequired.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectAdmin;
