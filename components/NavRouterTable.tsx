import React from 'react'
import { CATEGORY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';

const NavRouterTable = async () => {

  const params = { slug: 'nav-router' }

  const { select: navProjectRouter } = await client
        .withConfig({ useCdn: false })
        .fetch(CATEGORY_BY_SLUG_QUERY, params);

  if (!navProjectRouter?.length) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0"}>
      <TableComponent data={navProjectRouter} title='Nav Router' actions={['Delete']} />
    </section>
  )
}
export default NavRouterTable
