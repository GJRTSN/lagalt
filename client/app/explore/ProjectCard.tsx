import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    projectId: number;
    title: string;
    description: string;
    status: string;
    ownerUserId: number;
    ownerName: string;
    industry: string;
    skillsRequired: string[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
            <strong>Industry:</strong> {project.industry}
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-start ml-4">
          <div>
            <strong>Skills required:</strong>
          </div>
          <div>{project.skillsRequired.join(", ")}</div>
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