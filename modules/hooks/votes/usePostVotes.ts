export default function usePostVotes() {
  const postVote = async (payload: {
    rating_id: string;
    vote_type: "up" | "down";
  }) => {
    console.log("hook payload", payload);
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("response", response)

    if (!response.ok) {
      throw new Error("Failed to submit vote");
    }

    return response.json();
  };

  return { postVote };
}
