import axios from "axios";
import { User } from "@/app/types/UserTypes";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function updateUserById(userId: number, updatedData: User) {
  try {
    const response = await apiClient.put(`/users/${userId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200 && response.status !== 204) {
      throw new Error("Failed to update user");
    }

    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}: `, error);
    throw error;
  }
}
