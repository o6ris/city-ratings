"use server";

type DistrictRatingCriterias = {
  cost_of_living: number;
  safety_security: number;
  shops_amenities: number;
  education_schools: number;
  healthcare_access: number;
  sports_recreation: number;
  environment_nature: number;
  transportation_mobility: number;
};

type DistrictRating = {
  rank: number;
  district_id: string;
  average_rating: number;
  criterias: DistrictRatingCriterias;
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

export async function getOneDistrictInfos(
  id: string
): Promise<District | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select(
      `id,name,population,sector,description,district_ratings ( district_id, average_rating,safety_security,cost_of_living,healthcare_access,transportation_mobility, environment_nature,education_schools,shops_amenities, sports_recreation, rank
      )`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching district with ratings:", error);
    return null;
  }

  if (!data || !data.district_ratings) return null;

  // district_ratings comes as an array from Supabase join, get the first element
  const ratingData = Array.isArray(data.district_ratings)
    ? data.district_ratings[0]
    : data.district_ratings;

  if (!ratingData) return null;

  const {
    cost_of_living,
    safety_security,
    shops_amenities,
    education_schools,
    healthcare_access,
    sports_recreation,
    environment_nature,
    transportation_mobility,
    district_id,
    average_rating,
    rank,
  } = ratingData;

  const district: District = {
    id: data.id,
    name: data.name,
    population: data.population,
    sector: data.sector,
    description: data.description,
    district_ratings: {
      district_id,
      average_rating,
      rank,
      criterias: {
        cost_of_living,
        safety_security,
        shops_amenities,
        education_schools,
        healthcare_access,
        sports_recreation,
        environment_nature,
        transportation_mobility,
      },
    },
  };

  return district;
}

export async function getoneDistrictReviews(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ratings")
    .select(
      `id, comment, created_at, district_id, safety_security, cost_of_living, healthcare_access, transportation_mobility, environment_nature, education_schools, shops_amenities, sports_recreation, created_at, users (
        id, name, email, avatar_url
      )`
    )
    .eq("district_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching district reviews:", error);
    return [];
  }

  const transformed = data.map((review) => {
    const user = Array.isArray(review.users) ? review.users[0] : review.users;
    const total =
      (review.safety_security +
        review.cost_of_living +
        review.healthcare_access +
        review.transportation_mobility +
        review.environment_nature +
        review.education_schools +
        review.shops_amenities +
        review.sports_recreation) /
      8;

    return {
      id: review.id,
      comment: review.comment,
      average_rating: Math.round(total * 100) / 100,
      created_at: review.created_at,
      user: {
        name: user?.name || "Anonymous",
        avatar_url: user?.avatar_url || "No Avatar",
        email: user?.email,
      },
      criterias: {
        safety_security: review.safety_security,
        cost_of_living: review.cost_of_living,
        healthcare_access: review.healthcare_access,
        transportation_mobility: review.transportation_mobility,
        environment_nature: review.environment_nature,
        education_schools: review.education_schools,
        shops_amenities: review.shops_amenities,
        sports_recreation: review.sports_recreation,
      },
    };
  });

  return transformed;
}
