import Link from 'next/link'

const vulnerabilities = [
  { id: 'sql-injection', title: 'حقن SQL', icon: '💉' },
  { id: 'xss', title: 'XSS', icon: '📜' },
  { id: 'csrf', title: 'CSRF', icon: '🎣' },
  { id: 'ssrf', title: 'SSRF', icon: '🖥️' },
  { id: 'clickjacking', title: 'اختطاف النقرات', icon: '🖱️' },
  { id: 'api-security', title: 'أمن APIs', icon: '🔌' },
]

export default function VulnerabilitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <nav className="sticky top-24 bg-gray-50 rounded-xl p-4">
          <h2 className="font-bold text-gray-900 mb-4 px-4">أنواع الثغرات</h2>
          <ul className="space-y-1">
            {vulnerabilities.map((vuln) => (
              <li key={vuln.id}>
                <Link
                  href={`/vulnerabilities/${vuln.id}`}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>{vuln.icon}</span>
                  <span>{vuln.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              ← العودة للرئيسية
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
