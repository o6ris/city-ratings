"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/core/Icons/Icon";
import Link from "next/link";

export default function LoginForm({
  onAction,
  onActionText,
}: {
  onAction: (formData: FormData) => Promise<{ message: string } | undefined>;
  onActionText: string;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await onAction(formData);
    if (result?.message) {
      setErrorMessage(result.message);
    } else {
      router.push(onActionText === "sign up" ? "/login" : "/home");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 p-4 max-w-sm mx-auto"
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

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-wide bg-primary text-neutral rounded-full"
      >
        {onActionText}
      </button>

      -- OR --

      {onActionText === "Login" ? (
        <Link href="/signup">Sign up</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </form>
  );
}
