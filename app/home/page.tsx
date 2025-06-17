import { getTopDistricts, getlastReviews } from "./action";
import ReviewsCarrousel from "@/components/ui/Carrousel/ReviewsCarrousel";
import SearchDistrict from "@/components/ui/SearchDistrict/SearchDistrict";
import RankedDistrictCard from "@/components/ui/RankedDistrictCard/RankedDistrictCard";
import MiniRankedDistrictCard from "@/components/ui/RankedDistrictCard/MiniRankedDistrictCard";
import Modal from "@/components/core/modal/Modal";
import iconDict from "@/modules/utils/iconDict";
import criteriasDict from "@/modules/utils/criteriasDict";
import Icon from "@/components/core/Icons/Icon";

export default async function Home() {
  const topDistricts = await getTopDistricts();
  const reviews = await getlastReviews({ limit: 10 });

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 -mx-4 -mt-18 w-screen bg-[url(/Downtown_Calgary.jpg)] bg-cover bg-center text-white pt-32 pb-8 px-4 lg:-mx-[10rem] lg:-mt-[12rem] lg:px-[10rem] overflow-hidden">
        <div>
          <h1 className="leading-12 !text-xlarge text-shadow-lg lg:!text-xxlarge">
            Find your perfect community to live
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
      {/* TOP 3 */}
      <section className="flex flex-col gap-8">
        <h3>Top 3 communities</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {topDistricts.slice(0, 3).map((district) => (
            <RankedDistrictCard key={district.id} district={district} />
          ))}
        </div>
      </section>
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
      {/* TOP 10 DISTRICTS */}
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
        </div>
      </section>
    </section>
  );
}
