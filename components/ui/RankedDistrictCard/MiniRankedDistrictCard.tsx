import Link from "next/link";
import { districtRanks } from "@/types/districtRanks";

export default function MiniRankedDistrictCard({ district }: districtRanks) {
  const renderRankedColor = () => {
    if (district.rank === 1)
      return "bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500";
    else if (district.rank === 2)
      return "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500";
    else if (district.rank === 3)
      return "bg-gradient-to-r from-orange-800 via-orange-300 to-orange-800";
    else return "bg-neutral";
  };
  return (
    <Link
      href={`district/${district.id}`}
      className={`flex justify-between ${renderRankedColor()} p-4 rounded-2xl shadow-md hover:opacity-80 hover:scale-101`}
      key={district.id}
    >
      <div className="flex gap-2 text-primary">
        <span className="!font-black">#{district.rank}</span>
        <span className="!font-bold">{district.name}</span>- {district.sector}
      </div>
      <p className="!font-black">{district.average_rating}</p>
    </Link>
  );
}
