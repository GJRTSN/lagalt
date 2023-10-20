import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function acceptApplication(applicationId: number) {
  try {
    const response = await apiClient.post(
      `/api/workapplications/accept/${applicationId}`
    );
    // You might want to return some data or handle the response accordingly.
    return response.data; // or return true if you don't expect a response body
  } catch (error) {
    // Handle or throw error as needed
    console.error("There was a problem with the fetch operation:", error);
  }
}
