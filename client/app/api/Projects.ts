import logo from "@/public/noroff.png";
import { Skill } from "./ProjectData";
import { Industry } from "./ProjectData";
import { Status } from "./ProjectData";

export interface User {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  owner: string;
  industry: Industry;
  skillsRequired: Skill[];
  status: Status;
  participants: User[];
  viewCount: number;
  logo: string;
}

export const addNewProject = (newProject: Project) => {
  // Fetch existing projects from local storage or set an empty array if none exist
  const currentProjects = JSON.parse(localStorage.getItem("projects") || "[]");

  // Add the new project to the array
  currentProjects.push(newProject);

  // Save the updated project list back to local storage
  localStorage.setItem("projects", JSON.stringify(currentProjects));
};

let dummyData: Project[] = [
  {
    id: 9001,
    name: "JAVA CONSOLE GAME",
    owner: "Owner 1",
    industry: { id: 1, name: "Web Development" },
    skillsRequired: [
      { id: 1, name: "Java" },
      { id: 2, name: "Spring Boot" },
      { id: 3, name: "Hibernate" },
    ],
    status: { id: 1, name: "Not started" },
    participants: [
      { id: 1, name: "Jostein Gjertsen" },
      { id: 2, name: "Michal Pajestka" },
    ],
    viewCount: 4873,
    logo: "/client/public/noroff.png",
  },
];

export default dummyData;

export const getProjects = () => {
  // Try to fetch projects from local storage
  const storedProjects = localStorage.getItem("projects");

  if (!storedProjects) {
    // If no projects are stored, return an empty array or default value
    return [];
  }

  // Parse the stored JSON string and return the projects
  return JSON.parse(storedProjects);
};
