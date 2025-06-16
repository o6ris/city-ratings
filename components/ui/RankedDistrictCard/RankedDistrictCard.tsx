"use client";

import Link from "next/link";
import Icon from "@/components/core/Icons/Icon";
import iconDict from "@/modules/utils/iconDict";
import CriteriaInfos from "@/components/ui/CriteriaInfos/CriteriaInfos";
import { districtRanks } from "@/types/districtRanks";

export default function RankedDistrictCard({ district }: districtRanks) {
  const maxChartDistrictName = 15;
  const districtName = district.name;
  const isDistrictNameLong = districtName.length > maxChartDistrictName;
  const shortDistrictName = isDistrictNameLong
    ? districtName.slice(0, maxChartDistrictName).trim() + "..."
    : districtName;

  const renderRankedColor = () => {
    if (district.rank === 1)
      return "from-yellow-500 via-yellow-300 to-yellow-500";
    else if (district.rank === 2)
      return "from-slate-500 via-slate-300 to-slate-500";
    else return "from-orange-800 via-orange-300 to-orange-800";
  };

  return (
    <div>
      <div className="flex flex-col gap-4 p-4 bg-neutral text-neutral-content rounded-t-2xl w-full shadow-lg items-center justify-center">
        {/* header */}
        <section className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Link
              href={`/district/${district.id}`}
              className="text-primary font-bold"
            >
              {shortDistrictName} - {district.sector}
            </Link>
          </div>
          <div>
            <span className="text-primary !font-bold !text-2xl">
              {district.average_rating.toFixed(2)}
            </span>
            <span className="text-primary">/10</span>
          </div>
        </section>
        {/* Criterias  */}
        <section className="grid grid-cols-4 w-full gap-2 md:grid-cols-4 md:gap-4">
          {Object.entries(district.criterias).map(([key, value]) => {
            return (
              <div key={key}>
                <CriteriaInfos
                  triggerBtnContent={
                    <div className="flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200 py-2 px-3 hover:bg-base-300">
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
      <section
        className={`flex justify-center items-center w-full bg-gradient-to-r ${renderRankedColor()} rounded-b-2xl p-2`}
      >
        <span className="text-primary !font-black !text-medium">
          Top {district.rank}
        </span>
      </section>
    </div>
  );
}
