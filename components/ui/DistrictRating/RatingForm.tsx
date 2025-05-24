"use client";

import { useState } from "react";
import Range from "@/components/core/inputs/Range";
import SubmitRatingButton from "@/components/ui/Buttons/SubmitRatingButton";

export default function RatingForm({ districtId }: { districtId: string }) {
  const [rating, setRating] = useState({
    safety_security: 5,
    cost_of_living: 5,
    healthcare_access: 5,
    transportation_mobility: 5,
    environment_nature: 5,
    education_schools: 5,
    shops_amenities: 5,
    sports_recreation: 5,
    comment: "",
  });
  return (
    <section className="flex flex-col gap-8">
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.safety_security}
        name="safety_security"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            safety_security: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.cost_of_living}
        name="cost_of_living"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            cost_of_living: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.healthcare_access}
        name="healthcare_access"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            healthcare_access: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.transportation_mobility}
        name="transportation_mobility"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            transportation_mobility: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.environment_nature}
        name="environment_nature"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            environment_nature: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.education_schools}
        name="education_schools"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            education_schools: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.shops_amenities}
        name="shops_amenities"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            shops_amenities: value,
          }))
        }
        className="range w-full range-xl"
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.sports_recreation}
        name="sports_recreation"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            sports_recreation: value,
          }))
        }
        className="range w-full range-xl"
      />
      <textarea
        className="textarea textarea-bordered w-full h-24"
        placeholder="Comment"
        value={rating.comment}
        onChange={(e) =>
          setRating((prev) => ({
            ...prev,
            comment: e.target.value,
          }))
        }
      ></textarea>
      <SubmitRatingButton districtId={districtId} rating={rating} />
    </section>
  );
}
