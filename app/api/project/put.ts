import axios from "axios";

export async function withdrawApplication(projectId: number, userId: number) {
  const url = `https://lagalt-case-1.azurewebsites.net/projects/${projectId}`;

  try {
    const response = await axios.get(url);
    const project = response.data;

    const updatedWorkApplications = project.workApplications.filter(
      (application: Application) => application.userId !== userId
    );

    const updatedProject = {
      ...project,
      workApplications: updatedWorkApplications,
    };

    await axios.put(url, updatedProject);
  } catch (error) {
    console.error("Error withdrawing application:", error);
  }
}
