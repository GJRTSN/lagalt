export async function getAllProjects() {
  const response = await fetch("http://localhost:8080/projects/");
  const projects = await response.json();
  console.log(projects);
  return projects;
}
