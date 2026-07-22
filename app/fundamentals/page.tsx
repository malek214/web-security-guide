import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'أساسيات الأمن السيبراني | دليل أمان الويب',
  description: 'تعلم أساسيات الأمن السيبراني من الصفر: الشبكات، HTTP/HTTPS، DNS، وأكثر من ذلك.',
};

const fundamentals = [
  {
    id: 'what-is-cybersecurity',
    icon: '🔒',
    title: 'ما هو الأمن السيبراني؟',
    description: 'الأمن السيبراني هو ممارسة حماية الأنظمة والشبكات والبرامج من الهجمات الرقمية.',
    keyPoints: [
      'حماية البيانات والمعلومات من الوصول غير المصرح به',
      'ضمان سرية البيانات وسلامتها ومصداقيتها',
      'منع الهجمات الإلكترونية والتهديدات المختلفة',
      'تطبيق سياسات وأطر عمل الأمن',
    ],
    categories: [
      { name: 'أمن الشبكات', icon: '🌐', desc: 'حماية البنية التحتية للشبكة' },
      { name: 'أمن التطبيقات', icon: '💻', desc: 'تأمين البرمجيات والتطبيقات' },
      { name: 'أمن المعلومات', icon: '📊', desc: 'حماية البيانات من التسريب' },
      { name: 'أمن العمليات', icon: '⚙️', desc: 'عمليات المراقبة والاستجابة' },
    ],
  },
  {
    id: 'network-basics',
    icon: '🌐',
    title: 'أساسيات الشبكات',
    description: 'فهم كيف تعمل الشبكات هو أساس لفهم الأمن السيبراني.',
    layers: [
      { layer: 7, name: 'طبقة التطبيق', nameEn: 'Application', protocols: 'HTTP, FTP, SMTP, DNS', security: 'XSS, CSRF, SQL Injection' },
      { layer: 6, name: 'طبقة العرض', nameEn: 'Presentation', protocols: 'SSL/TLS, JPEG', security: 'TLS/SSL Configuration' },
      { layer: 5, name: 'طبقة الجلسة', nameEn: 'Session', protocols: 'NetBIOS, RPC', security: 'Session Hijacking' },
      { layer: 4, name: 'طبقة النقل', nameEn: 'Transport', protocols: 'TCP, UDP', security: 'SYN Flood' },
      { layer: 3, name: 'طبقة الشبكة', nameEn: 'Network', protocols: 'IP, ICMP, ARP', security: 'IP Spoofing' },
      { layer: 2, name: 'طبقة ربط البيانات', nameEn: 'Data Link', protocols: 'Ethernet, Wi-Fi', security: 'ARP Poisoning' },
      { layer: 1, name: 'طبقة الفيزيائية', nameEn: 'Physical', protocols: 'USB, Bluetooth', security: 'Physical Access' },
    ],
  },
  {
    id: 'http-basics',
    icon: '📡',
    title: 'بروتوكول HTTP/HTTPS',
    description: 'HTTP هو البروتوكول الأساسي لنقل البيانات على الويب. HTTPS هو النسخة المشفرة منه.',
    methods: [
      { method: 'GET', desc: 'جلب بيانات', security: 'يجب التحقق من المدخلات' },
      { method: 'POST', desc: 'إرسال بيانات', security: 'يجب تشفير البيانات' },
      { method: 'PUT', desc: 'تحديث بيانات', security: 'يجب التحقق من الصلاحيات' },
      { method: 'DELETE', desc: 'حذف بيانات', security: 'يجب تأكيد العملية' },
    ],
    headers: [
      { header: 'Content-Security-Policy', desc: 'منع XSS وحقن المحتوى' },
      { header: 'X-Frame-Options', desc: 'منع Clickjacking' },
      { header: 'Strict-Transport-Security', desc: 'إجبار HTTPS' },
      { header: 'X-Content-Type-Options', desc: 'منع MIME sniffing' },
    ],
  },
  {
    id: 'dns-basics',
    icon: '🌍',
    title: 'نظام DNS',
    description: 'DNS هو دفتر عناوين الإنترنت الذي يترجم أسماء المواقع إلى عناوين IP.',
    records: [
      { type: 'A', desc: 'يربط الاسم بعنوان IPv4' },
      { type: 'AAAA', desc: 'يربط الاسم بعنوان IPv6' },
      { type: 'CNAME', desc: 'اسم مستعار لاسم آخر' },
      { type: 'MX', desc: 'خادم البريد الإلكتروني' },
      { type: 'TXT', desc: 'سجلات نصية للتحقق' },
    ],
  },
  {
    id: 'attack-vectors',
    icon: '⚔️',
    title: 'أنواع الهجمات الشائعة',
    description: 'هناك العديد من أنواع الهجمات التي يجب أن تكون على دراية بها.',
    attacks: [
      { name: 'Phishing', desc: 'رسائل مزيفة لسرقة البيانات', icon: '🎣' },
      { name: 'Malware', desc: 'برمجيات خبيثة', icon: '🦠' },
      { name: 'DDoS', desc: 'حجب الخدمة الموزع', icon: '💥' },
      { name: 'SQL Injection', desc: 'حقن أكواد SQL', icon: '💉' },
      { name: 'XSS', desc: 'حقن نصوص', icon: '📜' },
      { name: 'Social Engineering', desc: 'الهندسة الاجتماعية', icon: '🧠' },
    ],
  },
];

export default function FundamentalsPage() {
  return (
    <div className="max-w-5xl mx-auto" dir="rtl">
      <section className="mb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">أساسيات الأمن السيبراني</h1>
          <p className="text-emerald-100 text-lg">دليلك الشامل لفهم أساسيات الأمان والشبكات</p>
        </div>
      </section>

      {/* What is Cybersecurity */}
      <section className="mb-12">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{fundamentals[0]?.icon}</span>
            <h2 className="text-2xl font-bold">{fundamentals[0]?.title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{fundamentals[0]?.description}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {fundamentals[0]?.keyPoints?.map((point) => (
              <div key={point} className="flex items-start gap-2 bg-emerald-50 p-3 rounded-lg">
                <span className="text-emerald-500">✓</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-4">فروع الأمن السيبراني</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fundamentals[0]?.categories?.map((cat) => (
              <div key={cat.name} className="text-center p-4 bg-gray-50 rounded-lg">
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <h4 className="font-bold text-sm">{cat.name}</h4>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Basics */}
      <section className="mb-12">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{fundamentals[1]?.icon}</span>
            <h2 className="text-2xl font-bold">{fundamentals[1]?.title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{fundamentals[1]?.description}</p>
          <h3 className="text-lg font-bold mb-4">نموذج OSI - 7 طبقات</h3>
          <div className="space-y-2">
            {fundamentals[1]?.layers?.map((layer) => (
              <div key={layer.layer} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{layer.layer}</span>
                  <div>
                    <span className="font-bold">{layer.name}</span>
                    <span className="text-gray-500 text-sm mr-2">({layer.nameEn})</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2 md:mt-0">
                  <span className="ml-2">Protocols: {layer.protocols}</span>
                  <span className="text-red-500"> | Threats: {layer.security}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HTTP Basics */}
      <section className="mb-12">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{fundamentals[2]?.icon}</span>
            <h2 className="text-2xl font-bold">{fundamentals[2]?.title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{fundamentals[2]?.description}</p>
          <h3 className="text-lg font-bold mb-4">HTTP Methods</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {fundamentals[2]?.methods?.map((m) => (
              <div key={m.method} className="bg-gray-50 p-4 rounded-lg">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">{m.method}</span>
                <p className="mt-2 text-sm">{m.desc}</p>
                <p className="text-xs text-orange-600 mt-1">⚠️ {m.security}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-bold mb-4">Security Headers المهمة</h3>
          <div className="space-y-2">
            {fundamentals[2]?.headers?.map((h) => (
              <div key={h.header} className="bg-gray-50 p-3 rounded-lg">
                <code className="text-sm font-bold text-orange-700">{h.header}</code>
                <p className="text-sm text-gray-600">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DNS Basics */}
      <section className="mb-12">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{fundamentals[3]?.icon}</span>
            <h2 className="text-2xl font-bold">{fundamentals[3]?.title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{fundamentals[3]?.description}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {fundamentals[3]?.records?.map((r) => (
              <div key={r.type} className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">{r.type}</span>
                <p className="mt-2 text-sm">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attack Vectors */}
      <section className="mb-12">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{fundamentals[4]?.icon}</span>
            <h2 className="text-2xl font-bold">{fundamentals[4]?.title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{fundamentals[4]?.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fundamentals[4]?.attacks?.map((a) => (
              <Link key={a.name} href={`/vulnerabilities/${a.name.toLowerCase().replace(/\s+/g, '-')}`} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">{a.icon}</span>
                <h4 className="font-bold">{a.name}</h4>
                <p className="text-sm text-gray-600">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
