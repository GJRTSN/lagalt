import axios from "axios";

export async function registerNewUser(registerUserData: object) {
  try {
    const response = await axios.post(
      "https://lagalt-case-1.azurewebsites.net/users/",
      registerUserData
    );
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(
        `Failed to register user: ${response.status}, ${JSON.stringify(
          response.data
        )}`
      );
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
