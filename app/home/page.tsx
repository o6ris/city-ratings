import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log("error!!!!!", error);
    console.log("data!!!!!", data);
    return <p>Home!!!!</p>;
  }
  console.log("user", data.user);
  return <p>Hello {data.user.email}</p>;
}
