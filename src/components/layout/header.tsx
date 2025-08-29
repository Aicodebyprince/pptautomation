"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavLink = {
  href: string;
  label: string;
};

interface HeaderProps {
  navLinks: NavLink[];
}

export function Header({ navLinks }: HeaderProps) {
  const [activeLink, setActiveLink] = useState('#');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
      let currentSection = '#';
      
      sections.forEach(section => {
        if (section && section.offsetTop <= window.scrollY + 100) {
          currentSection = `#${section.id}`;
        }
      });
      
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md")}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="#" className="flex items-center gap-3">
            <div className="logo-shape w-10 h-10 flex items-center justify-center bg-gradient-primary">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className={cn(
              "text-lg font-bold font-headline transition-colors text-primary"
            )}>ABC Company</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "nav-link",
                  "text-foreground hover:text-primary",
                  activeLink === link.href && 'active'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("text-foreground")}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 pt-8">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="text-lg text-foreground hover:text-primary transition-colors">{link.label}</a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
