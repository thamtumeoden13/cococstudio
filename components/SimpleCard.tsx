import React from 'react'
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Author, Construction, ProjectDetail } from "@/sanity/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { CloudinaryImage } from "./shared/CloudinaryImage";
import { cn } from '@/lib/utils';

export type SimpleCardType = Omit<ProjectDetail, "author"> & { author?: Author };

const SimpleCard = ({ post, path, className }: { post: SimpleCardType, path: string, className?: string }) => {
  const {
    title,
    subtitle,
    thumbnail,
    slug
  } = post;

  return (
    <li className={cn("simple-card group", className)}>
      <div className={"flex-between mt-5 gap-5"}>
        <div className={"flex-1 h-20"}>
          <Link href={`/${path}/${slug?.current}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <h3 className={"text-20-medium !font-semibold line-clamp-2 !text-left"}>{title}</h3>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start" >
                  <p className='text-left text-white-100'> {title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      </div>
      <Link href={`/${path}/${slug?.current}`}>
        <CloudinaryImage
          src={thumbnail!}
          alt={subtitle ?? "Cốc Cốc Studio"}
          width={280}
          height={200}
          className={"simple-card_img"}
        />
      </Link>

      <div className={"flex-between gap-3 mt-5"}>
        <div className={"flex gap-1.5"}>
          <EyeIcon className={"size-6 text-primary"} />
          <span className='text-16-medium'>{post?.views}</span>
        </div>
        <Button className={"simple-card_btn"} asChild>
          <Link href={`/${path}/${slug?.current}`}>
            Chi Tiết
          </Link>
        </Button>
      </div>
    </li>
  )
}
export default SimpleCard
