"use server";

import { createClient } from "@/utils/supabase/server";

export async function getDistricts(query: string) {
  if (!query.trim()) return []; // ⛔️ Skip request if empty or only spaces

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .ilike("name", `%${query}%`) // ilike is case-insensitive
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching districts:", error);
    return [];
  }

  console.log("data", data)

  return data;
}

