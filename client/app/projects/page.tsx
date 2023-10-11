"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminProject from "../components/AdminProject";
import { Project, getProjects } from "../api/Projects";
import Collaborations from "../components/Collaborations";
import Applications from "../components/Applications";

export default function Projects() {
  const [showAdminDash, setShowAdminDash] = useState(true);
  const [showCollabs, setShowCollabs] = useState(true);
  const [showApplications, setShowApplications] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projectsData = getProjects();
    setProjects(projectsData);
  }, []);

  return (
    <div className="h-full min-h-screen bg-white">
      <div
        id="switchContainer"
        className="w-full h-12 bg-yellow-500 flex flex-row items-center justify-center mb-4 "
      >
        <p className="font-roboto font-semibold text-[#FDFDFD]">Admin</p>
        <label
          className={`${
            showAdminDash ? "bg-green-400" : "bg-gray-400"
          } relative inline-block w-12 h-6 rounded-xl border border-transparent transition-colors duration-300 ease-in-out cursor-pointer m-2`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={showAdminDash}
            onChange={() => setShowAdminDash(!showAdminDash)}
          />
          <span
            className={`${
              showAdminDash ? "translate-x-6" : "translate-x-0"
            } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
        </label>
        <p className="font-roboto font-semibold text-[#FDFDFD]">Collabs</p>
        <label
          className={`${
            showCollabs ? "bg-green-400" : "bg-gray-400"
          } relative inline-block w-12 h-6 rounded-xl border border-transparent transition-colors duration-300 ease-in-out cursor-pointer m-2`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={showCollabs}
            onChange={() => setShowCollabs(!showCollabs)}
          />
          <span
            className={`${
              showCollabs ? "translate-x-6" : "translate-x-0"
            } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
        </label>
        <p className="font-roboto font-semibold text-[#FDFDFD]">Applications</p>
        <label
          className={`${
            showApplications ? "bg-green-400" : "bg-gray-400"
          } relative inline-block w-12 h-6 rounded-xl border border-transparent transition-colors duration-300 ease-in-out cursor-pointer m-2`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={showApplications}
            onChange={() => setShowApplications(!showApplications)}
          />
          <span
            className={`${
              showApplications ? "translate-x-6" : "translate-x-0"
            } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
        </label>
      </div>
      <div className="h-3/5 flex bg-white flex-col items-center justify-center">
        {showAdminDash && <AdminProject />}
        {showCollabs && <Collaborations />}
        {showApplications && <Applications />}
      </div>
    </div>
  );
}
