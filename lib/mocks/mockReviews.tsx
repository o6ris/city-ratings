import { v4 as uuid } from "uuid";

export const mockReviews = Array.from({ length: 100 }, (_, i) => {
  const base = {
    id: uuid(),
    comment: `Mock comment #${i + 1}`,
    average_rating: +(Math.random() * 5 + 3).toFixed(2), // 3.00 to 8.00
    created_at: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(), // 1 hour apart
    user: {
      name: i % 3 === 0 ? "Anonymous" : `User ${i + 1}`,
      avatar_url: i % 3 === 0 ? "No Avatar" : `https://placehold.co/48x48?text=U${i + 1}`,
      email: `user${i + 1}@example.com`,
    },
    criterias: {
      safety_security: Math.ceil(Math.random() * 10),
      cost_of_living: Math.ceil(Math.random() * 10),
      healthcare_access: Math.ceil(Math.random() * 10),
      transportation_mobility: Math.ceil(Math.random() * 10),
      environment_nature: Math.ceil(Math.random() * 10),
      education_schools: Math.ceil(Math.random() * 10),
      shops_amenities: Math.ceil(Math.random() * 10),
      sports_recreation: Math.ceil(Math.random() * 10),
    },
  };
  return base;
});
