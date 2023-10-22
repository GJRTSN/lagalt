import { RegisterUserData } from "@/app/types/UserTypes";
import axios from "axios";

export async function registerNewUser(registerUserData: RegisterUserData) {
  try {
    const response = await axios.post(
      "https://localhost:8080/users",
      registerUserData
    );
    if (response.status === 200 || 201) {
      console.log(registerUserData);
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
