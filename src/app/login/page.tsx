import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <AuthForm type="login" />
    </div>
  );
}
