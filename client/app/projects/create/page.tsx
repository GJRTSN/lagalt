"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Industry, Project, Skill } from "@/app/types/ProjectTypes";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  getAllIndustries,
  getAllProjects,
  getAllSkills,
} from "@/app/api/Projects";
import { useUserContext } from "@/app/contexts/userContext";

export default function CreateProject() {
  const { user } = useUserContext();
  const userId = user?.userId;

  const router = useRouter();
  const initialFormState: Project = {
    description: "",
    industryId: 1,
    industryName: "Web Development",
    ownerName: "",
    ownerUserId: userId ? userId : 0,
    projectId: 0,
    skillsRequiredIds: [],
    skillsRequiredNames: [],
    status: "",
    title: "",
    participants: [],
    workApplications: [],
  };

  const [skills, setSkills] = useState<Skill[]>([]);
  const [formData, setFormData] = useState<Project>(initialFormState);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [newProjectId, setNewProjectId] = useState<number | null>(null);

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
            ...projects.map((p: Project) => p.projectId)
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
      const response = await axios.post(
        "https://lagalt-case-1.azurewebsites.net/projects/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log("Project created successfully!");
        router.push("/projects");
      }
    } catch (error) {
      console.error("There was an error creating the project!", error);
      console.log(formData);
    }
  };

  return (
    <div className="h-full min-h-screen bg-white">
      <div
        id=""
        className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center mb-4"
      >
        <div className="flex flex-row w-3/4 items-center justify-center">
          <p className="text-black">
            Creating a new project with pre-assigned ID:
          </p>
          <div className=" w-auto bg-yellow-500 rounded-md py-1 px-3 mx-2">
            {newProjectId}
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
                placeholder=""
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
                {searchTerm && filteredSkills.length > 0 ? (
                  <ul className="mt-2 bg-white border border-gray-300 rounded-md p-2">
                    {filteredSkills.map((skill) => (
                      <li
                        key={skill.id}
                        onClick={() => addSkill(skill)}
                        className="text-black cursor-pointer hover:bg-gray-200 p-1"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
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
                  placeholder="*Not started* / *In progress* etc ..."
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
                    placeholder="Add your project's description"
                    className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-center w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
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
