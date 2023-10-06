import Image from "next/image";
import logo from "@/public/noroff.png";
import viewicon from "@/public/eye-solid.svg";

export default function ProjectCard() {
  return (
    <div className="mt-8 w-4/5 h-32 bg-[#CCCCCC] rounded-lg flex flex-row shadow-lg p-4 ">
      <div className="flex flex-col justify-center items-center ">
        <p className="text-black font-black">ID:</p>
        <p className="text-black">9001</p>
        <Image
          src={viewicon}
          className="mt-2"
          alt="project-owner-logo"
          width={20}
          style={{ objectFit: "contain" }}
        />
        <p className="text-black">4873</p>
      </div>
      <Image
        src={logo}
        className="mr-4"
        alt="project-owner-logo"
        width={100}
        style={{ objectFit: "contain" }}
      />
      <div id="projectdata1" className="flex flex-col text-black">
        <p className="font-roboto text-2xl">PROJECT NAME</p>
        <div className="flex flex-row gap-1">
          <p className="font-black">Owner:</p>
          <p>PROJECT OWNER</p>
        </div>
        <div className="flex flex-row gap-1">
          <p className="font-black">Industry:</p>
          <p>Web Development</p>
        </div>
      </div>
    </div>
  );
}
