"use server";

type DistrictRating = {
  rank: number;
  district_id: string;
  average_rating: number;
  cost_of_living: number;
  safety_security: number;
  shops_amenities: number;
  education_schools: number;
  healthcare_access: number;
  sports_recreation: number;
  environment_nature: number;
  transportation_mobility: number;
};

type District = {
  id: string;
  name: string;
  population: number;
  sector: string;
  description: string | null;
  district_ratings: DistrictRating;
};

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

export async function getOneDistrictInfos(id: string): Promise<District | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select(`
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
        sports_recreation,
        rank
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching district with ratings:", error);
    return null;
  }

  console.log("Fetched district data:", data);

  return data as unknown as District;
}

