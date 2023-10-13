"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  industries,
  skills,
  status,
  Industry,
  Skill,
  Status,
} from "@/app/api/ProjectData";
import { Project } from "@/app/api/Projects";
import { addNewProject } from "@/app/api/Projects";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const router = useRouter();

  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: "",
    owner: "user",
    industry: industries[0],
    skillsRequired: [],
    status: status[0],
    participants: [],
    viewCount: 0,
    logo: "",
  });

  const [skillSearch, setSkillSearch] = useState("");
  const [matchedSkills, setMatchedSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSkillSearch(searchQuery);
    if (searchQuery.length === 0) {
      setMatchedSkills([]);
    } else {
      const matched = skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMatchedSkills(matched);
    }
  };

  const handleSkillClick = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSkillSearch("");
    setMatchedSkills([]);
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndustry = industries.find(
      (industry) => industry.id === parseInt(e.target.value)
    );

    setNewProject((prev) => ({
      ...prev,
      industry: selectedIndustry!,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = status.find(
      (stat) => stat.id === parseInt(e.target.value)
    );

    setNewProject((prev) => ({
      ...prev,
      status: selectedStatus!,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectToSubmit = {
      ...newProject,
      status: newProject.status,
      skillsRequired: selectedSkills,
    };

    addNewProject(projectToSubmit);
    router.push("/projects");
  };

  return (
    <div className="h-full min-h-screen bg-white">
      <div
        id="switchContainer"
        className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center mb-4 "
      ></div>
      <div className="h-3/5 flex bg-white flex-col items-center justify-center">
        <div
          id="admindash"
          className="w-3/4 h-full bg-[#CCCCCC] rounded-lg p-4 "
        >
          <h3 className="text-black text-4xl font-bold font-roboto mb-4 ">
            Create new project
          </h3>
          <form onSubmit={handleSubmit}>
            <p className="text-black">Project ID</p>
            <input
              name="id"
              type="number"
              placeholder="PROJECT ID"
              onChange={handleInputChange}
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            />
            {/* <p className="text-black">Project owner</p>
            <input
              type="string"
              placeholder="PROJECT ID"
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            /> */}
            <p className="text-black">Project name</p>
            <input
              name="name"
              placeholder="PROJECT NAME"
              onChange={handleInputChange}
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            />
            <p className="text-black">Image URL</p>
            <input
              type="string"
              placeholder="PROJECT IMAGE"
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            />
            <p className="text-black">Industry</p>
            <select
              name="industry"
              value={newProject.industry.id}
              onChange={handleIndustryChange}
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            >
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>

            <p className="text-black">Skills Required</p>
            <input
              type="text"
              placeholder="Search skills"
              value={skillSearch}
              onChange={handleSkillSearchChange}
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            />
            {matchedSkills.length > 0 && (
              <div className="skills-dropdown">
                {matchedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => handleSkillClick(skill)}
                    className="skill-item"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
            {selectedSkills.length > 0 && (
              <div className="selected-skills">
                {selectedSkills.map((skill) => (
                  <span key={skill.id} className="badge flex flex-row">
                    <p className="w-auto h-auto bg-gray-500 m-1 rounded-md p-1">
                      {skill.name}
                    </p>
                  </span>
                ))}
              </div>
            )}
            <p className="text-black">Status</p>
            <select
              name="status"
              value={newProject.status.id}
              onChange={handleStatusChange}
              className="text-black w-1/4 h-10 rounded-md p-2 my-2"
            >
              {status.map((stat) => (
                <option key={stat.id} value={stat.id}>
                  {stat.name}
                </option>
              ))}
            </select>
          </form>
          <div className="w-1/2 float-right">
            <Link href="/projects">
              <button
                type="button"
                className="w-auto h-8 bg-gray-700 rounded-md px-2 m-1 float-right"
              >
                Discard
              </button>
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-auto h-8 bg-green-700 rounded-md px-2 m-1 float-right"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
