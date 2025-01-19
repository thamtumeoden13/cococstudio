import SearchForm from "@/components/SearchForm";
import { CONSTRUCTIONS_BY_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import ConstructionList from "@/components/ConstructionList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import { SimpleCardType } from "@/components/SimpleCard";

export default async function Product({ searchParams }: Readonly<{
  searchParams: Promise<{ query?: string }>
}>) {

  const query = (await searchParams).query;

  const params = { search: query ?? null };

  console.log(`params: ${query}`)

  const { data: searchForConstructions } = await sanityFetch({ query: CONSTRUCTIONS_BY_QUERY, params });
  console.log(`searchForConstructions -> ${JSON.stringify(params)}: ${searchForConstructions}`)

  return (
    <>
      <MarkupSchema path="san-pham" />

      <section className={"pink_container"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Sản Phẩm Mà Bạn Quan Tâm.
        </p>

        <SearchForm query={query} path="san-pham" search="sản phẩm" />
      </section>


      {searchForConstructions?.length > 0 ? (
        searchForConstructions.map((post: SimpleCardType) => (
          <ConstructionList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy sản phẩm phù hợp
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