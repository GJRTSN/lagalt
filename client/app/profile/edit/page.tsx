"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import placeholder from "@/public/placholderpp.jpg";
import { useRouter } from "next/navigation"; // Import the Next.js router
import { User, UpdateUserDTO } from "@/app/types/types"; // Replace with your actual types
import { getUserById, updateUserById } from "../../api/Users";
import { Skill } from "@/app/types/types";
import axios from "axios";
import { getAllSkills } from "../../api/Projects";

export default function EditProfile() {
  const router = useRouter();
  const userId = 1; // Replace with the actual user ID
  const [userData, setUserData] = useState<UpdateUserDTO | null>(null);

  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState(""); // for adding new skills
  const [searchedSkills, setSearchedSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  console.log(selectedSkills);
  console.log("selectedSkills:", selectedSkills);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lagalt-case-1.azurewebsites.net/users/${userId}`
        );
        setUserData(response.data);
        setSelectedSkills(response.data.skills || []);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const matchingSkills = skills.filter((s) =>
      s.name.toLowerCase().includes(newSkill.toLowerCase())
    );
    setSearchedSkills(matchingSkills);
  }, [newSkill, skills]);

  useEffect(() => {
    // Fetch the skills from the API just like you did in UpdateProject
    const fetchData = async () => {
      try {
        const fetchedSkills = await getAllSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error("There was an error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(
          `https://lagalt-case-1.azurewebsites.net/users/${userId}`
        );

        // Update userData state
        setUserData(userDataResponse.data);

        // Set selectedSkills to the user's skills if they exist
        if (userDataResponse.data.skills) {
          setSelectedSkills(userDataResponse.data.skills);
        } else {
          setSelectedSkills([]); // If the user has no skills, set it as an empty array
        }
      } catch (error) {
        console.error("Error fetching user and skills:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (newSkill) {
      // Filter skills based on the input
      const matchingSkills = skills.filter((skill) =>
        skill.name.toLowerCase().startsWith(newSkill.toLowerCase())
      );
      setFilteredSkills(matchingSkills);
    } else {
      // If input is empty, clear the filtered skills
      setFilteredSkills([]);
    }
  }, [newSkill, skills]);

  useEffect(() => {
    // Update the filtered skills based on the newSkill input
    setFilteredSkills(
      skills.filter((skill) =>
        skill.name.toLowerCase().includes(newSkill.toLowerCase())
      )
    );
  }, [newSkill, skills]);

  const handleSubmit = async (e: FormEvent) => {
    const skillToAdd = skills.find((s) => s.name === newSkill);
    if (skillToAdd) addSkill(skillToAdd);

    e.preventDefault();

    // Make sure userData and selectedSkills are available
    if (!userData || !selectedSkills) return;

    try {
      // Execute both update calls concurrently
      const [userResponse, skillsResponse] = await Promise.all([
        // Update user data
        axios.put(
          `https://lagalt-case-1.azurewebsites.net/users/${userId}`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),

        // Update skills
        axios.put(
          `https://lagalt-case-1.azurewebsites.net/profile/${userId}/skills`, // Assuming the skills API endpoint
          { skills: selectedSkills },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
      ]);

      // Check if both updates were successful
      if (userResponse.status === 200 && skillsResponse.status === 200) {
        console.log(
          "User and skills updated:",
          userResponse.data,
          skillsResponse.data
        );
        router.push("/profile"); // Navigate to profile page or wherever you want
      }
    } catch (error) {
      console.error("Error updating user and/or skills:", error);
    }
  };

  const handleDiscardChanges = () => {
    // Add code for discarding data
    router.push("/profile");
  };

  const addSkill = (skill: Skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) return;
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (id: number) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== id));
    console.log(`Trying to remove skill with ID:`, id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen bg-white">
        {/* Header */}
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center">
          <div className="w-2/4 flex justify-between">
            <p className="text-black italic py-2">Editing</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex bg-white flex-col items-center justify-center">
          <div className="w-2/4">
            {/* Edit Profile Info */}
            <div className="mt-10 flex space-x-4 text-black bg-gray-300 p-4 rounded-xl">
              <div className="w-1/2">
                <p className="font-bold">Firstname</p>
                <div className="mt-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
                    placeholder="Enter your firstname"
                    value={userData?.forName || ""}
                    onChange={(e) => {
                      if (userData) {
                        setUserData({ ...userData, forName: e.target.value });
                      }
                    }}
                  />
                </div>

                <p className="font-bold mt-2">Lastname</p>
                <div className="mt-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
                    placeholder="Enter your lastname"
                    value={userData?.lastName || ""}
                    onChange={(e) => {
                      if (userData) {
                        setUserData({ ...userData, lastName: e.target.value });
                      }
                    }}
                  />
                </div>

                <p className="font-bold mt-2">Title</p>
                <div className="mt-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
                    placeholder="Enter your location"
                    value={userData?.description || ""}
                    onChange={(e) => {
                      if (userData) {
                        setUserData({
                          ...userData,
                          description: e.target.value,
                        });
                      }
                    }}
                  />
                </div>

                <p className="font-bold mt-2">Country</p>
                <div className="mt-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
                    placeholder="Enter your location"
                    value={userData?.country || ""}
                    onChange={(e) => {
                      if (userData) {
                        setUserData({ ...userData, country: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex w-1/2 justify-center items-center">
                <div className="rounded-lg flex flex-col items-center justify-center h-72">
                  <Image
                    src={placeholder}
                    alt="User-placeholder"
                    width={200}
                    height={200}
                    style={{ borderRadius: 10 }}
                  />
                  <button className="bg-green-500 hover:bg-green-700 text-white p-1 rounded-md mt-3">
                    Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Profile Skills */}

            <div
              id="skills"
              className="mt-8 text-black bg-gray-300 p-4 rounded-xl"
            >
              <h2 className="text-2xl">Skills</h2>
              <span className="text-gray-500">Click on a tag to remove</span>
              <div className="flex flex-wrap">
                {selectedSkills.map((skill, index) => {
                  console.log(`Mapping skill at index ${index}:`, skill);
                  return (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 mb-2 cursor-pointer mt-2"
                      onClick={() => removeSkill(skill.id)}
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>

              <div className="mt-2 mb-2 relative">
                <input
                  type="text"
                  placeholder="Add a new skill"
                  className="border border-gray-300 rounded-md p-1 mr-2 bg-gray-100"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                {newSkill && (
                  <div className="absolute top-full left-0 z-10 0 rounded-md w-full mt-2">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          addSkill(skill);
                          setNewSkill("");
                        }}
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save and Discard buttons */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-md mr-2"
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
