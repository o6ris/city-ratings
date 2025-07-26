import { login } from "@/lib/auth-actions";
import { Suspense } from "react";
import LoginForm from "@/components/ui/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <LoginForm onAction={login} onActionText="Login" />
    </Suspense>
  );
}
