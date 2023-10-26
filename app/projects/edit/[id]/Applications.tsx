import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import placeholder from "@/public/placholderpp.jpg";
import { acceptApplication } from "@/app/api/participant/post";
import { declineApplication } from "@/app/api/participant/put";

export default function Applications({
  applications: initialApplications,
  onAccept,
}: ApplicationsProps) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  useEffect(() => {
    // Filter accepted applications when the component mounts
    const acceptedApplications = initialApplications.filter(
      (application) => application.accepted
    );
    setApplications(acceptedApplications);
  }, [initialApplications]);

  //Accept applications
  const handleAccept = async (applicationId: number) => {
    onAccept();
    try {
      await acceptApplication(applicationId);
    } catch (error) {
      console.error("There was a problem accepting the application:", error);
    }
  };

  //Decline applications
  const handleDecline = async (applicationId: number) => {
    try {
      await declineApplication(applicationId);
      const updatedApplications = applications.filter(
        (application) => application.applicationId !== applicationId
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error("There was a problem declining the application:", error);
    }
  };

  return (
    <div className="text-lg mb-4 text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Applications ({applications?.length})
      </h2>

      {applications?.length > 0 ? (
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
                    </h3>
                  </div>
                </div>
                <div>
                  <Link href={`/profile/${application.userId}`}>
                    <button className="bg-yellow-400 text-sm py-1 mx-1 px-2 rounded-md text-white">
                      Visit
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4 bg-gray-200">
                <p className="text-gray-600">{application.motivation} </p>
              </div>
              <div className="p-4 bg-white border-t flex flex-row justify-center items-center">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleAccept(application.applicationId)}
                    className="text-sm font-medium bg-green-400 hover:bg-green-600 py-1 mx-1 px-2 rounded-md text-white"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecline(application.applicationId)}
                    className="text-sm font-medium bg-red-400 hover:bg-red-600 py-1 mx-1 px-2 rounded-md text-white"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          There are currently no participants in this project.
        </p>
      )}
    </div>
  );
}
