"use client";

import useRating from "@/modules/hooks/ratings/useRating";
import { useRouter } from "next/navigation";

export default function SubmitRatingButton({
  className,
  districtId,
  reviewId,
  rating,
}: {
  className: string;
  districtId: string;
  reviewId: string | undefined;
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
  const { postRating, updateRating } = useRating();
  const router = useRouter();

  const handleSubmit = async () => {
    const payload = {
      ...rating,
      district_id: districtId,
    };

    try {
      let response;

      if (reviewId) {
        response = await updateRating(payload, reviewId);
      } else {
        response = await postRating(payload);
      }

      if (response.error) {
        console.error("Error submitting rating:", response.error);
      } else {
        router.push(`/district/${districtId}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <button onClick={handleSubmit} className={className}>
      {reviewId ? "Edit Rating" : "Submit Rating"}
    </button>
  );
}
