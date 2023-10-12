"use client";

import { useState } from "react";
import dummyData, { Project } from "@/app/api/Projects";
import ProjectCard from "@/app/explore/ProjectCard";
import { industries } from "../api/ProjectData";

export default function Explore() {
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<number[]>([]);

  const filteredProjects = dummyData.filter((project) =>
    selectedIndustryIds.length
      ? selectedIndustryIds.includes(project.industry.id)
      : true
  );

  const handleIndustryToggle = (industryId: number) => {
    setSelectedIndustryIds((prevSelectedIndustryIds) =>
      prevSelectedIndustryIds.includes(industryId)
        ? prevSelectedIndustryIds.filter((id) => id !== industryId)
        : [...prevSelectedIndustryIds, industryId]
    );
  };

  return (
    <div className="h-full min-h-screen bg-white">
      <div className="w-full h-12 bg-yellow-500 flex flex-row items-center ">
        <input
          className="ml-4 h-8 w-96 px-4 rounded-lg z-10"
          placeholder="Search for a project"
        ></input>
        <div
          id="switchContainer"
          className="flex flex-row w-full justify-center text-black font-roboto font-bold"
        >
          {industries.map((industry) => (
            <div key={industry.id} className="flex items-center ml-4">
              <p>{industry.name}</p>
              <label
                htmlFor={`toggle-${industry.id}`}
                className={`${
                  selectedIndustryIds.includes(industry.id)
                    ? "bg-green-400"
                    : "bg-gray-400"
                } relative inline-block w-12 h-6 rounded-xl border border-transparent transition-colors duration-300 ease-in-out cursor-pointer`}
              >
                <input
                  type="checkbox"
                  id={`toggle-${industry.id}`}
                  className="sr-only"
                  checked={selectedIndustryIds.includes(industry.id)}
                  onChange={() => handleIndustryToggle(industry.id)}
                />
                <span
                  className={`${
                    selectedIndustryIds.includes(industry.id)
                      ? "translate-x-6"
                      : "translate-x-0"
                  } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
                ></span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center ">
        {filteredProjects.length ? (
          filteredProjects.map((project: Project, index: number) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <p className="text-black mt-8">No projects found.</p>
        )}
      </div>
    </div>
  );
}
