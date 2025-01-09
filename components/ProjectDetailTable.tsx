import React from 'react'
import { PROJECT_DETAILS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';

const ProjectDetailTable = async () => {

  // const { _id: id, title, slug } = post

  const params = { search: null }

  const searchForProjects = await client.fetch(PROJECT_DETAILS_BY_QUERY, params);

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0"}>
      <TableComponent data={searchForProjects} title='Dự Án' path='chi-tiet-du-an' />
    </section>
  )
}
export default ProjectDetailTable
