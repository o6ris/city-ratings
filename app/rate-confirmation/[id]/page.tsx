import Link from "next/link";
import { getOneDistrict } from "../../district/[id]/action";
import Survey from "@/components/ui/Survey/Survey";

export default async function RateConfirmation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await getOneDistrict(id);
  return (
    <div className="flex flex-col items-center gap-8 mt-12 lg:mt-0">
      <h3>Thanks for rating {district.name}!</h3>
      <Survey />
      <Link
        className="btn btn-secondary text-primary rounded-full"
        href={`/district/${id}`}
      >
        Go back to {district.name} page
      </Link>
    </div>
  );
}
