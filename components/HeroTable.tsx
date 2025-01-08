import React from 'react'
import { CATEGORY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { TableComponent } from './shared/Table';

const HeroTable = async () => {

  // const { _id: id, title, slug } = post

  const params = { slug: 'home-hero' }

  const { data: homeHeroPost } = await sanityFetch({ query: CATEGORY_BY_SLUG_QUERY, params })

  if (!homeHeroPost?.length) return null;

  return (
    <section className={"section_container !justify-items-center"}>
      <TableComponent data={homeHeroPost} title='Trang Chủ' />
    </section>
  )
}
export default HeroTable
