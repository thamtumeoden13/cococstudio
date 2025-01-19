
import { Tabs } from "./ui/tabs";
import ConstructionTable from "./ConstructionTable";
import ProjectTable from "./ProjectTable";
import ProjectDetailTable from "./ProjectDetailTable";
import CategoryTable from "./CategoryTable";
import { Author } from "@/sanity/types";
import PermissionTable from "./PermissionTable";

export const TabManagement = async ({ user }: { user: Author }) => {

  const role = user?.role;

  console.log('TabManagement -> user', user)

  const tabs = [
    {
      title: "Sản Phẩm",
      value: "san-pham",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ConstructionTable title='Sản Phẩm' role={role} />
        </div>
      ),
    },
    {
      title: "Dự Án",
      value: "du-an",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ProjectTable title="Dự Án" role={role} />
        </div>
      ),
    },
    {
      title: "Bài Viết",
      value: "chi-tiet-bai-viet",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ProjectDetailTable title="Bài Viết" role={role} />
        </div>
      ),
    },
    {
      title: "Danh Mục Trang Chủ",
      value: "danh-muc-trang-chu",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="danh-muc-trang-chu"
            title="Danh Mục Trang Chủ"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Danh Mục Sản Phẩm",
      value: "danh-muc-san-pham",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="danh-muc-san-pham"
            title="Danh Mục Sản Phẩm"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Danh Mục Dự Án",
      value: "danh-muc-du-an",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="danh-muc-du-an"
            title="Danh Mục Dự Án"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Danh Mục Cuối Trang",
      value: "danh-muc-cuoi-trang",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="danh-muc-cuoi-trang"
            title="Danh Mục Cuối Trang"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Quyền Truy Cập",
      value: "permission",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          {role === 'admin' ?
            <PermissionTable title="Quyền Truy Cập" role={role} />
            : 'Bạn không có quyền truy cập'
          }
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

