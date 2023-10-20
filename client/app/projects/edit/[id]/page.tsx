"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Industry, Skill, UpdatedProjectDTO } from "@/app/api/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  getAllIndustries,
  getAllProjects,
  getAllSkills,
} from "@/app/api/Projects";

import { removeParticipant } from "@/app/api/Participants";
import Participants from "../Participants";
import Applications from "../Applications";

export default function UpdateProject() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  // State for managing form data
  const [formData, setFormData] = useState<UpdatedProjectDTO | null>(null);
  const [project, setProject] = useState<UpdatedProjectDTO | null>(null);
  const [refreshParticipants, setRefreshParticipants] = useState(false);

  // State for dropdowns and selections
  const [skills, setSkills] = useState<Skill[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  // State for UI elements
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  const handleApplicationAccept = async () => {
    try {
      // Assuming these functions fetch the updated data
      const updatedParticipants = await fetchParticipants();
      const updatedApplications = await fetchApplications();
      setParticipants(updatedParticipants);
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const projectsData = await getAllProjects();
          const selectedProject = projectsData.find(
            (proj: UpdatedProjectDTO) => proj.projectId === Number(id)
          );
          setProject(selectedProject || null);
        } catch (error) {
          console.error("There was an error fetching the projects", error);
        }
      }
    };

    fetchProject();
  }, [id]);

  // Fetch initial data
  useEffect(() => {
    // Function to fetch projects, skills, and industries
    const fetchData = async () => {
      try {
        const [fetchedProjects, fetchedSkills, fetchedIndustries] =
          await Promise.all([
            getAllProjects(),
            // getProjectById(id),
            getAllSkills(),
            getAllIndustries(),
          ]);

        setSkills(fetchedSkills);
        setIndustries(fetchedIndustries);

        if (id) {
          const selectedProject = fetchedProjects.find(
            (proj: UpdatedProjectDTO) => proj.projectId === Number(id)
          );

          if (selectedProject) {
            // Set form data from the selected project
            setFormData(selectedProject);

            // Set selected skills from the selected project, ensuring the structure matches your 'Skill' type.
            // Assuming that 'skillsRequiredNames' and 'skillsRequiredIds' are the properties holding the skills data in your project.
            setSelectedSkills(
              selectedProject.skillsRequiredNames.map(
                (skillName: string, index: number) => ({
                  id: selectedProject.skillsRequiredIds[index], // map the skill id
                  name: skillName, // map the skill name
                })
              )
            );
          } else {
            setFormData(null); // Reset form data if no project is selected
          }
        }
      } catch (error) {
        console.error("There was an error fetching the data", error);
      }
    };

    fetchData();
  }, [id]);

  // Update formData when selectedSkills changes
  useEffect(() => {
    // Check if formData is not null and has the necessary properties for comparison
    if (
      formData &&
      formData.skillsRequiredIds &&
      formData.skillsRequiredNames
    ) {
      // Compare the current skills in formData with selectedSkills
      const currentSkillIds = formData.skillsRequiredIds;
      const newSkillIds = selectedSkills.map((skill) => skill.id);

      // If they're different, then update formData
      if (JSON.stringify(currentSkillIds) !== JSON.stringify(newSkillIds)) {
        setFormData((prev) => {
          if (prev === null) return null;

          return {
            ...prev,
            skillsRequiredIds: newSkillIds,
            skillsRequiredNames: selectedSkills.map((skill) => skill.name),
          };
        });
      }
    }
  }, [selectedSkills, formData]);

  // Handle search term changes
  useEffect(() => {
    if (!searchTerm) return setFilteredSkills([]);
    setFilteredSkills(
      skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, skills]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      if (prev === null) return null;

      return { ...prev, [name]: value };
    });
  };

  const handleIndustryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndustry = industries.find(
      (industry) => industry.id === Number(event.target.value)
    );

    if (!selectedIndustry) return;
    setFormData((prev) => {
      if (prev === null) return null;

      return {
        ...prev,
        industryId: selectedIndustry.id,
        industryName: selectedIndustry.name,
      };
    });
  };

  const addSkill = (skill: Skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) return;
    setSelectedSkills((prev) => [...prev, skill]);
    setSearchTerm("");
  };

  const removeSkill = (id: number) => {
    // Update the selectedSkills state by removing the skill with the given ID
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== id));

    // Update the formData state to reflect the removal of the skill
    setFormData((prevFormData) => {
      if (!prevFormData) return null; // or handle null case as needed

      // Find the name of the skill with the given ID
      const skillToRemove = prevFormData.skillsRequiredNames.find(
        (name, index) => prevFormData.skillsRequiredIds[index] === id
      );

      // Filter out the removed skill's ID
      const newSkillsRequiredIds = prevFormData.skillsRequiredIds.filter(
        (skillId) => skillId !== id
      );

      // Filter out the removed skill's name
      const newSkillsRequiredNames = skillToRemove
        ? prevFormData.skillsRequiredNames.filter(
            (name) => name !== skillToRemove
          )
        : [...prevFormData.skillsRequiredNames]; // if no matching skill, copy the existing array

      return {
        ...prevFormData,
        skillsRequiredIds: newSkillsRequiredIds,
        skillsRequiredNames: newSkillsRequiredNames,
      };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formData) return; // Ensure formData is not null
    console.log("Updating project with data:", formData);

    try {
      const response = await axios.put(
        `https://lagalt-case-1.azurewebsites.net/projects/${id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("Project updated successfully!");
        router.push("/projects");
      }
    } catch (error) {
      console.error("There was an error updating the project!", error);
    }
  };

  if (!formData) {
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
            {formData.projectId}
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
                placeholder={formData.title}
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
                  placeholder={formData.industryName}
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
                  placeholder={formData.status}
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
                    placeholder={formData.description}
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
              <Participants
                participants={project.participants}
                removeParticipant={removeParticipant}
                projectId={formData.projectId}
                shouldRefresh={refreshParticipants}
              />
              <Applications
                applications={project.workApplications}
                onAccept={handleApplicationAccept}
              />
            </form>
          </div>

          <div className="w-full h-auto mt-8 flex flex-row items-center justify-center gap-x-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-center w-1/8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>

            <button className="text-center w-1/8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Discard
            </button>

            <button className="text-center w-1/8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
