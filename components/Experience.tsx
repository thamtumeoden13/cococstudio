import { workExperience } from "@/constants";
import React from "react";
import Image from "next/image";
import { Button } from "./shared/MovingBorder";
import { cn } from "@/lib/utils";
import { Service } from "@/sanity/types";

const Experience = ({
  className,
  data,
}: {
  className?: string;
  data?: Service[];
}) => {
  const services = data || workExperience;
  return (
    <div
      className={cn(
        "max-w-full mt-12 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-5",
        className
      )}
    >
      {services.map((card) => (
        <Button
          key={card._id}
          duration={Math.floor(Math.random() * 10000) + 10000}
          borderRadius="1.75rem"
          className="flex-1 text-black bg-white border-white-300"
        >
          <div className="relative flex flex-row gap-2 p-3 py-6 lg:items-center md:p-5 lg:p-10">
            <Image
              src={
                card.image
                  ? card.image
                  : card.local_image
                    ? card.local_image
                    : "/exp2.svg"
              }
              alt={card.title!}
              width={128} // Adjust width as needed
              height={128} // Adjust height as needed
              className="w-20 lg:w-32 md:w-24"
            />
            <div className="lg:ms-5">
              <h3 className="text-xl font-bold text-start md:2xl">
                {card.title}
              </h3>
              <p className="mt-3 font-semibold text-start text-black-100">
                {card.description}
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default Experience;
