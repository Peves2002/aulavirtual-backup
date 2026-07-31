import type { MetadataRoute } from 'next'

import { getConfigs } from '@/utils/libs/config'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const configs = await getConfigs()
  const siteUrl = configs.SEO_SITE_URL?.trim() || 'https://adphgroup.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/estudiante/',
          '/docente/',
          '/checkout/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
