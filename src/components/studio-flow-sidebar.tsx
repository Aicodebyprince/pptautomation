"use client";

import { themeAIAssistance } from "@/ai/flows/theme-ai-assistance";
import { useToast } from "@/hooks/use-toast";
import { cn, hexToHSL } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Bot,
  Github,
  Layout,
  Loader2,
  Package,
  Palette,
  Sparkles,
  Type,
  Wind,
} from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

interface ThemeState {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  bodyFont: string;
  headlineFont: string;
  layoutType: string;
  animationStyle: string;
  githubUrl: string;
}

const fonts = ["Inter", "Roboto", "Lato", "Montserrat", "Oswald", "Raleway"];
const layouts = ["Clean and structured", "Bold and graphic", "Minimalist"];
const animations = ["Subtle transitions", "Playful and bouncy", "None"];

export function StudioFlowSidebar() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const [theme, setTheme] = useState<ThemeState>({
    primaryColor: "#29abe2",
    backgroundColor: "#f5f5f5",
    accentColor: "#673ab7",
    bodyFont: "Inter",
    headlineFont: "Inter",
    layoutType: "Clean and structured",
    animationStyle: "Subtle transitions",
    githubUrl: "https://github.com/Aicodebyprince/studio",
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", hexToHSL(theme.backgroundColor));
    root.style.setProperty("--primary", hexToHSL(theme.primaryColor));
    root.style.setProperty("--accent", hexToHSL(theme.accentColor));
  }, [theme]);

  const handleThemeChange = (
    field: keyof ThemeState,
    value: string
  ) => {
    setTheme((prev) => ({ ...prev, [field]: value }));
  };

  const getAIFeedback = () => {
    startTransition(async () => {
      setAiFeedback(null);
      toast({
        title: "Generating AI Feedback",
        description: "Our AI is analyzing your theme...",
      });
      try {
        const result = await themeAIAssistance({
          primaryColor: theme.primaryColor,
          backgroundColor: theme.backgroundColor,
          accentColor: theme.accentColor,
          bodyFont: theme.bodyFont,
          headlineFont: theme.headlineFont,
          layoutType: theme.layoutType,
          animationStyle: theme.animationStyle,
        });
        setAiFeedback(result.feedback);
        toast({
          title: "AI Feedback Ready!",
          description: "Check the sidebar for suggestions.",
        });
      } catch (error) {
        console.error("AI feedback error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not get AI feedback. Please try again.",
        });
      }
    });
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <Package className="h-5 w-5" />
          </Button>
          <span className="text-lg font-semibold">StudioFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <Accordion type="multiple" defaultValue={["colors", "ai-feedback"]} className="w-full">
          <AccordionItem value="github">
            <AccordionTrigger className="px-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" /> Github Project
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-2">
              <div className="space-y-2">
                <Label htmlFor="github-url">Repository URL</Label>
                <Input
                  id="github-url"
                  value={theme.githubUrl}
                  onChange={(e) => handleThemeChange("githubUrl", e.target.value)}
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="colors">
            <AccordionTrigger className="px-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" /> Colors
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-2">
              <div className="space-y-4">
                <ColorInput
                  id="primary-color"
                  label="Primary"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleThemeChange("primaryColor", e.target.value)
                  }
                />
                <ColorInput
                  id="background-color"
                  label="Background"
                  value={theme.backgroundColor}
                  onChange={(e) =>
                    handleThemeChange("backgroundColor", e.target.value)
                  }
                />
                <ColorInput
                  id="accent-color"
                  label="Accent"
                  value={theme.accentColor}
                  onChange={(e) =>
                    handleThemeChange("accentColor", e.target.value)
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="typography">
            <AccordionTrigger className="px-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" /> Typography
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-2">
              <div className="space-y-4">
                <FontSelector
                  id="headline-font"
                  label="Headline Font"
                  value={theme.headlineFont}
                  onValueChange={(value) =>
                    handleThemeChange("headlineFont", value)
                  }
                />
                <FontSelector
                  id="body-font"
                  label="Body Font"
                  value={theme.bodyFont}
                  onValueChange={(value) => handleThemeChange("bodyFont", value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="layout">
            <AccordionTrigger className="px-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4" /> Layout & Style
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-2">
              <div className="space-y-4">
                <StyleSelector
                  id="layout-style"
                  label="Layout Style"
                  options={layouts}
                  value={theme.layoutType}
                  onValueChange={(value) =>
                    handleThemeChange("layoutType", value)
                  }
                />
                <StyleSelector
                  id="animation-style"
                  label="Animation Style"
                  options={animations}
                  value={theme.animationStyle}
                  onValueChange={(value) =>
                    handleThemeChange("animationStyle", value)
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ai-feedback">
            <AccordionTrigger className="px-2 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" /> AI Assistance
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-2">
              <div className="space-y-4">
                <Button
                  onClick={getAIFeedback}
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles />
                  )}
                  <span>Get Feedback</span>
                </Button>
                {aiFeedback && (
                  <Alert>
                    <AlertTitle className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Aesthetic Harmony Feedback
                    </AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap text-sm">
                      {aiFeedback}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarContent>
    </>
  );
}

function ColorInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="color"
          value={value}
          onChange={onChange}
          className="h-8 w-8 p-1"
        />
        <Input
          type="text"
          value={value}
          onChange={onChange}
          className="h-8"
        />
      </div>
    </div>
  );
}

function FontSelector({
  id,
  label,
  value,
  onValueChange,
}: {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="h-8">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function StyleSelector({
  id,
  label,
  options,
  value,
  onValueChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="h-8">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
