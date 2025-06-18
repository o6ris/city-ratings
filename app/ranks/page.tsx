import { Metadata } from "next";
import { getDistrictsByRank } from "./actions";
import MiniRankedDistrictCard from "@/components/ui/RankedDistrictCard/MiniRankedDistrictCard";
import Modal from "@/components/core/modal/Modal";
import SearchDistrict from "@/components/ui/SearchDistrict/SearchDistrict";

export const metadata: Metadata = {
  title: "Top-Rated Communities in Calgary",
  description:
    "See which communities rank highest in Calgary based on safety, cost, schools, amenities, and more. Updated rankings from real people.",
  keywords: [
    "best communities in Calgary",
    "top Calgary neighborhoods",
    "Calgary district ranking",
    "community scores Calgary",
  ],
};

export default async function Ranks() {
  const districts = await getDistrictsByRank();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="mt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-0">
        {districts.map((district) => {
          return (
            <MiniRankedDistrictCard key={district.id} district={district} />
          );
        })}
      </div>
      <Modal
        triggerBtnContent="Is your community missing?"
        triggerBtnStyle="btn btn-secondary rounded-full text-primary p-8"
        modalId="search-district-from-ranks"
        content={
          <div className="flex flex-col items-center gap-4">
            <strong>Search your community and be the first reviewer!</strong>
            <SearchDistrict modalId="search-district" />
          </div>
        }
      />
    </div>
  );
}
