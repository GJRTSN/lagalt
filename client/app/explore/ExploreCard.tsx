import Link from "next/link";
import { ExploreProjectCard } from "@/app/types/ProjectTypes";

export default function ExploreCard({ project }: ExploreProjectCard) {
  return (
    <div className="mt-8 w-4/5 h-auto bg-gray-200 rounded-lg shadow-lg p-4 flex flex-col text-black">
      <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
      <div className="flex flex-row items-start">
        <div className="w-1/4 flex flex-col items-start ml-4">
          <div>
            <strong>ID:</strong> {project.projectId}
          </div>
          <div>
            <strong>Owner:</strong> {project.ownerName}
          </div>
        </div>
        <div className="w-2/4 flex flex-col items-start ml-4">
          <div>
            <strong>Status:</strong> {project.status}
          </div>
          <div>
            <strong>Industry:</strong> {project.industryName}
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-start ml-4">
          <div>
            <strong>Skills required:</strong>
          </div>
          <div>{project.skillsRequiredNames.join(", ")}</div>
        </div>
        <div className="w-1/4 ml-4 flex items-center justify-end">
          <Link href={`/explore/${project.projectId}`}>
            <button className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-700 transition duration-300">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
