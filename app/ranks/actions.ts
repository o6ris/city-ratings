import { createClient } from "@/utils/supabase/server";

export async function getDistrictsByRank() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("district_ratings")
    .select(
      `
    rank,
    average_rating,
    districts (
      id,
      name,
      sector
    )
  `
    )
    .order("rank", { ascending: true });

  if (error) {
    console.error("Error fetching top ranked districts:", error);
    return [];
  }

  const transformed = data.map(({ rank, average_rating, districts }) => {
    const district = Array.isArray(districts) ? districts[0] : districts;

    return {
      rank,
      id: district.id,
      name: district.name,
      sector: district.sector,
      average_rating,
    };
  });

  return transformed;
}
