import { getDistricts } from "./action";
import Link from "next/link";

export default async function Home() {
  const districts = await getDistricts();
  return (
    <section>
      <h1>Districts</h1>
      <ul>
        {districts.map((district) => (
          <li key={district.id}>
            <Link href={`/district/${district.id}`}>{district.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
