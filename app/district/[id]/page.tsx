import type { Metadata } from "next";
import Link from "next/link";
import { getOneDistrictInfos, getOneDistrictReviews } from "./action";
import ReviewsCarrousel from "@/components/ui/Carrousel/ReviewsCarrousel";
import iconDict from "@/modules/utils/iconDict";
import criteriasDict from "@/modules/utils/criteriasDict";
import Icon from "@/components/core/Icons/Icon";
import CriteriaInfos from "@/components/ui/CriteriaInfos/CriteriaInfos";
import DistrictMap from "@/components/ui/DistrictMap/DistrictMap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const district = await getOneDistrictInfos((await params).id);

  if (!district) {
    return {
      title: "Community Not Found | Neighbours Voices",
      description: "This Calgary community could not be found.",
    };
  }

  return {
    title: `${district.name} | Neighbours Voices`,
    description: `Explore real reviews and scores for ${district.name}, a Calgary community rated by locals on safety, cost of living, schools, nature, and more.`,
    keywords: [
      `${district.name} Calgary`,
      `${district.name} neighborhood review`,
      `${district.name} community score`,
      "Calgary neighborhood ranking",
      "Calgary best districts",
    ],
    openGraph: {
      title: `${district.name} | Neighbours Voices`,
      description: `See how ${district.name} ranks among Calgary neighborhoods. Read real reviews and scores from residents.`,
      url: `https://www.neighboursvoices.ca/district/${(await params).id}`,
      siteName: "Neighbours Voices",
      locale: "en_CA",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${district.name} | Neighbours Voices`,
      description: `Explore what locals say about ${district.name} in Calgary. Score based on real reviews.`,
    },
  };
}

export default async function OneDistrict({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrictInfos(id);
  const reviews = await getOneDistrictReviews(id, { limit: 6 });

  if (!district) {
    return (
      <section className="flex flex-col gap-8 w-full items-start">
        <h1 className="w-full break-words whitespace-normal">
          District not found
        </h1>
      </section>
    );
  }

  const rating = district?.district_ratings;

  const scoreColor = () => {
    if (rating) {
      if (rating.average_rating >= 7) {
        return "bg-success";
      }
      if (rating.average_rating >= 4) {
        return "bg-warning";
      }
      return "bg-error";
    }
    return "bg-neutral";
  };

  return (
    <div className="flex flex-col gap-8 w-full items-start mt-10 lg:mt-0">
      <section className="flex flex-col gap-8 w-full items-start">
        <h1 className="w-full break-words whitespace-normal">
          {district.name}
        </h1>

        {rating ? (
          <div className="flex flex-col gap-8 w-full">
            {/* SCORE & RANK */}
            <section className="flex gap-4 items-center w-full">
              <div
                className={`flex-1 flex flex-col items-center p-4 rounded-2xl xl:flex-none xl:w-[400px] ${scoreColor()}`}
              >
                <div className={`flex-1 flex flex-col items-center`}>
                  <h3>Score</h3>
                  <div>
                    <span className="!text-xxlarge !font-black">
                      {rating.average_rating}
                    </span>
                    <span>/10</span>
                  </div>
                </div>
                <p className="!text-xsmall">
                  Based on <strong>{reviews.total}</strong> reviews
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center p-6 bg-primary text-secondary rounded-2xl xl:flex-none xl:w-[400px]">
                <h3>Rank</h3>
                <div>
                  <span className="!text-xxlarge !font-black">
                    {rating.rank}
                  </span>
                  <span>/200</span>
                </div>
              </div>
            </section>

            {/* CRITERIAS */}
            <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {Object.entries(rating.criterias).map(([key, value]) => (
                <div key={key} className="">
                  <CriteriaInfos
                    triggerBtnContent={
                      <div className="flex flex-col items-center rounded-2xl bg-neutral shadow-md border border-base-200 p-2 hover:bg-base-300">
                        <Icon name={iconDict[key]} size={20} color="#480201" />
                        <p className="truncate w-full">
                          {criteriasDict[key].title}
                        </p>
                        <span className="!text-xlarge !font-black">
                          {value}<span>/10</span>
                        </span>
                      </div>
                    }
                    triggerBtnStyle="w-full"
                    criteriaName={key}
                  />
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-8 w-full bg-base-300 py-20 px-10 rounded-2xl">
            Be the first to leave a review, your feedback could help others!
          </div>
        )}
        <Link
          className="btn btn-wide btn-secondary text-primary rounded-full mx-auto"
          href={`/district/${district.id}/rating`}
        >
          Rate {district.name}
        </Link>
      </section>

      {reviews.reviews.length > 0 && (
        <>
          <h2>Last reviews</h2>
          <ReviewsCarrousel reviews={reviews.reviews} />
          <Link
            className="btn btn-wide btn-secondary text-primary rounded-full mx-auto"
            href={`/district/${district.id}/reviews`}
          >
            {" "}
            View all
          </Link>
        </>
      )}

      <h2>More informations</h2>
      <section className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2 bg-neutral p-4 rounded-2xl box-shadow border border-base-200">
          <p>Population</p>
          <p className="!text-medium !font-bold">
            {district.population.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-neutral p-4 rounded-2xl box-shadow border border-base-200">
          <p>Quadrant</p>
          <p className="!text-medium !font-bold">
            {district.sector.charAt(0).toUpperCase() + district.sector.slice(1)}
          </p>
        </div>
      </section>
      <DistrictMap
        geojson={district.geojson}
        lat={district.lat}
        lon={district.lon}
      />
    </div>
  );
}
