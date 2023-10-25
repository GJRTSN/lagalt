import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";

const apiClient = axios.create({
  baseURL,
});

export async function getAllProjects() {
  try {
    const response = await apiClient.get("/projects/");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

export async function getAllSkills() {
  try {
    const response = await apiClient.get("/projects/skills/");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills: ", error);
    return [];
  }
}

export async function getAllIndustries() {
  try {
    const response = await apiClient.get("/projects/industries/");
    return response.data;
  } catch (error) {
    console.error("Error fetching industries: ", error);
    return [];
  }
}

export async function getProjectById(id: number) {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}: `, error);
    return null;
  }
}

export async function getProjectComments(id: number) {
  try {
    const response = await apiClient.get(`/api/comments/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments from project with ID ${id} `, error);
    return [];
  }
}

export async function getProjectsByUser(userId: number) {
  try {
    const response = await axios.get(
      `https://lagalt-case-1.azurewebsites.net/users/${userId}`
    );
    if (response.data) {
      return response.data.projects;
    } else {
      throw new Error("User not found or has no projects");
    }
  } catch (error) {
    console.error("Error fetching projects by user:", error);
    throw error;
  }
}
