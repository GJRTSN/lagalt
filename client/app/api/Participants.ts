export async function removeParticipant(id: number, userId: number) {
  try {
    const response = await fetch(
      `https://lagalt-case-1.azurewebsites.net/projects/projects/${id}/participants/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Participant removal failed");
    }

    // Handle response accordingly.
    // Maybe set state to remove the participant from the local list after successful deletion,
    // or refetch the participants list to have the latest data.
  } catch (error) {
    // Handle error accordingly
    console.error("Error:", error);
  }
}

export async function acceptApplication(applicationId: number) {
  try {
    const response = await fetch(
      `https://lagalt-case-1.azurewebsites.net/api/workapplications/accept/${applicationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // include additional headers here if needed, like authorization tokens
        },
        // body: JSON.stringify(data), // include this if you need to send a request body
      }
    );

    if (!response.ok) {
      throw new Error("Application acceptance unsuccessful");
    }

    return response.json(); // or return true if you don't expect a response body
  } catch (error) {
    // Handle or throw error as needed
    console.error("There was a problem with the fetch operation:", error);
  }
}
