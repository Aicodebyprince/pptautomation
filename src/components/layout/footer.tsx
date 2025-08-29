import Link from 'next/link';
import { Globe, Book, Link2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary/90 text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <div className="logo-shape w-10 h-10 flex items-center justify-center mr-3 bg-primary">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-lg font-semibold font-headline">ABC Company</span>
              </div>
              <p className="mt-4 text-primary-foreground/80 max-w-xs">Global leaders in CMMI consulting and process improvement solutions.</p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                <Book className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                <Link2 className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                <Globe className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/70 text-sm">
            <p>&copy; {currentYear} ABC Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
