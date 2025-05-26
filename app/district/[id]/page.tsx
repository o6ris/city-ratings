import Link from "next/link";
import { getOneDistrictInfos } from "./action";
import { getoneDistrictReviews } from "./action";
import ReviewsCarrousel from "@/components/ui/Carrousel/ReviewsCarrousel";
import iconDict from "@/modules/utils/iconDict";
import criteriasDict from "@/modules/utils/criteriasDict";
import Icon from "@/components/core/Icons/Icon";

export default async function OneDistrict({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrictInfos(id);
  const reviews = await getoneDistrictReviews(id);
  console.log("reviews", reviews);
  console.log("district", district);
  if (!district) {
    return <div>District not found</div>;
  }
  const rating = district.district_ratings;
  const scoreColor = () => {
    if (rating.average_rating >= 7) {
      return "bg-success";
    }
    if (rating.average_rating >= 4) {
      return "bg-warning";
    }
    return "bg-error";
  };
  return (
    <section className="flex flex-col gap-8 items-center w-full lg:items-start">
      <h1 className="w-full break-words whitespace-normal">{district.name}</h1>
      {/* SCORE & RANK */}
      <section className="flex gap-4 items-center w-full">
        <div
          className={`flex-1 flex flex-col items-center gap-4 p-4 rounded-2xl xl:flex-none xl:w-[400px] ${scoreColor()}`}
        >
          <h3>Score</h3>
          <div>
            <span className="!text-xlarge !font-black">
              {rating.average_rating}
            </span>
            <span>/10</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-4 p-4 bg-primary text-secondary rounded-2xl xl:flex-none xl:w-[400px]">
          <h3>Rank</h3>
          <div>
            <span className="!text-xlarge !font-black">{rating.rank}</span>
            <span>/10</span>
          </div>
        </div>
      </section>
      {/* CRITERIAS */}
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {Object.entries(district.district_ratings.criterias).map(
          ([key, value]) => {
            return (
              <div
                key={key}
                className="flex flex-col rounded-2xl bg-neutral shadow-md border border-base-200 p-2"
              >
                <Icon name={iconDict[key]} size={20} color="#480201" />
                <p className="truncate w-full">{criteriasDict[key]}</p>
                <span className="!text-xlarge !font-black">{value}</span>
              </div>
            );
          }
        )}
      </section>
      <Link
        className="btn btn-secondary text-primary rounded-full"
        href={`/district/${district.id}/rating`}
      >
        Rate {district.name}
      </Link>
      <h2>Last reviews</h2>
      <ReviewsCarrousel reviews={reviews} />
    </section>
  );
}
