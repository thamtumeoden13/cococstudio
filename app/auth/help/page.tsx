import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import markdownit from "markdown-it";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const data = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: "huong-dan-su-dung" })

  console.log(`data -> ${data}`)
  if (!data) return notFound();

  const parsedContent = md.render(data?.pitch || '');

  return (

    <section className={"section_container"}>

      <div className={"space-y-5 mt-10 max-w-7xl mx-auto"}>
        {parsedContent ? (
          <article
            className={"prose max-w-4xl font-ibm-plex text-justify"}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className={"no-result"}>Không tìm thấy thông tin phù hợp</p>
        )}
      </div>

      <hr className={"divider"} />
    </section>
  );
}

export default Page
