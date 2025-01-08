// "use client";

import { Tabs } from "./ui/tabs";
import ConstructionTable from "./ConstructionTable";
import ProjectTable from "./ProjectTable";
import ProjectDetailTable from "./ProjectDetailTable";
import HeroTable from "./HeroTable";
import NavRouterTable from "./NavRouterTable";
import FooterTable from "./FooterTable";

export function TabManagement() {
  const tabs = [
    {
      title: "Hạng Mục",
      value: "hang-muc",
      content: (
        <div className="relative w-full h-full p-10 overflow-scroll text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <p>Hạng Mục</p>
          <ConstructionTable />
        </div>
      ),
    },
    {
      title: "Dự Án",
      value: "du-an",
      content: (
        <div className="relative w-full h-full p-10 overflow-scroll text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <p>Dự Án</p>
          <ProjectTable />
        </div>
      ),
    },
    {
      title: "Bài Viết",
      value: "chi-tiet-bai-viet",
      content: (
        <div className="relative w-full h-full p-10 overflow-scroll text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <p>Bài Viết</p>
          <ProjectDetailTable />
        </div>
      ),
    },
    {
      title: "Home Hero",
      value: "home-hero",
      content: (
        <div className="relative w-full h-full p-10 overflow-scroll text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <p>Trang Chủ</p>
          <HeroTable />
        </div>
      ),
    },
    {
      title: "Nav Router",
      value: "nav-router",
      content: (
        <div className="relative w-full h-full p-10 overflow-scroll text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <p>Nav Router</p>
          <NavRouterTable />
        </div>
      ),
    },
    {
      title: "Footer",
      value: "footer",
      content: (
        <div className="relative w-full h-full p-10 overflow-scroll text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <p>Footer</p>
          <FooterTable />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start m-10">
      <Tabs tabs={tabs} />
    </div>
  );
}

