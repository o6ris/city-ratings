"use client";

import Link from "next/link";
import Icon from "@/components/core/Icons/Icon";
import iconDict from "@/modules/utils/iconDict";
import CriteriaInfos from "../CriteriaInfos/CriteriaInfos";

type districtProps = {
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

export default function RankedDistrictCard({ district }: districtProps) {
  const maxChartDistrictName = 18;
  const districtName = district.name;
  const isDistrictNameLong = districtName.length > maxChartDistrictName;
  const shortDistrictName = isDistrictNameLong
    ? districtName.slice(0, maxChartDistrictName).trim() + "..."
    : districtName;

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-neutral text-neutral-content rounded-t-2xl w-full shadow-lg flex flex-col items-center justify-center">
        {/* header */}
        <section className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <p className="text-primary">
              {shortDistrictName} - {district.sector}
            </p>
          </div>
          <div>
            <span className="text-primary !font-bold !text-2xl">
              {district.average_rating.toFixed(2)}
            </span>
            <span className="text-primary">/10</span>
          </div>
        </section>
        {/* Criterias  */}
        <section className="grid grid-cols-4 w-full gap-2 md:grid-cols-4 md:gap-6  ">
          {Object.entries(district.criterias).map(([key, value]) => {
            return (
              <div key={key}>
                <CriteriaInfos
                  triggerBtnContent={
                    <div className="flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200 py-2 px-4 hover:bg-base-300">
                      <Icon
                        name={iconDict[key]}
                        size={20}
                        strokeWidth={2}
                        color="#480201"
                      />
                      <span className="!font-bold text-primary">{value}</span>
                    </div>
                  }
                  triggerBtnStyle="w-full"
                  criteriaName={key}
                />
              </div>
            );
          })}
        </section>
        {/* footer */}
      </div>
      <section className="flex justify-center items-center w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl p-2">
        <span className="text-primary !font-black !text-medium">
          Top {district.rank}
        </span>
      </section>
    </>
  );
}
