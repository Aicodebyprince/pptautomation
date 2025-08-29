"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cmmiFormSchema } from "@/lib/schemas";
import type { CMMIData } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface EditFormProps {
  data: CMMIData;
  onUpdate: (data: CMMIData) => void;
}

export function EditForm({ data, onUpdate }: EditFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [locationInput, setLocationInput] = useState("");

  const form = useForm<CMMIData>({
    resolver: zodResolver(cmmiFormSchema),
    defaultValues: data,
  });

  const { fields: consultants, append: appendConsultant, remove: removeConsultant } = useFieldArray({
    control: form.control,
    name: "consultants",
  });

  const { fields: managers, append: appendManager, remove: removeManager } = useFieldArray({
    control: form.control,
    name: "projectManagers",
  });

  const { fields: locations, append: appendLocation, remove: removeLocation } = useFieldArray({
    control: form.control,
    name: "locations",
  });

  const onSubmit = (formData: CMMIData) => {
    onUpdate(formData);
    toast({
      title: "Success",
      description: "Website content has been updated.",
    });
    setIsOpen(false);
  };

  const handleAddLocation = () => {
    if (locationInput.trim()) {
      appendLocation(locationInput.trim());
      setLocationInput("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-lg hover:scale-105 hover:shadow-xl transition-transform z-50">
          <Pencil className="h-6 w-6" />
          <span className="sr-only">Edit Content</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>CMMI Implementation Form</DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="w-full">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Company</TabsTrigger>
                  <TabsTrigger value="model">Model</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="personnel">Personnel</TabsTrigger>
                </TabsList>
              </div>
              <ScrollArea className="h-[60vh] px-6">
                <TabsContent value="basic" className="mt-4 space-y-4">
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>1. Company Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="meetingDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Meeting Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TabsContent>
                <TabsContent value="model" className="mt-4 space-y-4">
                  <FormField control={form.control} name="serviceType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Service Type</FormLabel>
                      <FormControl><Input {...field} placeholder="e.g., Agilean" /></FormControl>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => form.setValue('serviceType', 'Agilean', { shouldValidate: true })}>Agilean</Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => form.setValue('serviceType', 'Consulting Facilitation Approach', { shouldValidate: true })}>Consulting Facilitation Approach</Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => form.setValue('serviceType', 'Standard', { shouldValidate: true })}>Standard</Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="cmmiModel" render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a model" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Services">Services</SelectItem>
                          <SelectItem value="Multimodel">Multimodel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="maturityLevel" render={({ field }) => (
                     <FormItem>
                      <FormLabel>5. Maturity Level</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select maturity level" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="ML1 - Initial">ML1 - Initial</SelectItem>
                          <SelectItem value="ML2 - Managed">ML2 - Managed</SelectItem>
                          <SelectItem value="ML3 - Defined">ML3 - Defined</SelectItem>
                          <SelectItem value="ML4 - Quantitatively">ML4 - Quantitatively</SelectItem>
                          <SelectItem value="ML5 - Optimizing">ML5 - Optimizing</SelectItem>
                        </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TabsContent>
                <TabsContent value="business" className="mt-4 space-y-4">
                    <FormField control={form.control} name="businessLine" render={({ field }) => (
                        <FormItem>
                            <FormLabel>6. Line of Business</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="peopleStrength" render={({ field }) => (
                        <FormItem>
                            <FormLabel>7. Current Strength (Estimated people)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="projectScope" render={({ field }) => (
                        <FormItem>
                            <FormLabel>8. Current Scope (Estimated projects)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormItem>
                        <FormLabel>9. Locations</FormLabel>
                        <div className="flex flex-wrap gap-2 mb-2">
                        {locations.map((loc, index) => (
                            <div key={loc.id} className="flex items-center gap-2 bg-muted p-1.5 rounded-md">
                                <Controller name={`locations.${index}`} control={form.control} render={({ field }) => <span className="text-sm">{field.value}</span>} />
                                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeLocation(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        </div>
                        <div className="flex gap-2">
                        <Input value={locationInput} onChange={(e) => setLocationInput(e.target.value)} placeholder="Add a location" onKeyDown={(e) => {if(e.key === 'Enter') {e.preventDefault(); handleAddLocation();}}} />
                        <Button type="button" onClick={handleAddLocation}>Add</Button>
                        </div>
                        <FormMessage>{form.formState.errors.locations?.message}</FormMessage>
                    </FormItem>
                </TabsContent>
                <TabsContent value="activities" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="projectCharter" render={({ field }) => (
                        <FormItem>
                            <FormLabel>10. Project Charter (Man days)</FormLabel>
                            <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="overviewTraining" render={({ field }) => (
                        <FormItem>
                            <FormLabel>11. CMMI Overview Training (Man days)</FormLabel>
                            <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="stakeholders" render={({ field }) => (
                        <FormItem>
                            <FormLabel>12. Key process stakeholders</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="virtualTraining" render={({ field }) => (
                        <FormItem>
                            <FormLabel>13. Virtual training (Man day)</FormLabel>
                            <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="planningTraining" render={({ field }) => (
                        <FormItem>
                            <FormLabel>14. Planning for training (Man day)</FormLabel>
                            <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="assessmentExam" render={({ field }) => (
                        <FormItem>
                            <FormLabel>15. Self-Assessment Exam (Man day)</FormLabel>
                            <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="cmmiVersion" render={({ field }) => (
                        <FormItem>
                            <FormLabel>16a. CMMI Version</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="cmmiPreparation" render={({ field }) => (
                        <FormItem>
                            <FormLabel>16b. CMMI Documents (Man days)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="rgsDocumentation" render={({ field }) => (
                        <FormItem>
                            <FormLabel>17. RGS Documentation (Man days)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="evidenceTraining" render={({ field }) => (
                        <FormItem>
                            <FormLabel>18. Evidence Prep Training (Man days)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="appraisalTraining" render={({ field }) => (
                        <FormItem>
                            <FormLabel>19. Appraisal Training (Man days)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="projectManagement" render={({ field }) => (
                        <FormItem>
                            <FormLabel>20. Project Management (Man days)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </TabsContent>
                <TabsContent value="personnel" className="mt-4 space-y-6">
                  <div>
                    <FormLabel>21. Consultants</FormLabel>
                    <div className="space-y-2 mt-2">
                    {consultants.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <FormField control={form.control} name={`consultants.${index}.name`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="Name" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`consultants.${index}.email`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="Email" type="email" /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeConsultant(index)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    </div>
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendConsultant({ name: "", email: "" })}><Plus className="mr-2 h-4 w-4" />Add Consultant</Button>
                  </div>
                   <div>
                    <FormLabel>22. Project Managers</FormLabel>
                     <div className="space-y-2 mt-2">
                    {managers.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <FormField control={form.control} name={`projectManagers.${index}.name`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="Name" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`projectManagers.${index}.email`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input {...field} placeholder="Email" type="email" /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeManager(index)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                     </div>
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendManager({ name: "", email: "" })}><Plus className="mr-2 h-4 w-4" />Add Manager</Button>
                  </div>
                </TabsContent>
              </ScrollArea>
              <div className="p-6 pt-2">
                <Button type="submit" className="w-full">Update Website</Button>
              </div>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
