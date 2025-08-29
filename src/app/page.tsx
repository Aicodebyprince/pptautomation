"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePresentation } from "@/ai/flows/presentation-generator";

interface Slide {
  title: string;
  content: string[];
}

interface Presentation {
  title: string;
  slides: Slide[];
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isPending, startTransition] = useTransition();
  const [presentation, setPresentation] = useState<Presentation | null>(null);

  const handleGenerate = () => {
    if (!topic) return;
    startTransition(async () => {
      const result = await generatePresentation(topic);
      setPresentation(result);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 shadow-sm backdrop-blur sm:px-6">
        <h1 className="text-lg font-semibold">AI Presentation Generator</h1>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Create a presentation
            </h2>
            <p className="text-muted-foreground">
              Enter a topic, and AI will generate a presentation for you.
            </p>
            <div className="space-y-2">
              <Textarea
                placeholder="e.g., 'The Future of Renewable Energy'"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
              />
              <Button
                onClick={handleGenerate}
                disabled={isPending || !topic}
                className="w-full sm:w-auto"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles />
                )}
                <span>Generate Presentation</span>
              </Button>
            </div>
          </div>

          {isPending && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {presentation && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">
                {presentation.title}
              </h2>
              <div className="space-y-4">
                {presentation.slides.map((slide, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>
                        Slide {index + 1}: {slide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc space-y-2 pl-5">
                        {slide.content.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t bg-background">
        <div className="container mx-auto flex h-14 items-center justify-center px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudioFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
