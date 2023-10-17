export async function getUserById(userId: number) {
    const response = await fetch(`https://lagalt-case-1.azurewebsites.net/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
    const user = await response.json();
    return user;
  }
  