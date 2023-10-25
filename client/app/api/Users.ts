import { User } from "../types/UserTypes";

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

// api/Users.ts or wherever you're keeping your API functions
export async function updateUserById(userId: number, updatedData: User) {
  const response = await fetch(
    `https://lagalt-case-1.azurewebsites.net/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to update user");
  }
}
