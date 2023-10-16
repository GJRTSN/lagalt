export async function getAllProjects() {
  const response = await fetch(
    "https://lagalt-case-1.azurewebsites.net/projects/"
  );
  const projects = await response.json();

  return projects;
}
