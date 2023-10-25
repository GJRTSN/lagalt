import axios from "axios";

export const declineApplication = async (applicationId: number) => {
  const url = `https://lagalt-case-1.azurewebsites.net/api/workapplications/${applicationId}`;
  const body = {
    accepted: false,
    applicationId,
  };
  try {
    const response = await axios.put(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
