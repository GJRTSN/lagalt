"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/project/get";
import ExploreCard from "@/app/explore/ExploreCard";
import { ExploreProjectCard } from "@/app/types/ProjectTypes";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react"; // Assuming you're using NextAuth
import { getUserId } from "../api/user/route"; // Adjust the import path as needed


export default function Explore() {
  const { data: session } = useSession(); // Access the user's session
  const [userId, setUserId] = useState(null);

  const [projects, setProjects] = useState<ExploreProjectCard[]>([]);
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

  useEffect(() => {
    if (session) {
      // Inside this block, the user is logged in, and you have access to their session.
      const fetchUserId = async () => {
        const id = await getUserId(); // Call the getUserId function
        setUserId(id);
      };

      fetchUserId();

      console.log("User Session Token:", session); // Log the session object
    }
  }, [session]);
  

  function IndustryFilter() {
    return (
      <div
        id="switchContainer"
        className="w-full h-full flex flex-row items-center justify-center gap-2 text-sm"
      >
        {industries.map((industry) => (
          <div key={industry.id} className="flex items-center space-x-2">
            <span>{industry.name}</span>
            <label
              className={`${
                selectedIndustryIds.includes(industry.id)
                  ? "bg-green-400"
                  : "bg-gray-400"
              } relative inline-block w-8 h-4 rounded-full border border-transparent transition-colors duration-300 ease-in-out cursor-pointer`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedIndustryIds.includes(industry.id)}
                onChange={() => handleIndustryToggle(industry.id)}
              />
              <span
                className={`${
                  selectedIndustryIds.includes(industry.id)
                    ? "translate-x-4"
                    : "translate-x-0"
                } inline-block w-3 h-3 transform bg-white rounded-full transition-transform duration-300 ease-in-out left-0.5 top-0.5 absolute`}
              ></span>
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="h-full min-h-screen bg-white pb-12">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
          <IndustryFilter />
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <MoonLoader color="#8cb669" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-white pb-12">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
        <IndustryFilter />
      </div>
      <div className="w-full flex flex-col items-center ">
        {filteredProjects.length ? (
          filteredProjects.map((project, index) => (
            <ExploreCard key={index} project={project} />
          ))
        ) : (
          <p className="text-black mt-8">No projects found.</p>
        )}
      </div>
    </div>
  );
}
