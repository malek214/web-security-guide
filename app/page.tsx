import Link from 'next/link'

const allVulnerabilities = [
  { id: 'sql-injection', title: 'حقن SQL', titleEn: 'SQL Injection', icon: '💉', severity: 'خطيرة جداً', category: 'حقن', color: 'red' },
  { id: 'xss', title: 'XSS', titleEn: 'Cross-Site Scripting', icon: '📜', severity: 'خطيرة', category: 'حقن', color: 'red' },
  { id: 'csrf', title: 'CSRF', titleEn: 'Cross-Site Request Forgery', icon: '🎣', severity: 'خطيرة', category: 'تزوير', color: 'orange' },
  { id: 'ssrf', title: 'SSRF', titleEn: 'Server-Side Request Forgery', icon: '🖥️', severity: 'خطيرة', category: 'تزوير', color: 'red' },
  { id: 'command-injection', title: 'حقن أوامر', titleEn: 'Command Injection', icon: '⌨️', severity: 'خطيرة جداً', category: 'حقن', color: 'red' },
  { id: 'nosql-injection', title: 'NoSQL Injection', titleEn: 'NoSQL Injection', icon: '🗄️', severity: 'خطيرة', category: 'حقن', color: 'red' },
  { id: 'ldap-injection', title: 'LDAP Injection', titleEn: 'LDAP Injection', icon: '📂', severity: 'خطيرة', category: 'حقن', color: 'orange' },
  { id: 'xpath-injection', title: 'XPath Injection', titleEn: 'XPath Injection', icon: '🔍', severity: 'متوسطة', category: 'حقن', color: 'yellow' },
  { id: 'crlf-injection', title: 'CRLF Injection', titleEn: 'CRLF Injection', icon: '↩️', severity: 'متوسطة', category: 'حقن', color: 'yellow' },
  { id: 'xxe', title: 'XXE', titleEn: 'XML External Entity', icon: '📦', severity: 'خطيرة', category: 'حقن', color: 'red' },
  { id: 'ssti', title: 'SSTI', titleEn: 'Server-Side Template Injection', icon: '🎨', severity: 'خطيرة جداً', category: 'حقن', color: 'red' },
  { id: 'lfi', title: 'LFI', titleEn: 'Local File Inclusion', icon: '📁', severity: 'خطيرة', category: 'تضمين', color: 'orange' },
  { id: 'idor', title: 'IDOR', titleEn: 'Insecure Direct Object References', icon: '🔗', severity: 'خطيرة', category: 'تحكم بالوصول', color: 'orange' },
  { id: 'open-redirect', title: 'Open Redirect', titleEn: 'Open Redirect', icon: '↗️', severity: 'متوسطة', category: 'توجيه', color: 'yellow' },
  { id: 'cors', title: 'CORS Misconfiguration', titleEn: 'CORS Misconfiguration', icon: '🌐', severity: 'متوسطة', category: 'تكوين', color: 'yellow' },
  { id: 'jwt', title: 'JWT Vulnerabilities', titleEn: 'JWT Vulnerabilities', icon: '🔐', severity: 'خطيرة', category: 'مصادقة', color: 'orange' },
  { id: 'oauth', title: 'OAuth Vulnerabilities', titleEn: 'OAuth Vulnerabilities', icon: '🔑', severity: 'خطيرة', category: 'مصادقة', color: 'orange' },
  { id: 'password-attacks', title: 'هجمات كلمات المرور', titleEn: 'Password Attacks', icon: '🔒', severity: 'خطيرة', category: 'مصادقة', color: 'orange' },
  { id: 'session-fixation', title: 'تثبيت الجلسة', titleEn: 'Session Fixation', icon: '🎟️', severity: 'متوسطة', category: 'جلسة', color: 'yellow' },
  { id: 'cookie-poisoning', title: 'تسميم الكوكيز', titleEn: 'Cookie Poisoning', icon: '🍪', severity: 'متوسطة', category: 'جلسة', color: 'yellow' },
  { id: 'clickjacking', title: 'اختطاف النقرات', titleEn: 'Clickjacking', icon: '🖱️', severity: 'متوسطة', category: 'واجهة', color: 'yellow' },
  { id: 'api-security', title: 'أمن APIs', titleEn: 'API Security', icon: '🔌', severity: 'متغيرة', category: 'واجهة', color: 'blue' },
  { id: 'insecure-deserialization', title: 'عدم آمان إعادة التحويل', titleEn: 'Insecure Deserialization', icon: '🔄', severity: 'خطيرة', category: 'بيانات', color: 'red' },
  { id: 'security-misconfiguration', title: 'خطأ في التكوين', titleEn: 'Security Misconfiguration', icon: '⚙️', severity: 'متوسطة', category: 'تكوين', color: 'yellow' },
  { id: 'broken-access-control', title: 'خطأ في التحكم بالوصول', titleEn: 'Broken Access Control', icon: '🚫', severity: 'خطيرة', category: 'تحكم بالوصول', color: 'red' },
  { id: 'information-disclosure', title: 'الكشف عن المعلومات', titleEn: 'Information Disclosure', icon: '📋', severity: 'متوسطة', category: 'معلومات', color: 'yellow' },
  { id: 'mass-assignment', title: 'التكليف الجماعي', titleEn: 'Mass Assignment', icon: '📝', severity: 'متوسطة', category: 'بيانات', color: 'yellow' },
  { id: 'business-logic', title: 'ثغرات المنطق التجاري', titleEn: 'Business Logic', icon: '🧮', severity: 'متغيرة', category: 'منطق', color: 'blue' },
  { id: 'race-condition', title: 'حالة السباق', titleEn: 'Race Condition', icon: '🏎️', severity: 'متوسطة', category: 'توقيت', color: 'yellow' },
  { id: 'http-smuggling', title: 'تهريب الطلبات', titleEn: 'HTTP Request Smuggling', icon: '🚂', severity: 'خطيرة', category: 'بروتوكول', color: 'red' },
  { id: 'host-header-injection', title: 'حقن رأس الاستضافة', titleEn: 'Host Header Injection', icon: '🏷️', severity: 'متوسطة', category: 'رأس', color: 'yellow' },
  { id: 'subdomain-takeover', title: 'استيلاء على النطاقات', titleEn: 'Subdomain Takeover', icon: '🌍', severity: 'خطيرة', category: 'نطاق', color: 'orange' },
  { id: 'dns-rebinding', title: 'إعادة ربط DNS', titleEn: 'DNS Rebinding', icon: '🔄', severity: 'خطيرة', category: 'DNS', color: 'orange' },
  { id: 'prototype-pollution', title: 'تلوث النموذج البرمجي', titleEn: 'Prototype Pollution', icon: '🧬', severity: 'متوسطة', category: 'JavaScript', color: 'yellow' },
  { id: 'denial-of-service', title: 'حجب الخدمة', titleEn: 'Denial of Service', icon: '💥', severity: 'خطيرة', category: 'توفر', color: 'red' },
  { id: 'file-upload', title: 'ثغرات رفع الملفات', titleEn: 'File Upload Vulnerabilities', icon: '📤', severity: 'خطيرة', category: 'ملفات', color: 'orange' },
]

const severityColors: Record<string, string> = {
  'red': 'bg-red-100 text-red-700 border-red-200',
  'orange': 'bg-orange-100 text-orange-700 border-orange-200',
  'yellow': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'blue': 'bg-blue-100 text-blue-700 border-blue-200',
}

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full pulse-dot"></span>
            دليل شامل لأمن تطبيقات الويب
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            دليل <span className="gradient-text">الثغرات الأمنية</span>
            <br />
            للمواقع الإلكترونية
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            تعلّم كيف تكتشف وتمنع أكثر من <strong className="text-gray-900">35 ثغرة أمنية</strong> مختلفة
            مع أمثلة عملية وأكواد حقيقية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vulnerabilities/sql-injection"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
            >
              ابدأ التعلم الآن
            </Link>
            <Link
              href="/best-practices"
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
            >
              أفضل الممارسات
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="stat-card rounded-xl p-6 text-center card-hover">
          <div className="text-4xl font-extrabold text-blue-600 mb-2">35+</div>
          <div className="text-gray-600 font-medium">ثغرة أمنية</div>
        </div>
        <div className="stat-card rounded-xl p-6 text-center card-hover">
          <div className="text-4xl font-extrabold text-green-600 mb-2">100+</div>
          <div className="text-gray-600 font-medium">مثال كود</div>
        </div>
        <div className="stat-card rounded-xl p-6 text-center card-hover">
          <div className="text-4xl font-extrabold text-purple-600 mb-2">15+</div>
          <div className="text-gray-600 font-medium">أداة فحص</div>
        </div>
        <div className="stat-card rounded-xl p-6 text-center card-hover">
          <div className="text-4xl font-extrabold text-orange-600 mb-2">50+</div>
          <div className="text-gray-600 font-medium">نصيحة أمنية</div>
        </div>
      </section>

      {/* All Vulnerabilities Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">جميع الثغرات الأمنية</h2>
          <p className="text-gray-600 text-lg">أكثر من 35 ثغرة أمنية موثقة بالتفصيل</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allVulnerabilities.map((vuln) => (
            <Link
              key={vuln.id}
              href={`/vulnerabilities/${vuln.id}`}
              className="group block bg-white border border-gray-200 rounded-xl p-5 card-hover"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">{vuln.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{vuln.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{vuln.titleEn}</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${severityColors[vuln.color]}`}>
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
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          أدوات الفحص والاختبار
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'OWASP ZAP', desc: 'أداة مجانية شاملة لفحص الثغرات', icon: '🔍', url: 'https://www.zaproxy.org/' },
            { name: 'Burp Suite', desc: 'منصة احترافية لاختبار الأمان', icon: '🐝', url: 'https://portswigger.net/burp' },
            { name: 'SQLMap', desc: 'أداة آلية لاكتشاف حقن SQL', icon: '🗺️', url: 'https://sqlmap.org/' },
            { name: 'Nmap', desc: 'فحص الشبكات واكتشاف الخدمات', icon: '📡', url: 'https://nmap.org/' },
          ].map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-gray-200 rounded-xl p-6 text-center card-hover"
            >
              <span className="text-4xl block mb-3">{tool.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl p-10 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-9xl">🛡️</div>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-8">ابدأ رحلتك في أمن الويب</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="font-bold text-xl mb-2">تعلم الثغرات</h3>
              <p className="text-gray-300">اقرأ شرح كل ثغرة بالتفصيل مع أمثلة حية</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="font-bold text-xl mb-2">اكتشف الثغرات</h3>
              <p className="text-gray-300">استخدم الأدوات المخصصة لفحص مشاريعك</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="font-bold text-xl mb-2">احمِ مشروعك</h3>
              <p className="text-gray-300">طبق أفضل الممارسات لحماية تطبيقاتك</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          أسئلة متكررة
        </h2>
        <div className="space-y-3 max-w-3xl mx-auto">
          {[
            { q: 'لماذا أمن المواقع مهمة؟', a: 'أمن المواقع يحمي بيانات المستخدمين ويمنع الهجمات السيبرانية التي قد تؤدي إلى تسريب المعلومات أو تعطيل الخدمات.' },
            { q: 'كيف أبدأ في تعلم أمن الويب؟', a: 'ابدأ بفهم أنواع الثغرات الشائعة من هذا الدليل، ثم تعلم استخدام أدوات الفحص، وطبق أفضل الممارسات في مشاريعك.' },
            { q: 'هل هذا الدليل مناسب للمبتدئين؟', a: 'نعم، الدليل مصمم لجميع المستويات مع شرح مبسط وأمثلة عملية تناسب المبتدئين والمتخصصين.' },
            { q: 'ما هي أكثر الثغرات شيوعاً؟', a: 'XSS و SQL Injection و CSRF من أكثر الثغرات شيوعاً وخطورة في تطبيقات الويب الحديثة.' },
          ].map((item, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden group">
              <summary className="font-bold p-5 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>{item.q}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-semibold">
            عرض جميع الأسئلة ←
          </Link>
        </div>
      </section>
    </div>
  )
}
