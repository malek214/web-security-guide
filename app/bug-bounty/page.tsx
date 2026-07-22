import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'البحث عن الأخطاء (Bug Bounty) | دليل أمان الويب',
  description:
    'دليلك الشامل للبدء في البحث عن الأخطاء: ما هو Bug Bounty، المنصات الشائعة، نصائح للمبتدئين، والاعتبارات القانونية.',
};

const platforms = [
  {
    name: 'HackerOne',
    icon: '🐝',
    url: 'https://hackerone.com',
    description: 'منصة Bug Bounty الرائدة عالمياً. تستضيف برامج لكبرى الشركات مثل Google و Microsoft و Apple.',
    features: [
      'أكثر من 2000 برنامج نشط',
      'متوسط الأرباح للباحثين النشطين: $50,000+ سنوياً',
      'نظام تقييم واضح وشفاف',
      'مجتمع ضخم من الباحثين',
      'دعم فني ممتاز',
    ],
    bestFor: 'الباحثون في جميع المستويات',
  },
  {
    name: 'Bugcrowd',
    icon: 'Crowd',
    url: 'https://bugcrowd.com',
    description: 'منصة متخصصة في اختبار الاختراق الجماعي وبرامج Bug Bounty الخاصة والعلنية.',
    features: [
      'برامج خاصة وعلنية',
      'نظام تصنيف الباحثين (VRC)',
      'أدوات مساعدة متقدمة',
      'تدريبات وتحديات تعليمية',
      'دعم على مدار الساعة',
    ],
    bestFor: 'الباحثون المتقدمون والفرق',
  },
  {
    name: 'Intigriti',
    icon: '🎯',
    url: 'https://intigriti.com',
    description: 'منصة أوروبية سريعة النمو مع برامج متنوعة ومكافآت تنافسية.',
    features: [
      'أكثر من 1700 برنامج',
      'نظام مكافآت مبتكر',
      'تحديات تعليمية أسبوعية',
      'مجتمع أوروبي نشط',
      'واجهة مستخدم سهلة',
    ],
    bestFor: 'الباحثون الأوروبيون والمبتدئون',
  },
  {
    name: 'YesWeHack',
    icon: '🛡️',
    url: 'https://yeswehack.com',
    description: 'منصة أوروبية متخصصة في Bug Bounty مع تركيز على الشركات الأوروبية.',
    features: [
      'برامج أوروبية حصرية',
      'نظام تقييم دقيق',
      'أدوات اختبار متقدمة',
      'ㄏراست أمنية متكاملة',
      'توافق مع GDPR',
    ],
    bestFor: 'الباحثون المتخصصون في السوق الأوروبي',
  },
  {
    name: 'Synack',
    icon: '⚡',
    url: 'https://synack.com',
    description: 'منصة Bug Bounty خاصة تستهدف الشركات الكبيرة والمؤسسات الحكومية.',
    features: [
      'برامج خاصة فقط',
      'فحص أمني مستمر',
      'باحثون معتمدون فقط',
      'تقارير احترافية',
      'دعم فني على مدار الساعة',
    ],
    bestFor: 'الباحثون المحترفون فقط (邀请)',
  },
];

const beginnerTips = [
  {
    title: 'ابدأ بالأساسيات',
    icon: '📚',
    tips: [
      'تعلم أساسيات الشبكات والبروتوكولات',
      'افهم نموذج OSI و TCP/IP',
      'تعلم HTTP/HTTPS بالتفصيل',
      'افهم كيف تعمل قواعد البيانات',
    ],
  },
  {
    title: 'تعلم الأدوات',
    icon: '🔧',
    tips: [
      'أتقن Burp Suite أو OWASP ZAP',
      'تعلم استخدام Nmap لفحص الشبكات',
      'استخدم SQLMap لاختبار SQL Injection',
      'جرب أدوات Command Injection',
    ],
  },
  {
    title: 'ฝึก على بيئات آمنة',
    icon: '🎯',
    tips: [
      'استخدم PortSwigger Web Security Academy',
      'جرب HackTheBox و TryHackMe',
      'احلل تطبيقات DVWA و Juice Shop',
      'شارك في CTFs (Capture The Flag)',
    ],
  },
  {
    title: 'ابنِ مهاراتك',
    icon: '📈',
    tips: [
      'ابدأ بالبرامج العامة (Public Programs)',
      '专注于 niche واحد واتقنها',
      'اكتب تقارير واضحة ومفصلة',
      'تعلم من تقارير الآخرين',
    ],
  },
];

const legalConsiderations = [
  {
    title: 'الحصول على إذن',
    icon: '📝',
    points: [
      'تأكد من وجود برنامج Bug Bounty نشط',
      'اقرأ شروط البرنامج بعناية',
      'حدد نطاق الاختبار المسموح به',
      'لا تتجاوز النطاق المحدد أبداً',
    ],
  },
  {
    title: 'حدود الاختبار',
    icon: '🚫',
    points: [
      'لا تختبر على أنظمة غير مصرح بها',
      'تجنب إتلاف البيانات أو تعطيل الخدمات',
      'لا تستخدم هجمات DDoS',
      'لا تشارك البيانات المكتشفة مع أطراف ثالثة',
    ],
  },
  {
    title: 'المسؤولية القانونية',
    icon: '⚖️',
    points: [
      'احترم سياسات الخصوصية',
      'لا تستخدم الثغرات لأغراض شخصية',
      'أبلغ فوراً عن أي بيانات شخصية تم الوصول إليها',
      'اتبع إجراءات الإبلاغ المحددة',
    ],
  },
  {
    title: 'التوثيق والإبلاغ',
    icon: '📋',
    points: [
      'وثق جميع خطوات الاختبار',
      'أبلغ عن الثغرة خلال الإطار الزمني المحدد',
      'لا تنشر الثغرة قبل إصلاحها',
      'احترم برنامج Responsible Disclosure',
    ],
  },
];

const rewards = [
  { range: 'منخفض', amount: '$50 - $500', desc: 'ثغرات منخفضة الخطورة (Low)' },
  { range: 'متوسط', amount: '$500 - $2,000', desc: 'ثغرات متوسطة الخطورة (Medium)' },
  { range: 'عالي', amount: '$2,000 - $10,000', desc: 'ثغرات عالية الخطورة (High)' },
  { range: 'حرج', amount: '$10,000 - $100,000+', desc: 'ثغرات حرجة (Critical)' },
  { range: 'كبير', amount: '$100,000 - $1,000,000+', desc: 'ثغرات في أنظمة كبرى (Pentest)' },
];

export default function BugBountyPage() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-700 to-blue-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
            ابدأ رحلتك في البحث عن الأخطاء
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">البحث عن الأخطاء</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-blue-100">
            تعلم كيف تصبح باحث أخطاء محترف وتكسب المال من اكتشاف الثغرات الأمنية في تطبيقات الويب
            والأنظمة.
          </p>
        </div>
      </section>

      {/* What is Bug Bounty */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-xl border border-blue-100 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">ما هو Bug Bounty؟</h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Bug Bounty هو برنامج يقدمه المطورون والشركات للمستقلين لاكتشاف وإبلاغ الثغرات الأمنية
              في تطبيقاتهم مقابل مكافآت مالية. يسمح للشركات بالاستفادة من خبرة مجتمع الباحثين
              المتنوع لاكتشاف الثغرات التي قد يفوت فريقهم الداخلي.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="mb-2 text-3xl">💰</div>
                <h3 className="font-bold text-blue-800">مكافآت مالية</h3>
                <p className="text-sm text-gray-600">اكسب المال من اكتشاف الثغرات</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="mb-2 text-3xl">🌍</div>
                <h3 className="font-bold text-blue-800">عمل عالمي</h3>
                <p className="text-sm text-gray-600">اعمل مع أي شركة في العالم</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="mb-2 text-3xl">📈</div>
                <h3 className="font-bold text-blue-800">تطوير المهارات</h3>
                <p className="text-sm text-gray-600">طوّر مهاراتك في اختبار الاختراق</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">المنصات الشائعة</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                    <span className="text-sm text-gray-500">{platform.bestFor}</span>
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-600">{platform.description}</p>
                <ul className="mb-4 space-y-1">
                  {platform.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 text-emerald-500">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800"
                >
                  زيارة الموقع ←
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">نطاق المكافآت</h2>
          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-sm font-bold text-gray-900">المستوى</th>
                    <th className="p-3 text-sm font-bold text-gray-900">المكافأة التقريبية</th>
                    <th className="p-3 text-sm font-bold text-gray-900">الوصف</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((r) => (
                    <tr key={r.range} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <span className="font-bold text-gray-900">{r.range}</span>
                      </td>
                      <td className="p-3 font-mono text-sm font-bold text-blue-700">{r.amount}</td>
                      <td className="p-3 text-sm text-gray-600">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Beginners */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">نصائح للمبتدئين</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {beginnerTips.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="font-bold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 text-blue-500">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Considerations */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">الاعتبارات القانونية</h2>
          <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
            <p className="text-sm text-yellow-800">
              <strong>تنبيه:</strong> يجب دائماً العمل ضمن الأطر القانونية والأخلاقية. اختبار أنظمة
              بدون إذن يعتبر جريمة في معظم الدول.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {legalConsiderations.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="font-bold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 text-yellow-600">⚠</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">ابدأ رحلتك الآن</h2>
          <p className="mb-8 text-lg text-blue-100">
            تعلم الأساسيات وابدأ في اكتشاف الثغرات بشكل قانوني وآمن.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/fundamentals"
              className="rounded-lg bg-white px-8 py-3 font-bold text-blue-800 transition hover:bg-blue-50"
            >
              تعلم الأساسيات
            </Link>
            <Link
              href="/vulnerabilities/sql-injection"
              className="rounded-lg border-2 border-white px-8 py-3 font-bold transition hover:bg-white hover:text-blue-800"
            >
              ابدأ بالثغرات
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
