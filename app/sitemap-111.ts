// import type { MetadataRoute } from 'next'
// const baseUrl = 'https://cococstudio.com';
 
// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: `${baseUrl}/hang-muc`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 1,
//     },
//     {
//       url: `${baseUrl}/du-an`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 0.8,
//     },
//     {
//       url: `${baseUrl}/chi-tiet-du-an`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 0.5,
//     },
//     {
//       url: `${baseUrl}/thong-tin`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 0.5,
//     },
//   ]
// }

import { client } from "@/sanity/lib/client";
import { CONSTRUCTIONS_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectDetail } from "@/sanity/types";
import type { MetadataRoute } from 'next'

const baseUrl = 'https://cococstudio.com';

// Định nghĩa kiểu cho các đối tượng trả về
type PostType = Pick<ProjectDetail, "slug" | "_updatedAt">;

async function fetchPosts() {
  const [
    { data: searchForConstructions },
    { data: searchForProjects },
    { data: searchForProjectDetails },
  ] = await Promise.all([
    client.fetch(CONSTRUCTIONS_QUERY, { search: null }),
    client.fetch(PROJECTS_QUERY, { search: null }),
    client.fetch(PROJECT_DETAILS_BY_QUERY, { search: null }),
  ]);

  const sitemapConstructions = searchForConstructions.map((post: PostType) => ({
    url: `${baseUrl}/hang-muc/${post.slug?.current}`,
    lastModified: new Date(post._updatedAt),
  }));

  const sitemapProjects = searchForProjects.map((post: PostType) => ({
    url: `${baseUrl}/du-an/${post.slug?.current}`,
    lastModified: new Date(post._updatedAt),
  }));

  const sitemapProjectDetails = searchForProjectDetails.map((post: PostType) => ({
    url: `${baseUrl}/chi-tiet-du-an/${post.slug?.current}`,
    lastModified: new Date(post._updatedAt),
  }));

  return [...sitemapConstructions, ...sitemapProjects, ...sitemapProjectDetails];
}

export default async function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes = await fetchPosts();
  console.log("Fetched dynamic routes: ", JSON.stringify(dynamicRoutes, null, 2));
  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/hang-muc`, lastModified: new Date() },
    { url: `${baseUrl}/du-an`, lastModified: new Date() },
    { url: `${baseUrl}/chi-tiet-du-an`, lastModified: new Date() },
    { url: `${baseUrl}/thong-tin`, lastModified: new Date() },
  ];

  return [...staticRoutes];
}
