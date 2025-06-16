"use server";

import { createClient } from "@/utils/supabase/server";

export async function getDistricts(query: string) {
  if (!query.trim()) return []; // ⛔️ Skip request if empty or only spaces

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .ilike("name", `%${query}%`) // ilike is case-insensitive
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching districts:", error);
    return [];
  }

  return data;
}

export async function getTopDistricts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("district_ratings")
    .select(
      `
    rank,
    district_id,
    average_rating,
    safety_security,
    cost_of_living,
    healthcare_access,
    transportation_mobility,
    environment_nature,
    education_schools,
    shops_amenities,
    sports_recreation,
    districts (
      id,
      name,
      sector
    )
  `
    )
    .order("rank", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Error fetching top ranked districts:", error);
    return [];
  }

  return data;
}
