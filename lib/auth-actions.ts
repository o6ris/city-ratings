"use server";

import { createClient } from "@/utils/supabase/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { User } from "@supabase/supabase-js"; // Import User type

export async function signup(
  formData: FormData
): Promise<User | { message: string; status: number | undefined }> {
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
      return { message: "Invalid input type.", status: 400 };
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      console.error("Signup error:", signUpError);
      return {
        message: signUpError.message ?? "Failed to sign up.",
        status: 400,
      };
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
        return {
          message: "Something went wrong during account creation.",
          status: 500,
        };
      }

      // Return the user object on success
      return user;
    }

    // This shouldn't happen, but just in case
    return {
      message: "User creation failed unexpectedly.",
      status: 500,
    };
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
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

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        message: error.message ?? "Invalid email or password.",
        status: error.status,
      };
    }
    if (!data?.user) {
      return {
        message: "User not found.",
        status: 404,
      };
    }
    return data.user;
  } catch (err: unknown) {
    console.error("Unexpected login error:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
  }
}

// lib/auth-actions.ts
export async function signInWithGoogle(
  redirectToAfterLogin: string = "/home"
): Promise<{ url: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback?redirectTo=${encodeURIComponent(
        redirectToAfterLogin
      )}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data?.url) {
    console.error("OAuth error:", error?.message);
    return { url: null };
  }

  return { url: data.url };
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function isConnected() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null; // Explicitly return null if not logged in
}
