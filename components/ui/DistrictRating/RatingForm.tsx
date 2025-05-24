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
    <section className="flex flex-col gap-8 w-full">
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.safety_security}
        iconName="ShieldUser"
        name="Safety & Security"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            safety_security: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.cost_of_living}
        iconName="CircleDollarSign"
        name="Cost of Living"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            cost_of_living: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.healthcare_access}
        iconName="HeartPlus"
        name="Healthcare Access"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            healthcare_access: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.transportation_mobility}
        iconName="BusFront"
        name="Transportation & Mobility"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            transportation_mobility: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.environment_nature}
        iconName="Trees"
        name="Environment & Nature"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            environment_nature: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.education_schools}
        iconName="BookText"
        name="Education & Schools"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            education_schools: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.shops_amenities}
        iconName="Store"
        name="Shops & Amenities"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            shops_amenities: value,
          }))
        }
      />
      <Range
        min={1}
        max={10}
        step={1}
        value={rating.sports_recreation}
        iconName="Dumbbell"
        name="Sports & Recreation"
        onChange={(value) =>
          setRating((prev) => ({
            ...prev,
            sports_recreation: value,
          }))
        }
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
