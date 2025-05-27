import { login } from "@/lib/auth-actions";
import LoginForm from "@/components/ui/LoginForm/LoginForm";

export default function LoginPage() {
  return <LoginForm onAction={login} onActionText="Login" />;
}
