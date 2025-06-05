import { useState, useEffect } from "react";

export default function useVotes(ratingId: string) {
  const [voteCounts, setVoteCounts] = useState<{
    up: number;
    down: number;
    rating_id: string;
    user_id: [string];
    has_voted: "up" | "down" | null;
  } | null>(null);

  const getVotes = async () => {
    const response = await fetch(`/api/votes?review=${ratingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get votes");
    }
    const data = await response.json();
    setVoteCounts(data);
  };

  useEffect(() => {
    getVotes();
  }, []);

  const postVote = async (payload: {
    rating_id: string;
    vote_type: "up" | "down";
  }) => {
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
    const data = await response.json();
    setVoteCounts(data.voteCounts);
  };

  return { postVote, voteCounts };
}
