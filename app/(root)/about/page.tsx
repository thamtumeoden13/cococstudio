import React from 'react'
import Experience from '@/components/Experience';
import About from '@/components/About';
import Insights from '@/components/Insights';
import Explore from '@/components/Explore';
import Contact from "@/components/Contact";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const id = (await params).id;
  // const session = await auth();

  // const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});
  // if (!user) return notFound();

  return (
    <>
      <section className={"pink_container !bg-slate-800 mt-16"}>
        <section className={"section_container overflow-hidden"}>
          {/* <Experience /> */}
          {/* <About /> */}
          <Insights />
          <Explore />
        </section>
      </section>
    </>
  )
}
export default Page
