import Link from 'next/link';
import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2 text-2xl font-bold font-headline transition-colors text-foreground hover:text-primary", 
        className
      )}
    >
      <Scissors className="h-6 w-6 rotate-[-45deg] text-primary" />
      <span>Scythe Net</span>
    </Link>
  );
}
