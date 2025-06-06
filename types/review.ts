export type Review = {
  id: string;
  average_rating: number;
  comment: string;
  created_at: string;
  is_user_review: boolean | null;
  criterias: {
    safety_security: number;
    cost_of_living: number;
    healthcare_access: number;
    transportation_mobility: number;
    environment_nature: number;
    education_schools: number;
    shops_amenities: number;
    sports_recreation: number;
  };
  user: {
    name: string | null;
    email: string;
    avatar_url: string | null;
  };
};
