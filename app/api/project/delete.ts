import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function deleteProject(projectId: number) {
  try {
    await apiClient.delete(`/projects/${projectId}`);
    console.log("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting the project:", error);
  }
}

export async function deleteApplication(applicationId: number) {
  try {
    const response = await apiClient.delete(
      `/api/workapplications/${applicationId}`
    );
    if (response.status === 200 || response.status === 204) {
      console.log("Application deletion successful.");
      return true;
    } else {
      console.error(
        "Failed to delete application:",
        response.status,
        response.statusText
      );
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function removeParticipant(id: number, userId: number) {
  try {
    const response = await apiClient.delete(
      `/projects/projects/${id}/participants/${userId}`
    );

    if (response.status !== 200 && response.status !== 204) {
      throw new Error("Participant removal failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
