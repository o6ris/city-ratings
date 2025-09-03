import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const surveySchema = z.object({
  district: z.string().uuid(),
  user: z.string().email(),
  understanding: z.enum(["Yes", "Not sure", "No"]),
  recommend: z.enum(["Yes", "Maybe", "No"]),
  easeOfReview: z.number().int().min(1).max(5),
  feedback: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  console.log("body", body);

  const result = surveySchema.safeParse(body);
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

  console.log("inserting survey", result.data);

  const payload = {
    district: result.data.district,
    user: result.data.user,
    understanding: result.data.understanding,
    recommend: result.data.recommend,
    ease_of_review: result.data.easeOfReview, // map here
    feedback: result.data.feedback,
  };

  const { data, error } = await supabase
    .from("survey")
    .insert([payload])
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
        error: "Failed to submit survey",
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, data });
}
