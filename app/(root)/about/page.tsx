import React, {Suspense} from 'react'
import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import Image from "next/image";
import UserStartup, {StartupCardSkeleton} from "@/components/UserStartup";
import Experience from '@/components/Experience';
import Faq from '@/components/Faq';

export const experimental_ppr = true;

const Page = async ({params}: { params: Promise<{ id: string }> }) => {
  // const id = (await params).id;
  // const session = await auth();

  // const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});
  // if (!user) return notFound();

  return (
    <>
      <section className={"pink_container !min-h-screen !justify-start mt-32 max-lg:mt-16"}>
        <Experience/>
        {/* <Faq /> */}
      </section>
    </>
  )
}
export default Page
