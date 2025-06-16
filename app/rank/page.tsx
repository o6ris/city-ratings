import { getTopDistricts } from "../home/action";
import MiniRankedDistrictCard from "@/components/ui/RankedDistrictCard/MiniRankedDistrictCard";

export default async function Rank() {
  const districts = await getTopDistricts();

  return (
    <div className="mt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {districts.map((district) => {
        return <MiniRankedDistrictCard key={district.id} district={district} />;
      })}
    </div>
  );
}
