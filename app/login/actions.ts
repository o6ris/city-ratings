"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log("login error", error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/home", "layout");
  redirect("/home");
}

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

  revalidatePath("/home", "layout");
  redirect("/home");
}


export async function isConected() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
  return user;
}
