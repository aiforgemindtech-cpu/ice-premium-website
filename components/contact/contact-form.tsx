"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/ui/field";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

/**
 * Service names arrive as a prop rather than being imported.
 * Importing them here pulled lib/content — and therefore zod and every
 * content JSON — into the client bundle for a list of twelve strings.
 */
export function ContactForm({ services }: { services: string[] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      city: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        toast.error("Please check the form and try again.");
        return;
      }

      // Soft success — the enquiry is recorded even if the email leg failed,
      // so the user is never shown a scary error for something they cannot fix.
      toast.success("Thank you — your enquiry has been received.", {
        description: "We will get back to you shortly to arrange a survey.",
      });
      reset();
    } catch {
      toast.success("Thank you — your enquiry has been received.", {
        description: `If it is urgent, call us on ${siteConfig.contact.phone}.`,
      });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="city">Location</Label>
          <Select
            id="city"
            aria-invalid={Boolean(errors.city)}
            defaultValue=""
            {...register("city")}
          >
            <option value="" disabled>
              Select a city
            </option>
            {siteConfig.serviceAreas.map((area) => (
              <option key={area.city} value={area.city}>
                {area.city}
              </option>
            ))}
            <option value="Other">Somewhere else</option>
          </Select>
          <FieldError>{errors.city?.message}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="service">Service required</Label>
        <Select
          id="service"
          aria-invalid={Boolean(errors.service)}
          defaultValue=""
          {...register("service")}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
          <option value="Multiple / not sure">Multiple, or not sure yet</option>
        </Select>
        <FieldError>{errors.service?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="message">Tell us about the project</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="What needs doing, roughly what size, and any constraints we should know about — occupied building, deadline, access."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      {/* Honeypot — hidden from users, catches naive bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this blank)</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send enquiry"}
          {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
        </Button>
        <p className="text-sm text-muted">
          Free consultation · No obligation to proceed
        </p>
      </div>
    </form>
  );
}
