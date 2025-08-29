
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with a custom CMS and payment gateway integration.",
    image: "https://picsum.photos/600/400?random=1",
    tags: ["React", "Node.js", "Stripe"],
    aiHint: 'web shopping'
  },
  {
    title: "Project Management Tool",
    description:
      "A collaborative tool for teams to manage tasks, deadlines, and resources effectively.",
    image: "https://picsum.photos/600/400?random=2",
    tags: ["Next.js", "GraphQL", "Firebase"],
    aiHint: 'team collaboration'
  },
  {
    title: "Mobile Banking App",
    description:
      "A secure and user-friendly mobile app for personal finance management.",
    image: "https://picsum.photos/600/400?random=3",
    tags: ["React Native", "TypeScript", "Security"],
    aiHint: 'finance app'
  },
  {
    title: "Data Visualization Dashboard",
    description:
      "An interactive dashboard for visualizing complex datasets with real-time updates.",
    image: "https://picsum.photos/600/400?random=4",
    tags: ["D3.js", "Python", "WebSocket"],
    aiHint: 'charts graphs'
  },
];

export function ProjectPreview() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <section
          id="hero"
          className="relative flex h-[60vh] min-h-[400px] w-full flex-col items-center justify-center bg-card text-center"
        >
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative z-10 container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Creative Developer & Designer
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Building beautiful, functional, and user-centric digital
              experiences.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button size="lg">My Work</Button>
              <Button size="lg" variant="outline">
                Contact Me
              </Button>
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Featured Projects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A selection of my recent work, showcasing my skills in design
                  and development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:max-w-none lg:grid-cols-2">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="aspect-video w-full object-cover"
                      data-ai-hint={project.aiHint}
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-bold font-headline">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 pt-0">
                    <Button variant="link" className="p-0">
                      View Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                About Me
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I am a passionate developer with a keen eye for design. With over
                5 years of experience, I specialize in creating modern web
                applications using cutting-edge technologies. My goal is to
                transform complex problems into simple, beautiful, and intuitive
                solutions.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/500/500"
                alt="About me"
                width={400}
                height={400}
                className="rounded-full object-cover"
                data-ai-hint="person portrait"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {year} StudioFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
