import axios from "axios";

export async function getUserData(userId: number) {
  try {
    const response = await axios.get(
      `https://lagalt-case-1.azurewebsites.net/users/${userId}`
    );
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
    const response = await fetch(
      `https://lagalt-case-1.azurewebsites.net/users/${userId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}: `, error);
    return null;
  }
}
