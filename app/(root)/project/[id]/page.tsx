import React from 'react'

import ProjectAlbum from "@/components/ProjectAlbum"
import ProjectGeneral from "@/components/ProjectGeneral"
// import BreadcrumbComponent from "@/components/shared/Breadcrumb"
// import Header from "@/components/shared/Header"

const ProjectDetail = () => {
  return (
    <>
      {/*<BreadcrumbComponent />*/}

      {/*<Header*/}
      {/*  title="Thiết Kế Nhà Phố 3 Tầng Hiện Đại tại Biên Hòa"*/}
      {/*  subtitle="Thông tin chi tiết dự án"*/}
      {/*/>*/}
      <section className={"section_container !py-0 !px-2 w-full mt-32 !min-h-[230px]"}>
        <div className="h-[44rem] w-full">
          <ProjectAlbum />
        </div>
      </section>

      <section className="section_container">
        <h1 className={"heading"}>
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competition
        </p>

        <ProjectGeneral />

      </section>
    </>
  )
}

export default ProjectDetail