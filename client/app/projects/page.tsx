"use client";

import React, { useState, ReactNode, ChangeEvent } from "react";
import { useUserContext } from "../contexts/userContext";
import YourCollaborations from "./YourCollaborations";
import YourApplications from "./YourApplications";
import YourProjects from "./YourProjects";

type ToggleLabelProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
};

// ToggleLabel component to create toggle switches with labels
const ToggleLabel: React.FC<ToggleLabelProps> = ({
  checked,
  onChange,
  children,
}) => (
  <div className="flex items-center">
    <p className="text-sm text-[#FDFDFD]">{children}</p>
    <label
      className={`${
        checked ? "bg-green-400" : "bg-gray-400"
      } relative inline-block w-8 h-4 rounded-full border border-transparent transition-colors duration-300 ease-in-out cursor-pointer m-2`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`${
          checked ? "translate-x-4" : "translate-x-0"
        } inline-block w-3 h-3 transform bg-white rounded-full transition-transform duration-300 ease-in-out left-0.5 top-0.5 absolute`}
      ></span>
    </label>
  </div>
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
        id="switchContainer"
        className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center mb-4 "
      >
        <ToggleLabel
          checked={showAdminDash}
          onChange={() => setShowAdminDash(!showAdminDash)}
        >
          Admin
        </ToggleLabel>

        <ToggleLabel
          checked={showCollabs}
          onChange={() => setShowCollabs(!showCollabs)}
        >
          Collabs
        </ToggleLabel>

        <ToggleLabel
          checked={showApplications}
          onChange={() => setShowApplications(!showApplications)}
        >
          Applications
        </ToggleLabel>
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
