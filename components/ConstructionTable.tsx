import React from 'react'
import { CONSTRUCTIONS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';

const ConstructionTable = async () => {

  const params = { search: null }

  const searchForProjects = await client.fetch(CONSTRUCTIONS_BY_QUERY, params);

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0"}>
      <TableComponent data={searchForProjects} title='Hạng Mục' path='hang-muc' />
    </section>
  )
}
export default ConstructionTable
