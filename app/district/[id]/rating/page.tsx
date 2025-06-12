import { getOneDistrict, getOneReview } from "../action";
import RatingForm from "@/components/ui/DistrictRating/RatingForm";

export default async function OneDistrictRating({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrict(id);
  const review = await getOneReview(id);

  return (
    <section className="flex flex-col gap-8 items-center mt-8 lg:mt-0 lg:items-start">
      <h1 className="w-full break-words whitespace-normal">{district.name}</h1>
      <RatingForm districtId={id} review={review} />
    </section>
  );
}
