"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Range from "@/components/core/inputs/Range";
import Textarea from "@/components/core/inputs/Textarea";
import SubmitRatingButton from "@/components/ui/Buttons/SubmitRatingButton";
import DeleteRatingbutton from "@/components/ui/Buttons/DeleteRatingButton";

export default function RatingForm({
  districtId,
  review,
}: {
  districtId: string;
  review: {
    id: string;
    comment: string;
    created_at: string;
    district_id: string;
    safety_security: number;
    cost_of_living: number;
    healthcare_access: number;
    transportation_mobility: number;
    environment_nature: number;
    education_schools: number;
    shops_amenities: number;
    sports_recreation: number;
    average_rating: number;
    user_id: string;
  } | null;
}) {
  const [rating, setRating] = useState({
    safety_security: review?.safety_security ?? 5,
    cost_of_living: review?.cost_of_living ?? 5,
    healthcare_access: review?.healthcare_access ?? 5,
    transportation_mobility: review?.transportation_mobility ?? 5,
    environment_nature: review?.environment_nature ?? 5,
    education_schools: review?.education_schools ?? 5,
    shops_amenities: review?.shops_amenities ?? 5,
    sports_recreation: review?.sports_recreation ?? 5,
    comment: review?.comment ?? "",
  });

  const totalScoreMemo = useMemo(() => {
    const total =
      (rating.safety_security +
        rating.cost_of_living +
        rating.healthcare_access +
        rating.transportation_mobility +
        rating.environment_nature +
        rating.education_schools +
        rating.shops_amenities +
        rating.sports_recreation) /
      8;
    return Math.round(total * 100) / 100;
  }, [rating]);

  const totalScorBgColor = useMemo(() => {
    if (totalScoreMemo >= 7) {
      return "bg-success";
    } else if (totalScoreMemo >= 4) {
      return "bg-warning";
    } else {
      return "bg-error";
    }
  }, [totalScoreMemo]);

  return (
    <section className="flex flex-col gap-12 w-full lg:grid lg:grid-cols-2 lg:gap-8">
      <section className="flex flex-col gap-6 w-full">
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
      </section>
      <section className="flex flex-col gap-6 w-full">
        <section className="flex flex-col gap-6 w-full">
          <Textarea
            placeholder="Very nice area, I loved it!"
            name="Share your toughts"
            className="w-full h-32 p-4 rounded-lg shadow-md border border-base-200 lg:h-64"
            value={rating.comment}
            onChange={(value) =>
              setRating((prev) => ({
                ...prev,
                comment: value,
              }))
            }
          />
          <section
            className={`flex gap-2 items-center justify-between p-6 rounded-xl ${totalScorBgColor}`}
          >
            <h3>Total score</h3>
            <div>
              <span className="!text-xlarge !font-black">{totalScoreMemo}</span>
              <span>/10</span>
            </div>
          </section>
        </section>
        <section
          className={`grid gap-4 w-full ${
            review?.id ? "grid-cols-[1fr_1fr_auto]" : "grid-cols-2"
          }`}
        >
          <Link
            className="btn btn-neutral text-primary rounded-full"
            href={`/district/${districtId}`}
          >
            Cancel
          </Link>
          <SubmitRatingButton
            className="btn btn-secondary text-primary rounded-full"
            districtId={districtId}
            rating={{ ...rating, average_rating: totalScoreMemo }}
            reviewId={review?.id}
          />
          {review?.id && (
            <DeleteRatingbutton reviewId={review.id} districtId={districtId} />
          )}
        </section>
      </section>
    </section>
  );
}
