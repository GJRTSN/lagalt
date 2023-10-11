"use client";
import React, { useState } from "react";
import { user } from "../profile/dummyUserData";

export default function EditProfileSkills() {
  const [newSkill, setNewSkill] = useState(""); // State to manage the input field value
  const [existingSkills, setExistingSkills] = useState(user.skills); // State to manage existing skills

  // Function to handle adding a new skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setExistingSkills([...existingSkills, newSkill]);
      setNewSkill(""); // Clear the input field after adding the skill
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = existingSkills.filter((_, i) => i !== index);
    setExistingSkills(updatedSkills);
  };

  return (
    <div className="text-black mt-8">
      <div className="mt-4">
        <h2 className="text-2xl">Skills</h2>
        <span className="text-gray-500">Click on tag to remove</span>
        <div className="flex flex-wrap">
          {existingSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 cursor-pointer mt-2"
              onClick={() => removeSkill(index)} // Call the removeSkill function on click
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Add a new skill"
            className="border border-gray-300 rounded-full p-2 mr-2 bg-gray-200"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full"
            onClick={addSkill}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}