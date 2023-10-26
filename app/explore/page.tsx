"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/project/get";
import { Project } from "@/app/types/ProjectTypes";
import { MoonLoader } from "react-spinners";
import ExploreCard from "@/app/explore/ExploreCard";
import Image from "next/image";
import bg from "@/public/team-laptops.jpg";

export default function Explore() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<number[]>([]);

  const industries = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Graphic Design" },
    { id: 3, name: "Game Development" },
    { id: 4, name: "Music" },
    { id: 5, name: "Film" },
  ];

  const handleIndustryToggle = (industryId: number) => {
    setSelectedIndustryIds((prevSelectedIndustryIds) =>
      prevSelectedIndustryIds.includes(industryId)
        ? prevSelectedIndustryIds.filter((id) => id !== industryId)
        : [...prevSelectedIndustryIds, industryId]
    );
  };

  //Function to filter projects by industry
  const filteredProjects = projects.filter((project) =>
    selectedIndustryIds.length
      ? selectedIndustryIds.includes(project.industryId)
      : true
  );

  useEffect(() => {
    const getProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  function IndustryFilter() {
    return (
      <div
        id="switchContainer"
        className="w-full h-full flex flex-row items-center justify-center gap-2 text-sm"
      >
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => handleIndustryToggle(industry.id)}
            className={`py-1 text-sm px-3 rounded-md transition-colors duration-300 ease-in-out cursor-pointer 
              ${
                selectedIndustryIds.includes(industry.id)
                  ? "bg-green-400 shadow-inner"
                  : "bg-gray-300 text-gray-600 hover:bg-gray-500 shadow-inner"
              }`}
          >
            {industry.name}
          </button>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="h-full min-h-screen bg-white pb-12">
        <div className="w-full h-16 bg-[#67864e] flex flex-row items-center justify-center ">
          <IndustryFilter />
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <MoonLoader color="#8cb669" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen flex flex-col  items-center bg-white pb-12">
      <div className="w-full h-16 bg-[#67864e] flex flex-row items-center justify-center ">
        <IndustryFilter />
      </div>

      <div
        className="w-screen h-96 relative flex justify-center mb-8"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 0.5) 75%, white 100%),
          url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=3870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    `,
          backgroundSize: "cover",
          backgroundPosition: "70% 60%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          id="welcome"
          className="w-1/2 h-36 bg-[#f3f3f3] bg-opacity-90 my-8 text-center rounded-lg p-4 pb-2 shadow-lg"
        >
          <h2 className="text-black text-4xl mb-4 font-black">
            Welcome to Lagalt!
          </h2>
          <p className="text-black font-medium text-xl">
            On this page you can find all available projects. Use the filter
            above to sort through the different industriees. If a project
            requries skills that you have setup, they will be highlighted{" "}
            <span className="text-green-400">green</span>.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center ">
        {filteredProjects.length ? (
          filteredProjects.map((project) => (
            <ExploreCard key={project.projectId} project={project} />
          ))
        ) : (
          <p className="text-black mt-8">No projects found.</p>
        )}
      </div>
    </div>
  );
}
