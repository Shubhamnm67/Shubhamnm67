import { AuthForm } from "@/components/auth/AuthForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAuthenticatedUser, isAdmin } from '@/lib/auth/server';

export default async function LoginPage() {
  const user = await getAuthenticatedUser();
  const admin = await isAdmin();

  return (
    <div className="min-h-screen flex flex-col">
       <Header initialUser={user} isAdmin={admin} />
        <main className="flex-grow container mx-auto flex items-center justify-center py-12">
          <AuthForm type="login" />
        </main>
       <Footer />
    </div>
  );
}
