import Link from 'next/link'

const vulnerabilities = [
  { id: 'sql-injection', title: 'حقن SQL', icon: '💉', category: 'حقن' },
  { id: 'xss', title: 'XSS', icon: '📜', category: 'حقن' },
  { id: 'csrf', title: 'CSRF', icon: '🎣', category: 'تزوير' },
  { id: 'ssrf', title: 'SSRF', icon: '🖥️', category: 'تزوير' },
  { id: 'command-injection', title: 'حقن أوامر', icon: '⌨️', category: 'حقن' },
  { id: 'nosql-injection', title: 'NoSQL Injection', icon: '🗄️', category: 'حقن' },
  { id: 'ldap-injection', title: 'LDAP Injection', icon: '📂', category: 'حقن' },
  { id: 'xpath-injection', title: 'XPath Injection', icon: '🔍', category: 'حقن' },
  { id: 'crlf-injection', title: 'CRLF Injection', icon: '↩️', category: 'حقن' },
  { id: 'xxe', title: 'XXE', icon: '📦', category: 'حقن' },
  { id: 'ssti', title: 'SSTI', icon: '🎨', category: 'حقن' },
  { id: 'lfi', title: 'LFI', icon: '📁', category: 'تضمين' },
  { id: 'idor', title: 'IDOR', icon: '🔗', category: 'تحكم بالوصول' },
  { id: 'open-redirect', title: 'Open Redirect', icon: '↗️', category: 'توجيه' },
  { id: 'cors', title: 'CORS Misconfiguration', icon: '🌐', category: 'تكوين' },
  { id: 'jwt', title: 'JWT Vulnerabilities', icon: '🔐', category: 'مصادقة' },
  { id: 'oauth', title: 'OAuth Vulnerabilities', icon: '🔑', category: 'مصادقة' },
  { id: 'password-attacks', title: 'هجمات كلمات المرور', icon: '🔒', category: 'مصادقة' },
  { id: 'session-fixation', title: 'تثبيت الجلسة', icon: '🎟️', category: 'جلسة' },
  { id: 'cookie-poisoning', title: 'تسميم الكوكيز', icon: '🍪', category: 'جلسة' },
  { id: 'clickjacking', title: 'اختطاف النقرات', icon: '🖱️', category: 'واجهة' },
  { id: 'api-security', title: 'أمن APIs', icon: '🔌', category: 'واجهة' },
  { id: 'insecure-deserialization', title: 'عدم آمان إعادة التحويل', icon: '🔄', category: 'بيانات' },
  { id: 'security-misconfiguration', title: 'خطأ في التكوين', icon: '⚙️', category: 'تكوين' },
  { id: 'broken-access-control', title: 'خطأ في التحكم بالوصول', icon: '🚫', category: 'تحكم بالوصول' },
  { id: 'information-disclosure', title: 'الكشف عن المعلومات', icon: '📋', category: 'معلومات' },
  { id: 'mass-assignment', title: 'التكليف الجماعي', icon: '📝', category: 'بيانات' },
  { id: 'business-logic', title: 'ثغرات المنطق التجاري', icon: '🧮', category: 'منطق' },
  { id: 'race-condition', title: 'حالة السباق', icon: '🏎️', category: 'توقيت' },
  { id: 'http-smuggling', title: 'تهريب الطلبات', icon: '🚂', category: 'بروتوكول' },
  { id: 'host-header-injection', title: 'حقن رأس الاستضافة', icon: '🏷️', category: 'رأس' },
  { id: 'subdomain-takeover', title: 'استيلاء على النطاقات', icon: '🌍', category: 'نطاق' },
  { id: 'dns-rebinding', title: 'إعادة ربط DNS', icon: '🔄', category: 'DNS' },
  { id: 'prototype-pollution', title: 'تلوث النموذج البرمجي', icon: '🧬', category: 'JavaScript' },
  { id: 'denial-of-service', title: 'حجب الخدمة', icon: '💥', category: 'توفر' },
  { id: 'file-upload', title: 'ثغرات رفع الملفات', icon: '📤', category: 'ملفات' },
  { id: 'ai-security', title: 'أمن الذكاء الاصطناعي', icon: '🤖', category: 'AI' },
  { id: 'n8n-security', title: 'أمن n8n', icon: '⚡', category: 'أدوات' },
]

const categories = Array.from(new Set(vulnerabilities.map(v => v.category)))

export default function VulnerabilitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-72 flex-shrink-0">
        <nav className="sticky top-24 bg-white rounded-xl border border-gray-200 overflow-hidden max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <h2 className="font-bold text-lg">أنواع الثغرات</h2>
            <p className="text-sm text-blue-100">{vulnerabilities.length} ثغرة</p>
          </div>
          
          {categories.map((category) => (
            <div key={category} className="border-b border-gray-100 last:border-0">
              <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                {category}
              </div>
              <ul className="divide-y divide-gray-50">
                {vulnerabilities
                  .filter(v => v.category === category)
                  .map((vuln) => (
                    <li key={vuln.id}>
                      <Link
                        href={`/vulnerabilities/${vuln.id}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-sm"
                      >
                        <span className="text-lg">{vuln.icon}</span>
                        <span className="text-gray-700">{vuln.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          
          <div className="p-4 border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
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
