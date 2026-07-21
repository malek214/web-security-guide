import Link from "next/link";

interface Resource {
  name: string;
  description: string;
  url: string;
  status: string;
  difficulty: string;
}

interface Category {
  title: string;
  icon: string;
  resources: Resource[];
}

const categories: Category[] = [
  {
    title: "الدورات التدريبية عبر الإنترنت",
    icon: "🎓",
    resources: [
      {
        name: "OWASP Education",
        description: "دورات مجانية منظمة OWASP حول أمان تطبيقات الويب، تغطي Top 10 وOWASP Top 10 وأدوات الاختبار.",
        url: "https://owasp.org/education/",
        status: "مجاني",
        difficulty: "جميع المستويات",
      },
      {
        name: "Coursera - IBM Cybersecurity Analyst",
        description: "سلسلة دورات شاملة من IBM تغطي أساسيات الأمن السيبراني وتحليل التهديدات وحماية الشبكات.",
        url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst",
        status: "مدفوع",
        difficulty: "مبتدئ",
      },
      {
        name: "Udemy - Web Security & Ethical Hacking",
        description: "دورات عملية حول اختبار اختراق تطبيقات الويب باستخدام أدوات مثل Burp Suite وOWASP ZAP.",
        url: "https://www.udemy.com/topic/web-security/",
        status: "مدفوع",
        difficulty: "متوسط",
      },
      {
        name: "Cybrary - Web Application Security",
        description: "منصة تدريب سيبراني متخصصة في أمان تطبيقات الويب مع مختبرات عملية.",
        url: "https://www.cybrary.it/course/web-application-security",
        status: "مجاني ومدفوع",
        difficulty: "متوسط",
      },
      {
        name: "SANS Institute - SEC542",
        description: "دورة متقدمة من SANS حول اختبار اختراق تطبيقات الويب والاستجابة للحوادث.",
        url: "https://www.sans.org/cyber-security-courses/web-app-penetration-testing-ethical-hacking/",
        status: "مدفوع",
        difficulty: "متقدم",
      },
    ],
  },
  {
    title: "الكتب والمراجع",
    icon: "📚",
    resources: [
      {
        name: "The Web Application Hacker's Handbook",
        description: "المرجع الشامل لاختبار اختراق تطبيقات الويب، يغطي 모든 أنواع الهجمات وتقنيات الاختبار.",
        url: "https://www.amazon.com/Web-Application-Hackers-Handbook-Testing/dp/1593272901",
        status: "مدفوع",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "OWASP Testing Guide v4.2",
        description: "دليل اختبار OWASP الرسمي المجاني الذي يشرح منهجية اختبار أمان تطبيقات الويب خطوة بخطوة.",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        status: "مجاني",
        difficulty: "متوسط",
      },
      {
        name: "Hacking: The Art of Exploitation",
        description: "كتاب يشرح فن الاستغلال منهجياً، يغطي أساسيات البرمجة والشبكات وتقنيات الاستغلال.",
        url: "https://www.amazon.com/Hacking-Art-Exploitation-Jon-Erickson/dp/1593271441",
        status: "مدفوع",
        difficulty: "متقدم",
      },
      {
        name: "Web Security for Developers",
        description: "كتاب حديث يشرح أمان الويب للمطورين بأسلوب عملي مع أمثلة حقيقية بلغات مختلفة.",
        url: "https://www.amazon.com/Web-Security-Developers-Real-World/dp/1593279943",
        status: "مدفوع",
        difficulty: "مبتدئ إلى متوسط",
      },
      {
        name: "SQL Injection Attacks and Defense",
        description: "مرجع متخصص في هجمات SQL Injection وكيفية الدفاع عنها مع أمثلة عملية.",
        url: "https://www.amazon.com/SQL-Injection-Attacks-Defense-Second/dp/1597499633",
        status: "مدفوع",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "The Tangled Web",
        description: "كتاب يشرح كيفية عمل الويب من المنظور الأمني وكيفية حماية تطبيقات الويب.",
        url: "https://www.amazon.com/Tangled-Web-Defending-Modern-Applications/dp/1593273886",
        status: "مدفوع",
        difficulty: "متوسط",
      },
    ],
  },
  {
    title: "المواقع والمدونات",
    icon: "🌐",
    resources: [
      {
        name: "OWASP Foundation",
        description: "منظمةOWASP - المرجع الرئيسي لأمن تطبيقات الويب، توفر مشاركات وأدلة وأدوات مجانية.",
        url: "https://owasp.org/",
        status: "مجاني",
        difficulty: "جميع المستويات",
      },
      {
        name: "PortSwigger Research",
        description: "مدونة PortSwigger Research توفر أبحاث حديثة في أمان الويب وتقنيات اختبار الاختراق.",
        url: "https://portswigger.net/research",
        status: "مجاني",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "HackerOne Hacktivity",
        description: "منصة HackerOne تعرض تقارير الثغرات المكتشفة حديثاً مع تفاصيل الاستغلال.",
        url: "https://hackerone.com/hacktivity",
        status: "مجاني",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "The Hacker News",
        description: "موقع أخبار أمن المعلومات الرائد يغطي أحدث الثغرات والتهديدات السيبرانية.",
        url: "https://thehackernews.com/",
        status: "مجاني",
        difficulty: "جميع المستويات",
      },
      {
        name: "SecurityWeek",
        description: "منصة إخبارية متخصصة في أمن الشبكات وحماية البيانات والبنية التحتية.",
        url: "https://www.securityweek.com/",
        status: "مجاني",
        difficulty: "متوسط",
      },
      {
        name: "Krebs on Security",
        description: "مدونة Brian Krebs الشهيرة التي تغطي جرائم הסיبر وتحليل الثغرات.",
        url: "https://krebsonsecurity.com/",
        status: "مجاني",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "Bug Bounty Hunting - Medium",
        description: "مجموعة مقالات على Medium حول صيد الثغرات وتقنيات الربح من البرامج الحمية.",
        url: "https://medium.com/bug-bounty-hunting",
        status: "مجاني",
        difficulty: "متوسط",
      },
    ],
  },
  {
    title: "قنوات اليوتيوب التعليمية",
    icon: "📺",
    resources: [
      {
        name: "NetworkChuck",
        description: "قناة تعليمية تغطي الشبكات والأمن السيبراني بأسلوب ممتع وعملي مع مختبرات.",
        url: "https://www.youtube.com/@NetworkChuck",
        status: "مجاني",
        difficulty: "مبتدئ إلى متوسط",
      },
      {
        name: "John Hammond",
        description: "متخصص في CTF وصيد الثغرات، يقدم شروحات مفصلة للتحديات والهجمات.",
        url: "https://www.youtube.com/@JohnHammond010",
        status: "مجاني",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "The Cyber Mentor",
        description: "قناة متخصصة في اختبار اختراق تطبيقات الويب مع مشاريع عملية.",
        url: "https://www.youtube.com/@TheCyberMentor",
        status: "مجاني",
        difficulty: "متوسط",
      },
      {
        name: "LiveOverflow",
        description: "محتوى عميق حول أمن البرمجيات وOpen Source Intelligence واستغلال الثغرات.",
        url: "https://www.youtube.com/@LiveOverflow",
        status: "مجاني",
        difficulty: "متقدم",
      },
      {
        name: "STÖK",
        description: "قناة تقدم نصائح و tricks حول صيد الثغرات وكسب المال من Bug Bounty.",
        url: "https://www.youtube.com/@STOKfredrik",
        status: "مجاني",
        difficulty: "متوسط",
      },
      {
        name: "HackerSploit",
        description: "شروحات لأدوات الاختبار مثل Kali Linux وMetasploit وNmap.",
        url: "https://www.youtube.com/@HackerSploit",
        status: "مجاني",
        difficulty: "متوسط",
      },
    ],
  },
  {
    title: "منصات التدريب العملي",
    icon: "🎯",
    resources: [
      {
        name: "HackTheBox",
        description: "منصة CTF رائدة توفر مختبرات عملية وهياكل معلومات محاكاة لتعلم اختبار الاختراق.",
        url: "https://www.hackthebox.com/",
        status: "مجاني ومدفوع",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "TryHackMe",
        description: "منصة تعليمية تفاعلية مثالية للمبتدئين مع مسارات تعليمية منظمة ومختبرات.",
        url: "https://tryhackme.com/",
        status: "مجاني ومدفوع",
        difficulty: "مبتدئ إلى متوسط",
      },
      {
        name: "PortSwigger Web Security Academy",
        description: "أكاديمية مجانية من PortSwigger توفر مختبرات عملية حول ثغرات OWASP Top 10.",
        url: "https://portswigger.net/web-security",
        status: "مجاني",
        difficulty: "مبتدئ إلى متقدم",
      },
      {
        name: "OWASP WebGoat",
        description: "تطبيق ويب م故意 فيه ثغرات لتعلم تقنيات الاختبار والدفاع بشكل عملي.",
        url: "https://owasp.org/www-project-webgoat/",
        status: "مجاني",
        difficulty: "مبتدئ إلى متوسط",
      },
      {
        name: "DVWA (Damn Vulnerable Web App)",
        description: "تطبيق ويب PHP م故意 فيه ثغرات بمستويات صعوبة مختلفة للتدريب.",
        url: "https://github.com/digininja/DVWA",
        status: "مجاني",
        difficulty: "مبتدئ إلى متوسط",
      },
      {
        name: "VulnHub",
        description: "مجموعة من الآلات الافتراضية المحملة بالثغرات للاختبار المحلي.",
        url: "https://www.vulnhub.com/",
        status: "مجاني",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "PentesterLab",
        description: "منصة تدريب عملي على اختبار اختراق تطبيقات الويب مع تمارين يومية.",
        url: "https://pentesterlab.com/",
        status: "مجاني ومدفوع",
        difficulty: "متوسط",
      },
    ],
  },
  {
    title: "الشهادات المهنية",
    icon: "🏆",
    resources: [
      {
        name: "CEH (Certified Ethical Hacker)",
        description: "شهادة EC-Council الشهيرة في الاختراق الأخلاقي، تغطي أساسيات أمن الشبكات والتطبيقات.",
        url: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
        status: "مدفوع",
        difficulty: "متوسط",
      },
      {
        name: "OSCP (Offensive Security Certified Professional)",
        description: "الشهادة الأعلى قيمة في اختبار الاختراق، تتطلب اجتياز امتحان عملي صارم.",
        url: "https://www.offsec.com/courses/pen-200/",
        status: "مدفوع",
        difficulty: "متقدم",
      },
      {
        name: "CompTIA Security+",
        description: "شهادة أساسية في الأمن السيبراني تغطي المفاهيم العامة وحماية الشبكات والأنظمة.",
        url: "https://www.comptia.org/certifications/security",
        status: "مدفوع",
        difficulty: "مبتدئ",
      },
      {
        name: "OSWE (Offensive Security Web Expert)",
        description: "شهادة متخصصة في اختبار اختراق تطبيقات الويب من Offensive Security.",
        url: "https://www.offsec.com/courses/web-300/",
        status: "مدفوع",
        difficulty: "متقدم",
      },
      {
        name: "GWAPT (GIAC Web Application Penetration Tester)",
        description: "شهادة GIAC المتخصصة في اختبار اختراق تطبيقات الويب.",
        url: "https://www.giac.org/certification/web-application-penetration-tester-gwapt/",
        status: "مدفوع",
        difficulty: "متوسط إلى متقدم",
      },
      {
        name: "Burp Suite Certified Practitioner",
        description: "شهادة PortSwigger الرسمية في استخدام Burp Suite لاختبار اختراق تطبيقات الويب.",
        url: "https://portswigger.net/web-security/certification",
        status: "مدفوع",
        difficulty: "متوسط",
      },
    ],
  },
];

const learningPaths = [
  {
    level: "مبتدئ",
    title: "مسار المبتدئين",
    description: "للطلاب الجدد وأصحاب المصلحة في مجال أمن الويب",
    steps: [
      "تعلم أساسيات الشبكات (TCP/IP, DNS, HTTP/HTTPS)",
      "إتقان لغة HTML, CSS, JavaScript",
      "تعلم أساسيات البرمجة بلغة Python",
      "إتمام دورات CompTIA Security+",
      "البدء في TryHackMe - مسار Introduction to Cyber Security",
      "تطبيق المفاهيم على PortSwigger Web Security Academy",
      "حل تحديات CTF للمبتدئين",
    ],
    resources: ["TryHackMe", "PortSwigger Web Security Academy", "CompTIA Security+"],
  },
  {
    level: "متوسط",
    title: "مسار المتوسطين",
    description: "للمحترفين المبتدئين الراغبين في التخصص في أمن الويب",
    steps: [
      "إتقان OWASP Top 10 وفهم كل ثغرة بعمق",
      "تعلم استخدام Burp Suite بشكل احترافي",
      "التدرب على HackTheBox و VulnHub",
      "قراءة Web Application Hacker's Handbook",
      "البدء في صيد الثغرات (Bug Bounty)",
      "الحصول على شهادة CEH أو GWAPT",
      "بناء مختبر منزلي للاختبار",
    ],
    resources: ["HackTheBox", "Web Application Hacker's Handbook", "CEH"],
  },
  {
    level: "متقدم",
    title: "مسار المتقدمين",
    description: "للمحترفين الراغبين في التخصص العميق واكتشاف الثغرات الجديدة",
    steps: [
      "إتقان تطوير أدوات الاختبار المخصصة",
      "تعلم البحث في أمن البرمجيات (Source Code Review)",
      "اكتشاف ثغرات Day-Zero والulnerabilities المعقدة",
      "الحصول على شهادة OSCP و OSWE",
      "المشاركة في مسابقات CTF الكبرى",
      "المساهمة في مشاريع OWASP المفتوحة المصدر",
      "بناء سيرة ذاتية قوية في Bug Bounty",
    ],
    resources: ["OSCP", "OSWE", "LiveOverflow", "HackerOne"],
  },
];

const difficultyColors: Record<string, string> = {
  مبتدئ: "bg-green-100 text-green-800",
  متوسط: "bg-yellow-100 text-yellow-800",
  متقدم: "bg-red-100 text-red-800",
  "متوسط إلى متقدم": "bg-orange-100 text-orange-800",
  "مبتدئ إلى متوسط": "bg-blue-100 text-blue-800",
  "جميع المستويات": "bg-purple-100 text-purple-800",
};

const statusColors: Record<string, string> = {
  مجاني: "bg-emerald-100 text-emerald-800",
  مدفوع: "bg-amber-100 text-amber-800",
  "مجاني ومدفوع": "bg-cyan-100 text-cyan-800",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-l from-indigo-900/20 via-purple-900/10 to-transparent border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg4VjMwaDI4em0wLTRWMTZIMFYyMGgyNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              دليلك الشامل لتعلم أمن تطبيقات الويب
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              الموارد التعليمية
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              مجموعة شاملة من أفضل الموارد التعليمية لتعلم أمن تطبيقات الويب، تشمل الدورات والكتب والمنصات العملية
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "مورد تعليمي", value: "40+", color: "text-indigo-400" },
            { label: "منصة تدريب", value: "7", color: "text-purple-400" },
            { label: "شهادة مهنية", value: "6", color: "text-pink-400" },
            { label: "مسار تعليمي", value: "3", color: "text-cyan-400" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center"
            >
              <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Resource Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {category.title}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-l from-gray-800 to-transparent"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.resources.map((resource, resIndex) => (
                  <div
                    key={resIndex}
                    className="group bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 hover:bg-gray-900/80 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {resource.name}
                      </h3>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusColors[resource.status]
                        }`}
                      >
                        {resource.status}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          difficultyColors[resource.difficulty] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {resource.difficulty}
                      </span>
                    </div>

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>زيارة الموقع</span>
                      <svg
                        className="w-4 h-4 rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            مسارات التعلم المقترحة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            مسارات منظمة حسب مستوى الخبرة لمساعدتك في التخطيط لرحلة تعلمك
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/50 border rounded-2xl p-6 transition-all duration-300 ${
                index === 0
                  ? "border-green-500/30 hover:border-green-500/60"
                  : index === 1
                  ? "border-yellow-500/30 hover:border-yellow-500/60"
                  : "border-red-500/30 hover:border-red-500/60"
              }`}
            >
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  index === 0
                    ? "bg-green-500/10 text-green-400"
                    : index === 1
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {path.level}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{path.description}</p>

              <div className="space-y-3 mb-6">
                {path.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        index === 0
                          ? "bg-green-500/20 text-green-400"
                          : index === 1
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {stepIndex + 1}
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="text-xs text-gray-500 mb-2">الموارد المقترحة:</div>
                <div className="flex flex-wrap gap-2">
                  {path.resources.map((resource, rIndex) => (
                    <span
                      key={rIndex}
                      className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-l from-indigo-900/30 via-purple-900/20 to-transparent border border-gray-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            كيفية البدء
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-indigo-400 mb-4">
                للمبتدئين التام
              </h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>ابدأ بتعلم أساسيات الشبكات والبرمجة</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>سجّل في TryHackMe واتبع المسارات المخصصة</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>تطبّق على PortSwigger Web Security Academy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>انضم لمجتمعات Bug Bounty وابدأ بالتحديات السهلة</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">
                للمطورين الم hợpعين
              </h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>اقرأ OWASP Testing Guide لفهم منهجية الاختبار</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>تعلّم استخدام Burp Suite بشكل عملي</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>جرّب اختبار OWASP Top 10 على تطبيقات م故意 فيها ثغرات</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>شارك في مسابقات CTF لتطوير مهاراتك</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 text-center">
          <p className="text-yellow-200/80 text-sm">
            <strong className="text-yellow-400">ملاحظة مهمة:</strong> جميع الموارد المذكورة لأغراض تعليمية مشروعة فقط.
            استخدم هذه المعرفة لتحسين أمن تطبيقاتك وحماية المستخدمين، ولا تستخدمها في أنشطة غير قانونية.
          </p>
        </div>
      </section>
    </div>
  );
}
