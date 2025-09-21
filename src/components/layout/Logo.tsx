import Link from 'next/link';
import { Scissors, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2 text-2xl font-bold font-headline transition-colors text-foreground hover:text-muted-foreground", 
        className
      )}
    >
      <Github className="h-8 w-8" />
      <span className="hidden sm:inline-block">Scythe Net</span>
    </Link>
  );
}
