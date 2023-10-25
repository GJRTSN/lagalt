import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function removeParticipant(id: number, userId: number) {
  try {
    const response = await apiClient.delete(
      `/projects/projects/${id}/participants/${userId}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
