"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOneDistrict(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching district:", error);
    return null;
  }

  return data;
}

export async function getOneDistrictInfos(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select(
      `
      id,
      name,
      population,
      sector,
      description,
      district_ratings (
        district_id,
        average_rating,
        safety_security,
        cost_of_living,
        healthcare_access,
        transportation_mobility,
        environment_nature,
        education_schools,
        shops_amenities,
        sports_recreation
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching district with ratings:", error);
    return null;
  }

  return data;
}
