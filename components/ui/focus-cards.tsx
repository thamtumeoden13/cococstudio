"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "justify-items-center rounded-lg relative  transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      {/* <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      /> */}

      <Image
        src={card.src}
        className="h-[414px] w-full object-cover object-left-top rounded-lg "
        height="400"
        width="400"
        alt="thumbnail"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards, className, }: {
  cards: Card[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("h-[40rem] items-start overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 max-w-7xl mx-auto md:px-8 w-full", className)}>
      {cards.map((card, index) => (
        <Card
          key={`focust-card-${card.title}-${index.toString()}`}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}