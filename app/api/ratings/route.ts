import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const ratingSchema = z.object({
  district_id: z.string().uuid(),
  safety_security: z.number().int().min(1).max(10),
  cost_of_living: z.number().int().min(1).max(10),
  healthcare_access: z.number().int().min(1).max(10),
  transportation_mobility: z.number().int().min(1).max(10),
  environment_nature: z.number().int().min(1).max(10),
  education_schools: z.number().int().min(1).max(10),
  shops_amenities: z.number().int().min(1).max(10),
  sports_recreation: z.number().int().min(1).max(10),
  comment: z.string().min(50).max(1000),
  average_rating: z.number().min(1).max(10),
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  const result = ratingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("ratings")
    .insert([{ ...result.data, user_id: user.id }])
    .select();

  if (error) {
    console.error("Error inserting data:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return NextResponse.json(
      {
        error: "Failed to submit rating",
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
      { status: 500 }
    );
  }

  const { error: rankError } = await supabase.rpc("update_district_ranks");

  if (rankError) {
    console.error("Error updating ranks:", {
      message: rankError.message,
      details: rankError.details,
      hint: rankError.hint,
      code: rankError.code,
    });
    // Optional: don't fail the request, just log this
  }

  return NextResponse.json({ success: true, data });
}
