import type { CMMIData } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface HeroProps {
  data: CMMIData;
}

const Particle = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={cn("absolute rounded-full bg-white/10 animate-pulse", className)}
    style={style}
  />
);

export function Hero({ data }: HeroProps) {
  const meetingDate = new Date(data.meetingDate);
  // Add a day to date to correct for timezone issues
  meetingDate.setDate(meetingDate.getDate() + 1);
  const formattedDate = meetingDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-primary overflow-hidden text-primary-foreground pt-16">
      <div className="absolute inset-0 opacity-5">
        <Particle className="w-8 h-8" style={{ left: '10%', top: '20%' }} />
        <Particle className="w-5 h-5" style={{ left: '20%', top: '40%', animationDelay: '1s' }} />
        <Particle className="w-6 h-6" style={{ left: '30%', top: '30%', animationDelay: '2s' }} />
        <Particle className="w-4 h-4" style={{ left: '40%', top: '60%', animationDelay: '3s' }} />
        <Particle className="w-9 h-9" style={{ left: '65%', top: '25%', animationDelay: '4s' }} />
        <Particle className="w-6 h-6" style={{ left: '75%', top: '55%', animationDelay: '5s' }} />
        <Particle className="w-4 h-4" style={{ left: '85%', top: '35%', animationDelay: '6s' }} />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mt-8 mb-4 flex justify-center opacity-0 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <Target className="w-32 h-32 text-white/80" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight opacity-0 animate-slide-in-up" style={{ animationDelay: '250ms' }}>CMMI Implementation Kickoff</h1>
          
          <div className="mb-10 opacity-0 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl md:text-3xl font-medium mb-4">ABC Company</h2>
            <div className="flex items-center justify-center my-5">
              <div className="h-px bg-white/30 w-20"></div>
              <p className="text-xl mx-4 font-light">and</p>
              <div className="h-px bg-white/30 w-20"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-white">{data.companyName}</h2>
          </div>

          <p className="text-lg text-white/90 mb-12 opacity-0 animate-slide-in-up" style={{ animationDelay: '550ms' }}>On: {formattedDate}</p>
          
          <div className="mb-16 opacity-0 animate-slide-in-up" style={{ animationDelay: '700ms' }}>
            <Button asChild size="lg" variant="secondary" className="bg-white hover:bg-slate-100 text-primary font-bold shadow-lg hover:shadow-2xl">
              <Link href="#agenda">
                <span>View Agenda</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
