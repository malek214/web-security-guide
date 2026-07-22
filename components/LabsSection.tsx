import { vulnerabilityLabs } from '@/lib/labs'

interface LabsSectionProps {
  slug: string
}

const platformColors: Record<string, string> = {
  'TryHackMe': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  'HackTheBox': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'PortSwigger': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  'OWASP WebGoat': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  'DVWA': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
}

const difficultyColors: Record<string, string> = {
  'beginner': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'intermediate': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  'advanced': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

const difficultyLabels: Record<string, string> = {
  'beginner': 'مبتدئ',
  'intermediate': 'متوسط',
  'advanced': 'متقدم',
}

export default function LabsSection({ slug }: LabsSectionProps) {
  const labs = vulnerabilityLabs[slug]

  if (!labs || labs.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-4 mb-6">
        🧪 مختبرات تفاعلية
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        مختبرات عملية مجانية لتطبيق مهاراتك في بيئة آمنة ومحصّنة.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${platformColors[lab.platform]}`}>
                  {lab.platform}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[lab.difficulty]}`}>
                  {difficultyLabels[lab.difficulty]}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                {lab.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {lab.description}
              </p>
              <a
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                <span>ابدأ المختبر</span>
                <span>←</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">نصيحة</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-0">
              ابدأ بالمستوى المبتدئ وانتقل تدريجياً إلى المتقدم. الممارسة المستمرة هي مفتاح التعلم.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
