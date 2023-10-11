import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    owner: string;
    industry: { id: number; name: string };
    skillsRequired: { id: number; name: string }[];
    status: string;
    viewCount: number;
    logo: StaticImageData;
    viewIcon: StaticImageData;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="mt-8 w-4/5 h-auto bg-[#CCCCCC] rounded-lg flex flex-row shadow-lg p-4 ">
      <Image
        src={project.logo}
        className="mr-4"
        alt="project-owner-logo"
        height={50}
        width={50}
        style={{ objectFit: "contain" }}
      />
      <div className="flex-grow flex flex-col text-black">
        <p className="font-roboto text-2xl mb-2">{project.name}</p>
        <div className="flex flex-row">
          <div id="projectdata1" className="flex flex-col w-2/8">
            <div className="flex flex-row gap-1 mb-1">
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
          <div id="projectdata2" className="flex flex-col ml-4 w-1/3">
            <div className="flex flex-row gap-1 mb-1">
              <p className="font-black">Industry:</p>
              <p>{project.industry.name}</p>
            </div>
            <div className="flex flex-row gap-1">
              <p className="font-black">Status:</p>
              <p>{project.status}</p>
            </div>
          </div>
          <div id="projectdata3" className="flex flex-col ml-4 w-3/4">
            <div className="flex flex-row gap-1">
              <p className="font-black">Skills Required:</p>
              <p>
                {project.skillsRequired.map((skill) => skill.name).join(", ")}
              </p>
            </div>
          </div>
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
