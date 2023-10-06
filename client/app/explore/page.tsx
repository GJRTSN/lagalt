import ProjectCard from "../components/ProjectCard";

export default function Explore() {
  return (
    <div className="h-screen bg-white">
      <div className="w-full h-12 bg-yellow-500 flex flex-row items-center ">
        <input
          className="ml-4 h-8 w-96 px-4 rounded-lg"
          placeholder="Search for a project"
        ></input>
      </div>
      <div className="w-full  flex flex-col items-center ">
        <ProjectCard />
      </div>
    </div>
  );
}
