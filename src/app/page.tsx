"use client";

import { ProjectPreview } from "@/components/project-preview";
import { StudioFlowSidebar } from "@/components/studio-flow-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Code, Share2 } from "lucide-react";

export default function Home() {
  const { toast } = useToast();

  return (
    <SidebarProvider>
      <Sidebar>
        <StudioFlowSidebar />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
          <SidebarTrigger className="group -ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-background transition-colors hover:bg-muted lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-foreground"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Live Preview</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast({
                  title: "Exporting Code",
                  description:
                    "This feature is coming soon! Stay tuned.",
                });
              }}
            >
              <Code />
              <span>Export</span>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Link Copied!",
                  description: "You can now share your creation.",
                });
              }}
            >
              <Share2 />
              <span>Share</span>
            </Button>
          </div>
        </header>
        <ProjectPreview />
      </SidebarInset>
    </SidebarProvider>
  );
}
