import { signup } from "@/lib/auth-actions";
import LoginForm from "@/components/ui/LoginForm/LoginForm";

export default function SignupPage() {
  return <LoginForm onAction={signup} onActionText="Sign up" />;
}
