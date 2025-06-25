import type { Metadata } from "next";
import { getOneDistrictReviews, getOneDistrictInfos } from "../action";
import Link from "next/link";
import Icon from "@/components/core/Icons/Icon";
import Pagination from "@/components/ui/Pagination/Pagination";
import RatingCard from "@/components/ui/RatingCard/RatingCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const district = await getOneDistrictInfos((await params).id);

  if (!district) {
    return {
      title: "Community Reviews Not Found | Neighbours Voices",
      description: "We couldn’t find reviews for this Calgary community.",
    };
  }

  return {
    title: `Reviews for ${district.name} | Neighbours Voices`,
    description: `Read what residents say about living in ${district.name}, Calgary. Explore community reviews and feedback on safety, cost, schools, nature, and more.`,
    keywords: [
      `${district.name} Calgary reviews`,
      `${district.name} community feedback`,
      `living in ${district.name} Calgary`,
      "Calgary neighborhood reviews",
    ],
    openGraph: {
      title: `Reviews for ${district.name} | Neighbours Voices`,
      description: `Read reviews for ${district.name}, Calgary. Insights from real residents on quality of life, affordability, and more.`,
      url: `https://www.neighboursvoices.ca/district/${
        (await params).id
      }/reviews`,
      siteName: "Neighbours Voices",
      locale: "en_CA",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `Reviews for ${district.name} | Neighbours Voices`,
      description: `Discover how locals rate ${district.name} in Calgary. Real reviews from real people.`,
    },
  };
}

export default async function ReviewsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = Number((await searchParams)?.page ?? 1);
  const limit = 12;
  const offset = (page - 1) * limit;

  const { reviews, total } = await getOneDistrictReviews(id, { limit, offset });

  return (
    <section className="flex flex-col gap-8 mt-10 lg:mt-0 mt-4">
      <Link className="flex gap-2 items-center" href={`/district/${id}`}>
        {" "}
        <Icon name="MoveLeft" strokeWidth={2} size={20} /> Go back
      </Link>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 ">
        {reviews.map((review) => {
          return (
            <div key={review.id} className="flex-1 min-w-full">
              <RatingCard review={review} />
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(total / limit)}
        basePath={`/district/${id}/reviews`} // adjust if your route is different
      />
    </section>
  );
}
