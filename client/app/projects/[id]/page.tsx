"use client";

import React, { useEffect, useState } from "react";
import {
  getAllProjects,
  getProjectComments,
  postComment,
} from "@/app/api/Projects";
import { useParams } from "next/navigation";
import { ProjectComment, UpdatedProjectDTO } from "@/app/api/types";
import Link from "next/link";

const ViewProject: React.FC = () => {
  const [project, setProject] = useState<UpdatedProjectDTO | null>(null);
  const [comments, setComments] = useState<ProjectComment[] | null>(null);
  const [newComment, setNewComment] = useState(""); // State to hold the new comment text

  const params = useParams();
  const id = Number(params.id);

  const titleCSS = "text-2xl font-bold mb-4 text-black";

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
  }, [id]);

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

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentPost = async (event) => {
    event.preventDefault();
    const postedComment = await postComment(newComment, id);
    if (postedComment && postedComment.id) {
      setComments((prevComments) => [...(prevComments || []), postedComment]);
      setNewComment(""); // Clear the input field after posting
    } else {
      // Handle error (e.g., show a message to the user)
    }
  };

  if (!project) {
    return (
      <div className="h-full min-h-screen bg-white pb-12">
        <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
          <p className="text-black">
            <strong className="text-black">
              YOU ARE CURRENTLY{" "}
              <span className="text-red-500 underline">VIEWING</span> A PROJECT
              AS
              <span className="text-pink-500 underline">LOGGED IN USER!</span>
            </strong>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <p className="text-black">Loading project...</p>;
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <div className="w-full h-10 bg-[#8cb669] flex flex-row items-center justify-center ">
        <p className="text-black">
          <strong className="text-black">
            YOU ARE CURRENTLY
            <span className="text-red-500 underline">VIEWING</span> A PROJECT AS
            <span className="text-pink-500 underline">LOGGED IN USER!</span>
          </strong>
        </p>
      </div>
      <div className="flex flex-col items-center mt-8 ">
        <div className="w-3/4 bg-gray-100 p-4 text-black rounded-lg mb-12">
          <h1 className="text-3xl font-bold mb-2 text-black">
            {project.title}
          </h1>
          <p className="text-lg mb-4 text-black">
            <strong>Project ID:</strong> {project.projectId}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Industry:</strong> {project.industryName}
          </p>
          <p className="text-lg mb-4 text-black">
            <strong>Skills required:</strong>{" "}
            {project.skillsRequiredNames.map((skill, index) => (
              <span key={index}>
                {skill}
                {index < project.skillsRequiredNames.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
          <div className="bg-[#FDFDFD] w-full h-12 rounded-md mb-4 p-2">
            {project.description}
          </div>
          <h2 className={titleCSS}>Links</h2>
          <p className="text-lg mb-4 text-black">
            <strong>GitHub:</strong> www.github.com
          </p>
          <p className="text-lg mb-4 text-black">
            <h2 className={titleCSS}>Participants</h2>

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
                    className="bg-white hover:bg-gray-100 border-b border-gray-200 py-10"
                  >
                    <td className="px-4 py-4">{participant.forName}</td>
                    <td className="px-4 py-4">{participant.lastName}</td>
                    <td className="px-4 py-4">{participant.userRole}</td>
                    <td className="py-4">
                      <Link href={`/profile/`}>
                        <button className="bg-green-400 py-1 mx-1 px-2 rounded-md text-white">
                          Visit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </p>
          <h2 className={titleCSS}>Join the project</h2>
          <button
            type="submit"
            className="text-center w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            APPLY
          </button>

          <div className="mt-8">
            <h2 className={titleCSS}>All project comments</h2>

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
              <p>Loading comments...</p> // Consider replacing with a spinner or any other loading indicator
            )}
          </div>
          <h2 className={titleCSS}>Post new comment</h2>
          <div className="flex space-x-3 mb-4">
            <form className="flex-1" onSubmit={handleCommentPost}>
              <div className="rounded-md shadow-sm">
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                  required
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" // Styling the input field
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" // Button styling
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