import Link from 'next/link'

const vulnerabilities = [
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    titleAr: 'حقن SQL',
    icon: '💉',
    description: 'ثغرة تسمح للمهاجم بحقن أكواد SQL ضارة في استعلامات قاعدة البيانات',
    severity: 'خطيرة جداً',
    color: 'danger',
  },
  {
    id: 'xss',
    title: 'Cross-Site Scripting (XSS)',
    titleAr: 'برمجة نصوص بين المواقع',
    icon: '📜',
    description: 'حقن أكواد JavaScript في صفحات الويب لخداع المستخدمين',
    severity: 'خطيرة',
    color: 'warning',
  },
  {
    id: 'csrf',
    title: 'Cross-Site Request Forgery',
    titleAr: 'تزوير الطلبات بين المواقع',
    icon: '🎣',
    description: 'تزوير طلبات من مستخدم مصادق عليه بدون علمه',
    severity: 'خطيرة',
    color: 'warning',
  },
  {
    id: 'ssrf',
    title: 'Server-Side Request Forgery',
    titleAr: 'تزوير الطلبات من جانب الخادم',
    icon: '🖥️',
    description: 'إجبار الخادم على إجراء طلبات داخلية غير مصرح بها',
    severity: 'خطيرة',
    color: 'danger',
  },
  {
    id: 'clickjacking',
    title: 'Clickjacking',
    titleAr: 'اختطاف النقرات',
    icon: '🖱️',
    description: 'خداع المستخدم بالنقر على عناصر مخفية في صفحة ويب',
    severity: 'متوسطة',
    color: 'warning',
  },
  {
    id: 'api-security',
    title: 'API Security',
    titleAr: 'أمن واجهات البرمجة',
    icon: '🔌',
    description: 'ثغرات أمنية في تصميم وتنفيذ واجهات البرمجة',
    severity: 'متغيرة',
    color: 'info',
  },
]

const tools = [
  {
    name: 'OWASP ZAP',
    description: 'أداة مجانية لفحص ثغرات المواقع',
    icon: '🔍',
    link: 'https://www.zaproxy.org/',
  },
  {
    name: 'Burp Suite',
    description: 'منصة شاملة لاختبار أمن التطبيقات',
    icon: '🐝',
    link: 'https://portswigger.net/burp',
  },
  {
    name: 'Nmap',
    description: 'أداة لفحص الشبكات واكتشاف الخدمات',
    icon: '🗺️',
    link: 'https://nmap.org/',
  },
  {
    name: 'SQLMap',
    description: 'أداة آلية لاكتشاف ثغرات SQL Injection',
    icon: '🗺️',
    link: 'https://sqlmap.org/',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          دليل أمن المواقع الإلكترونية
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          دليلك الشامل لفهم ثغرات أمن المواقع الإلكترونية وتعلم كيفية حماية مشاريعك من الهجمات السيبرانية
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/vulnerabilities/sql-injection"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            ابدأ التعلم
          </Link>
          <Link
            href="/best-practices"
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            أفضل الممارسات
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-primary-50 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">+6</div>
          <div className="text-gray-700">أنواع الثغرات الشائعة</div>
        </div>
        <div className="bg-success-50 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-success-600 mb-2">+20</div>
          <div className="text-gray-700">نصيحة أمنية</div>
        </div>
        <div className="bg-warning-50 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-warning-600 mb-2">+10</div>
          <div className="text-gray-700">أداة فحص</div>
        </div>
      </section>

      {/* Vulnerabilities Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          أشهر الثغرات الأمنية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vulnerabilities.map((vuln) => (
            <Link
              key={vuln.id}
              href={`/vulnerabilities/${vuln.id}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{vuln.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{vuln.titleAr}</h3>
                  <p className="text-sm text-gray-500 mb-2">{vuln.title}</p>
                  <p className="text-gray-600 text-sm mb-3">{vuln.description}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      vuln.color === 'danger'
                        ? 'bg-danger-100 text-danger-700'
                        : vuln.color === 'warning'
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-primary-100 text-primary-700'
                    }`}
                  >
                    {vuln.severity}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          أدوات الفحص والاختبار
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all text-center"
            >
              <span className="text-4xl block mb-3">{tool.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6">ابدأ الآن</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-4">1️⃣</div>
            <h3 className="font-bold mb-2">تعلم الثغرات</h3>
            <p className="text-gray-400">اقرأ عن أنواع الثغرات الشائعة وكيف تعمل</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-4">2️⃣</div>
            <h3 className="font-bold mb-2">اكتشف الثغرات</h3>
            <p className="text-gray-400">استخدم الأدوات المخصصة لفحص مشاريعك</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-4">3️⃣</div>
            <h3 className="font-bold mb-2">احمِ مشروعك</h3>
            <p className="text-gray-400">طبق أفضل الممارسات لحماية تطبيقاتك</p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          أسئلة متكررة
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="bg-gray-50 rounded-lg p-4">
            <summary className="font-bold cursor-pointer">لماذا أمن المواقع مهمة؟</summary>
            <p className="mt-4 text-gray-600">
              أمن المواقع يحمي بيانات المستخدمين ويمنع الهجمات السيبرانية التي قد تؤدي إلى تسريب المعلومات أو تعطيل الخدمات.
            </p>
          </details>
          <details className="bg-gray-50 rounded-lg p-4">
            <summary className="font-bold cursor-pointer">كيف أبدأ في تعلم أمن الويب؟</summary>
            <p className="mt-4 text-gray-600">
              ابدأ بفهم أنواع الثغرات الشائعة من هذا الدليل، ثم تعلم استخدام أدوات الفحص، وطبق أفضل الممارسات في مشاريعك.
            </p>
          </details>
          <details className="bg-gray-50 rounded-lg p-4">
            <summary className="font-bold cursor-pointer">هل هذا الدليل مناسب للمبتدئين؟</summary>
            <p className="mt-4 text-gray-600">
              نعم، الدليل مصمم لجميع المستويات مع شرح مبسط وأمثلة عملية تناسب المبتدئين والمتخصصين.
            </p>
          </details>
        </div>
        <div className="text-center mt-6">
          <Link href="/faq" className="text-primary-600 hover:text-primary-800 font-semibold">
            عرض جميع الأسئلة ←
          </Link>
        </div>
      </section>
    </div>
  )
}
