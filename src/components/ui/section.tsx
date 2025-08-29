import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  subtitle: string;
  variant?: 'default' | 'inverted';
}

export function Section({ id, title, subtitle, children, className, variant = 'default', ...props }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "py-24",
        variant === 'default' ? 'bg-background' : 'bg-secondary/50',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            <div className="h-1 w-20 bg-accent mx-auto mt-6 rounded-full"></div>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionCard({ children, className, ...props }: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg shadow-lg p-8 relative overflow-hidden border border-transparent transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
