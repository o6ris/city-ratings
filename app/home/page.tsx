import { isConected } from "@/app/login/actions";
import { getDistricts } from "./action";
import Link from "next/link";

export default async function Home() {
  const user = await isConected();
  const districts = await getDistricts();
  return (
    <section>
      <p>Hello {user.email}</p>
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
