import { caseStudies } from '@/lib/case-studies'

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

export const metadata = {
  title: 'دراسات حالة حقيقية | دليل أمن المواقع',
  description: 'دراسات لاختراقات أمنية حقيقية حدثت لشركات عالمية كبرى',
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-l from-primary-900 to-primary-700 text-white py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">دراسات حالة حقيقية</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            دراسات لاختراقات أمنية حقيقية حدثت لشركات عالمية كبرى
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        <div className="space-y-8">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {study.company}
                  </span>
                  <span className="text-lg text-gray-500 dark:text-gray-400">
                    ({study.year})
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${vulnerabilityColors[study.vulnerabilityType]}`}>
                    {vulnerabilityLabels[study.vulnerabilityType]}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {study.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      📖 الوصف
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {study.description}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      💥 التأثير
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {study.impact}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      📚 الدروس المستفادة
                    </h3>
                    <ul className="space-y-2">
                      {study.lessonsLearned.split('\n').map((lesson, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-12">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">ملاحظة أمنية</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-0">
                هذه الدراسات للأغراض التعليمية فقط. هدفها هو توعية المطورين والمحللين الأمنيين بأهمية تأمين التطبيقات والأنظمة.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
