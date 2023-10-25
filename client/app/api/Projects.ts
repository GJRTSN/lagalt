import axios from "axios";
import { ProjectComment } from "../types/ProjectTypes";

export async function getAllProjects() {
  try {
    const response = await fetch(
      "https://lagalt-case-1.azurewebsites.net/projects/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

export async function getProjectById(id: number) {
  try {
    const response = await fetch(
      `https://lagalt-case-1.azurewebsites.net/projects/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const project = await response.json();
    return project;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}: `, error);
    return null;
  }
}

export async function getProjectComments(id: number) {
  try {
    const response = await fetch(
      `https://lagalt-case-1.azurewebsites.net/api/comments/project/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error(`Error fetching comments from project with ID ${id} `, error);
    return [];
  }
}

export async function getAllSkills() {
  try {
    const response = await fetch(
      "https://lagalt-case-1.azurewebsites.net/projects/skills/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const skills = await response.json();
    return skills;
  } catch (error) {
    console.error("Error fetching skills: ", error);
    return [];
  }
}

export async function getAllIndustries() {
  try {
    const response = await fetch(
      "https://lagalt-case-1.azurewebsites.net/projects/industries/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const industries = await response.json();
    return industries;
  } catch (error) {
    console.error("Error fetching industries: ", error);
    return [];
  }
}

export const applyToProject = async (
  applicationText: string,
  projectId: number,
  userId: number
): Promise<void> => {
  const url = "https://lagalt-case-1.azurewebsites.net/api/workapplications/";
  const data = {
    accepted: true,
    applicationId: 0,
    forName: "string",
    motivation: applicationText,
    projectId: projectId,
    userId: userId,
  };
  console.log(data);
  try {
    await axios.post(url, data);
  } catch (error) {
    console.error("Error applying to project:", error);
  }
};
