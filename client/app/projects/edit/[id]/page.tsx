"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Industry, Skill, CreateProjectDTO } from "@/app/api/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  getAllIndustries,
  getAllProjects,
  getAllSkills,
} from "@/app/api/Projects";

export default function CreateProject() {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [newProjectId, setNewProjectId] = useState<number | null>(null);
  const [project, setProject] = useState<CreateProjectDTO | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const projectsData = await getAllProjects();
          const selectedProject = projectsData.find(
            (proj: CreateProjectDTO) => proj.projectId === Number(id)
          );
          if (selectedProject) {
            setProject(selectedProject);

            // Populate selectedSkills with the project's existing skills
            const existingSkills = selectedProject.skillsRequiredIds.map(
              (skillId) => {
                return (
                  skills.find((skill) => skill.id === skillId) || {
                    id: skillId,
                    name: "",
                  }
                ); // or however you'd like to handle skills not found
              }
            );
            setSelectedSkills(existingSkills);
          } else {
            setProject(null);
          }
        } catch (error) {
          console.error("There was an error fetching the projects", error);
        }
      }
    };

    fetchProject();
  }, [id, skills]);

  //   const initialFormState: CreateProjectDTO = {
  //     description: project.description,
  //     industryId: 0,
  //     industryName: "",
  //     ownerName: "HARDCODE",
  //     ownerUserId: 3,
  //     projectId: 0,
  //     skillsRequiredIds: [],
  //     skillsRequiredNames: [],
  //     status: "",
  //     title: "",
  //   };

  //   const [formData, setFormData] = useState<CreateProjectDTO>(initialFormState);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skills = await getAllSkills();
        setSkills(skills);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };

    const getLastProjectId = async () => {
      try {
        const projects = await getAllProjects();
        if (projects.length) {
          const maxProjectId = Math.max(
            ...projects.map((p: CreateProjectDTO) => p.projectId)
          );
          setNewProjectId(maxProjectId + 1);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    const getIndustries = async () => {
      try {
        const fetchedIndustries = await getAllIndustries();
        setIndustries(fetchedIndustries);
      } catch (error) {
        console.error("Failed to fetch industries", error);
      }
    };

    getSkills();
    getLastProjectId();
    getIndustries();
  }, []);

  useEffect(() => {
    if (typeof newProjectId === "number") {
      setFormData((prev) => ({
        ...prev,
        projectId: newProjectId,
      }));
    }
  }, [newProjectId]);

  useEffect(() => {
    if (searchTerm) {
      const results = skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSkills(results);
    } else {
      setFilteredSkills([]);
    }
  }, [searchTerm, skills]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      skillsRequiredIds: selectedSkills.map((skill) => skill.id),
      skillsRequiredNames: selectedSkills.map((skill) => skill.name),
    }));
  }, [selectedSkills]);

  const handleIndustryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndustry = industries.find(
      (industry) => industry.id === Number(event.target.value)
    );

    if (selectedIndustry) {
      setFormData((prev) => ({
        ...prev,
        industryId: selectedIndustry.id,
        industryName: selectedIndustry.name,
      }));
    }
  };

  const addSkill = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchTerm("");
      setFilteredSkills([]);
    }
  };

  const removeSkill = (id: number) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== id));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://lagalt-case-1.azurewebsites.net/projects/${id}`,

        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Project updated successfully!");
        router.push("/projects");
      }
    } catch (error) {
      console.error("There was an error updating the project!", error);
      console.log(formData);
    }
  };

  if (!project) {
    return (
      <div className="h-full min-h-screen bg-white pb-12">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
          <p className="text-black">
            YOU ARE CURRENTLY <strong className="text-red-500">EDITING</strong>{" "}
            A PROJECT!
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <p className="text-black">Loading project...</p>;
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <div
        id=""
        className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center mb-4"
      >
        <div className="flex flex-row w-3/4 items-center justify-center">
          <p className="text-black">
            YOU ARE CURRENTLY <strong className="text-red-500">EDITING</strong>{" "}
            PROJECT WITH ID
          </p>
          <div className=" w-auto bg-yellow-500 rounded-md py-1 px-3 mx-2">
            {project.projectId}
          </div>
        </div>
      </div>

      <div className="h-3/5 flex bg-white flex-col items-center justify-center">
        <div
          id="admindash"
          className="w-3/4 h-full bg-[#CCCCCC] rounded-lg p-4 "
        >
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={project.title}
                className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Industry
                </label>
                <select
                  id="industry"
                  name="industryId"
                  placeholder={project.industryName}
                  onChange={handleIndustryChange}
                  value={formData.industryId}
                  className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {industries.map((industry) => (
                    <option
                      key={industry.id}
                      value={industry.id}
                      className="text-black"
                    >
                      {industry.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="skillSearch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <input
                  type="text"
                  id="skillSearch"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder=""
                  className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ul>
                  {filteredSkills.map((skill) => (
                    <li
                      key={skill.id}
                      onClick={() => addSkill(skill)}
                      className="text-black"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row">
                <ul className="flex flex-row">
                  {selectedSkills.map((skill) => (
                    <span key={skill.id} className="flex flex-row text-sm">
                      <div className="flex flex-row w-auto h-auto bg-gray-500 m-1 rounded-md p-1 gap-2 ">
                        <p>{skill.name}</p>
                        <button
                          className="bg-[#f36161] rounded-md px-2 text-sm"
                          onClick={() => removeSkill(skill.id)}
                        >
                          X
                        </button>
                      </div>
                    </span>
                  ))}
                </ul>
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  placeholder={project.status}
                  className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    value={formData.description}
                    placeholder={project.description}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-center w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </form>
          </div>

          <div className="w-1/2 float-right">
            <Link href="/projects">
              <button
                type="button"
                className="w-auto h-8 bg-gray-700 rounded-md px-2 m-1 float-right"
              >
                Discard
              </button>
            </Link>
            {/* <button
              type="submit"
              className="w-auto h-8 bg-green-700 rounded-md px-2 m-1 float-right"
            >
              Create
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// ("use client");

// import React, { useEffect, useState } from "react";
// import { getAllProjects } from "@/app/api/Projects";
// import { useParams } from "next/navigation";
// import { CreateProjectDTO } from "@/app/api/types";

// const EditProject: React.FC = () => {
//   const [project, setProject] = useState<CreateProjectDTO | null>(null);
//   const params = useParams();
//   const id = params.id;

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (id) {
//         try {
//           const projectsData = await getAllProjects();
//           const selectedProject = projectsData.find(
//             (proj: CreateProjectDTO) => proj.projectId === Number(id)
//           );
//           setProject(selectedProject || null);
//         } catch (error) {
//           console.error("There was an error fetching the projects", error);
//         }
//       }
//     };

//     fetchProject();
//   }, [id]);

//   if (!project) {
//     return (
//       <div className="h-full min-h-screen bg-white pb-12">
//         <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
//           <p className="text-black">
//             YOU ARE CURRENTLY <strong className="text-red-500">EDITING</strong>{" "}
//             A PROJECT!
//           </p>
//         </div>
//         <div className="flex flex-col justify-center items-center mt-8">
//           <p className="text-black">Loading project...</p>;
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen bg-white">
//       <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
//         <p className="text-black">
//           YOU ARE CURRENTLY <strong className="text-red-500">EDITING</strong> A
//           PROJECT!
//         </p>
//       </div>
//       <div className="flex flex-col items-center mt-8">
//         <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg">
//           <h1 className="text-3xl font-bold mb-2 text-black">
//             {project.title}
//           </h1>
//           <p className="text-lg mb-4 text-black">
//             <strong>Project ID:</strong> {project.projectId}
//           </p>
//           <p className="text-lg mb-4 text-black">
//             <strong>Industry:</strong> {project.industryName}
//           </p>
//           <p className="text-lg mb-4 text-black">
//             <strong>Skills required:</strong>{" "}
//             {project.skillsRequiredNames.map((skill, index) => (
//               <span key={index}>
//                 {skill}
//                 {index < project.skillsRequiredNames.length - 1 ? ", " : ""}
//               </span>
//             ))}
//           </p>
//           <p className="text-lg mb-4 text-black">
//             <strong>Description:</strong> {project.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProject;
