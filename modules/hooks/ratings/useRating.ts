type Review = {
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
};

export default function useRating() {
  const postRating = async (payload: Review) => {
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

  const updateRating = async (payload: Review, id: string) => {
    const response = await fetch(`/api/ratings/${id}`, {
      method: "PATCH",
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

  const deleteRating = async (id: string) => {
    const response = await fetch(`/api/ratings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    return response.json();
  };

  return { postRating, updateRating, deleteRating };
}
