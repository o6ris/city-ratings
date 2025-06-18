"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllDistricts() {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select("id,name")

  if (error) {
    console.error("Error fetching districts:", error);
    return [];
  }

  return data;
}