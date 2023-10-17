import { useEffect, useState } from "react";

interface User {
  // Add other properties of the user as needed
  skills: Set<string>;
}

// Since Skill is a string enum in backend, we can directly use a Set<string> for skills

interface Skill {
  id: number;
  name: string;
  // Add other properties of skill as needed
}

export default function ProfileSkills() {
  const [user, setUser] = useState<User>({ skills: new Set<string>() });

  useEffect(() => {
    // Replace {id} with the user ID you want to fetch
    fetch("http://localhost:8080/users/2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div id="skills" className="mt-8 text-black bg-gray-300 p-4 rounded-xl">
      <h2 className="text-2xl">Skills</h2>
      <div className="flex flex-wrap mt-2 mb-2">
        {Array.from(user.skills).map((skill, index) => (
          <span
            key={index}
            className="bg-blue-300 text-blue-900 px-2 py-1 rounded mr-2"
          >
            {skill} {/* directly display skill, since it's a string */}
          </span>
        ))}
      </div>
    </div>
  );
}
