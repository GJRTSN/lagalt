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
import Link from "next/link";
import { useUserContext } from "@/app/contexts/userContext";

export default function EditProfile() {
  const { user, updateUser } = useUserContext(); // get updateUser
  const userId = user?.userId;
  const router = useRouter();
  const [userData, setUserData] = useState<UpdateUserDTO | null>(null);

  // State for dropdowns and selections
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState(""); // for adding new skills

  // State for UI elements
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedSkills, setSearchedSkills] = useState<Skill[]>([]);

  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const matchingSkills = skills.filter((s) =>
      s.name.toLowerCase().includes(newSkill.toLowerCase())
    );
    setSearchedSkills(matchingSkills);
  }, [newSkill, skills]);

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

  const handleDiscardChanges = () => {
    router.push("/profile");
  };

  const addSkill = (skill: Skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) return;
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (id: number) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Ensure userData and selectedSkills are available
    if (!userData || !selectedSkills) return;

    const updatedUserData = {
      ...userData,
      skills: selectedSkills.map((skill) => skill.name),
    };

    try {
      const userResponse = await axios.put(
        `https://lagalt-case-1.azurewebsites.net/users/${userId}`,
        updatedUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (userResponse.status === 200) {
        console.log("User updated:", userResponse.data);
        updateUser(userResponse.data); // update user in context and localStorage
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form>
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
                <div className="flex items-center mb-4">
                  <p className="font-bold mr-2 w-24">Firstname:</p>
                  <input
                    type="text"
                    name="forName"
                    className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                    placeholder="Enter your firstname"
                    value={userData?.forName || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <p className="font-bold mr-2 w-24">Lastname:</p>
                  <input
                    type="text"
                    name="lastName"
                    className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                    placeholder="Enter your lastname"
                    value={userData?.lastName || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <p className="font-bold mr-2 w-24">Age:</p>
                  <input
                    type="text"
                    name="age"
                    className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                    placeholder="Enter your age"
                    value={userData?.age || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <p className="font-bold mr-2 w-24">Title:</p>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                    placeholder="Enter your title"
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

                <div className="flex items-center mb-4">
                  <p className="font-bold mr-2 w-24">Country:</p>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                    placeholder="Enter your country"
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

            <div className="mt-8 text-black bg-gray-300 p-4 rounded-xl">
              <label
                htmlFor="skillSearch"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                type="text"
                id="skillSearch"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder=""
                className="text-black mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {newSkill && filteredSkills.length > 0 ? (
                <ul className="mt-2 bg-white border border-gray-300 rounded-md p-2">
                  {filteredSkills.map((skill) => (
                    <li
                      key={skill.id}
                      onClick={() => {
                        addSkill(skill);
                        setNewSkill("");
                      }}
                      className="text-black cursor-pointer hover:bg-gray-200 p-1"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex flex-row mt-4">
                <ul className="flex flex-row flex-wrap">
                  {selectedSkills.map((skill) => (
                    <span key={skill.id} className="flex flex-row text-sm m-1">
                      <div className="flex flex-row w-auto h-auto bg-gray-500 rounded-md p-1 gap-2 ">
                        <p className="text-white">{skill.name}</p>
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
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <Link href="/profile">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-md"
                >
                  Save
                </button>
              </Link>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-md mr-2"
                onClick={handleDiscardChanges}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
