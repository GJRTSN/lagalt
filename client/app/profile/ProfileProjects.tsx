import React from "react";
import { user } from "./dummyUserData";
import ProjectCard from "../explore/ProjectCard";

export default function ProfileProjects() {
  const currentlyWorkingProjects = [0];
  const completedProjects = [0];

  return (
    <div className="mt-8 mb-8 bg-gray-300 p-4 rounded-xl text-black">
      <div>
        <div>
          <h2 className="text-2xl">Currently Working On:</h2>
          {user.currentlyWorkingOn.length > 0 ? (
            <div className="mt-2 bg-white p-2 rounded">
              {user.currentlyWorkingOn.map((project, index) => (
                <a key={index} className="cursor-pointer text-lg">
                  {project.projectName}
                </a>
              ))}
            </div>
          ) : (
            <p className="italic mt-2 text-gray-500">
              {user.name} is not currently working on any projects
            </p>
          )}
        </div>

        <div className="mt-4 mb-4">
          <h2 className="text-2xl">Completed Projects:</h2>
          {user.completedProjects.length > 0 ? (
            <div className="mt-2 bg-white p-2 rounded">
              {user.completedProjects.map((project, index) => (
                <a key={index} className="cursor-pointer text-lg">
                  {project.projectName}
                </a>
              ))}
            </div>
          ) : (
            <p className="italic mt-2 text-gray-500">
              {user.name} has yet to complete a project
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
