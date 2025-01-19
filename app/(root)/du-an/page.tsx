import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { PROJECTS_BY_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ProjectDetailList from "@/components/ProjectDetailList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import { SimpleCardType } from "@/components/SimpleCard";

export default async function Projects({ searchParams }: {
  readonly searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  console.log(`params -> ${JSON.stringify(params)}`);

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_QUERY, params });
  console.log({searchForProjects});

  return (
    <>
      <MarkupSchema path={`du-an`} />

      <section className={"pink_container"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Dự Án Mà Bạn Quan Tâm.
        </p>
        <SearchForm query={query} path="du-an" search="Dự Án" />
      </section>

      {searchForProjects?.length > 0 ? (
        searchForProjects.map((post: SimpleCardType) => (
          <ProjectDetailList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy dự án
          </p>
        </section>
      )}

      <SanityLive />
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