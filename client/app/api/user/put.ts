import { User } from "@/app/types/UserTypes";

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
