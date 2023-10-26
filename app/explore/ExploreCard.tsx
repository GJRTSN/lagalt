import { useUserContext } from "../contexts/userContext";
import { Project } from "@/app/types/ProjectTypes";
import Image from "next/image";
import Link from "next/link";

// Check if there is a match between user's skills and project's required skills.

function checkSkillMatch(
  userSkills: number[] = [],
  projectSkills: number[] = []
): boolean {
  return userSkills.some((skillId) => projectSkills.includes(skillId));
}

function getMatchingSkills(
  userSkills: string[] = [],
  projectSkillsNames: string[] = []
): string[] {
  return projectSkillsNames.filter((skillName) =>
    userSkills.includes(skillName)
  );
}

// ExploreCard component that displays project information.
export default function ExploreCard({ project }: { project: Project }) {
  const { user } = useUserContext();
  const skillMatch = checkSkillMatch(
    user?.skillIds ?? [],
    project.skillsRequiredIds
  );

  const matchingSkills = getMatchingSkills(
    user?.skillNames ?? [],
    project.skillsRequiredNames
  );

  return (
    <div
      className={`mt-8 w-4/5 h-auto p-4 flex text-black ${
        skillMatch
          ? "bg-gradient-to-r from-white via-green-200 to-green-200"
          : "bg-[#f3f3f3]"
      } rounded-lg shadow-lg`}
    >
      <div className="w-1/8 flex justify-center items-center">
        <img
          src={project.projectPicture}
          alt={`${project.title} image`}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
      <div className="w-4/5 flex flex-col ml-4">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <div className="flex flex-row items-start">
          <div className="w-1/3 flex flex-col items-start ml-4">
            <div>
              <strong>Status:</strong> {project.status}
            </div>
            <div>
              <strong>Industry:</strong> {project.industryName}
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start ml-4">
            <div>
              <strong>Skills required:</strong>
            </div>
            <div>
              {project.skillsRequiredNames.map((skillName, index) => (
                <>
                  <span
                    className={
                      matchingSkills.includes(skillName)
                        ? "font-bold text-green-400"
                        : ""
                    }
                  >
                    {skillName}
                  </span>
                  {index < project.skillsRequiredNames.length - 1 && (
                    <span>, </span>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="w-1/3 ml-4 flex items-center justify-end">
            <Link
              href={
                user
                  ? `/projects/${project.projectId}`
                  : `/explore/${project.projectId}`
              }
            >
              <button className="bg-green-500 text-white rounded px-4 py-1 hover:bg-green-700 transition duration-300">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
