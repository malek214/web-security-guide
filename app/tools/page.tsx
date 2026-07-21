import React from "react";

export const metadata = {
  title: "أدوات الفحص والاختبار | دليل أمن الويب",
  description:
    "دليل شامل لأفضل أدوات فحص واختبار أمن تطبيقات الويب والشبكات",
};

const webAppScanners = [
  {
    name: "OWASP ZAP",
    description:
      "أداة مفتوحة المصدر مجانية由中国OWASP لاختبار اختراق تطبيقات الويب. تتميز بسهولة الاستخدام ودعم اللغة العربية جزئياً. توفر ZAP ميزات متقدمة مثل اختبار الأوتوماتيكي واليدوي للثغرات الأمنية.",
    useCase:
      "فحص تطبيقات الويب لاكتشاف الثغرات الشائعة مثل XSS وSQL Injection وBroken Authentication.",
    link: "https://www.zaproxy.org/",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "فحص أوتوماتيكي ويدوي",
      "دعم(proxy) لاعتراض الطلبات",
      "إضافة addons متعددة",
      "تقارير تفصيلية",
    ],
  },
  {
    name: "Burp Suite",
    description:
      "أداة احترافية من PortSwigger لاختبار اختراق تطبيقات الويب. تتوفر بنسخة مجانية محدودة ونسخة برو مدفوعة. تعتبر المعيار القياسي في مجال اختبار اختراق تطبيقات الويب.",
    useCase:
      "اختبار أمن تطبيقات الويب بشكل شامل، بما في ذلك تحليل حركة المرور واكتشاف الثغرات المتقدمة.",
    link: "https://portswigger.net/burp",
    status: "مجانية (Community) / مدفوعة (Professional)",
    features: [
      "Scanner أوتوماتيكي",
      "Intruder للاختبار المتكرر",
      "Repeater لتعديل الطلبات",
      "Organizer لإدارة الاختبارات",
    ],
  },
  {
    name: "Nikto",
    description:
      "أداة مفتوحة المصدر لفحص خوادم الويب واكتشاف الثغرات والملفات الخبيثة. تتميز بسرعة الفحص وقدرتها على اختبار أكثر من 6700 خطر محتمل.",
    useCase:
      "فحص خوادم الويب لاكتشاف الإعدادات الخاطئة والملفات المكشوفة والثغرات المعروفة.",
    link: "https://cirt.net/Nikto2",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "فحص أكثر من 6700 خطر",
      "دعم البروكسي",
      "اكتشاف البرامج القديمة",
      "تقارير بتنسيقات متعددة",
    ],
  },
];

const networkScanners = [
  {
    name: "Nmap",
    description:
      "أداة مجانية ومفتوحة المصدر لاكتشاف الشبكات وفحص المنافذ ونظام التشغيل. تعتبر من أقوى أدوات فحص الشبكات واستطلاع المعلومات.",
    useCase:
      "استطلاع الشبكات واكتشاف الأجهزة المتصلة وفحص حالة المنافذ والخدمات المتاحة.",
    link: "https://nmap.org/",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "اكتشاف الشبكات والمنافذ",
      "تحديد نظام التشغيل",
      "فحص الخدمات والإصدارات",
      "NScan Scripts (NSE)",
    ],
  },
  {
    name: "Masscan",
    description:
      "أداة فحص شبكات فائقة السرعة capable من مسح ملايين المنافذ في غضون ثوانٍ. مصممة لفحص شبكات كبيرة الحجم.",
    useCase:
      "فحص شبكات كبيرة الحجم بسرعة فائقة لاكتشاف الخدمات المتاحة.",
    link: "https://github.com/robertdavidgraham/masscan",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "سرعة فحص استثنائية",
      "فحص TCP وUDP",
      "دعم الإدخال من ملفات",
      "=output بتنسيقات متعددة",
    ],
  },
];

const sqlInjectionTools = [
  {
    name: "SQLMap",
    description:
      "أداة مفتوحة المصدر لاكتشاف واستغلال ثغرات SQL Injection تلقائياً. تدعم جميع أنظمة إدارة قواعد البيانات الشائعة.",
    useCase:
      "اكتشاف واستغلال ثغرات SQL Injection في تطبيقات الويب المختلفة.",
    link: "https://sqlmap.org/",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "اكتشاف أوتوماتيكي لنوع DBMS",
      "استخراج بيانات من القاعدة",
      "دعم GET وPOST وCookie",
      "قابلية للتخصيص والتوسيع",
    ],
  },
  {
    name: "SQLNinja",
    description:
      "أداة متخصصة في استغلال ثغرات SQL Injection في تطبيقات ASP/MSSQL. تتميز بواجهة سهلة الاستخدام وقدرتها على الحصول على Shell على الخادم.",
    useCase:
      "استغلال ثغرات SQL Injection في تطبيقات ASP.NET التي تستخدم Microsoft SQL Server.",
    link: "https://www.sqlninja.org/",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "استخراج كلمة المرور",
      "الحصول على Shell",
      "استخراج البيانات من القاعدة",
      "تحميلملفات على الخادم",
    ],
  },
];

const xssTools = [
  {
    name: "XSStrike",
    description:
      "أداة مفتوحة المصدر لاكتشاف ثغرات Cross-Site Scripting (XSS) بدقة عالية. تتميز بقدرتها على تجاوز فلترات XSS المتقدمة.",
    useCase:
      "اكتشاف جميع أنواع ثغرات XSS包括 reflected وstored وDOM-based.",
    link: "https://github.com/s0md3v/XSStrike",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "اكتشاف بدقة عالية",
      "دعم جميع أنواع XSS",
      "تجاوز فلترات XSS",
      "إنشاء Payloads مخصصة",
    ],
  },
  {
    name: "Dalfox",
    description:
      "أداة حديثة وسريعة لاكتشاف ثغرات XSS. تتميز بواجهة سهلة الاستخدام وسرعة الفحص العالية.",
    useCase:
      "فحص تطبيقات الويب لاكتشاف ثغرات XSS بشكل سريع وفعّال.",
    link: "https://github.com/hahwul/dalfox",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "سرعة فحص عالية",
      "واجهة سهلة الاستخدام",
      "دعم Proxy",
      "=output بتنسيقات متعددة",
    ],
  },
];

const frameworks = [
  {
    name: "Metasploit",
    description:
      "أقوى إطار عمل لاختبار اختراق الأنظمة والشبكات. توفر Metasploit thousands of exploits و payloads وأدوات مساعدة.",
    useCase:
      "اختبار اختراق الأنظمة واستغلال الثغرات واختبار فعالية الحلول الأمنية.",
    link: "https://www.metasploit.com/",
    status: "مجانية (Framework) / مدفوعة (Pro)",
    features: [
      "آلاف الاستغلالات",
      "دعم جميع الأنظمة",
      "تقارير احترافية",
      "أدوات مساعدة متعددة",
    ],
  },
  {
    name: "w3af",
    description:
      "أداة مفتوحة المصدر لفحص أمن تطبيقات الويب. تتميز بمرونتها وقدرتها على اكتشاف أكثر من 200 نوع من الثغرات.",
    useCase:
      "فحص شامل لأمن تطبيقات الويب واكتشاف الثغرات المختلفة.",
    link: "https://github.com/andresriancho/w3af",
    status: "مجانية ومفتوحة المصدر",
    features: [
      "اكتشاف أكثر من 200 ثغرة",
      "واجهة سهلة الاستخدام",
      "دعم التخصيص",
      "=output تقارير مفصلة",
    ],
  },
];

const comparisonData = [
  {
    tool: "OWASP ZAP",
    category: "Web App Scanner",
    free: true,
    openSource: true,
    easeOfUse: "سهل",
    features: "متوسطة إلى متقدمة",
  },
  {
    tool: "Burp Suite",
    category: "Web App Scanner",
    free: true,
    openSource: false,
    easeOfUse: "متوسط",
    features: "متقدمة",
  },
  {
    tool: "Nikto",
    category: "Web App Scanner",
    free: true,
    openSource: true,
    easeOfUse: "سهل",
    features: "متوسطة",
  },
  {
    tool: "Nmap",
    category: "Network Scanner",
    free: true,
    openSource: true,
    easeOfUse: "صعب",
    features: "متقدمة",
  },
  {
    tool: "Masscan",
    category: "Network Scanner",
    free: true,
    openSource: true,
    easeOfUse: "متوسط",
    features: "متقدمة",
  },
  {
    tool: "SQLMap",
    category: "SQL Injection",
    free: true,
    openSource: true,
    easeOfUse: "متوسط",
    features: "متقدمة",
  },
  {
    tool: "XSStrike",
    category: "XSS",
    free: true,
    openSource: true,
    easeOfUse: "صعب",
    features: "متقدمة",
  },
  {
    tool: "Metasploit",
    category: "Framework",
    free: true,
    openSource: true,
    easeOfUse: "صعب",
    features: "شاملة جداً",
  },
];

const toolSelectionGuide = [
  {
    level: "مبتدئ",
    description: "إذا كنت تبدأ في مجال أمن الويب",
    recommendedTools: ["OWASP ZAP", "Nikto", "SQLMap"],
    reason:
      "هذه الأدوات سهلة الاستخدام وتوفر وثائق شاملة ومجتمع دعم كبير",
  },
  {
    level: "متوسط",
    description: "إذا كنت لديك خبرة في أمن الويب",
    recommendedTools: ["Burp Suite Community", "Nmap", "XSStrike"],
    reason:
      "هذه الأدوات توفر ميزات أكثر تقدماً مع واجهات سهلة الاستخدام",
  },
  {
    level: "متقدم",
    description: "إذا كنت خبيراً في أمن الويب",
    recommendedTools: [
      "Burp Suite Professional",
      "Metasploit",
      "SQLMap",
      "Nmap",
    ],
    reason: "هذه الأدوات توفر أقصى مرونة وقدرات متقدمة للاختبار",
  },
];

const securityTips = [
  {
    title: "الحصول على تصريح قبل الفحص",
    description:
      "احصل دائماً على تصريح رسمي وخطاب تفويض من مالك النظام قبل البدء في أي اختبار أمني. اختبار الاختراق غير المصرح به جريمة يعاقب عليها القانون.",
  },
  {
    title: "استخدام بيئة اختبار آمنة",
    description:
      "قم بتجربة الأدوات أولاً في بيئة معزولة أو في بيئة اختبار خاصة بك قبل استخدامها على أنظمة إنتاجية.",
  },
  {
    title: "تحديث الأدوات باستمرار",
    description:
      "تأكد من تحديث جميع الأدوات باستمرار للحصول على أحدث قواعد بيانات الثغرات والميزات.",
  },
  {
    title: "التخزين المؤقت للنتائج",
    description:
      "احفظ جميع نتائج الفحوصات في مكان آمن ومشفر. تأكد من حذفها بعد الانتهاء من المشروع.",
  },
  {
    title: "استخدام الشبكات الآمنة",
    description:
      "استخدم VPN أو شبكة معزولة أثناء إجراء الفحوصات لحماية هويتك وبياناتك.",
  },
  {
    title: "التوثيق والتقارير",
    description:
      "وثّق جميع خطوات الفحص والثغرات المكتشفة في تقارير مفصلة مع توصيات الإصلاح.",
  },
  {
    title: "احترام الخصوصية",
    description:
      "لا تقم بالوصول إلى بيانات المستخدمين الفعلية أثناء الاختبار. استخدم بيانات تجريبية فقط.",
  },
  {
    title: "متابعة التحديثات الأمنية",
    description:
      "تابع آخر التطورات في مجال أمن الويب والثغرات المكتشفة حديثاً لضمان فعالية اختباراتك.",
  },
];

export default function ToolsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-l from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            أدوات الفحص والاختبار
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            دليل شامل لأفضل أدوات فحص واختبار أمن تطبيقات الويب والشبكات
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* مقدمة */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            لماذا نحتاج أدوات الفحص والاختبار؟
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            في عصر التحول الرقمي، أصبح أمن تطبيقات الويب أمراً حيوياً.
            تساعدنا أدوات الفحص والاختبار على اكتشاف الثغرات الأمنية قبل
            أن يستغلها المخترقون. تختلف هذه الأدوات في وظائفها واستخداماتها،
            ولكن جميعها تهدف إلى تحسينSTANCE الأمني للأنظمة والتطبيقات.
          </p>
          <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4">
            <p className="text-yellow-800 font-semibold">
              تنبيه هام: يجب استخدام هذه الأدوات بشكل قانوني وأخلاقي. اختبار
              الاختراق على أنظمة بدون تصريح يعتبر جريمة يعاقب عليها القانون.
            </p>
          </div>
        </section>

        {/* أدوات تطبيقات الويب */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">🔍</span>
            أدوات فحص تطبيقات الويب
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webAppScanners.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-blue-700">
                    {tool.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      tool.status.includes("مجانية")
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الاستخدام الرئيسي:
                  </h4>
                  <p className="text-gray-600 text-sm">{tool.useCase}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الميزات الرئيسية:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {tool.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  زيارة الموقع
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* أدوات فحص الشبكات */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">🌐</span>
            أدوات فحص الشبكات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {networkScanners.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-green-700">
                    {tool.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {tool.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الاستخدام الرئيسي:
                  </h4>
                  <p className="text-gray-600 text-sm">{tool.useCase}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الميزات الرئيسية:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {tool.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  زيارة الموقع
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* أدوات SQL Injection */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">💉</span>
            أدوات SQL Injection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sqlInjectionTools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-red-700">
                    {tool.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    {tool.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الاستخدام الرئيسي:
                  </h4>
                  <p className="text-gray-600 text-sm">{tool.useCase}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الميزات الرئيسية:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {tool.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  زيارة الموقع
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* أدوات XSS */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">⚠️</span>
            أدوات XSS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {xssTools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-orange-700">
                    {tool.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                    {tool.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الاستخدام الرئيسي:
                  </h4>
                  <p className="text-gray-600 text-sm">{tool.useCase}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الميزات الرئيسية:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {tool.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
                >
                  زيارة الموقع
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* الأطر العمل */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">🛠️</span>
            أطر العمل الشاملة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworks.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-purple-700">
                    {tool.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      tool.status.includes("مجانية")
                        ? "bg-purple-100 text-purple-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الاستخدام الرئيسي:
                  </h4>
                  <p className="text-gray-600 text-sm">{tool.useCase}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الميزات الرئيسية:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {tool.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  زيارة الموقع
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* جدول المقارنة */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            جدول مقارنة الأدوات
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-right">الأداة</th>
                    <th className="px-4 py-3 text-right">الفئة</th>
                    <th className="px-4 py-3 text-center">مجانية</th>
                    <th className="px-4 py-3 text-center">مفتوحة المصدر</th>
                    <th className="px-4 py-3 text-right">سهولة الاستخدام</th>
                    <th className="px-4 py-3 text-right">الميزات</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {row.tool}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.category}</td>
                      <td className="px-4 py-3 text-center">
                        {row.free ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-red-600">✗</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.openSource ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-red-600">✗</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {row.easeOfUse}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {row.features}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* كيف تختار الأداة المناسبة */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            كيف تختار الأداة المناسبة؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolSelectionGuide.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  {guide.level}
                </h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الأدوات المقترحة:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {guide.recommendedTools.map((tool, idx) => (
                      <li key={idx} className="mb-1">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-500 text-sm italic">{guide.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* نصائح أمنية */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            نصائح أمنية لاستخدام هذه الأدوات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* مصادر إضافية */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            مصادر إضافية للتعلم
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://owasp.org/www-project-zap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  OWASP ZAP Documentation
                </a>
                <span className="text-gray-500 mr-2">
                  - وثائق شاملة لـ OWASP ZAP
                </span>
              </li>
              <li>
                <a
                  href="https://portswigger.net/web-security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  PortSwigger Web Security Academy
                </a>
                <span className="text-gray-500 mr-2">
                  - أكاديمية أمن الويب من PortSwigger
                </span>
              </li>
              <li>
                <a
                  href="https://nmap.org/book/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Nmap Network Scanning
                </a>
                <span className="text-gray-500 mr-2">
                  - كتاب Nmap الرسمي
                </span>
              </li>
              <li>
                <a
                  href="https://sqlmap.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  SQLMap Documentation
                </a>
                <span className="text-gray-500 mr-2">
                  - وثائق SQLMap الرسمية
                </span>
              </li>
              <li>
                <a
                  href="https://www.offensive-security.com/metasploit-unleashed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Metasploit Unleashed
                </a>
                <span className="text-gray-500 mr-2">
                  - دورة Metasploit المجانية
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} دليل أمن الويب - جميع الحقوق محفوظة
          </p>
          <p className="text-gray-500 text-sm mt-2">
            هذا الدليل للأغراض التعليمية فقط. استخدم الأدوات بشكل قانوني
            وأخلاقي.
          </p>
        </div>
      </footer>
    </div>
  );
}
