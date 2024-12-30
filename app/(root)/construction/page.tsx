import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTIONS_BY_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_BY_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import StartupList from "@/components/StartupList";
import ConstructionList from "@/components/ConstructionList";

export default async function Construction({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  // const posts = await client.fetch(STARTUPS_QUERY);

  const { data: searchForConstructions } = await sanityFetch({ query: CONSTRUCTIONS_BY_QUERY, params });
  console.log(`searchForConstructions -> ${params}: ${searchForConstructions}`)

  return (
    <>
      <section className={"pink_container !mt-32"}>
        <h1 className={"heading"}>
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competition
        </p>

        <SearchForm query={query} path="construction" search="Constructions" />
      </section>


      {searchForConstructions?.length > 0 ? (
        searchForConstructions.map((post: StartupCardType) => (
          <ConstructionList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy hạn m
          </p>
        </section>
      )}

      <SanityLive />
    </>
  );
}
