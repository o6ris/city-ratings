"use client";

import { useContext } from "react";
import { useSearchParams } from "next/navigation";
import UserContext from "@/modules/providers/UserProvider";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/core/Icons/Icon";
import SignInWithGoogleButton from "@/components/ui/Buttons/SignupWithGoogleButton";
import Link from "next/link";

export default function LoginForm({
  onAction,
  onActionText,
}: {
  onAction: (
    formData: FormData
  ) => Promise<User | { message: string; status: number | undefined }>;
  onActionText: string;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await onAction(formData);
    if ("message" in result) {
      setErrorMessage(result.message);
    } else {
      setUser(result);
      if (onActionText === "Sign up") {
        router.push("/email-confirmation");
      } else {
        router.push(redirectTo || "/home");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 p-4 max-w-sm mx-auto mt-10 lg:mt-0"
    >
      {/* email */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="email"
          className="w-full input validator focus:outline-none focus:ring-0 focus:border-transparent rounded-xl border-base-200 bg-neutral p-6"
        >
          <Icon name="Mail" size={20} />
          <input
            className="w-full input input-xl focus:outline-none focus:ring-0 focus:border-transparent p-4"
            id="email"
            name="email"
            type="email"
            placeholder="mail@site.com"
            required
          />
        </label>
      </div>
      {/* username (for signup only) */}
      {onActionText === "Sign up" && (
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="username"
            className="w-full input validator focus:outline-none focus:ring-0 focus:border-transparent rounded-xl border-base-200 bg-neutral p-6"
          >
            <Icon name="User" size={20} />
            <input
              className="w-full input input-xl focus:outline-none focus:ring-0 focus:border-transparent p-4"
              id="username"
              name="username"
              type="text"
              placeholder="John"
              required
            />
          </label>
        </div>
      )}
      {/* password */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="password"
          className="w-full input validator focus:outline-none focus:ring-0 focus:border-transparent rounded-xl border-base-200 bg-neutral p-6"
        >
          <Icon name="KeyRound" size={20} />
          <input
            className="w-full input input-xl rounded-lg focus:outline-none focus:ring-0 focus:border-transparent p-4"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </label>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
      {/* submit buttons */}
      <div className="flex flex-col items-center gap-4 w-full">
        <button
          type="submit"
          className="btn btn-wide bg-primary text-neutral rounded-full w-full"
        >
          {onActionText}
        </button>
        <SignInWithGoogleButton
          buttonText={
            onActionText === "Login"
              ? "Login with Google"
              : "Signup with Google"
          }
        />
      </div>
      {/* Error message */}
      -- OR --
      {onActionText === "Login" ? (
        <Link href="/signup">Sign up</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </form>
  );
}
