import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProfileProjects() {
  const currentlyWorkingProjects = [0];
  const completedProjects = [0];

  return (
    <div className="mt-8 mb-8">
      <div className="bg-white text-black">
        <div>
          <h2 className="text-2xl">Currently Working On:</h2>
          {currentlyWorkingProjects.length === 0  ? (
            <ul>
              {currentlyWorkingProjects.map((project, index) => (
                <li key={index} className="list-disc ml-4">
                  {project}
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic mt-2 text-gray-500">Name is not currently working on any projects</p>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-2xl">Completed Projects:</h2>
          {completedProjects.length === 0 ? (
            <ul>
              {completedProjects.map((project, index) => (
                <li key={index} className="list-disc ml-4">
                  {project}
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic mt-2 text-gray-500">Name has yet to complete a project</p>
          )}
        </div>
      </div>
    </div>
  );
}
