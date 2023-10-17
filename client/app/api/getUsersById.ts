export async function getUserById(userId: number) {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
    const user = await response.json();
    return user;
  }
  