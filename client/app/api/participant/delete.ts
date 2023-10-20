import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function removeParticipant(id: number, userId: number) {
  try {
    const response = await apiClient.delete(
      `/projects/projects/${id}/participants/${userId}`
    );
    // Handle response accordingly.
    // Maybe set state to remove the participant from the local list after successful deletion,
    // or refetch the participants list to have the latest data.
  } catch (error) {
    // Handle error accordingly
    console.error("Error:", error);
  }
}
