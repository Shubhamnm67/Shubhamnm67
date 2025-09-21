'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell } from 'lucide-react';
import { Logo } from './Logo';
import { UserNav } from '../auth/UserNav';
import { useState, useEffect } from 'react';

export function Header() {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Prevent hydration errors
  useEffect(() => {
    // In a real app, you'd check for a token or session here
    setIsLoggedIn(false); 
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="transition-colors hover:text-foreground"
            >
              Discover
            </Link>
            <Link
              href="/admin/moderate"
              className="transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search anime..." className="pl-9 w-40 md:w-64" />
          </div>
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <UserNav />
            </>
          ) : (
             <Button asChild>
                <Link href="/login">Login</Link>
             </Button>
          )}
        </div>
      </div>
    </header>
  );
}
