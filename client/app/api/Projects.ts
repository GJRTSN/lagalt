export async function getAllProjects() {
  try {
    const response = await fetch(
      "https://lagalt-case-1.azurewebsites.net/projects/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

export async function getAllSkills() {
  try {
    const response = await fetch(
      "https://lagalt-case-1.azurewebsites.net/projects/skills/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const skills = await response.json();
    return skills;
  } catch (error) {
    console.error("Error fetching skills: ", error);
    return [];
  }
}

export async function getAllIndustries() {
  try {
    const response = await fetch(
      "https://lagalt-case-1.azurewebsites.net/projects/industries/"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const industries = await response.json();
    return industries;
  } catch (error) {
    console.error("Error fetching industries: ", error);
    return [];
  }
}
