import React from 'react'
import { PROJECTS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';

const ProjectTable = async () => {

  const params = { search: null }

  const searchForProjects = await client.fetch(PROJECTS_BY_QUERY, params);

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0"}>
      <TableComponent data={searchForProjects} title='Dự Án' path='du-an' />
    </section>
  )
}
export default ProjectTable
