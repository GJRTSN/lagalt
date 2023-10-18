import { ProjectComment } from "./types";

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

export async function postComment(
  comment: string,
  projectId: number
): Promise<ProjectComment | null> {
  try {
    const response = await fetch(
      `https://lagalt-case-1.azurewebsites.net/api/comments/project/${projectId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment, projectId }), // assuming the API accepts a JSON body with these keys
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Assuming the server responds with the created comment object
    // that matches the ProjectComment structure.
    const data: ProjectComment = await response.json();

    // Optionally, verify the structure of the returned data
    if (!data || !data.id || !data.content) {
      console.error("Invalid response data", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error posting new comment: ", error);
    return null;
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
