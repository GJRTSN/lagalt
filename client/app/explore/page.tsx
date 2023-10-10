"use client";

import dummyData from "@/app/api/dummyData";
import ProjectCard from "@/app/components/ProjectCard";
import ToggleSwitch from "@/app/components/Toggle";

export default function Explore() {
  return (
    <div className="h-screen bg-white">
      <div className="w-full h-12 bg-yellow-500 flex flex-row items-center ">
        <input
          className="ml-4 h-8 w-96 px-4 rounded-lg"
          placeholder="Search for a project"
        ></input>
        <div
          id="switchContainer"
          className="flex flex-row w-full justify-center  text-black font-roboto font-bold"
        >
          <p>MUSIC</p>
          <ToggleSwitch />
          <p>FILM</p>
          <ToggleSwitch />
          <p>GRAPHIC DESIGN</p>
          <ToggleSwitch />
          <p>GAME DEVELOPMENT</p>
          <ToggleSwitch />
          <p>WEB DEVELOPMENT</p>
          <ToggleSwitch />
        </div>
      </div>
      <div className="w-full flex flex-col items-center ">
        {dummyData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
