export default function usePostRating() {
  const postRating = async (payload: {
    district_id: string;
    safety_security: number;
    cost_of_living: number;
    healthcare_access: number;
    transportation_mobility: number;
    environment_nature: number;
    education_schools: number;
    shops_amenities: number;
    sports_recreation: number;
    comment: string;
    average_rating: number;
  }) => {
    console.log("hook payload", payload);
    const response = await fetch("/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    return response.json();
  };

  return { postRating };
}
