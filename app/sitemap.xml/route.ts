import { client } from "@/sanity/lib/client";
import { CONSTRUCTIONS_BY_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_BY_QUERY } from "@/sanity/lib/queries";
import { ProjectDetail } from "@/sanity/types";
import { getServerSideSitemap } from 'next-sitemap'

const baseUrl = 'https://cococstudio.com';

// Định nghĩa kiểu cho các đối tượng trả về
type PostType = Pick<ProjectDetail, "slug" | "_updatedAt">;

async function fetchPosts() {
  const [
    searchForConstructions,
    searchForProjects,
    searchForProjectDetails,
  ] = await Promise.all([
    client.fetch(CONSTRUCTIONS_BY_QUERY, { search: null }),
    client.fetch(PROJECTS_BY_QUERY, { search: null }),
    client.fetch(PROJECT_DETAILS_BY_QUERY, { search: null }),
  ]);

  console.log({ searchForConstructions, searchForProjects, searchForProjectDetails })

  const sitemapConstructions = searchForConstructions?.map((post: PostType) => ({
    loc: `${baseUrl}/san-pham/${post.slug?.current}`,
    lastmod: new Date(post._updatedAt).toISOString(),
  })) || [];

  const sitemapProjects = searchForProjects?.map((post: PostType) => ({
    loc: `${baseUrl}/du-an/${post.slug?.current}`,
    lastmod: new Date(post._updatedAt).toISOString(),
  })) || [];

  const sitemapProjectDetails = searchForProjectDetails?.map((post: PostType) => ({
    loc: `${baseUrl}/chi-tiet-du-an/${post.slug?.current}`,
    lastmod: new Date(post._updatedAt).toISOString(),
  })) || [];

  return [...sitemapConstructions, ...sitemapProjects, ...sitemapProjectDetails];
}

export async function GET() {
  const dynamicRoutes = await fetchPosts();
  
  const staticRoutes = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/san-pham`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/du-an`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/chi-tiet-du-an`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/thong-tin`, lastmod: new Date().toISOString() },
  ];

  return getServerSideSitemap([
    {
      loc: `${baseUrl}`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    ...staticRoutes,
    ...dynamicRoutes
  ])
}
