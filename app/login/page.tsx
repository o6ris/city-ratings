import { login, signup } from "./actions";
import Icon from "@/components/core/Icons/Icon";

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center gap-8 p-4 max-w-sm mx-auto">
      <label htmlFor="email" className="input validator focus:outline-none focus:ring-0 focus:border-transparent">
        <Icon name="Mail" size={20}  />
        <input
        className="input input-xl focus:outline-none focus:ring-0 focus:border-transparent"
          id="email"
          name="email"
          type="email"
          placeholder="mail@site.com"
          required
        />
      </label>
      <div className="validator-hint hidden">Enter valid email address</div>

      <label htmlFor="password" className="input validator focus:outline-none focus:ring-0 focus:border-transparent">
        <Icon name="KeyRound" size={20}/>
        <input
        className="input input-xl rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          // minlength="8"
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
      </label>
      {/* <p className="validator-hint hidden">
        Must be more than 8 characters, including at least one number
        <br />
        At least one number <br />
        At least one lowercase letter <br />
        At least one uppercase letter
      </p> */}
      <button className="btn btn-wide bg-primary text-neutral rounded-full" formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
