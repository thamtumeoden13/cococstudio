"use client";
import Image from "next/image";
import React from "react";
import { Carousel, AppleCard } from "@/components/ui/apple-cards-carousel";
import { Author, Construction, Project } from "@/sanity/types";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { testimonials_2 } from "@/constants";

export type ProjectCardType = Omit<Project, "author" | "construction"> & { author?: Author } & { construction?: Construction };

export function AppleCardsCarousel({ title, data }: { title?: string, data: ProjectCardType[] }) {
  const cards = data.map((card: ProjectCardType, index: number) => (
    <AppleCard
      key={card._id}
      card={{ ...card, content: <AnimatedTestimonials testimonials={testimonials_2} /> }}
      index={index} className="lg:h-[72vh] md:h-[60vh]"
    />
  ));

  return (
    <div className="max-w-full h-full">
      {title &&
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          {title}
        </h2>
      }
      <Carousel items={cards} />
    </div>
  );
}
