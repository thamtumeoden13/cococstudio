import React from 'react'
import { CATEGORY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { TableComponent } from './shared/Table';

const NavRouterTable = async () => {

  const params = { slug: 'nav-router' }

  const { data: navProjectRouter } = await sanityFetch({ query: CATEGORY_BY_SLUG_QUERY, params })

  if (!navProjectRouter?.length) return null;

  return (
    <section className={"section_container !justify-items-center"}>
      <TableComponent data={navProjectRouter} title='Nav Router' />
    </section>
  )
}
export default NavRouterTable
