import React from "react";
import Link from "next/link";
import { getOneDistrict } from "../../district/[id]/action";

export default async function RateConfirmation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrict(id);
  return (
    <div className="flex flex-col items-center gap-8 mt-12 lg:mt-0">
      <h2>Thanks for rating {district.name}!</h2>
      <Link className="btn btn-secondary text-primary rounded-full" href={`/district/${id}`}>Go back to {district.name} page</Link>
    </div>
  );
}
