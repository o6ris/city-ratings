import Link from "next/link";
import { getOneDistrictInfos } from "./action";

export default async function OneDistrict({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrictInfos(id);
  if (!district) {
    return <div>District not found</div>;
  }
  const rating = district.district_ratings;
  console.log("district", district);
  const scoreColor = () => {
    if (rating.average_rating >= 7) {
      return "bg-success";
    }
    if (rating.average_rating >= 4) {
      return "bg-warning";
    }
    return "bg-error";
  }
  return (
    <section className="flex flex-col gap-8 items-center w-full lg:items-start">
      <h1 className="w-full break-words whitespace-normal">{district.name}</h1>
      <section className="flex gap-4 items-center w-full">
        <div className={`flex-1 flex flex-col items-center gap-4 p-4 rounded-lg ${scoreColor()}`}>
          <h3>Score</h3>
          <div>
              <span className="!text-xlarge !font-black">{rating.average_rating}</span>
              <span>/10</span>
            </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-4 p-4 bg-primary text-secondary rounded-lg">
          <h3>Rank</h3>
          <div>
              <span className="!text-xlarge !font-black">{rating.rank}</span>
              <span>/10</span>
            </div>
        </div>
      </section>
      <Link
        className="btn btn-secondary text-primary rounded-full"
        href={`/district/${district.id}/rating`}
      >
        Rate {district.name}
      </Link>
    </section>
  );
}
