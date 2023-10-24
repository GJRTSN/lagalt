import axios from "axios";

export async function deleteProject(projectId: number) {
  try {
    await axios.delete(
      `https://lagalt-case-1.azurewebsites.net/projects/${projectId}`
    );
    console.log("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting the project:", error);
  }
}
