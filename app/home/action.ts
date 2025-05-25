"use server";

import { createClient } from "@/utils/supabase/server";

export async function getDistricts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching districts:", error);
    return [];
  }

  return data;
}
