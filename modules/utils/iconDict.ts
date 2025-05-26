import { icons } from "lucide-react";

export type LucideIconName = keyof typeof icons;

const iconDict: Record<string, LucideIconName> = {
  safety_security: "ShieldUser",
  cost_of_living: "CircleDollarSign",
  healthcare_access: "HeartPlus",
  sports_recreation: "Dumbbell",
  environment_nature: "Trees",
  transportation_mobility: "BusFront",
  education_schools: "BookText",
  shops_amenities: "Store",
};

export default iconDict;
