"use client";

import { useRef } from "react";
import Icon from "@/components/core/Icons/Icon";
import iconDict from "@/modules/utils/iconDict";

export default function ReviewsCarrousel({
  reviews,
}: {
  reviews: Array<{
    id: string;
    average_rating: number;
    comment: string;
    created_at: string;
    criterias: {
      safety_security: number;
      cost_of_living: number;
      healthcare_access: number;
      transportation_mobility: number;
      environment_nature: number;
      education_schools: number;
      shops_amenities: number;
      sports_recreation: number;
    };
    user: {
      name: string | null;
      email: string;
      avatar_url: string | null;
    };
  }>;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.9;
      carouselRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="carousel carousel-center rounded-box gap-4 px-2 overflow-x-auto scroll-smooth flex p-4"
      >
        {reviews.map((review) => {
          const maxChars = 200; // or however many characters fit into your h-32
          const isLong = review.comment.length > maxChars;
          const shortComment = isLong
            ? review.comment.slice(0, maxChars).trim() + "..."
            : review.comment;
          return (
            <div
              key={review.id}
              className="carousel-item flex-1 min-w-full md:min-w-[49%] lg:min-w-[32%]"
            >
              <div className="flex flex-col gap-4 p-4 bg-neutral text-neutral-content rounded-2xl w-full shadow-lg flex flex-col items-center justify-center">
                {/* header */}
                <section className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-[20px] h-[20px] bg-primary rounded-full"></div>
                    <p className="text-primary">{review.user.name}</p>
                  </div>
                  <div>
                    <span className="text-primary !font-bold !text-2xl">
                      {review.average_rating.toFixed(1)}
                    </span>
                    <span className="text-primary">/10</span>
                  </div>
                </section>
                {/* Criterias  */}
                <section className="grid grid-cols-4 w-full gap-2 md:grid-cols-4 md:gap-6  ">
                  {Object.entries(review.criterias).map(([key, value]) => {
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200 py-2 px-4"
                      >
                        <Icon
                          name={iconDict[key]}
                          size={20}
                          strokeWidth={2}
                          color="#480201"
                        />
                        <span className="!font-bold text-primary">{value}</span>
                      </div>
                    );
                  })}
                </section>
                {/* Comment */}
                <section className="flex justify-start w-full">
                  <div className="text-primary h-32 w-full break-words overflow-hidden">
                    <p className="whitespace-pre-wrap">
                      {`" `}{shortComment}
                      {isLong && (
                        <button
                          className="text-secondary"
                        >
                          view more
                        </button>
                      )}
                      {` "`}
                    </p>
                  </div>
                </section>
                {/* footer */}
                <section className="flex justify-end items-center w-full">
                  <p className="text-xs text-primary !text-xsmall">
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </section>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows - only visible on large screens */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
        <button className="" onClick={() => scroll("left")}>
          ❮
        </button>
      </div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
        <button className="" onClick={() => scroll("right")}>
          ❯
        </button>
      </div>
    </section>
  );
}
