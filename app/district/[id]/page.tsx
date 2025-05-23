import { getOneDistrict } from "./action";

export default async function OneDistrict({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrict(id);
  if (!district) {
    return <div>District not found</div>;
  }
  console.log("district", district);
  return <div>District: {district.name}</div>;
}
