import axios from "axios";
import { ProjectComment } from "@/app/types/ProjectTypes";

const baseURL = "https://lagalt-case-1.azurewebsites.net";
const apiClient = axios.create({ baseURL });

export const applyToProject = async (
  applicationText: string,
  projectId: number,
  userId: number
): Promise<void> => {
  const url = "/api/workapplications/";
  const data = {
    accepted: true,
    applicationId: 0,
    forName: "string",
    motivation: applicationText,
    projectId: projectId,
    userId: userId,
  };
  try {
    await apiClient.post(url, data);
  } catch (error) {
    console.error("Error applying to project:", error);
  }
};

export async function postComment(
  comment: string,
  projectId: number
): Promise<ProjectComment | null> {
  try {
    const response = await apiClient.post(
      `/api/comments/project/${projectId}`,
      {
        content: comment,
        projectId,
      }
    );
    const data: ProjectComment = response.data;

    if (!data || !data.id || !data.content) {
      console.error("Invalid response data", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error posting new comment: ", error);
    return null;
  }
}
