"use server";

import { createClient } from "@/utils/supabase/server";
import { isConnected } from "@/lib/auth-actions";
import { GeoJsonObject } from "geojson";

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
  geojson: GeoJsonObject;
  lat: number;
  lon: number;
  district_ratings: DistrictRating | null;
};

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
      `id,name,population,sector,description,geojson,lat,lon,district_ratings ( district_id, average_rating,safety_security,cost_of_living,healthcare_access,transportation_mobility, environment_nature,education_schools,shops_amenities, sports_recreation, rank
      )`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching district with ratings:", error);
    return null;
  }

  if (!data) return null;

  // district_ratings comes as an array from Supabase join, get the first element
  const ratingData = Array.isArray(data.district_ratings)
    ? data.district_ratings[0]
    : data.district_ratings;

  if (!ratingData) {
    const district: District = {
      id: data.id,
      name: data.name,
      population: data.population,
      sector: data.sector,
      description: data.description,
      geojson: data.geojson,
      lat: data.lat,
      lon: data.lon,
      district_ratings: null,
    };
    return district;
  }

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
    geojson: data.geojson,
    lat: data.lat,
    lon: data.lon,
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

export async function getOneDistrictReviews(
  id: string,
  options?: { limit?: number; offset?: number }
) {
  const { limit = 6, offset = 0 } = options || {};
  const connectedUser = await isConnected();

  // if (process.env.NODE_ENV === "development") {
  //   const { mockReviews } = await import("@/lib/mocks/mockReviews");

  //   const paginated = mockReviews.slice(offset, offset + limit);
  //   return {
  //     reviews: paginated,
  //     total: mockReviews.length,
  //   };
  // }

  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("ratings")
    .select(
      `
      id, comment, created_at, district_id, safety_security, cost_of_living, healthcare_access,
      transportation_mobility, environment_nature, education_schools, shops_amenities,
      sports_recreation, average_rating, users (
        id, name, email, avatar_url
      ), districts(name)`,
      { count: "exact" }
    )
    .eq("district_id", id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [], total: 0 };
  }

  const transformed = data.map((review) => {
    const user = Array.isArray(review.users) ? review.users[0] : review.users;
    const district = Array.isArray(review.districts)
      ? review.districts[0]
      : review.districts;
    const isUserReview = connectedUser && connectedUser.id === user.id;

    return {
      id: review.id,
      comment: review.comment,
      average_rating: review.average_rating,
      created_at: review.created_at,
      is_user_review: isUserReview,
      district_id: review.district_id,
      district: district.name,
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

  return { reviews: transformed, total: count ?? 0 };
}

export async function getOneReview(districtId: string) {
  const supabase = await createClient();
  const user = await isConnected();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("ratings")
    .select(
      `
      id, comment, created_at, district_id, safety_security, cost_of_living, healthcare_access,
      transportation_mobility, environment_nature, education_schools, shops_amenities,
      sports_recreation, average_rating, user_id
      `
    )
    .eq("user_id", user.id)
    .eq("district_id", districtId)
    .single(); // <- expects only one result, will throw if multiple

  if (error) {
    console.error("Error fetching review:", error.message);
    return null;
  }

  return data;
}
