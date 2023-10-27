import { RegisterUserData } from "@/app/types/UserTypes";
import axios from "axios";

export async function registerNewUser(registerUserData: RegisterUserData) {
  try {
    const response = await axios.post(
      "https://lagalt-case-1.azurewebsites.net/users",
      registerUserData
    );

    if (response.status === 200 || response.status === 201) {
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
    throw new Error(`Error: ${(error as Error).message}`);
  }
}
