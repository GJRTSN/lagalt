"use client";
import Link from "next/link";
import { useState } from "react";

export default function Projects() {
  const [showAdminDash, setShowAdminDash] = useState(true);
  const [showCollabs, setShowCollabs] = useState(true);
  const [showApplications, setShowApplications] = useState(true);

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
        {showAdminDash && (
          <div
            id="admindash"
            className="w-3/4 h-full bg-[#CCCCCC] rounded-lg p-4 "
          >
            <div className="w-1/2 float-right">
              <Link href="/projects/create">
                <button className="w-auto h-8 bg-green-700 rounded-md px-2 float-right">
                  New project
                </button>
              </Link>
            </div>
            <div className="flex flex-col"></div>
            <h3 className="text-black text-4xl font-bold font-roboto ">
              Administrator Dashboard
            </h3>
            <p className="text-black font-roboto">
              Projects you own and administrate
            </p>

            <div className="w-full h-full bg-[#FDFDFD] rounded-lg p-2">
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
            </div>
          </div>
        )}
        {showCollabs && (
          <div
            id="collabs"
            className="w-3/4 h-1/4 m-4 bg-[#CCCCCC] rounded-lg p-4"
          >
            <h3 className="text-black text-4xl font-bold font-roboto">
              Current collaborations
            </h3>
            <p className="text-black font-roboto">
              Projects you currently are participating on
            </p>
            <div className="w-full h-full bg-[#FDFDFD] rounded-lg p-2">
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
            </div>
          </div>
        )}
        {showApplications && (
          <div
            id="applications"
            className="w-3/4 h-1/4 m-4 bg-[#CCCCCC] rounded-lg p-4"
          >
            <h3 className="text-black text-4xl font-bold font-roboto">
              Applications
            </h3>
            <p className="text-black font-roboto">
              Projects you have applied to join
            </p>
            <div className="w-full h-full bg-[#FDFDFD] rounded-lg p-2">
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
              <p className="text-black">ProjectName</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
