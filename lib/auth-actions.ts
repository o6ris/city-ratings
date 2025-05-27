"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(
  formData: FormData
): Promise<{ message: string } | undefined> {
  try {
    const supabase = await createClient();

    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof username !== "string"
    ) {
      return { message: "Invalid input type." };
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      console.error("Signup error:", signUpError);
      return { message: signUpError.message ?? "Failed to sign up." };
    }

    const user = signUpData?.user;

    if (user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          name: username,
        },
      ]);

      if (insertError) {
        console.error("Error inserting into users table:", insertError);
        return { message: "Something went wrong during account creation." };
      }
    }

  } catch (err) {
    console.error("Unexpected signup error:", err);
    return { message: "Something went wrong. Please try again later." };
  }
}

export async function login(formData: FormData) {
  try {
    const supabase = await createClient();

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return {
        message: "Invalid input type.",
        status: 400,
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        message: error.message ?? "Invalid email or password.",
        status: error.status,
      };
    }

    revalidatePath("/home", "layout");
  } catch (err: unknown) {
    console.error("Unexpected login error:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
  }
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
