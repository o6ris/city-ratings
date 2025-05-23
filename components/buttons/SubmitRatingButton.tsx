"use client";

import usePostRating from "@/modules/hooks/ratings/usePostRating";

export default function SubmitRatingButton({
  districtId,
}: {
  districtId: string;
}) {
  const { postRating } = usePostRating();

  const payload = {
    district_id: districtId,
    safety_security: 8,
    cost_of_living: 5,
    healthcare_access: 5,
    transportation_mobility: 6,
    environment_nature: 5,
    education_schools: 6,
    shops_amenities: 4,
    sports_recreation: 9,
    quality_of_life: 4,
    comment: "Good place to live",
  };

  const handleSubmit = async () => {
    try {
      const response = await postRating(payload);
      if (response.error) {
        console.error("Error submitting rating:", response.error);
      } else {
        console.log("Rating submitted successfully:", response.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <button onClick={handleSubmit} className="bg-red-200 p-2 rounded">
      Submit Rating
    </button>
  );
}
