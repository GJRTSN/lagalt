import React, { useState, useEffect } from "react";

// Define an interface for the project
interface Project {
  title: string;
  status: string;
  // Add other fields as needed
}

export default function ProfileProjects() {
  const [currentlyWorkingProjects, setCurrentlyWorkingProjects] = useState<
    Project[]
  >([]);
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/projects/")
      .then((response) => response.json())
      .then((data: Project[]) => {
        const activeProjects = data.filter(
          (project) => project.status === "Active"
        );
        const finishedProjects = data.filter(
          (project) => project.status !== "Active"
        );

        setCurrentlyWorkingProjects(activeProjects);
        setCompletedProjects(finishedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="mt-8 mb-8 bg-gray-300 p-4 rounded-xl text-black">
      <div>
        <div>
          <h2 className="text-2xl">Currently Working On:</h2>
          {currentlyWorkingProjects.length > 0 ? (
            <div className="mt-2 bg-white p-2 rounded">
              {currentlyWorkingProjects.map((project, index) => (
                <li key={index} className="cursor-pointer text-lg">
                  {project.title}
                </li>
              ))}
            </div>
          ) : (
            <p className="italic mt-2 text-gray-500">
              Not currently working on any projects
            </p>
          )}
        </div>

        <div className="mt-4 mb-4">
          <h2 className="text-2xl">Completed Projects:</h2>
          {completedProjects.length > 0 ? (
            <div className="mt-2 bg-white p-2 rounded">
              {completedProjects.map((project, index) => (
                <li key={index} className="cursor-pointer text-lg">
                  {project.title}
                </li>
              ))}
            </div>
          ) : (
            <p className="italic mt-2 text-gray-500">No completed projects</p>
          )}
        </div>
      </div>
    </div>
  );
}
