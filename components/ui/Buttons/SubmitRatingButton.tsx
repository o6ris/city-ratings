"use client";

import usePostRating from "@/modules/hooks/ratings/usePostRating";

export default function SubmitRatingButton({
  className,
  districtId,
  rating,
}: {
  className: string;
  districtId: string;
  rating: {
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
}) {
  const { postRating } = usePostRating();

  const handleSubmit = async () => {
    try {
      const response = await postRating({ ...rating, district_id: districtId });
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
    <button onClick={handleSubmit} className={className}>
      Submit Rating
    </button>
  );
}
