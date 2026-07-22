import React from "react";

export const metadata = {
  title: "تحديات CTF | دليل أمن الويب",
  description:
    "دليل شامل لمنصات وتحديات Capture The Flag للمبتدئين في الأمن السيبراني",
};

const ctfPlatforms = [
  {
    name: "TryHackMe",
    description:
      "منصة تعليمية تفاعلية مصممة للمبتدئين. توفر مسارات تعليمية منظمة وبيئات تدريبية جاهزة مع شرح مفصل لكل خطوة.",
    difficulty: "مبتدئ - متوسط",
    url: "https://tryhackme.com",
    features: [
      "مسارات تعليمية منظمة (Learning Paths)",
      "بيئات تدريبية جاهزة في المتصفح",
      "شرح عربي وإنجليزي",
      "تحديات يومية",
      "شهادات إتمام",
    ],
    bestFor: "البداية من الصفر وبناء الأساس",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "HackTheBox",
    description:
      "منصة متقدمة لتحديات الاختراق الحقيقي. توفر أجهزة افتراضية (Machines) وتحديات مباشرة (Challenges) بمستويات صعوبة متعددة.",
    difficulty: "متوسط - متقدم",
    url: "https://hackthebox.com",
    features: [
      "أجهزة افتراضية واقعية",
      "تحديات متعددة التخصصات",
      "تصنيف عالمي للمستخدمين",
      "مسابقات وتحديات حية",
      "مسارات تعليمية (Tracks)",
    ],
    bestFor: "تطبيق المهارات على أنظمة واقعية",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "PicoCTF",
    description:
      "منصة تعليمية مجانية من جامعة Carnegie Mellon. مصممة لطلاب المدارس والجامعات، لكنها مفيدة لأي مبتدئ في مجال أمن الحاسب.",
    difficulty: "مبتدئ - متوسط",
    url: "https://picoctf.org",
    features: [
      "مجانية بالكامل",
      "تحديات متنوعة (شبكات، تشفير، اختراق)",
      "شرح لكل تحدي بعد اكتماله",
      "مسابقات سنوية",
      "مجتمع تعليمي نشط",
    ],
    bestFor: "فهم المفاهيم الأساسية بالتشفير والشبكات",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "OverTheWire",
    description:
      "سلسلة من الألعاب التعليمية (Wargames) تعلم أساسيات أمن المعلومات من خلال التحديات العملية. مثال بارز هوعبة Bandit.",
    difficulty: "مبتدئ - متقدم",
    url: "https://overthewire.org",
    features: [
      "مجانية بالكامل",
      "تعلم أوامر Linux عملياً",
      "تحديات متسلسلة ومتprogressive",
      "شرح مفصل لكل مرحلة",
      "تاريخ عريق وسمعة ممتازة",
    ],
    bestFor: "تعلم أساسيات Linux والأوامر",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Root-Me",
    description:
      "منصة فرنسية شاملة توفر تحديات في مجالات متعددة من أمن المعلومات. تحتوي على أكثر من 300 تحدي في أكثر من 20 فئة.",
    difficulty: "مبتدئ - متقدم",
    url: "https://root-me.org",
    features: [
      "أكثر من 300 تحدي",
      "أكثر من 20 فئة مختلفة",
      "مجتمع نشط يتحدث العربية",
      "تصنيف ونقاط",
      "شهادات معتمدة",
    ],
    bestFor: "تنويع المهارات في مجالات متعددة",
    color: "bg-red-100 text-red-800",
  },
];

const learningPaths = [
  {
    title: "مسار المبتدئ المطلق",
    duration: "3-6 أشهر",
    steps: [
      {
        phase: "الأساسيات",
        platforms: ["OverTheWire (Bandit)", "PicoCTF"],
        tasks: [
          "تعلم أوامر Linux الأساسية",
          "فهم مفاهيم الشبكات الأساسية",
          "تعلم أساسيات التشفير",
          "حل تحديات ASCII وBinary",
        ],
      },
      {
        phase: "بناء المهارات",
        platforms: ["TryHackMe (Pre-Security)", "TryHackMe (Complete Beginner)"],
        tasks: [
          "إتمام مسار Pre-Security",
          "إتمام مسار Complete Beginner",
          "تعلم مفاهيم أمن الويب الأساسية",
          "التعرف على أدوات Pentesting",
        ],
      },
      {
        phase: "التطبيق العملي",
        platforms: ["TryHackMe (Jr Penetration Tester)", "HackTheBox (Starting Point)"],
        tasks: [
          "إتمام مسار Jr Penetration Tester",
          "حل أول 5 أجهزة على HackTheBox",
          "بناء مهارات التقرير",
          "المشاركة في مسابقات CTF صغيرة",
        ],
      },
    ],
  },
  {
    title: "مسار تطوير الويب الآمن",
    duration: "2-4 أشهر",
    steps: [
      {
        phase: "أساسيات الويب",
        platforms: ["PicoCTF", "PortSwigger Web Security Academy"],
        tasks: [
          "فهم كيف يعمل HTTP/HTTPS",
          "تعلم HTML وJavaScript الأساسي",
          "فهم قواعد البيانات SQL",
          "تعلم أساسيات REST APIs",
        ],
      },
      {
        phase: "ثغرات الويب",
        platforms: ["TryHackMe (Web Fundamentals)", "HackTheBox"],
        tasks: [
          "تعلم XSS وSQL Injection",
          "فهم CSRF وSSRF",
          "تعلم ثغرات Authentication",
          "تطبيق على تحديات Web Security",
        ],
      },
      {
        phase: "التقدم",
        platforms: ["PortSwigger Academy", "HackTheBox"],
        tasks: [
          "إتمام جميع مختبرات PortSwigger",
          "حل تحديات Web المتقدمة",
          "تعلم اكتشاف ثغرات API",
          "بناء مهارات تقرير الثغرات",
        ],
      },
    ],
  },
];

const beginnerTips = [
  {
    title: "ابدأ بالأساسيات",
    description:
      "لا ت跳 إلى التحديات المتقدمة مباشرة. ابدأ بتعلم أوامر Linux ومبادئ الشبكات والتشفير أولاً.",
    icon: "🎯",
  },
  {
    title: "استمر في المحاولة",
    description:
      "التحديات قد تبدو صعبة في البداية. لا تستسلم! كل تحدي تحله يبني مهاراتك وثقتك.",
    icon: "💪",
  },
  {
    title: "وثّق رحلتك",
    description:
      "اكتب مدونة أو ملاحظات عن كل تحدي تحله. هذا يساعدك على ترسيخ المعرفة ومشاركة تجربتك مع الآخرين.",
    icon: "📝",
  },
  {
    title: "انضم للمجتمع",
    description:
      "شارك في مجتمعات CTF على Discord وReddit. يمكنك طرح الأسئلة وتعلم من خبراء الأمن السيبراني.",
    icon: "👥",
  },
  {
    title: "حدد وقتك",
    description:
      "خصص وقتاً ثابتاً للتدريب يومياً أو أسبوعياً. الاستمرارية أهم من كثافة التدريب.",
    icon: "⏰",
  },
  {
    title: "تعلم من الأخطاء",
    description:
      "عند حل تحدي، ارجع وافهم كيف كان بإمكانك الوصول للحل بشكل أسرع. التعلم من الأخطاء يبني الخبرة.",
    icon: "📚",
  },
];

export default function CTFPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-l from-orange-900 to-orange-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            تحديات CTF - Capture The Flag
          </h1>
          <p className="text-xl text-center text-orange-100 max-w-3xl mx-auto">
            دليلك الشامل للبدء في عالم تحديات الأمن السيبراني وبناء مهاراتك
            العملية
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* ما هي CTF */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ما هي تحديات CTF؟
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CTF (Capture The Flag) هي مسابقات أمن سيبراني تsimulates هجمات
            حقيقية. ي竞سب Participants في اكتشاف واستغلال الثغرات للحصول على
            "أعلام" (Flags). وهي الطريقة الأفضل لبناء مهارات عملية في أمن
            المعلومات.
          </p>
          <div className="bg-orange-50 border-r-4 border-orange-400 p-4">
            <p className="text-orange-800 font-semibold">
              معلومة: تحديات CTF تُستخدم لتدريب خبراء الأمن السيبراني في
              المؤسسات والجيوش حول العالم.
            </p>
          </div>
        </section>

        {/* منصات CTF */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">🏆</span>
            أفضل منصات CTF للمبتدئين
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ctfPlatforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-orange-700">
                    {platform.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${platform.color}`}
                  >
                    {platform.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  {platform.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    الميزات الرئيسية:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {platform.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    الأفضل لـ:{" "}
                    <span className="font-medium text-orange-600">
                      {platform.bestFor}
                    </span>
                  </span>
                </div>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors text-sm"
                >
                  زيارة المنصة
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* مسارات التعلم */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">🗺️</span>
            مسارات التعلم المقترحة
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {path.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-orange-50 px-3 py-1 rounded-full">
                    {path.duration}
                  </span>
                </div>
                <div className="space-y-4">
                  {path.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {stepIdx + 1}
                        </span>
                        <h4 className="font-bold text-gray-700">{step.phase}</h4>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm text-gray-500">المنصات: </span>
                        {step.platforms.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-sm text-orange-600 font-medium"
                          >
                            {p}
                            {pIdx < step.platforms.length - 1 ? "، " : ""}
                          </span>
                        ))}
                      </div>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {step.tasks.map((task, tIdx) => (
                          <li key={tIdx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* نصائح للمبتدئين */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="ml-3">💡</span>
            نصائح للمبتدئين
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <h3 className="text-lg font-bold text-gray-800">{tip.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* مصادر إضافية */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            مصادر تعليمية إضافية
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.root-me.org/?page=articles&lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline"
                >
                  Root-Me Articles
                </a>
                <span className="text-gray-500 mr-2">
                  - مقالات تعليمية حول أمن المعلومات
                </span>
              </li>
              <li>
                <a
                  href="https://book.hacktricks.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline"
                >
                  HackTricks
                </a>
                <span className="text-gray-500 mr-2">
                  - دليل شامل لتقنيات الاختراق
                </span>
              </li>
              <li>
                <a
                  href="https://github.com/enaqx/awesome-pentest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline"
                >
                  Awesome Penetration Testing
                </a>
                <span className="text-gray-500 mr-2">
                  - قائمة شاملة بأدوات ومصادر الاختراق
                </span>
              </li>
              <li>
                <a
                  href="https://ctftime.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline"
                >
                  CTFtime
                </a>
                <span className="text-gray-500 mr-2">
                  - تقويم مسابقات CTF حول العالم
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
