"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/getProjects";
import ProjectCard from "@/app/explore/ProjectCard";

export default function Explore() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromApi = await getAllProjects();
      setProjects(projectsFromApi);
    };
    getProjects();
  }, []);

  return (
    <div className="h-full min-h-screen bg-white pb-12">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
        <p className="text-center text-black">
          Filtration by industry will be added here
        </p>
      </div>
      <div className="w-full flex flex-col items-center ">
        {projects.length ? (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <p className="text-black mt-8">No projects found.</p>
        )}
      </div>
    </div>
  );
}
