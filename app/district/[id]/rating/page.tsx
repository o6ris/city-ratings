import { getOneDistrict } from "../action";
import RatingForm from "@/components/ui/DistrictRating/RatingForm";

export default async function OneDistrictRating({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrict(id);
  if (!district) {
    return <div>District not found</div>;
  }
  console.log("district", district);
  return (
    <section className="flex flex-col gap-8 items-center lg:items-start">
      <h1>{district.name}</h1>
      <RatingForm districtId={id} />
    </section>
  );
}
