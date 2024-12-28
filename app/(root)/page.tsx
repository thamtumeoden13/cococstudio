import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_QUERY, } from "@/sanity/lib/queries";
import { auth } from "@/auth";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { AppleCardsCarousel } from "@/components/AppleCardsCarousel";
import Experience from "@/components/Experience";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { FocusCards } from "@/components/ui/focus-cards";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  // const posts = await client.fetch(STARTUPS_QUERY);

  const [searchForProjects, searchForProjectDetails, { select: homeHeroPost }] = await Promise.all([
    client.fetch(PROJECTS_QUERY, params),
    client.fetch(PROJECT_DETAILS_BY_QUERY, params),
    client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: "home-hero" })
  ])

  return (
    <>
      <MarkupSchema post={{}} path="" />

      <section className="section_container !max-w-full mt-16 bg-black-200 justify-items-center !overflow-hidden">
        <AppleCardsCarousel data={homeHeroPost} />
      </section>

      <section className={"section_container"}>
        <div className="flex flex-col items-center justify-center relative">
          <TypewriterEffectSmooth words={words_1} cursorClassName="bg-primary" />
        </div>
        <Experience />
      </section>

      <section className={"section_container my-16 bg-white border border-neutral-100 rounded-xl relative"}>
        <div className="flex flex-col items-center justify-center ">
          <TypewriterEffectSmooth words={words_2} cursorClassName="bg-primary" />
        </div>
        <ParallaxScroll cards={searchForProjects} path={"du-an"} />
      </section>
      <section className={"section_container bg-white border border-neutral-100 rounded-xl relative"}>
        <div className="flex flex-col items-center justify-center ">
          <TypewriterEffectSmooth words={words_3} cursorClassName="bg-primary" />
        </div>
        <FocusCards cards={searchForProjectDetails} path="/chi-tiet-du-an" />
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: "CÔNG TY TNHH MTV TRUYỀN THÔNG QUẢNG CÁO COCOC STUDIO",
  description: "Cốc Cốc Studio cung cấp dịch vụ chụp hình quảng cáo cho doanh nghiệp. Đến với Cốc Cốc Studio sẽ cùng nhau thực hiện từ ý tưởng và concept để cho ra những hình ảnh đúng với yêu cầu của từng nhãn hàng nhất.",
  keywords: ["Chụp ảnh sản phẩm", "Chụp ảnh đồ ăn", "Quay video sản phẩm", "Chụp ảnh nhà máy", "Chụp ảnh nội thất", "Cho thuê phòng chụp hình theo giờ"],
  openGraph: {
    title: "Chụp ảnh, Quay phim | Cốc Cốc Studio",
    description: "Cốc Cốc Studio cung cấp dịch vụ chụp hình quảng cáo cho doanh nghiệp. Đến với Cốc Cốc Studio sẽ cùng nhau thực hiện từ ý tưởng và concept để cho ra những hình ảnh đúng với yêu cầu của từng nhãn hàng nhất.",
    url: "https://cococstudio.com/",
    images: [
      {
        url: "https://cococstudio.com/logo-cococstudio.png",
        alt: "cococ-studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@twitterhandle",
    title: "Chụp ảnh, Quay phim | Cốc Cốc Studio",
    description: "Cốc Cốc Studio cung cấp dịch vụ chụp hình quảng cáo cho doanh nghiệp. Đến với Cốc Cốc Studio sẽ cùng nhau thực hiện từ ý tưởng và concept để cho ra những hình ảnh đúng với yêu cầu của từng nhãn hàng nhất.",
    images: [
      {
        url: "https://cococstudio.com/logo-cococstudio.png",
        alt: "cococ-studio",
      },
    ],
  },
};

const words_1 = [
  {
    text: "DỊCH",
  },
  {
    text: "VỤ",
  },
  {
    text: "CỦA",
  },
  {
    text: "CHÚNG",
    className: "text-primary",
  },
  {
    text: "TÔI",
    className: "text-primary",
  },
];
const words_2 = [
  {
    text: "SẢN",
  },
  {
    text: "PHẨM",
  },
  {
    text: "TIÊU",
    className: "text-primary",
  },
  {
    text: "BIỂU",
    className: "text-primary",
  },
];

const words_3 = [
  {
    text: "DỰ",
  },
  {
    text: "ÁN",
  },
  {
    text: "ĐÃ",
  },
  {
    text: "TRIỂN",
    className: "text-primary",
  },
  {
    text: "KHAI",
    className: "text-primary",
  },
];
