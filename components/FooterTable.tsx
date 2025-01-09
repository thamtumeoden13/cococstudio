import React from 'react'
import { CATEGORY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';

const FooterTable = async () => {

  const params = { slug: 'footer' }

  const { select: footerCategory } = await client.fetch(CATEGORY_BY_SLUG_QUERY, params);

  if (!footerCategory?.length) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0"}>
      <TableComponent data={footerCategory} title='Footer' />
    </section>
  )
}
export default FooterTable
