"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOneDistrict(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching district:", error);
    return null;
  }

  return data;
}
