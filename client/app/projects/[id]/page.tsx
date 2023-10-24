"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import {
  getAllProjects,
  getProjectComments,
  postComment,
  applyToProject,
} from "@/app/api/Projects";
import { useParams } from "next/navigation";
import { ProjectComment, UpdatedProjectDTO } from "@/app/types/types";
import Link from "next/link";
import ApplyProject from "../ApplyProject";
import { useUserContext } from "@/app/contexts/userContext";
import { MoonLoader } from "react-spinners";

const ViewProject: React.FC = () => {
  const [project, setProject] = useState<UpdatedProjectDTO | null>(null);
  const [comments, setComments] = useState<ProjectComment[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user, updateUser } = useUserContext();
  const userId = user?.userId;

  const params = useParams();
  const id = Number(params.id);

  const titleCSS = "text-2xl font-bold mb-4 text-black";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSend = async (message: string) => {
    setRefreshKey(refreshKey + 1);
    await applyToProject(message, project.projectId, userId);
    setIsSent(true);
    setTimeout(() => {
      setIsModalOpen(false); // Reset the isSent state here
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const projectsData = await getAllProjects();
          const selectedProject = projectsData.find(
            (proj: UpdatedProjectDTO) => proj.projectId === Number(id)
          );
          setProject(selectedProject || null);
        } catch (error) {
          console.error("There was an error fetching the projects", error);
        }
      }
    };

    fetchProject();
  }, [id, refreshKey]);

  useEffect(() => {
    async function fetchComments() {
      const projectComments = await getProjectComments(id);
      if (projectComments && Array.isArray(projectComments)) {
        setComments(projectComments);
      } else {
        setComments(null);
      }
    }

    if (id) {
      fetchComments();
    }
  }, [id]);

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postedComment = await postComment(newComment, id);
    if (postedComment && postedComment.id) {
      setComments((prevComments) => [...(prevComments || []), postedComment]);
      setNewComment("");
    } else {
    }
  };

  if (!project) {
    return (
      <div className="h-full min-h-screen bg-white pb-12">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center "></div>
        <div className="flex flex-col justify-center items-center mt-8">
          <MoonLoader color="#8cb669" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center "></div>
      <div className="flex flex-col items-center mt-8 ">
        <div className="w-2/4 bg-gray-100 p-4 text-black rounded-lg mb-12">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-extrabold mb-4 text-black">
              {project.title}
            </h1>
            <div className="p-4 w-2/6 bg-white rounded-lg shadow-md mb-8">
              <div className="flex justify-between border-b-2 pb-4 mb-4">
                <span className="text-gray-700 font-semibold">ID:</span>
                <span className="text-black">{project.projectId}</span>
              </div>
              <div className="flex justify-between border-b-2 pb-4 mb-4">
                <span className="text-gray-700 font-semibold">Industry:</span>
                <span className="text-black">{project.industryName}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-700 font-semibold">Owner:</span>
                </div>
                <Link href={`/profile/${project.ownerUserId}`}>
                  <p className="text-white text-sm bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                    {project.ownerName}
                  </p>
                </Link>
              </div>
            </div>

            <div className="text-lg">
              <h2 className="text-2xl font-bold mb-1 text-center text-black">
                Skills required
              </h2>
              <div className="flex flex-wrap mt-2">
                {project.skillsRequiredNames.map((skill, index) => (
                  <span
                    key={index}
                    className="m-1 bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
          <div className="bg-[#FDFDFD] w-full h-auto rounded-md mb-4 p-2">
            {project.description}
          </div>
          <div className="mb-8">
            <h2 className={`${titleCSS} mb-4`}>Links</h2>{" "}
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          <h2 className={titleCSS}>Participants</h2>
          {project.participants.length > 0 ? (
            <p className="text-lg mb-4 text-black">
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                    <th className="px-4 py-2 bg-gray-200">Firstname</th>
                    <th className="px-4 py-2 bg-gray-200">Lastname</th>
                    <th className="px-4 py-2 bg-gray-200">Role</th>
                    <th className=" py-2 bg-gray-200">Profile</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {project.participants.map((participant, index) => (
                    <tr
                      key={index}
                      className="bg-white  border-b border-gray-200 py-10"
                    >
                      <td className="px-4 py-4">{participant.forName}</td>
                      <td className="px-4 py-4">{participant.lastName}</td>
                      <td className="px-4 py-4">{participant.userRole}</td>
                      <td className="py-4">
                        <Link href={`/profile/${participant.userId}`}>
                          <button className="bg-green-700 hover:bg-green-500 py-1 mx-1 px-2 rounded-md text-white">
                            Visit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </p>
          ) : (
            <p>No participants yet.</p>
          )}

          <div
            id="applyToProject"
            className="flex flex-col items-center m-1 mt-8 p-4 bg-green-50 rounded-lg"
            style={{
              display:
                project.ownerUserId === userId ||
                project.participants.some(
                  (participant) => participant.userId === userId
                )
                  ? "none"
                  : "flex",
            }}
          >
            <h2 className={`${titleCSS} mb-4 `}>Join the project?</h2>
            {project.workApplications.some(
              (application) => application.userId === userId
            ) ? (
              <p className="">You have already applied for this project.</p>
            ) : (
              <button
                type="submit"
                onClick={handleOpenModal}
                className="text-center w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                APPLY
              </button>
            )}
            <ApplyProject
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSend={handleSend}
              isSent={isSent}
            />
          </div>

          <div className="mt-8">
            <h2 className={titleCSS}>Comments</h2>

            {comments ? (
              comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 border bg-white border-gray-300 p-4 rounded shadow-sm">
                        <p className="text-sm text-gray-500">
                          <strong>Comment ID:</strong> {comment.id}
                        </p>
                        <p className="text-gray-800">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )
            ) : (
              <p>Loading comments...</p>
            )}
          </div>
          <h2 className="text-lg mt-4 mb-2 font-bold">Post new comment</h2>
          <div className="flex space-x-3 mb-4">
            <form className="flex-1" onSubmit={handleCommentPost}>
              <div className="rounded-md shadow-sm">
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                  required
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
