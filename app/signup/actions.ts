"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log("signUpData", signUpData);

  if (signUpError) {
    console.error("Signup error:", signUpError);
    redirect("/error");
  }

  const user = signUpData?.user;

  if (user) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,       
        email: user.email,
      },
    ]);

    if (insertError) {
      console.error("Error inserting into users table:", insertError);
      redirect("/error");
    }
  }

  revalidatePath("/login", "layout");
  redirect("/login");
}
