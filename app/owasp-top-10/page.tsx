import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'OWASP Top 10 2024 | دليل أمان الويب',
  description:
    'دليل شامل لأكثر 10 ثغرات أمنية شيوعاً حسب تصنيف OWASP لعام 2024 مع شرح تفصيلي وطرق الحماية.',
};

const owaspTop10 = [
  {
    id: 'A01',
    title: 'A01: خلل في التحكم بالوصول',
    titleEn: 'Broken Access Control',
    icon: '🚫',
    severity: 'خطيرة جداً',
    color: 'red',
    description:
      'يُعد خلل التحكم بالوصول من أكثر الثغرات تكراراً في تطبيقات الويب. يتيح للمهاجمين الوصول للوظائف أو البيانات غير المصرح بها.',
    impact: 'يمكن للمهاجم الوصول لبيانات المستخدمين الآخرين، تعديل الصلاحيات، أو حتى السيطرة على الحسابات.',
    prevention: [
      'تطبيق مبدأ الامتياز الأدنى (Least Privilege)',
      'التحكم بالوصول على جانب الخادم',
      'إبطال الجلسات عند تسجيل الخروج',
      'تعطيل فهرس director listings',
      '确ي عدم عرض حسابات المستخدمين في واجهة المستخدم',
    ],
    link: '/vulnerabilities/broken-access-control',
  },
  {
    id: 'A02',
    title: 'A02: إخفاقات التشفير',
    titleEn: 'Cryptographic Failures',
    icon: '🔐',
    severity: 'خطيرة',
    color: 'red',
    description:
      'يتمركز حول الفشل في حماية البيانات السرية_due to failures in cryptography. يشمل استخدام خوارزميات تشفير ضعيفة أو إدارة خاطئة للمفاتيح.',
    impact: 'تسريب كلمات المرور، البيانات الشخصية، أو البيانات المالية للمستخدمين.',
    prevention: [
      'استخدام خوارزميات تشفير قوية مثل AES-256',
      'تطبيق TLS 1.3 لجميع الاتصالات',
      'إدارة المفاتيح بشكل آمن',
      'عدم تخزين كلمات المرور كنص واضح',
      'استخدام bcrypt أو Argon2 لتشفير كلمات المرور',
    ],
    link: '/vulnerabilities/insecure-deserialization',
  },
  {
    id: 'A03',
    title: 'A03: الحقن',
    titleEn: 'Injection',
    icon: '💉',
    severity: 'خطيرة جداً',
    color: 'red',
    description:
      'يحدث الحقن عندما يتم حقن بيانات مستخدم غير موثوقة كجزء من أمر أو استعلام. يشمل SQL Injection و Command Injection وغيرهما.',
    impact: 'فقدان البيانات، تعطيل النظام، أو السيطرة الكاملة على الخادم.',
    prevention: [
      'استخدام الاستعلامات المعلمّة (Prepared Statements)',
      'استخدام ORM مثل Prisma أو TypeORM',
      'التحقق من جميع مدخلات المستخدم',
      'ترميز المخرجات لمنع XSS',
      'استخدام الإعدادات الآمنة للكتابة',
    ],
    link: '/vulnerabilities/sql-injection',
  },
  {
    id: 'A04',
    title: 'A04: تصميم غير آمن',
    titleEn: 'Insecure Design',
    icon: '📐',
    severity: 'خطيرة',
    color: 'orange',
    description:
      'يركز على المخاطر التصميمية التي لا يمكن إصلاحها بتنفيذ تقني مثالي. يشمل غياب التخطيط الأمني في مرحلة التصميم.',
    impact: 'ثغرات بنيوية صعبة الإصلاح، هجمات مستمرة على المنطق التجاري.',
    prevention: [
      'تطبيق Threat Modeling في مرحلة التصميم',
      'استخدام أنماط التصميم الآمنة',
      'كتابة اختبارات أمنية وظيفية',
      'مراجعة التصميم مع خبراء الأمان',
      'تطبيق مبادئ Secure by Design',
    ],
    link: '/vulnerabilities/business-logic',
  },
  {
    id: 'A05',
    title: 'A05: خطأ في التكوين',
    titleEn: 'Security Misconfiguration',
    icon: '⚙️',
    severity: 'متوسطة',
    color: 'yellow',
    description:
      'يشمل استخدام الإعدادات الافتراضية، وتفعيل الميزات غير الضرورية، وعرض معلومات تفصيلية عن الأخطاء.',
    impact: 'الوصول غير المصرح به، كشف معلومات حساسة، أو تشغيل خدمات خبيثة.',
    prevention: [
      'تعطيل الحسابات الافتراضية وكلمات المرور',
      'تحديث جميع المكونات بانتظام',
      'تعطيل الميزات غير المستخدمة',
      'عرض رسائل خطأ مبسطة للمستخدمين',
      'تطبيق مبدأ Least Functionality',
    ],
    link: '/vulnerabilities/security-misconfiguration',
  },
  {
    id: 'A06',
    title: 'A06: مكونات ضعيفة',
    titleEn: 'Vulnerable and Outdated Components',
    icon: '📦',
    severity: 'متوسطة',
    color: 'orange',
    description:
      'استخدام مكونات (مكتبات، أطر عمل، أنظمة إدارة محتوى) بها ثغرات معروفة أو غير محدّثة.',
    impact: 'استغلال الثغرات المعروفة في المكونات لاختراق النظام.',
    prevention: [
      'إزالة المكونات غير المستخدمة',
      'تحديث المكونات بانتظام',
      'مراقبة CVEs للمكونات المستخدمة',
      'استخدام أدوات فحص التبعيات مثل npm audit',
      'اختيار مكونات نشطة المجتمع',
    ],
    link: '/vulnerabilities/insecure-deserialization',
  },
  {
    id: 'A07',
    title: 'A07: إخفاقات المصادقة',
    titleEn: 'Identification and Authentication Failures',
    icon: '🔑',
    severity: 'خطيرة',
    color: 'orange',
    description:
      'الثغرات التي تسمح للمهاجمين بانتحال هوية المستخدمين عبر كسر المصادقة أو تجاوز آليات المصادقة.',
    impact: 'اختراق حسابات المستخدمين، الوصول للبيانات الحساسة، تعديل الصلاحيات.',
    prevention: [
      'فرض كلمات مرور قوية',
      'تطبيق المصادقة الثنائية (MFA)',
      'قيود على محاولات تسجيل الدخول',
      'استخدام آليات جلسة آمنة',
      'تجنب تمرير معلومات المصادقة في URLs',
    ],
    link: '/vulnerabilities/password-attacks',
  },
  {
    id: 'A08',
    title: 'A08: إخفاقات سلامة البيانات',
    titleEn: 'Software and Data Integrity Failures',
    icon: '🛡️',
    severity: 'خطيرة',
    color: 'orange',
    description:
      'يشمل الثغرات التي تتعلق بعدم التحقق من سلامة التحديثات والبيانات والبرامج، بما في ذلك إدخال الكود الخبيث.',
    impact: 'حقن كود خبيث عبر التحديثات، تعديل البيانات أثناء النقل، التلاعب بالأنظمة.',
    prevention: [
      'استخدام Subresource Integrity (SRI)',
      'التحقق من توقيعات التحديثات',
      'استخدام CI/CD آمن',
      'مراجعة التبعيات قبل التثبيت',
      '确ي سلامة بيانات الإدخال',
    ],
    link: '/vulnerabilities/insecure-deserialization',
  },
  {
    id: 'A09',
    title: 'A09: إخفاقات التسجيل والمراقبة',
    titleEn: 'Security Logging and Monitoring Failures',
    icon: '📋',
    severity: 'متوسطة',
    color: 'yellow',
    description:
      'غياب التسجيل والمراقبة الكافية يمنع اكتشاف الهجمات والاستجابة لها بشكل فعال.',
    impact: 'عدم اكتشاف الاختراقات، صعوبة التحقيق، عدم القدرة على قياس أثر الهجمات.',
    prevention: [
      'تسجيل جميع محاولات تسجيل الدخول الفاشلة',
      'تسجيل الوصول للبيانات الحساسة',
      'إنشاء تنبيهات للأحداث المشبوهة',
      'استخدام أنظمة SIEM',
      'وضع خطة الاستجابة للحوادث',
    ],
    link: '/best-practices',
  },
  {
    id: 'A10',
    title: 'A10: تزوير الطلبات من جانب الخادم',
    titleEn: 'Server-Side Request Forgery (SSRF)',
    icon: '🖥️',
    severity: 'خطيرة',
    color: 'red',
    description:
      'يحدث عندما يُجبر تطبيقات الويب على إرسال طلبات HTTP غير مقصودة إلى خادم داخلي أو خارجي.',
    impact: 'access للأنظمة الداخلية، تسريب البيانات، تشغيل أكواد عشوائية على الخادم.',
    prevention: [
      'تصفية وتحقق من URLs المدخلة',
      'استخدام قوائم بيضاء للمصادر المسموحة',
      'فصل الشبكات الداخلية',
      'تعطيل إعادة توجيه HTTP غير الضرورية',
      'استخدام جدران حماية الشبكة',
    ],
    link: '/vulnerabilities/ssrf',
  },
];

const severityColors: Record<string, string> = {
  red: 'bg-red-100 text-red-700 border-red-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export default function OwaspTop10Page() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-red-700 to-red-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            <span className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
            التحديث الأخير: 2024
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">OWASP Top 10</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-red-100">
            أكثر 10 ثغرات أمنية شيوعاً في تطبيقات الويب حسب تصنيف منظمة OWASP العالمية. قائمة
            أساسية لكل مطور وأمني.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white py-8 shadow-sm">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">الانتقال السريع</h2>
          <div className="flex flex-wrap gap-2">
            {owaspTop10.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-bold transition hover:opacity-80 ${severityColors[item.color]}`}
              >
                {item.id}: {item.titleEn}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OWASP Items */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-8">
            {owaspTop10.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm scroll-mt-24"
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                      <p className="text-sm text-gray-500">{item.titleEn}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${severityColors[item.color]}`}
                  >
                    {item.severity}
                  </span>
                </div>

                <p className="mb-6 text-lg leading-relaxed text-gray-700">{item.description}</p>

                <div className="mb-6 rounded-lg bg-red-50 p-4">
                  <h3 className="mb-2 font-bold text-red-800">التأثير المحتمل</h3>
                  <p className="text-gray-700">{item.impact}</p>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 font-bold text-gray-900">طرق الحماية</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {item.prevention.map((p) => (
                      <div key={p} className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                        <span className="mt-1 text-emerald-500">✓</span>
                        <span className="text-sm text-gray-700">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  اقرأ المزيد ←
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">حمّ تطبيقاتك من OWASP Top 10</h2>
          <p className="mb-8 text-lg text-red-100">
            طبّق أفضل الممارسات لحماية تطبيقاتك من أكثر الثغرات شيوعاً.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/best-practices"
              className="rounded-lg bg-white px-8 py-3 font-bold text-red-800 transition hover:bg-red-50"
            >
              أفضل الممارسات
            </Link>
            <Link
              href="/vulnerabilities"
              className="rounded-lg border-2 border-white px-8 py-3 font-bold transition hover:bg-white hover:text-red-800"
            >
              جميع الثغرات
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
