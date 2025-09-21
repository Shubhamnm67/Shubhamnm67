import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <Logo />
            <p className="text-muted-foreground text-sm mt-2">
              &copy; {currentYear} Scythe Net. All Rights Reserved.
            </p>
          </div>
          <nav className="flex-1 flex justify-center items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">About</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Contact</Link>
          </nav>
          <div className="flex-1 flex justify-center md:justify-end items-center gap-4">
            {/* Social media icons can be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
