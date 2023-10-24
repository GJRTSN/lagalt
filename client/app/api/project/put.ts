import axios from "axios";

export async function withdrawApplication(projectId, userId) {
  const url = `https://lagalt-case-1.azurewebsites.net/projects/${projectId}`;

  try {
    // Get the current project data
    const response = await axios.get(url);
    const project = response.data;

    // Filter out the user's application from the workApplications array
    const updatedWorkApplications = project.workApplications.filter(
      (application) => application.userId !== userId
    );

    // Prepare the updated project data
    const updatedProject = {
      ...project,
      workApplications: updatedWorkApplications,
    };

    // Send the updated project data via a PUT request
    await axios.put(url, updatedProject);
  } catch (error) {
    console.error("Error withdrawing application:", error);
  }
}
