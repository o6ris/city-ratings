type CriteriaInfo = {
  title: string; // Short title (formerly label)
  subTitle: string; // Section header (formerly title)
  intro: string; // One-sentence intro
  explanation: string; // Longer description
};

const criteriasDict: Record<string, CriteriaInfo> = {
  safety_security: {
    title: "Safety & Security",
    subTitle: "Safety and Peace of Mind",
    intro: "Is it a place where you feel secure day and night?",
    explanation:
      "This reflects crime levels, police presence, street lighting, and your personal sense of safety when walking around the neighborhood. Rate from 1 (very unsafe) to 10 (extremely safe).",
  },
  cost_of_living: {
    title: "Affordability",
    subTitle: "Affordability of Daily Life",
    intro: "How expensive is it to live here compared to other areas?",
    explanation:
      "Rate the overall cost of living including rent or mortgages, groceries, utilities, and general affordability of daily needs. Rate from 1 (very expensive) to 10 (very affordable).",
  },
  healthcare_access: {
    title: "Healthcare Access",
    subTitle: "Access to Medical Services",
    intro: "Can you easily reach quality healthcare when needed?",
    explanation:
      "Think about the availability and proximity of clinics, hospitals, family doctors, walk-in centers, and pharmacies. Rate from 1 (very poor access) to 10 (excellent access).",
  },
  sports_recreation: {
    title: "Sports & Recreation",
    subTitle: "Spaces to Play and Stay Active",
    intro:
      "Are there enough places and activities to stay healthy and entertained?",
    explanation:
      "Includes parks, trails, gyms, sports facilities, community centers, and other recreation options for all ages. Rate from 1 (very limited) to 10 (plenty of options).",
  },
  environment_nature: {
    title: "Environment & Nature",
    subTitle: "Clean and Green Living",
    intro: "Is the area clean, peaceful, and surrounded by nature?",
    explanation:
      "Evaluate air quality, noise, cleanliness, and the presence of green spaces like trees, parks, and rivers. Rate from 1 (poor environment) to 10 (very clean and green).",
  },
  transportation_mobility: {
    title: "Transportation & Mobility",
    subTitle: "Ease of Getting Around",
    intro:
      "Is transportation convenient whether you drive, walk, bike, or take transit?",
    explanation:
      "Covers public transit, traffic flow, bike lanes, walkability, road conditions, and commute times. Rate from 1 (very inconvenient) to 10 (very easy to get around).",
  },
  education_schools: {
    title: "Education & Schools",
    subTitle: "Quality of Education Options",
    intro: "Do schools in the area meet your standards and needs?",
    explanation:
      "This includes the quality and variety of public and private schools, daycare options, and educational resources. Rate from 1 (poor education) to 10 (excellent education options).",
  },
  shops_amenities: {
    title: "Shops & Amenities",
    subTitle: "Access to Everyday Essentials",
    intro: "Are shops and services within easy reach?",
    explanation:
      "Includes grocery stores, restaurants, pharmacies, gyms, banks, and all the basic services that support daily life. Rate from 1 (very limited access) to 10 (great variety and convenience).",
  },
};

export default criteriasDict;
