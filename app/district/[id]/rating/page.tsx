import type { Metadata } from "next";
import { getOneDistrict, getOneReview } from "../action";
import RatingForm from "@/components/ui/DistrictRating/RatingForm";

// ✅ Add dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const district = await getOneDistrict(params.id);

  if (!district) {
    return {
      title: "Rate Your Community | Neighbours Voices",
      description:
        "We couldn’t find this Calgary district. Try again or explore another one.",
    };
  }

  return {
    title: `Rate ${district.name} | Neighbours Voices`,
    description: `Share your experience living in ${district.name}, Calgary. Your feedback helps others find the right community.`,
    keywords: [
      `${district.name} Calgary reviews`,
      `${district.name} community feedback`,
      `living in ${district.name} Calgary`,
      "Calgary neighborhood reviews",
    ],
    openGraph: {
      title: `Reviews for ${district.name} | Neighbours Voices`,
      description: `Read reviews for ${district.name}, Calgary. Insights from real residents on quality of life, affordability, and more.`,
      url: `https://www.neighboursvoices.ca/district/${params.id}/reviews`,
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

export default async function OneDistrictRating({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrict(id);
  const review = await getOneReview(id);

  return (
    <section className="flex flex-col gap-10 items-center mt-8 lg:mt-0 lg:items-start">
      <h1 className="w-full break-words whitespace-normal">{district.name}</h1>
      <RatingForm districtId={id} review={review} />
    </section>
  );
}
