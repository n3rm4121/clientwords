import { MetadataRoute } from 'next'

type Route = {
  url: string
  lastModified?: string
}

const baseUrl = 'https://clientwords.com' 

const routes: Route[] = [
  {
    url: '/',
    lastModified: new Date().toISOString(),
  },
  {
    url: '/login',
    lastModified: new Date().toISOString(),
  },
  {
    url: '/privacy',
    lastModified: new Date().toISOString(),
  },
  {
    url: '/terms',
    lastModified: new Date().toISOString(),
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
  }))

  return sitemapEntries
}