import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.birdiskool.com';
  
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1

# Disallow admin/private areas (if any in future)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow all public pages
Allow: /
Allow: /implementer
Allow: /conclave
Allow: /crm
Allow: /about
Allow: /contact
Allow: /blog
Allow: /privacy
Allow: /terms`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
