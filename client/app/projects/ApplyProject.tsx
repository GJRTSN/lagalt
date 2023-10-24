import { useState } from "react";
import { ApplyProjectProps } from "../types/types";

const ApplyProject: React.FC<ApplyProjectProps> = ({
  isOpen,
  onClose,
  onSend,
  isSent,
}) => {
  const [applicationText, setApplicationText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      {isSent ? (
        <div className="bg-white p-4 rounded-lg shadow-xl w-1/6 h-24 flex items-center justify-center flex-col">
          <span className="text-lg text-black mb-2">
            Application sent successfully!
          </span>
          <button
            className="py-2 px-4 bg-green-200 text-black rounded hover:bg-green-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-xl w-1/3 h-96">
          <h2 className="mb-4 text-2xl font-bold text-black">
            Write your application
          </h2>
          <textarea
            className="w-full h-56 p-2 mb-4 border rounded resize-none"
            placeholder="What is your motivation to join this project?"
            value={applicationText}
            onChange={(e) => setApplicationText(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                onSend(applicationText);
              }}
            >
              Send
            </button>
            <button
              className="py-2 px-4 bg-gray-300 text-white rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyProject;
