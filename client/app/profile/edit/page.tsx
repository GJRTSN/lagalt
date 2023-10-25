"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import { getAllSkills } from "@/app/api/project/get";
import { getUserData } from "@/app/api/user/get";
import { UpdateUser } from "@/app/types/UserTypes";
import { useRouter } from "next/navigation";
import { Skill } from "@/app/types/ProjectTypes";
import placeholder from "@/public/placholderpp.jpg";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function EditProfile() {
  const { user, updateUser } = useUserContext();
  const userId = user?.userId;
  const router = useRouter();
  const [userData, setUserData] = useState<UpdateUser | null>(null);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  // Function to toggle profile visibility
  const handleToggle = () => {
    setIsProfileVisible((prevVisible) => {
      const newVisible = !prevVisible;
      setUserData((prevUserData) => {
        if (!prevUserData) return null;
        return { ...prevUserData, profileVisible: newVisible };
      });

      return newVisible;
    });
  };

  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedSkills, setSearchedSkills] = useState<Skill[]>([]);

  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(
      (prevUserData) =>
        ({
          ...prevUserData,
          [name]: value,
        } as UpdateUser)
    );
  };

  useEffect(() => {
    const matchingSkills = skills.filter((s) =>
      s.name.toLowerCase().includes(newSkill.toLowerCase())
    );
    setSearchedSkills(matchingSkills);
  }, [newSkill, skills]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { userData, isProfileVisible, existingSkills } =
          await getUserData(userId);
        setUserData(userData);
        setIsProfileVisible(isProfileVisible);
        setSelectedSkills(existingSkills);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
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

  useEffect(() => {
    if (newSkill) {
      const matchingSkills = skills.filter((skill) =>
        skill.name.toLowerCase().includes(newSkill.toLowerCase())
      );
      setFilteredSkills(matchingSkills);
    } else {
      setFilteredSkills([]);
    }
  }, [newSkill, skills]);

  const addSkill = (skill: Skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) return;
    setSelectedSkills((prev) => {
      const newSkills = [...prev, skill];
      console.log(
        "Successfully added skill:",
        skill,
        "The new selected skills are:",
        newSkills
      );

      return newSkills;
    });
  };

  // Remove a skill from the selected skills list
  const removeSkill = (id: number) => {
    setSelectedSkills((prev) => {
      const newSkills = prev.filter((skill) => skill.id !== id);
      console.log(
        "Successfully removed skill id:",
        id,
        "The new selected skills are:",
        newSkills
      );

      return newSkills;
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!userData || !selectedSkills) return;

    const updatedUserData = {
      ...userData,
      skillIds: selectedSkills.map((skill) => skill.id),
      profileVisible: isProfileVisible,
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
        console.log("Server returned:", userResponse.data);
        updateUser(userResponse.data);
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //Doesn't save changes and goes back to profile page
  const handleDiscardChanges = () => {
    router.push("/profile");
  };

  return (
    <form>
      <div className="h-screen bg-white">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center">
          <div className="w-2/4 flex justify-between">
            <p className="text-black italic py-2"></p>
          </div>
        </div>

        <div className="bg-white flex flex-col items-center justify-center p-4 rounded-xl text-black">
          <div className="w-2/4">
            <div className="mt-10 bg-gray-300 p-4 rounded-xl">
              <div className="w-full h-auto  flex flex-row items-center justify-between">
                <h3 className="text-3xl font-bold mb-4">Edit your profile</h3>
                <label className="relative inline-flex cursor-pointer select-none items-center">
                  <input
                    type="checkbox"
                    checked={isProfileVisible}
                    onChange={handleToggle}
                    className="sr-only"
                  />
                  <span className="label flex items-center text-sm font-medium text-black">
                    {isProfileVisible ? "Visible" : "Hidden"}
                  </span>
                  <span
                    className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                      isProfileVisible ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    <span
                      className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                        isProfileVisible ? "translate-x-[28px]" : ""
                      }`}
                    ></span>
                  </span>
                </label>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1 p-4  rounded-lg">
                  <div className="flex items-center mb-4">
                    <p className="font-bold mr-2 w-24">Firstname</p>
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
                    <p className="font-bold mr-2 w-24">Lastname</p>
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
                    <p className="font-bold mr-2 w-24">Age</p>
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
                    <p className="font-bold mr-2 w-24">Role</p>
                    <input
                      type="text"
                      name="userRole"
                      className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                      placeholder="Enter your role"
                      value={userData?.userRole || ""}
                      onChange={(e) => {
                        if (userData) {
                          setUserData({
                            ...userData,
                            userRole: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <p className="font-bold mr-2 w-24">Country</p>
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

                <div className="flex-1 p-4 rounded-lg flex justify-center items-center">
                  <div className="rounded-lg flex flex-col items-center justify-center h-72">
                    <Image
                      src={placeholder}
                      alt="User-placeholder"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                    <button className="bg-green-500 hover:bg-green-700 text-white p-1 rounded-md mt-3">
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg mb-8">
                <div className="flex flex-col mb-4">
                  <p className="font-bold mr-2 w-24 mb-2">Description</p>
                  <textarea
                    className="border border-gray-300 rounded-md p-1 w-full h-36 bg-gray-100"
                    placeholder="Describe yourself or your skills"
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
              </div>
              <div className="flex items-center mb-4">
                <p className="font-bold mr-2 w-24">Username</p>
                <input
                  type="text"
                  name="username"
                  className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                  value={userData?.username || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center mb-4">
                <p className="font-bold mr-2 w-24">Password</p>
                <input
                  type="password"
                  name="password"
                  className="border border-gray-300 rounded-md p-1 w-full bg-gray-100"
                  value={userData?.password || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-8 text-black bg-gray-300 p-4 rounded-xl">
              <label
                htmlFor="skillSearch"
                className="block text-sm  text-gray-700 font-bold"
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
