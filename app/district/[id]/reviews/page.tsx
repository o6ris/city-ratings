import { getOneDistrictReviews } from "../action";
import Link from "next/link";
import Icon from "@/components/core/Icons/Icon";
import Pagination from "@/components/ui/Pagination/Pagination";
import RatingCard from "@/components/ui/RatingCard/RatingCard";

export default async function ReviewsPage({
  searchParams,
  params,
}: {
  searchParams: { page?: string };
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = Number(searchParams?.page ?? 1);
  const limit = 12;
  const offset = (page - 1) * limit;

  const { reviews, total } = await getOneDistrictReviews(id, { limit, offset });

  return (
    <section className="flex flex-col gap-8 mt-10 lg:mt-0 md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 mt-4">
      <Link className="flex gap-2 items-center" href={`/district/${id}`}> <Icon name="MoveLeft" strokeWidth={2} size={20} /> Go back</Link>
      {reviews.map((review) => {
        return (
          <div key={review.id} className="flex-1 min-w-full">
            <RatingCard review={review} />
          </div>
        );
      })}
          <Pagination
      currentPage={page}
      totalPages={Math.ceil(total / limit)}
      basePath={`/district/${id}/reviews`} // adjust if your route is different
    />
    </section>
  );
}
