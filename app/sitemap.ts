import { MetadataRoute } from 'next'

const BASE_URL = 'https://web-security-guide.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/tools',
    '/best-practices',
    '/resources',
    '/contact',
    '/report',
    '/faq',
    '/about',
  ]

  const vulnerabilityPages = [
    '/sql-injection',
    '/xss',
    '/csrf',
    '/ssrf',
    '/command-injection',
    '/nosql-injection',
    '/ldap-injection',
    '/xpath-injection',
    '/crlf-injection',
    '/xxe',
    '/ssti',
    '/lfi',
    '/idor',
    '/open-redirect',
    '/cors',
    '/jwt',
    '/oauth',
    '/password-attacks',
    '/session-fixation',
    '/cookie-poisoning',
    '/clickjacking',
    '/api-security',
    '/insecure-deserialization',
    '/security-misconfiguration',
    '/broken-access-control',
    '/information-disclosure',
    '/mass-assignment',
    '/business-logic',
    '/race-condition',
    '/http-smuggling',
    '/host-header-injection',
    '/subdomain-takeover',
    '/dns-rebinding',
    '/prototype-pollution',
    '/denial-of-service',
    '/file-upload',
  ]

  const staticEntries = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1.0 : 0.8,
  }))

  const vulnerabilityEntries = vulnerabilityPages.map((page) => ({
    url: `${BASE_URL}/vulnerabilities${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticEntries, ...vulnerabilityEntries]
}
