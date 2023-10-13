"use client";

import { useState } from "react";
import AdminProject from "./AdminProject";
import Collaborations from "./Collaborations";
import Applications from "./Applications";

const ToggleLabel = ({ checked, onChange, children }) => (
  <div className="flex items-center">
    <p className="font-roboto font-semibold text-[#FDFDFD]">{children}</p>
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
  const [showAdminDash, setShowAdminDash] = useState(true);
  const [showCollabs, setShowCollabs] = useState(true);
  const [showApplications, setShowApplications] = useState(true);

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
        {showAdminDash && <AdminProject />}
        {showCollabs && <Collaborations />}
        {showApplications && <Applications />}
      </div>
    </div>
  );
}
