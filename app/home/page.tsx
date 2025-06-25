import { Metadata } from "next";
import { getTopDistricts, getlastReviews } from "./action";
import ReviewsCarrousel from "@/components/ui/Carrousel/ReviewsCarrousel";
import SearchDistrict from "@/components/ui/SearchDistrict/SearchDistrict";
import RankedDistrictCard from "@/components/ui/RankedDistrictCard/RankedDistrictCard";
import MiniRankedDistrictCard from "@/components/ui/RankedDistrictCard/MiniRankedDistrictCard";
import Modal from "@/components/core/modal/Modal";
import iconDict from "@/modules/utils/iconDict";
import criteriasDict from "@/modules/utils/criteriasDict";
import Icon from "@/components/core/Icons/Icon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find the Best Community in Calgary",
  description:
    "Neighbour reviews, safety, cost of living, schools, and more — find your perfect community in Calgary today.",
  keywords: [
    "Calgary communities",
    "where to live in Calgary",
    "Calgary neighborhoods",
    "community ratings Calgary",
    "best neighborhood Calgary",
  ],
};

export default async function Home() {
  const topDistricts = await getTopDistricts();
  const reviews = await getlastReviews({ limit: 10 });

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 -mx-4 -mt-18 w-screen bg-[url(/Downtown_Calgary.jpg)] bg-cover bg-center text-white pt-32 pb-8 px-4 lg:-mx-[10rem] lg:-mt-[12rem] lg:px-[10rem] overflow-hidden">
        <div>
          <h1 className="leading-12 !text-xlarge text-shadow-lg lg:!text-xxlarge">
            Find your perfect community to live in Calgary
          </h1>
          <h2 className="leading-12 !text-sm text-shadow-lg lg:!text-medium">
            Powered by real opinions from real residents
          </h2>
        </div>
        <Modal
          modalId="search-district"
          content={<SearchDistrict modalId="search-district" />}
          triggerBtnContent="Rate your community"
          triggerBtnStyle="btn bg-secondary rounded-full mr-auto shadow-none border-none text-primary font-bold"
        />
      </header>
      {/* How it works */}
      <section className="flex flex-col gap-4">
        <h3>How it works</h3>
        <p>
          We gather reviews directly from residents living in Calgary’s
          communities. Each community is scored based on 8 key criteria like
          safety, cost of living, public transport, and access to nature. Your
          voice helps others find their ideal place, and theirs can help you.
        </p>
      </section>
      {/* TOP 3 */}
      {topDistricts.length > 0 && (
        <section className="flex flex-col gap-8">
          <h3>Top 3 communities</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topDistricts.slice(0, 3).map((district) => (
              <RankedDistrictCard key={district.id} district={district} />
            ))}
          </div>
        </section>
      )}
      {/* Criterias info */}
      <section className="bg-base-300 -mx-4 lg:-mx-[10rem]">
        <div className="flex flex-col gap-4 p-4 lg:px-[10rem]">
          <div>
            <h3>Why community score matters?</h3>
            <p>
              Finding the right community goes beyond just a nice house. It’s
              about how safe you feel, how much you spend, how easily you get
              around, and what life feels like day to day. Our Community Score
              brings together real voices and practical factors :
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(iconDict).map(([key, value]) => {
              return (
                <div
                  className="flex flex-col gap-2 bg-neutral p-4 rounded-2xl"
                  key={key}
                >
                  <div className="flex gap-2 items-center">
                    <Icon name={value} size={20} />
                    <strong>{criteriasDict[key].title}</strong>
                  </div>
                  <p>{criteriasDict[key].explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAST REVIEWS */}
      <section>
        {reviews.reviews.length > 0 && (
          <>
            <h2>Last reviews</h2>
            <ReviewsCarrousel reviews={reviews.reviews} />
          </>
        )}
      </section>
      <section className="flex gap-4 flex-col lg:flex-row lg:items-center lg:justify-center">
        <div className="flex flex-1 flex-col gap-2 items-center p-8 bg-base-300 rounded-2xl">
          <Icon name="ClockArrowUp" size={36} />
          <p>Real-time updates from residents across Calgary</p>
        </div>
        <div className="flex flex-1 flex-col gap-2 items-center p-8 bg-base-300 rounded-2xl">
          <Icon name="Speech" size={36} />
          <p>No bots. No fake ratings. Just real people.</p>
        </div>
      </section>
      {/* TOP 10 DISTRICTS */}
      {topDistricts.length > 0 && (
        <section className="flex flex-col gap-8">
          <h3>Top 10 communities</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topDistricts.map((district) => {
              return (
                <MiniRankedDistrictCard
                  key={district.id}
                  district={{
                    rank: district.rank,
                    id: district.id,
                    name: district.name,
                    sector: district.sector,
                    average_rating: district.average_rating,
                  }}
                />
              );
            })}
            <Link
              className="btn text-primary flex items-center justify-center gap-4 rounded-2xl  h-full"
              href={"/ranks"}
            >
              See all <Icon name="MoveRight" strokeWidth={2} size={20} />
            </Link>
          </div>
        </section>
      )}
    </section>
  );
}
