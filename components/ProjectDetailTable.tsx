import React from 'react'
import { PROJECT_DETAILS_BY_QUERY, PROJECTS_BY_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { TableComponent } from './shared/Table';

const ProjectDetailTable = async () => {

  // const { _id: id, title, slug } = post

  const params = { search: null }

  const { data: searchForProjects } = await sanityFetch({ query: PROJECT_DETAILS_BY_QUERY, params });

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center"}>
      <TableComponent data={searchForProjects} title='Dự Án' />
    </section>
  )
}
export default ProjectDetailTable
