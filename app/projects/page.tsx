"use client";

import React, { useState, ReactNode } from "react";
import { useUserContext } from "../contexts/userContext";
import YourCollaborations from "./YourCollaborations";
import YourApplications from "./YourApplications";
import YourProjects from "./YourProjects";

type FilterButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

// FilterButton component to create a clickable filter button
const FilterButton: React.FC<FilterButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`py-1 px-3 m-2 text-sm rounded-md transition-colors duration-300 ease-in-out cursor-pointer 
      ${
        isActive
          ? "bg-green-500 border border-green-500 shadow-inner"
          : "bg-gray-400 hover:bg-gray-500"
      }`}
  >
    {children}
  </button>
);

export default function Projects() {
  const { user } = useUserContext();

  const [showAdminDash, setShowAdminDash] = useState(true);
  const [showCollabs, setShowCollabs] = useState(true);
  const [showApplications, setShowApplications] = useState(true);

  // If user data is not available, display a loading message
  if (!user || user.userId === undefined || user.userId === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <div
        id="filterContainer"
        className="w-full h-16 bg-[#67864e]  flex flex-row items-center justify-center mb-4 "
      >
        <FilterButton
          isActive={showAdminDash}
          onClick={() => setShowAdminDash(!showAdminDash)}
        >
          PROJECTS
        </FilterButton>

        <FilterButton
          isActive={showCollabs}
          onClick={() => setShowCollabs(!showCollabs)}
        >
          COLLABS
        </FilterButton>

        <FilterButton
          isActive={showApplications}
          onClick={() => setShowApplications(!showApplications)}
        >
          APPLICATIONS
        </FilterButton>
      </div>
      <div className="h-3/5 flex bg-white flex-col items-center justify-center">
        {showAdminDash && <YourProjects userId={user.userId as number} />}
        {showCollabs && <YourCollaborations userId={user.userId as number} />}
        {showApplications && (
          <YourApplications userId={user.userId as number} />
        )}
      </div>
    </div>
  );
}
