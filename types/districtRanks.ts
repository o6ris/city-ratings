export type districtRanks = {
  district: {
    id: string;
    name: string;
    sector: string;
    rank: number;
    average_rating: number;
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
  };
};