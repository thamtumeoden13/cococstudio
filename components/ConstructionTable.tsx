import React from 'react'
import { CONSTRUCTIONS_BY_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { TableComponent } from './shared/Table';

const ConstructionTable = async () => {

  // const { _id: id, title, slug } = post

  const params = { search: null }

  const { data: searchForProjects } = await sanityFetch({ query: CONSTRUCTIONS_BY_QUERY, params });

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0"}>
      <TableComponent data={searchForProjects} title='Hạng Mục' path='hang-muc' />
    </section>
  )
}
export default ConstructionTable
