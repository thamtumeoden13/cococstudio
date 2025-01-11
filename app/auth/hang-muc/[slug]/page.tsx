import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ConstructionForm from "@/components/ConstructionForm";
import { CONSTRUCTION_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const session = await auth();

  if (!session) redirect("/");

  const slug = (await params).slug;

  const post = await client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { slug });

  console.log(post);

  if (!post) return redirect("/auth");

  return (
    <>
      <section className={"pink_container !min-h-[230px] mt-32"}>
        <h1 className={"heading"}>Submit Your Construction</h1>
      </section>

      <ConstructionForm post={post} />
    </>
  )
}
export default Page
