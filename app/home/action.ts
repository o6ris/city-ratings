"use server";

import { createClient } from "@/utils/supabase/server";
import { isConnected } from "@/lib/auth-actions";

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

  const transformed = data.map(
    ({
      rank,
      average_rating,
      safety_security,
      cost_of_living,
      healthcare_access,
      transportation_mobility,
      environment_nature,
      education_schools,
      shops_amenities,
      sports_recreation,
      districts,
    }) => {
      const district = Array.isArray(districts) ? districts[0] : districts;

      return {
        rank,
        id: district.id,
        name: district.name,
        sector: district.sector,
        average_rating,
        criterias: {
          safety_security,
          cost_of_living,
          healthcare_access,
          transportation_mobility,
          environment_nature,
          education_schools,
          shops_amenities,
          sports_recreation,
        },
      };
    }
  );

  return transformed;
}

export async function getlastReviews(options?: {
  limit?: number;
  offset?: number;
}) {
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
      ), districts (name)`,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [], total: 0 };
  }

  const transformed = data.map((review) => {
    const user = Array.isArray(review.users) ? review.users[0] : review.users;
    const district = Array.isArray(review.districts) ? review.districts[0] : review.districts;
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
