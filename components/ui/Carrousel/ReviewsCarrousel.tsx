"use client";

import { useRef } from "react";
import RatingCard from "@/components/ui/RatingCard/RatingCard";
import { Review } from "@/types/review";

export default function ReviewsCarrousel({ reviews }: { reviews: Review[] }) {
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
          return (
            <div
              key={review.id}
              className="carousel-item flex-1 min-w-full md:min-w-[49%] lg:min-w-[32%]"
            >
              <RatingCard review={review} />
            </div>
          );
        })}
      </div>

      {/* Arrows - only visible on large screens */}
      <div className="absolute -left-1 lg:-left-6 top-1/2 -translate-y-1/2 z-10">
        <button className="bg-neutral p-2 rounded-full shadow-lg" onClick={() => scroll("left")}>
          ❮
        </button>
      </div>
      <div className="absolute -right-1 lg:-right-6 top-1/2 -translate-y-1/2 z-10">
        <button className="bg-neutral p-2 rounded-full shadow-lg" onClick={() => scroll("right")}>
          ❯
        </button>
      </div>
    </section>
  );
}
