
import { Tabs } from "./ui/tabs";
import ConstructionTable from "./ConstructionTable";
import ProjectTable from "./ProjectTable";
import ProjectDetailTable from "./ProjectDetailTable";
import CategoryTable from "./CategoryTable";
import { Author } from "@/sanity/types";

export const TabManagement = async ({ user }: { user: Author }) => {

  const role = user?.role;

  console.log('TabManagement -> user', user)

  const tabs = [
    {
      title: "Hạng Mục",
      value: "hang-muc",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ConstructionTable role={role} />
        </div>
      ),
    },
    {
      title: "Dự Án",
      value: "du-an",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ProjectTable role={role} />
        </div>
      ),
    },
    {
      title: "Bài Viết",
      value: "chi-tiet-bai-viet",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ProjectDetailTable role={role} />
        </div>
      ),
    },
    {
      title: "Home Hero",
      value: "home-hero",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="home-hero"
            title="Trang Chủ"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Nav Router",
      value: "nav-router",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="nav-router"
            title="Nav Router"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Footer",
      value: "footer",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="footer"
            title="Footer"
            role={role}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[90vh] max-md:hidden [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start m-10">
      <Tabs
        tabs={tabs}
        activeTabClassName="bg-primary"
      />
    </div>
  );
}

