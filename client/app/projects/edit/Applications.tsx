import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import placeholder from "@/public/placholderpp.jpg";
import { acceptApplication } from "@/app/api/Participants";

export default function Applications({
  applications: initialApplications,
  onAccept,
}) {
  const [applications, setApplications] = useState(initialApplications);

  useEffect(() => {
    setApplications(initialApplications);
  }, [initialApplications]);

  const handleAccept = async (applicationId) => {
    try {
      await acceptApplication(applicationId);
      // Remove the accepted application from the state
      const updatedApplications = applications.filter(
        (app) => app.applicationId !== applicationId
      );
      setApplications(updatedApplications);

      // Call the onAccept callback to inform the parent component
      if (onAccept) {
        onAccept();
      }
    } catch (error) {
      console.error("There was a problem accepting the application:", error);
      // handle errors, maybe set an error state or display a notification
    }
  };

  return (
    <p className="text-lg mb-4 text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Applications ({applications.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application, index) => (
          <div
            key={index}
            className="transition-all duration-300 transform hover:scale-105 border rounded-lg overflow-hidden shadow-md hover:shadow-xl"
          >
            <div className="p-4 border-b flex justify-between bg-white items-center">
              <div className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src={placeholder}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {application.forName}{" "}
                    {/* No lastName in workApplications */}
                  </h3>
                  {/* Removed userRole, as it doesn't appear in the workApplications structure */}
                </div>
              </div>
              <div>
                <Link href={`/profile/${application.userId}`}>
                  {" "}
                  {/* Adjusted link to use userId */}
                  <button className="bg-yellow-400 py-1 mx-1 px-2 rounded-md text-white">
                    View profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="p-4 bg-gray-200">
              <h3 className="font-semibold text-black mb-2">
                Application Letter
              </h3>
              <p className="text-gray-600">
                {application.motivation}{" "}
                {/* Displaying the actual application letter */}
              </p>
            </div>
            <div className="p-4 bg-white border-t flex flex-row justify-center items-center">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAccept(application.applicationId)}
                  className="bg-green-400 hover:bg-green-600 py-1 mx-1 px-2 rounded-md text-white"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="bg-red-400 hover:bg-red-600 py-1 mx-1 px-2 rounded-md text-white"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </p>
  );
}
