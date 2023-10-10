import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    owner: string;
    industry: string;
    skillsRequired: string[];
    status: string;
    viewCount: number;
    logo: StaticImageData;
    viewIcon: StaticImageData;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="mt-8 w-4/5 h-32 bg-[#CCCCCC] rounded-lg flex flex-row shadow-lg p-4 ">
      <Image
        src={project.logo}
        className="mr-4"
        alt="project-owner-logo"
        height={100}
        width={100}
        style={{ objectFit: "contain" }}
      />
      <div id="projectdata1" className="flex flex-col text-black">
        <p className="font-roboto text-2xl">{project.name}</p>
        <div className="flex flex-row gap-1">
          <p className="font-black">ID:</p>
          <p>{project.id}</p>
        </div>
        <div className="flex flex-row gap-1">
          <Image
            src={project.viewIcon}
            className="mt-2"
            alt="view-icon"
            width={15}
            style={{ objectFit: "contain" }}
          />
          <p className="text-black">{project.viewCount}</p>
        </div>
      </div>
      <div id="projectdata2" className="flex flex-col text-black ml-4">
        <div className="flex flex-row gap-1">
          <p className="font-black">Owner:</p>
          <p>{project.owner}</p>
        </div>
        <div className="flex flex-row gap-1">
          <p className="font-black">Industry:</p>
          <p>{project.industry}</p>
        </div>
      </div>
      <div id="projectdata3" className="flex flex-col text-black ml-4">
        <div className="flex flex-row gap-1">
          <p className="font-black">Skills Required:</p>
          <p>{project.skillsRequired.join(", ")}</p>
        </div>
        <div className="flex flex-row gap-1">
          <p className="font-black">Status:</p>
          <p>{project.status}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <Link href={`/explore/${project.id}`}>
          <p className="bg-green-500 text-white rounded px-4 py-2">View</p>
        </Link>
      </div>
    </div>
  );
}
