import { signup } from "@/lib/auth-actions";
import { Suspense } from "react";

import LoginForm from "@/components/ui/LoginForm/LoginForm";

export default function SignupPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <LoginForm onAction={signup} onActionText="Sign up" />
    </Suspense>
  );
}
