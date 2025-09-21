import { AuthForm } from "@/components/auth/AuthForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function SignupPage() {
  return (
     <div className="min-h-screen flex flex-col">
       <Header />
        <main className="flex-grow container mx-auto flex items-center justify-center py-12">
          <AuthForm type="signup" />
        </main>
       <Footer />
    </div>
  );
}
