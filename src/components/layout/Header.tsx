'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, Menu, Package } from 'lucide-react';
import { Logo } from './Logo';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Admin
              </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search anime..." className="pl-9 w-40 md:w-64" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuMpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 py-8">
                <Logo className="mb-4" />
                 <nav className="flex flex-col gap-4 text-lg font-medium">
                   <Link href="/" className="transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Home</Link>
                   <Link href="/search" className="transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Discover</Link>
                   <Link href="/admin" className="transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
