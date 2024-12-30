"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Project } from "@/sanity/types"
import { Card } from "../ui/focus-cards"

export type CarouselPluginDataType = Pick<Project, "_id" | "title" | "thumbnail" | "image">

export function CarouselPlugin({ data }: { data: CarouselPluginDataType[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((card, index) => (
          <CarouselItem
            key={`carousel-item-card-${card.title}-${index.toString()}`}
            className="pt-1 md:basis-1/2"
          >
            <Card
              card={card}
              index={index}
              hovered={index}
            // setHovered={setHovered}
            // onClick={handleClick}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
