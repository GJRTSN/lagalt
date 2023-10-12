import React, { useState } from "react";

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center">
      <label
        htmlFor="toggle"
        className={`${
          isOn ? "bg-green-400" : "bg-gray-400"
        } relative inline-block w-12 h-6 rounded-xl border border-transparent transition-colors duration-300 ease-in-out cursor-pointer`}
      >
        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          checked={isOn}
          onChange={() => setIsOn(!isOn)}
        />
        <span
          className={`${
            isOn ? "translate-x-6" : "translate-x-0"
          } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
        ></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
