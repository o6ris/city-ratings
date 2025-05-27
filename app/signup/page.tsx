import { signup } from "./actions";
import Icon from "@/components/core/Icons/Icon";

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center gap-8 p-4 max-w-sm mx-auto">
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
        <div className="validator-hint hidden">Enter valid email address</div>
      </div>
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
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including a number, lowercase, uppercase"
          />
        </label>
        <p className="validator-hint hidden !text-xsmall m-0">
          Must be more than 8 characters, including at least one number, one
          lowercase letter, and one uppercase letter{" "}
        </p>
      </div>
      <button
        className="btn btn-wide bg-primary text-neutral rounded-full"
        formAction={signup}
      >
        Sign up
      </button>
    </form>
  );
}
