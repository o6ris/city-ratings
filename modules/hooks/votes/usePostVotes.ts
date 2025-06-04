import { useState } from "react";

export default function usePostVotes() {

  const [voteCounts, setVoteCounts] = useState<{ up: number; down: number } | null>(null);
  console.log("voteCounts", voteCounts)

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

    if (!response.ok) {
      throw new Error("Failed to submit vote");
    }
    const data = await response.json()
    setVoteCounts(data.voteCounts)
  };

  return { postVote, voteCounts };
}
