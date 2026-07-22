import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'مسار المهنة في الأمن السيبراني | دليل أمان الويب',
  description:
    'دليل شامل لمسار المهنة في الأمن السيبراني: الأدوار المختلفة، المهارات المطلوبة، الشهادات المعتمدة، والرواتب التقريبية.',
};

const roles = [
  {
    id: 'security-analyst',
    icon: '🔍',
    title: 'محلل أمني',
    titleEn: 'Security Analyst',
    level: 'مبتدئ - متوسط',
    description: 'يقوم بمراقبة الشبكات والأنظمة لاكتشاف الأنشطة المشبوهة والاستجابة للحوادث الأمنية.',
    responsibilities: [
      'مراقبة أجهزة الكشف عن التعقيدات (IDS/IPS)',
      'تحليل السجلات الأمنية والتنبيهات',
      'الاستجابة للحوادث الأمنية',
      'إعداد تقارير الأمان الدورية',
      'فحص الثغرات وتقييم المخاطر',
    ],
    skills: ['تحليل الشبكات', 'أنظمة التشغيل', 'تحليل السجلات', 'أدوات SIEM', '基础 scripting'],
    salary: '$50,000 - $80,000',
  },
  {
    id: 'penetration-tester',
    icon: '🎯',
    title: 'مختبر اختراق',
    titleEn: 'Penetration Tester',
    level: 'متوسط - متقدم',
    description: 'يقوم باختبار اختبار الأنظمة والتطبيقات لاكتشاف الثغرات قبل استغلالها من قبل المهاجمين.',
    responsibilities: [
      'إجراء اختبارات الاختراق للأنظمة والتطبيقات',
      'استخدام أدوات الاختبار المتقدمة',
      'كتابة تقارير تفصيلية عن الثغرات',
      'اقتراح حلول الإصلاح',
      'إجراء اختبارات أمان الشبكة',
    ],
    skills: ['اختبار الاختراق', 'أدوات البنتستesting', 'البرمجة', 'تحليل الشبكات', 'المعرفة بالثغرات'],
    salary: '$70,000 - $120,000',
  },
  {
    id: 'security-engineer',
    icon: '🛠️',
    title: 'مهندس أمن',
    titleEn: 'Security Engineer',
    level: 'متوسط - متقدم',
    description: 'يقوم بتصميم وتطبيق وصيانة الحلول الأمنية والبنية التحتية الآمنة.',
    responsibilities: [
      'تصميم وتنفيذ سياسات الأمان',
      'إدارة جدران الحماية وأنظمة الكشف',
      'تأمين البنية التحتية السحابية',
      'تطبيق آليات المصادقة والتفويض',
      'إدارة شهادات SSL/TLS',
    ],
    skills: ['تصميم الشبكات', 'الأمن السحابي', 'DevSecOps', 'إدارة الشهادات', 'البرمجة الآمنة'],
    salary: '$80,000 - $140,000',
  },
  {
    id: 'security-architect',
    icon: '🏗️',
    title: 'مهندس أمن معماري',
    titleEn: 'Security Architect',
    level: 'متقدم',
    description: 'يصمم البنية التحتية الأمنية الشاملة للمنظمات ويحدد استراتيجية الأمان.',
    responsibilities: [
      'تصميم بنية الأمان الشاملة',
      'تقييم المخاطر والتخطيط',
      'تحديد معايير الأمان والمتطلبات',
      'مراجعة التصاميم التقنية',
      'الإشراف على فريق الأمان',
    ],
    skills: ['التصميم المعماري', 'تقييم المخاطر', 'إدارة المشاريع', 'المعرفة بالأنظمة', 'القيادة'],
    salary: '$120,000 - $180,000',
  },
  {
    id: 'ciso',
    icon: '👑',
    title: 'مدير أمن المعلومات',
    titleEn: 'Chief Information Security Officer (CISO)',
    level: 'قيادي',
    description: 'المسؤول الأعلى عن استراتيجية الأمان في المنظمة وضمان حماية المعلومات.',
    responsibilities: [
      'وضع استراتيجية الأمان الشاملة',
      'إدارة فريق الأمان',
      'التواصل مع الإدارة العليا',
      'تقييم المخاطر واتخاذ القرارات',
      'الامتثال للوائح والمعايير',
    ],
    skills: ['القيادة', 'استراتيجية الأمان', 'إدارة المخاطر', 'التواصل', 'الامتثال'],
    salary: '$150,000 - $300,000+',
  },
];

const certifications = [
  {
    name: 'CEH',
    fullName: 'Certified Ethical Hacker',
    icon: '🎓',
    level: 'مبتدئ - متوسط',
    issuer: 'EC-Council',
    description: 'شهادة أساسية في اختبار الاختراق الأخلاقي وتكنولوجيا الأمن.',
    requirements: [
      'دورة تدريبية معتمدة (40 ساعة)',
      'اختبار نظري (125 سؤالاً، 4 ساعات)',
      'خبرة عملية أو تعليم رسمي',
    ],
    topics: ['استطلاع الأمن', 'تقنيات التخفي', 'هجمات الشبكات', 'حقن الويب', 'اختبار التطبيقات'],
    cost: '$1,199',
    renewal: 'سنوياً',
  },
  {
    name: 'OSCP',
    fullName: 'Offensive Security Certified Professional',
    icon: '⚔️',
    level: 'متوسط - متقدم',
    issuer: 'Offensive Security',
    description: 'شهادة عملية جداً في اختبار الاختراق تتطلب اختباراً عملياً حقيقياً.',
    requirements: [
      'دورة PEN-200 (4 أسابيع أو أكثر)',
      'اختبار عملي (23 ساعة + 24 ساعة تقرير)',
      'خبرة عملية في Linux وNetworking',
    ],
    topics: ['Pentesting Methodology', 'Privilege Escalation', 'Active Directory', 'Buffer Overflows', 'Web App Attacks'],
    cost: '$1,599',
    renewal: 'لا يحتاج تجديد',
  },
  {
    name: 'CISSP',
    fullName: 'Certified Information Systems Security Professional',
    icon: '🏆',
    level: 'متقدم',
    issuer: 'ISC²',
    description: 'الشهادة الأكثر شهرة في إدارة أمن المعلومات للمتخصصين senior.',
    requirements: [
      '5 سنوات خبرة في أمن المعلومات',
      'اختبار (250 سؤالاً، 6 ساعات)',
      'الالتزام ب准则 الأخلاقية',
    ],
    topics: ['Risk Management', 'Security Architecture', 'IAM', 'Security Operations', 'Software Security'],
    cost: '$749',
    renewal: 'سنوياً + CPEs',
  },
  {
    name: 'CompTIA Security+',
    icon: '🛡️',
    level: 'مبتدئ',
    issuer: 'CompTIA',
    description: 'شهادة أساسية لمن يريد الدخول في مجال أمن المعلومات.',
    requirements: [
      'مراجعة للأساسيات (Network+ أو ما يعادلها)',
      'اختبار (90 سؤالاً، 90 دقيقة)',
      'لا تتطلب خبرة سابقة',
    ],
    topics: ['Threats and Attacks', 'Identity Management', 'Cryptography', 'Network Security', 'Cloud Security'],
    cost: '$392',
    renewal: 'كل 3 سنوات',
  },
  {
    name: 'GPEN',
    fullName: 'GIAC Penetration Tester',
    icon: '🎯',
    level: 'متوسط - متقدم',
    issuer: 'GIAC / SANS',
    description: 'شهادة متخصصة في اختبار الاختراق من GIAC.',
    requirements: [
      'دورة SANS المرتبطة',
      'اختبار (75 سؤالاً، 2 ساعة)',
      'خبرة في اختبار الاختراق',
    ],
    topics: ['Exploitation', 'Post-Exploitation', 'Web App Testing', 'Network Penetration', 'Password Attacks'],
    cost: '$2,499',
    renewal: 'سنوياً + CPEs',
  },
];

const learningPath = [
  {
    phase: 'المرحلة الأولى',
    title: 'الأساسيات',
    duration: '3-6 أشهر',
    icon: '1️⃣',
    tasks: [
      'تعلم أساسيات الشبكات (TCP/IP, OSI)',
      'تعلم أنظمة Linux الأساسية',
      'فهم HTTP/HTTPS وبروتوكولات الويب',
      'تعلم أساسيات البرمجة (Python, Bash)',
      'الحصول على CompTIA Security+',
    ],
  },
  {
    phase: 'المرحلة الثانية',
    title: 'التخصص',
    duration: '6-12 شهر',
    icon: '2️⃣',
    tasks: [
      'تعلم أدوات اختبار الاختراق (Burp Suite, Nmap)',
      'التدريب على منصات مثل HackTheBox و TryHackMe',
      'تعلم أساسيات Web Application Security',
      '获取 CEH أو OSCP',
      'المشاركة في CTFs',
    ],
  },
  {
    phase: 'المرحلة الثالثة',
    title: 'الاحتراف',
    duration: '1-2 سنة',
    icon: '3️⃣',
    tasks: [
      'البدء في Bug Bounty Programs',
      'التخصص في مجال معين (Web, Mobile, Cloud)',
      'بناء معرض أعمال (Portfolio)',
      'المشاركة في مجتمع الأمان',
      'البحث عن وظائف Junior Security Analyst',
    ],
  },
  {
    phase: 'المرحلة الرابعة',
    title: 'التقدم',
    duration: '3-5 سنوات',
    icon: '4️⃣',
    tasks: [
      'الانتقال لوظائف Senior',
      'الحصول على CISSP أو شهادات متقدمة',
      'بناء خبرة في إدارة الفرق',
      'التخصص في مجالات متقدمة',
      'مشاركة المعرفة (كتابة مقالات، محاضرات)',
    ],
  },
];

export default function CareerPathPage() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-purple-700 to-purple-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
            خطط لمستقبلك في الأمن السيبراني
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">مسار المهنة</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-purple-100">
            دليل شامل للأدوار والشهادات والمهارات المطلوبة للنجاح في مجال الأمن السيبراني. ابدأ
            رحلتك الآن نحو مهنة مجزية ومثيرة.
          </p>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">الأدوار في الأمن السيبراني</h2>
          <div className="space-y-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-500">{role.titleEn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">
                      {role.level}
                    </span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      {role.salary}
                    </span>
                  </div>
                </div>

                <p className="mb-6 text-gray-700">{role.description}</p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-bold text-gray-900">المهام الرئيسية</h4>
                    <ul className="space-y-2">
                      {role.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 text-purple-500">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-bold text-gray-900">المهارات المطلوبة</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">الشهادات المعتمدة</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{cert.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-xs text-gray-500">{cert.fullName}</p>
                  </div>
                </div>
                <p className="mb-3 text-sm text-gray-600">{cert.description}</p>
                <div className="mb-4 space-y-1">
                  {cert.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-purple-500">→</span>
                      {t}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-500">
                  <span>{cert.issuer}</span>
                  <span className="font-bold text-purple-700">{cert.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">مسار التعلم</h2>
          <div className="space-y-6">
            {learningPath.map((phase, index) => (
              <div key={phase.phase} className="relative">
                {index < learningPath.length - 1 && (
                  <div className="absolute right-7 top-14 bottom-0 w-0.5 bg-purple-200" />
                )}
                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white shadow-lg">
                    {phase.icon}
                  </div>
                  <div className="flex-1 rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="text-sm font-bold text-purple-600">{phase.phase}</span>
                        <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                      </div>
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">
                        {phase.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 text-purple-500">✓</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">ابدأ رحلتك اليوم</h2>
          <p className="mb-8 text-lg text-purple-100">
            لا تنتظر الغد. ابدأ بتعلم الأساسيات وابنِ مسارك نحو مهنة ناجحة في الأمن السيبراني.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/fundamentals"
              className="rounded-lg bg-white px-8 py-3 font-bold text-purple-800 transition hover:bg-purple-50"
            >
              تعلم الأساسيات
            </Link>
            <Link
              href="/bug-bounty"
              className="rounded-lg border-2 border-white px-8 py-3 font-bold transition hover:bg-white hover:text-purple-800"
            >
              ابدأ بالBug Bounty
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
