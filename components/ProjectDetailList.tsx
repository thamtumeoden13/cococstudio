import React from 'react'
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import StartupCard from './StartupCard';
import { PROJECT_DETAILS_BY_PROJECT_QUERY, PROJECTS_BY_CONSTRUCTION_QUERY, PROJECTS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ProjectDetailList = async ({ post }: { post: StartupCardType }) => {

  const { _id: id, title } = post

  const params = { id }

  const { data: searchForProjectDetails } = await sanityFetch({ query: PROJECT_DETAILS_BY_PROJECT_QUERY, params });

  console.log({ searchForProjectDetails })
  if (!searchForProjectDetails?.length) return null

  return (
    <section className={"section_container"}>
      <Link href={`/project/${id}`}>
        <h1 className="heading-half hover:underline" style={{ textAlign: 'left' }}>
          Dự Án: {'  '}
          <span className="text-purple">{title}</span>
        </h1>
      </Link>
      <ul className={"mt-7 card_grid"}>
        {searchForProjectDetails?.length > 0 && (
          searchForProjectDetails.map((post: StartupCardType) => (
            <StartupCard key={post?._id} post={post} path='project-detail' />
          ))
        )}
      </ul>
    </section>
  )
}
export default ProjectDetailList
