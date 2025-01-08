import React from 'react'
import { CATEGORY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { TableComponent } from './shared/Table';

const FooterTable = async () => {

  //const { _id: id, title, slug } = post


  const params = { slug: 'footer' }

  const { data: footerCategory } = await sanityFetch({ query: CATEGORY_BY_SLUG_QUERY, params })


  if (!footerCategory?.length) return null;

  return (
    <section className={"section_container !justify-items-center"}>
      <TableComponent data={footerCategory} title='Footer' />
    </section>
  )
}
export default FooterTable
