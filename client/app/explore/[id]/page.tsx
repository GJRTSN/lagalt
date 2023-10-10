"use client";

import { useParams } from "next/navigation";
import dummyData from "@/app/api/dummyData";
import Image from "next/image";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id;

  const project = dummyData.find((project) => project.id == id);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">
          Project with id {id} does not exist.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-12 bg-yellow-500 flex flex-row items-center ">
        {/* <input
          className="ml-4 h-8 w-96 px-4 rounded-lg"
          placeholder="Search for a project"
        ></input> */}
        <div
          id="switchContainer"
          className="flex flex-row w-full justify-center  text-black font-roboto font-bold"
        ></div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <Image
          src={project.logo}
          alt="Project Logo"
          className="w-32 h-32 object-contain  mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        <p className="text-lg mb-4">Project ID: {id}</p>
        <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <p className="font-bold">Owner:</p>
              <p>{project.owner}</p>
            </div>
            <div>
              <p className="font-bold">Industry:</p>
              <p>{project.industry}</p>
            </div>
            <div>
              <p className="font-bold">Status:</p>
              <p>{project.status}</p>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-bold">Skills Required:</p>
            <p>{project.skillsRequired.join(", ")}</p>
          </div>
          <div className="mb-2">
            <p className="font-bold">Views:</p>
            <p>{project.views}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
