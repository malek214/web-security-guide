import { caseStudies, CaseStudy } from '@/lib/case-studies'

interface CaseStudiesSectionProps {
  slug?: string
  showAll?: boolean
}

const vulnerabilityLabels: Record<string, string> = {
  'sql-injection': 'SQL Injection',
  'security-misconfiguration': 'Security Misconfiguration',
  'supply-chain': 'Supply Chain Attack',
  'rce': 'Remote Code Execution',
  'social-engineering': 'Social Engineering',
  'api-security': 'API Security',
}

const vulnerabilityColors: Record<string, string> = {
  'sql-injection': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  'security-misconfiguration': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  'supply-chain': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  'rce': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  'social-engineering': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  'api-security': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
}

export default function CaseStudiesSection({ slug, showAll = false }: CaseStudiesSectionProps) {
  let studies = showAll ? caseStudies : caseStudies

  if (slug && !showAll) {
    studies = caseStudies.filter(s => s.vulnerabilityType === slug)
  }

  if (studies.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-4 mb-6">
        📋 دراسات حالة حقيقية
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        دراسات لاختراقات أمنية حقيقية حدثت لشركات عالمية كبرى.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study) => (
          <div
            key={study.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {study.company}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {study.year}
                </span>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${vulnerabilityColors[study.vulnerabilityType]}`}>
                {vulnerabilityLabels[study.vulnerabilityType]}
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                {study.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {study.description.substring(0, 150)}...
              </p>
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  التأثير:
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  {study.impact.substring(0, 100)}...
                </p>
              </div>
              <a
                href={`/case-studies#${study.id}`}
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                <span>التفاصيل الكاملة</span>
                <span>←</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
