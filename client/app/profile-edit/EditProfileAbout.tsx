"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import {user} from "../profile/dummyUserData"

export default function EditProfileAbout() {
  return (
    <div className="mt-8 mb-4 text-black">
      <h2 className="text-2xl">About</h2>
      <textarea
        id="about-textarea"
        className="bg-gray-100 border border-gray-300 rounded p-2 mt-2 w-full overflow-hidden"
        style={{ resize: "none" }}
      ></textarea>
    </div>
  );
}
