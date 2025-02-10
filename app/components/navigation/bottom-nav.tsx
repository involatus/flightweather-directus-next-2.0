'use client';

import { Home, MapPin, Camera, Link2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Stations', href: '/stations', icon: MapPin },
  { name: 'Webcams', href: '/webcams', icon: Camera },
  { name: 'Links', href: '/links', icon: Link2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="flex h-16 justify-around items-center px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-[4rem] text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-1 text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}