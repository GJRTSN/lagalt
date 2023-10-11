"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import {user} from "../profile/dummyUserData"

export default function EditProfileAbout() {
  const [editedAbout, setEditedAbout] = useState(user.about.join("\n"));

  const handleAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => { 
    setEditedAbout(event.target.value);
  };

  const handleSaveAbout = () => {
    user.about = editedAbout.split("\n");


    console.log("About section updated:", user.about);
  };

  useEffect(() => {
    const textArea = document.getElementById("about-textarea");
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  }, [editedAbout]);

  return (
    <div className="mt-8 mb-4 text-black">
      <h2 className="text-2xl">About</h2>
      <textarea
        id="about-textarea"
        value={editedAbout}
        onChange={handleAboutChange}
        className="bg-gray-200 border border-gray-300 rounded p-2 mt-2 w-full overflow-hidden"
        style={{ resize: "none" }}
      ></textarea>
      <button
        onClick={handleSaveAbout}
        className="bg-green-500 hover:bg-green-700 text-white p-2 mt-2 rounded-full"
      >
        Update
      </button>
    </div>
  );
}
