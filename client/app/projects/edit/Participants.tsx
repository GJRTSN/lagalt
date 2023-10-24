import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Participants({
  participants: initialParticipants,
  removeParticipant,
  projectId,
  onParticipantRemoval,
}) {
  const [participants, setParticipants] = useState(initialParticipants);

  useEffect(() => {
    setParticipants(initialParticipants);
  }, [initialParticipants]);

  // const handleParticipantRemoval = async (userId) => {
  //   try {
  //     await removeParticipant(projectId, userId);
  //     // If the removal is successful, update the local state
  //     const updatedParticipants = participants.filter(
  //       (participant) => participant.userId !== userId
  //     );
  //     setParticipants(updatedParticipants);
  //   } catch (error) {
  //     console.error("There was an error removing the participant:", error);
  //     // Here, you can handle errors, for example, by showing a notification to the user
  //   }
  // };

  const handleParticipantRemoval = async (userId) => {
    try {
      await removeParticipant(projectId, userId);
      const updatedParticipants = participants.filter(
        (participant) => participant.userId !== userId
      );
      setParticipants(updatedParticipants);
      if (onParticipantRemoval) {
        onParticipantRemoval();
      }
    } catch (error) {
      console.error("There was an error removing the participant:", error);
    }
  };

  return (
    <div className="text-lg mb-4 text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Participants ({participants?.length})
      </h2>

      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
            <th className="px-4 py-2 bg-gray-200">Firstname</th>
            <th className="px-4 py-2 bg-gray-200">Lastname</th>
            <th className="px-4 py-2 bg-gray-200">Role</th>
            <th className=" py-2 bg-gray-200">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
          {participants.map((participant, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-gray-100 border-b border-gray-200 py-10"
            >
              <td className="px-4 py-4">{participant.forName}</td>
              <td className="px-4 py-4">{participant.lastName}</td>
              <td className="px-4 py-4">{participant.userRole}</td>
              <td className="py-4">
                <Link href={`/profile/${participant.userId}`}>
                  <button
                    type="button"
                    className="bg-yellow-400 py-1 mx-1 px-2 rounded-md text-white"
                  >
                    View profile
                  </button>
                </Link>

                <button
                  type="button"
                  className="bg-red-400 py-1 mx-1 px-2 rounded-md text-white"
                  onClick={() => handleParticipantRemoval(participant.userId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
