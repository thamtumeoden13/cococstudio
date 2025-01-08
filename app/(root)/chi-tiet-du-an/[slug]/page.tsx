import React, { Suspense } from 'react'
import {
  PROJECT_DETAIL_BY_SLUG_QUERY,
  PROJECT_DETAIL_VIEWS_QUERY,
  PROJECT_DETAILS_BY_PROJECT_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

import { sanityFetch } from '@/sanity/lib/live';
import MarkupSchema from '@/components/shared/MarkupSchema';
import { CloudinaryImage } from "@/components/shared/CloudinaryImage";
import { CarouselPlugin } from "@/components/shared/CarouselPlugin";

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const { data: post } = await sanityFetch({ query: PROJECT_DETAIL_BY_SLUG_QUERY, params: { slug } })


  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');


  const detailsByProjectId = await client.fetch(PROJECT_DETAILS_BY_PROJECT_QUERY, { id: post.project._id });

  console.log('detailsByProjectId', detailsByProjectId.length)

  return (
    <>
      <MarkupSchema path={`chi-tiet-du-an/${slug}`} post={post} />

      <section className={"pink_container !min-h-[230px] mt-32"}>
        <p className={"tag"}>{formatDate(post?._createdAt)}</p>

        <h1 className={"heading"}>{post.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{post.description}</p>
      </section>

      {/* <section className={"section_container !py-0 !px-2 !min-h-[230px] !max-w-screen-xl"}>
        <div className="h-[48rem] max-w-screen-xl">
          <ProjectAlbum />
        </div>
      </section> */}

      <section className={"section_container"}>
        <CloudinaryImage
          src={post.thumbnail}
          alt={post.subtitle || "Cốc Cốc Studio"}
          width={760}
          height={540}
          className="max-h-[44rem] rounded-lg w-full mb-10 object-cover"
        />

        <div className={"space-y-5 mt-10 max-w-7xl mx-auto"}>
          <h3 className={"text-30-bold"}>Bài Viết Chi Tiết</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-7xl font-ibm-plex text-justify"}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className={"no-result"}>Không tìm thấy thông tin phù hợp</p>
          )}
        </div>

        <hr className={"divider !max-w-full"} />

        {detailsByProjectId &&
          <section className={"section_container !py-0 "}>
            <h4 className="heading-half w-full md:w-[32rem] text-left">
              Bài Viết{'  '}
              <span className="text-purple">{"Liên Quan"}</span>
            </h4>
            <CarouselPlugin data={detailsByProjectId} className="py-10 max-w-7xl" />
          </section>
        }

        <Suspense fallback={<Skeleton className={"view_skeleton"} />}>
          <View query={PROJECT_DETAIL_VIEWS_QUERY} id={post._id} />
        </Suspense>
      </section>
    </>
  )
}

export default Page


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  // Fetch dữ liệu sản phẩm từ API hoặc database
  const data = await client.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, { slug })

  return {
    title: `${data.title} - Cốc Cốc Studio`,
    description: `${data.description}`,
    openGraph: {
      title: `${data.title} - Cốc Cốc Studio`,
      description: `${data.description}`,
      url: `http://cococstudio.com/chi-tiet-du-an/${slug}`,
      images: [
        {
          url: data.thumbnail,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} - Cốc Cốc Studio`,
      description: `${data.description}`,
      images: [data.thumbnail],
    },
  };
}