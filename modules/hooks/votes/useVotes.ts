import { useState, useEffect } from "react";

export default function useVotes(ratingId: string) {
  const [voteCounts, setVoteCounts] = useState<{
    up: number;
    down: number;
    rating_id: string;
    user_id: string[];
    has_voted: "up" | "down" | null;
    is_authenticated: boolean;
  } | null>(null);

  const getVotes = async () => {
    try {
      const response = await fetch(`/api/votes?review=${ratingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // If it's a 401, we can still show vote counts as 0
        if (response.status === 401) {
          setVoteCounts({
            up: 0,
            down: 0,
            rating_id: ratingId,
            user_id: [],
            has_voted: null,
            is_authenticated: false,
          });
          return;
        }
        throw new Error("Failed to get votes");
      }
      
      const data = await response.json();
      setVoteCounts(data);
    } catch (error) {
      console.error("Error fetching votes:", error);
      // Fallback to showing zero votes if fetch fails
      setVoteCounts({
        up: 0,
        down: 0,
        rating_id: ratingId,
        user_id: [],
        has_voted: null,
        is_authenticated: false,
      });
    }
  };

  useEffect(() => {
    getVotes();
  }, [ratingId]); // Added ratingId as dependency

  const postVote = async (payload: {
    rating_id: string;
    vote_type: "up" | "down";
  }) => {
    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to vote");
        }
        throw new Error("Failed to submit vote");
      }
      
      const data = await response.json();
      setVoteCounts(data.voteCounts);
    } catch (error) {
      console.error("Error posting vote:", error);
      // You might want to show a toast notification here
      alert(error instanceof Error ? error.message : "Failed to submit vote");
    }
  };

  return { postVote, voteCounts };
}