"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const supabase = createClient();
      const { data: sessionData } = await supabase.auth.getSession();

      const user = sessionData.session?.user;
      if (!user) {
        return router.push("/error");
      }

      const { data: existingUser, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name ?? "Anonymous",
            avatar_url: user.user_metadata?.avatar_url ?? null,
          },
        ]);

        if (insertError) {
          console.error("Failed to insert user:", insertError);
          return router.push("/error");
        }
      }

      router.push("/home");
    };

    handleAuth();
  }, [router]);

  return <p className="text-center mt-10">Signing you in…</p>;
}
