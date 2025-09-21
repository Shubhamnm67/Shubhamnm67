'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormStatus } from 'react-dom';
import { login, signup } from '@/lib/auth/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type AuthFormProps = {
  type: 'login' | 'signup';
};

function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-2" disabled={pending}>
       {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLogin ? 'Sign in' : 'Create account'}
    </Button>
  );
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLogin = type === 'login';

  const formAction = async (formData: FormData) => {
    const action = isLogin ? login : signup;
    const result = await action(formData);
    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: result.error,
      });
    } else {
       toast({
        title: isLogin ? 'Login Successful' : 'Account Created',
        description: isLogin ? "Welcome back!" : "You have successfully signed up.",
      });
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-sm">
       <form action={formAction}>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Enter your email below to login to your account.' : 'Enter your details to create a new account.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              )}
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
           <SubmitButton isLogin={isLogin} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" type="button">
            Google
          </Button>
        </CardContent>
      </form>
      <CardFooter className="text-center text-sm text-muted-foreground">
        {isLogin ? (
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-foreground">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link href="/login" className="underline text-foreground">
              Sign in
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
