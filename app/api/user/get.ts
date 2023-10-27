import axios from "axios";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export async function getUserData(userId: number) {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    const data = response.data;

    const existingSkills = data.skillIds.map(
      (id: number, index: string | number) => ({
        id,
        name: data.skillNames[index],
      })
    );

    return {
      profilePicture: data.profilePicture,
      userData: data,
      isProfileVisible: data.profileVisible,
      existingSkills: existingSkills,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getUserById(userId: number) {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    if (response.status !== 200 && response.status !== 204) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = response.data;
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}: `, error);
    return null;
  }
}
