import React, { Suspense } from 'react'
import {
  PLAYLIST_BY_SLUG_QUERY,
  PROJECT_DETAIL_BY_ID_QUERY,
  STARTUP_BY_ID_QUERY
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";


import ProjectAlbum from "@/components/ProjectAlbum"
import ProjectGeneral from "@/components/ProjectGeneral"
import SimpleCard from '@/components/SimpleCard';
// import BreadcrumbComponent from "@/components/shared/Breadcrumb"
// import Header from "@/components/shared/Header"
const md = markdownit();

const ProjectDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(PROJECT_DETAIL_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "lorem-ipsum-1" },)
  ])
  console.log(post)
  
  if (!post) return notFound();

  return (
    <>
      {/*<BreadcrumbComponent />*/}

      {/*<Header*/}
      {/*  title="Thiết Kế Nhà Phố 3 Tầng Hiện Đại tại Biên Hòa"*/}
      {/*  subtitle="Thông tin chi tiết dự án"*/}
      {/*/>*/}
      <section className={"section_container !py-0 !px-2 w-full mt-32 !min-h-[230px]"}>
        <div className="h-[44rem] w-full">
          <ProjectAlbum />
        </div>
      </section>

      <section className="section_container">
        {/* <h1 className={"heading"}>
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competition
        </p> */}

        <div className="flex justify-between items-start gap-1">
          <ProjectGeneral post={post} />

          <div className='hidden lg:flex flex-col min-w-[360px]'>
            {editorPosts?.length > 0 && (
              <div className={"flex flex-col"}>
                <p className={"text-30-semibold"}>Liên Quan</p>

                <ul className={"mt-7 card_grid-xs"}>
                  {editorPosts.map((post: StartupCardType, index: number) => (
                    <SimpleCard key={index} post={post} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <hr className={"divider !max-w-7xl"} />

        {/* {editorPosts?.length > 0 && (
          <div className={"max-w-7xl mx-auto"}>
            <p className={"text-30-semibold"}>Editor Picks</p>

            <ul className={"mt-7 card_grid"}>
              {editorPosts.map((post: StartupCardType, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )} */}

      </section>

    </>
  )
}

export default ProjectDetail