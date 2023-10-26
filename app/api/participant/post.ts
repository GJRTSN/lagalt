import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function acceptApplication(applicationId: number) {
  try {
    const response = await apiClient.post(
      `/api/workapplications/accept/${applicationId}`
    );

    if (response.data && Object.keys(response.data).length !== 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
