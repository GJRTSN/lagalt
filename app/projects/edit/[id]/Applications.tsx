import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import placeholder from "@/public/placholderpp.jpg";
import { acceptApplication } from "@/app/api/participant/post";
import { declineApplication } from "@/app/api/participant/put";
import { getUserData } from "@/app/api/user/get";

export default function Applications({
  applications: initialApplications,
  onAccept,
}: ApplicationsProps) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [applicantImages, setApplicantImages] = useState<{
    [key: string]: string;
  }>({});

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

  const fetchProfilePicture = useCallback(async (userId: number) => {
    try {
      const response = await getUserData(userId);
      return response.profilePicture || placeholder;
    } catch (error) {
      console.error("There was an error fetching the profile picture:", error);
      return placeholder; // Return placeholder image URL in case of an error
    }
  }, []);

  const fetchAllProfilePictures = async () => {
    const images: { [key: number]: string } = {};
    for (let application of applications) {
      const image = await fetchProfilePicture(application.userId);
      images[application.userId] = image;
    }
    setApplicantImages(images);
  };

  useEffect(() => {
    fetchAllProfilePictures();
  }, [applications, fetchProfilePicture]);

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
                    <img
                      src={applicantImages[application.userId]}
                      alt="avatar"
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
          There are currently no applicants for this project.
        </p>
      )}
    </div>
  );
}
