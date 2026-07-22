import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'المصطلحات الأمنية | دليل أمان الويب',
  description:
    'قاموس شامل لمصطلحات الأمن السيبراني: تعريفات عربية وإنجليزية لأكثر من 50 مصطلحاً أمنياً.',
};

interface GlossaryTerm {
  arabicName: string;
  englishName: string;
  description: string;
  category: string;
}

const glossaryTerms: GlossaryTerm[] = [
  // A
  { arabicName: 'واجهة برمجة التطبيقات', englishName: 'API (Application Programming Interface)', description: 'مجموعة من القواعد والبروتوكولات التي تسمح للبرمجيات بالتواصل مع بعضها البعض. تُستخدم APIs لربط تطبيقات الويب بالخوادم والأنظمة الأخرى.', category: 'A' },
  { arabicName: 'المصادقة', englishName: 'Authentication', description: 'عملية التحقق من هوية المستخدم. تشمل استخدام كلمات المرور، المصادقة الثنائية، الشهادات الرقمية، والبصمات الحيوية.', category: 'A' },
  { arabicName: 'التفويض', englishName: 'Authorization', description: 'عملية تحديد ما إذا كان المستخدم المصادق عليه يملك الصلاحية للوصول لمورد معين أو تنفيذ إجراء معين.', category: 'A' },
  { arabicName: 'جهاز اكتشاف التعقيد', englishName: 'IDS (Intrusion Detection System)', description: 'نظام يراقب حركة الشبكة أو الأنشطة على النظام ويكتشف أي نشاط مشبوه أو محاولات اختراق.', category: 'A' },
  { arabicName: 'جهاز منع التعقيد', englishName: 'IPS (Intrusion Prevention System)', description: 'نظام يكتشف ويمنع الهجمات بشكل актив عن طريق تصفية حركة الشبكة و bloqueering الطلبات المشبوهة.', category: 'A' },
  { arabicName: 'ACL', englishName: 'Access Control List', description: 'قائمة تحدد الصلاحيات التي تحدد من يمكنه الوصول للموارد ونوع الوصول المسموح به.', category: 'A' },
  { arabicName: 'AD', englishName: 'Active Directory', description: 'خدمة من Microsoft لإدارة الدومينات وتحديد هوية المستخدمين في الشبكات.', category: 'A' },
  { arabicName: 'APT', englishName: 'Advanced Persistent Threat', description: 'تهديد سيبراني متقدم ومستمر يستهدف منظمة معينة لفترة طويلة من الزمن.', category: 'A' },

  // B
  { arabicName: 'هجوم القوة الغاشمة', englishName: 'Brute Force Attack', description: 'هجوم يحاول تخمين كلمة المرور أو المفتاح السري عن طريق تجربة جميع الاحتمالات الممكنة بشكل متكرر.', category: 'B' },
  { arabicName: 'جدار حماية', englishName: 'Firewall', description: 'نظام أمني يراقب ويتحكم في حركة الشبكة الداخلة والخارجة بناءً على قواعد أمنية محددة.', category: 'B' },
  { arabicName: 'بروتوكول آمن', englishName: 'Bastion Host', description: 'خادم مُعرّض للإنترنت ومُعّد بشكل خاص ل resist هجمات التسلل.', category: 'B' },

  // C
  { arabicName: 'تزوير طلبات المواقع المتقاطعة', englishName: 'CSRF (Cross-Site Request Forgery)', description: 'هجوم يستغل ثقة المستخدم في موقع ويب ليقوم بطلبات غير مقصودة إلى تطبيق آخر.', category: 'C' },
  { arabicName: 'حقن الأوامر', englishName: 'Command Injection', description: 'هجوم يحقن أوامر نظام عشوائية في تطبيق الويب عبر المدخلات غير المُعالجة.', category: 'C' },
  { arabicName: 'تقسيم الشبكات', englishName: 'Network Segmentation', description: 'تقسيم الشبكة إلى أقسام منفصلة لتقليل سطح الهجوم وتحسين الأمان.', category: 'C' },

  // D
  { arabicName: 'خوارزمية التجزئة', englishName: 'Hashing Algorithm', description: 'خوارزمية تحوّل البيانات إلى سلسلة نصية بطول ثابت (hash) لا يمكن عكسها عادةً. تُستخدم لتشفير كلمات المرور والتحقق من سلامة البيانات.', category: 'D' },
  { arabicName: 'حجب الخدمة', englishName: 'DoS (Denial of Service)', description: 'هجوم يهدف إلى جعل خدمة أو نظام غير متاح للمستخدمين الشرعيين.', category: 'D' },
  { arabicName: 'DNS', englishName: 'Domain Name System', description: 'نظام يحول أسماء المواقع (مثل example.com) إلى عناوين IP الرقمية.', category: 'D' },
  { arabicName: 'DMZ', englishName: 'Demilitarized Zone', description: 'منطقة شبكية آمنة تقع بين الشبكة الداخلية والإنترنت لحماية الأنظمة الداخلية.', category: 'D' },

  // E
  { arabicName: 'التشفير', englishName: 'Encryption', description: 'عملية تحويل البيانات إلى شكل غير مقروء لتمنع الوصول غير المصرح به. يُستخدم التشفير أثناء النقل والتخزين.', category: 'E' },
  { arabicName: 'هجوم التخمين', englishName: 'Enumeration', description: 'عملية جمع معلومات عن الهدف لاكتشاف نقاط الدخول المحتملة والثغرات.', category: 'E' },
  { arabicName: 'ESG', englishName: 'Endpoint Security Gateway', description: 'بوابة أمنية تحمي نقاط النهاية (أجهزة الكمبيوتر والهواتف) من التهديدات.', category: 'E' },

  // F
  { arabicName: 'جدار الحماية', englishName: 'Firewall', description: 'نظام يراقب ويتحكم في حركة مرور الشبكة بناءً على قواعد أمنية محددة. يمنع الوصول غير المصرح به ويحمي الشبكة من الهجمات.', category: 'F' },
  { arabicName: 'Fuzzing', englishName: 'Fuzz Testing', description: 'تقنية اختبار تستخدم بيانات عشوائية أو غير متوقعة لاكتشاف الثغرات والأخطاء في البرمجيات.', category: 'F' },

  // G
  { arabicName: 'اختراق', englishName: 'Hacking', description: 'استغلال نقاط الضعف في الأنظمة أو البرمجيات. يمكن أن يكون إيجابياً (اختبار اختراق أخلاقي) أو سلبياً (جريمة سيبرانية).', category: 'G' },
  { arabicName: 'Honeypot', englishName: 'Honeypot', description: 'نظام وهمي مُصمّم لجذب المهاجمين ودراسة أساليبهم دون المخاطرة بالأنظمة الحقيقية.', category: 'G' },

  // I
  { arabicName: 'حقن SQL', englishName: 'SQL Injection', description: 'هجوم يحقن استعلامات SQL ضارة في مدخلات التطبيق ليتمكن المهاجم من الوصول أو تعديل أو حذف البيانات من قاعدة البيانات.', category: 'I' },
  { arabicName: 'XSS', englishName: 'Cross-Site Scripting', description: 'هجوم يحقن سكربتات خبيثة في صفحات الويب التي يراها مستخدمون آخرون. يمكن أن يُستخدم لسرقة الكوكيز أو بيانات المستخدمين.', category: 'I' },
  { arabicName: 'المصادقة الهوائية', englishName: 'IAM (Identity and Access Management)', description: 'إطار عمل لإدارة هوية المستخدمين وصلاحياتهم في المنظمة.', category: 'I' },
  { arabicName: 'IDOR', englishName: 'Insecure Direct Object References', description: 'ثغرة تسمح للمستخدم بالوصول مباشرة لكيانات (مثل ملفات أو سجلات) عن طريق تغيير معرّف الكيان في الطلب.', category: 'I' },

  // J
  { arabicName: 'رمز JWT', englishName: 'JSON Web Token', description: 'معيار مفتوح لنقل المعلومات بين جهات بشكل آمن ككائن JSON مشفر. يُستخدم بشكل واسع في المصادقة.', category: 'J' },

  // K
  { arabicName: 'استغلال الامتيازات', englishName: 'Privilege Escalation', description: 'عملية الحصول على صلاحيات أعلى من المخصصة. يمكن أن يكون أفقياً (نفس المستوى) أو رأسياً (مستوى أعلى).', category: 'K' },

  // L
  { arabicName: 'تلوث النموذج البرمجي', englishName: 'Prototype Pollution', description: 'ثغرة في JavaScript تسمح للمهاجم بإضافة خصائص جديدة للكائنات الموروثة، مما قد يؤدي لحقن الكود.', category: 'L' },
  { arabicName: 'LDAP', englishName: 'Lightweight Directory Access Protocol', description: 'بروتوكول للاستعلام وتعديل فهارس الدومين. يمكن أن يكون هدفاً لحقن LDAP.', category: 'L' },
  { arabicName: 'LFI', englishName: 'Local File Inclusion', description: 'هجوم يتضمن ملفات محلية من الخادم عبر مدخلات غير مُعالجة.', category: 'L' },

  // M
  { arabicName: 'مبدأ الامتياز الأدنى', englishName: 'Least Privilege', description: 'مبدأ أمني ينص على منح كل مستخدم أو عملية فقط الصلاحيات اللازمة لأداء مهامه.', category: 'M' },
  { arabicName: 'MTTR', englishName: 'Mean Time To Repair', description: 'متوسط الوقت اللازم لإصلاح خلل أمني أو ثغرة.', category: 'M' },

  // N
  { arabicName: 'فحص الشبكات', englishName: 'Network Scanning', description: 'عملية اكتشاف الأجهزة والخدمات النشطة على الشبكة لتحديد سطح الهجوم المحتمل.', category: 'N' },
  { arabicName: 'Nmap', englishName: 'Network Mapper', description: 'أداة مفتوحة المصدر لفحص الشبكات واكتشاف الأجهزة والخدمات والثغرات.', category: 'N' },

  // O
  { arabicName: 'منظمة OWASP', englishName: 'OWASP (Open Worldwide Application Security Project)', description: 'منظمة غير ربحية مكرسة لتحسين أمن البرمجيات. تنشر OWASP Top 10 وهي قائمة بأكثر 10 ثغرات شيوعاً.', category: 'O' },
  { arabicName: 'OAuth', englishName: 'OAuth', description: 'معيار مفتوح للتفويض يسمح للتطبيقات بالوصول لموارد المستخدم دون الكشف عن كلمة المرور.', category: 'O' },
  { arabicName: 'OSINT', englishName: 'Open Source Intelligence', description: 'جمع المعلومات من مصادر مفتوحة مثل وسائل التواصل الاجتماعي وال인터넷.', category: 'O' },

  // P
  { arabicName: 'اختبار الاختراق', englishName: 'Penetration Testing', description: 'اختبار أمني يحاكي هجمات حقيقية لاكتشاف الثغرات وتقييم فعالية الدفاعات.', category: 'P' },
  { arabicName: 'Phishing', englishName: 'Phishing', description: 'هجوم تنمطي يستخدم رسائل بريد إلكتروني أو مواقع مزيفة لخداع المستخدمين وسرقة معلوماتهم.', category: 'P' },
  { arabicName: 'POC', englishName: 'Proof of Concept', description: 'دليل عملي على وجود ثغرة أمنية. يُستخدم في تقارير الباحثين لإثبات أن الثغرة قابلة للاستغلال.', category: 'P' },
  { arabicName: 'PT', englishName: 'Penetration Test', description: 'اختبار اختراق شامل يحاكي هجمات حقيقية لتقييد أمن النظام.', category: 'P' },

  // R
  { arabicName: 'التعافي من الكوارث', englishName: 'Disaster Recovery', description: 'عملية استعادة الأنظمة والبيانات بعد حدوث كارثة أو هجوم سيبراني.', category: 'R' },
  { arabicName: 'Reconnaissance', englishName: 'Reconnaissance', description: 'مرحلة أولية في اختبار الاختراق تجمع معلومات عن الهدف قبل بدء الهجوم الفعلي.', category: 'R' },
  { arabicName: 'RCE', englishName: 'Remote Code Execution', description: 'ثغرة خطيرة تسمح للمهاجم بتنفيذ أكواد عشوائية على الخادم عن بُعد.', category: 'R' },

  // S
  { arabicName: 'حقن خادم الطلب', englishName: 'SSRF (Server-Side Request Forgery)', description: 'هجوم يُجبر الخادم على إرسال طلبات HTTP غير مقصودة إلى موارد داخلية أو خارجية.', category: 'S' },
  { arabicName: 'التوقيع الرقمي', englishName: 'Digital Signature', description: 'آلية تشفير تستخدم للتحقق من هوية المُرسل وسلامة الرسالة.', category: 'S' },
  { arabicName: 'SSL/TLS', englishName: 'Secure Sockets Layer / Transport Layer Security', description: 'بروتوكولات تشفير تُستخدم لتأمين الاتصالات عبر الإنترنت. TLS هو خليفة SSL الآمن.', category: 'S' },
  { arabicName: 'SIEM', englishName: 'Security Information and Event Management', description: 'نظام يجمع ويحلل بيانات السجلات الأمنية من مصادر متعددة لاكتشاف التهديدات.', category: 'S' },
  { arabicName: 'SAST', englishName: 'Static Application Security Testing', description: 'تحليل الكود المصدري لاكتشاف الثغرات الأمنية قبل تشغيل البرنامج.', category: 'S' },
  { arabicName: 'DAST', englishName: 'Dynamic Application Security Testing', description: 'اختبار تطبيقات الويب أثناء التشغيل لاكتشاف الثغرات.', category: 'S' },
  { arabicName: 'Sandboxing', englishName: 'Sandboxing', description: 'عزل البيئة البرمجية لتشغيل البرامج في بيئة آمنة ومحصورة.', category: 'S' },
  { arabicName: 'SSH', englishName: 'Secure Shell', description: 'بروتوكول آمن للوصول عن بُعد إلى الخوادم عبر اتصال مشفر.', category: 'S' },

  // T
  { arabicName: 'حرب النطاقات', englishName: 'Domain Hijacking', description: 'استيلاء غير مصرح به على اسم نطاق أو تغيير سجلاته.', category: 'T' },
  { arabicName: 'Threat Modeling', englishName: 'Threat Modeling', description: 'عملية تحديد وتحليل التهديدات المحتملة في مرحلة التصميم.', category: 'T' },
  { arabicName: 'TLS', englishName: 'Transport Layer Security', description: 'بروتوكول تشفير يضمن السرية والسلامة في الاتصالات عبر الإنترنت.', category: 'T' },

  // V
  { arabicName: 'استغلال النطاقات الفرعية', englishName: 'Subdomain Takeover', description: 'استيلاء على نطاق فرعي عندما يكون مُسجلاً لكنه يشير لخدمة خارجية لم يتم إعدادها بعد.', category: 'V' },
  { arabicName: 'VPN', englishName: 'Virtual Private Network', description: 'شبكة خاصة افتراضية تنشئ اتصالاً مشفراً عبر شبكة عامة (الإنترنت).', category: 'V' },
  { arabicName: 'VM', englishName: 'Virtual Machine', description: 'حاسوب افتراضي يعمل داخل حاسوب مادي. يُستخدم لعزل الأنظمة التجريبية.', category: 'V' },

  // W
  { arabicName: 'WAF', englishName: 'Web Application Firewall', description: 'جدار حماية متخصص يحمي تطبيقات الويب من الهجمات مثل XSS و SQL Injection.', category: 'W' },
  { arabicName: 'Whitelisting', englishName: 'Whitelisting', description: 'قائمة تسمح فقط بالعناصر المحددة فيها (مثل IPs أو البرامج). أكثر أماناً من blacklisting.', category: 'W' },

  // X
  { arabicName: 'XXE', englishName: 'XML External Entity', description: 'هجوم يستغل معالجات XML لحقن كيانات خارجية، مما قد يؤدي لسرقة البيانات أو تنفيذ أوامر.', category: 'X' },

  // Z
  { arabicName: 'Zero-Day', englishName: 'Zero-Day Exploit', description: 'ثغرة أمنية غير معروفة أو غير مُصحّحة من المطور. تُسمى zero-day لأن المطور لديه صفر يوم لإصلاحها.', category: 'Z' },
  { arabicName: 'Zero Trust', englishName: 'Zero Trust Architecture', description: 'نموذج أمني يفترض عدم الثقة في أي مستخدم أو جهاز داخل أو خارج الشبكة.', category: 'Z' },
  { arabicName: 'Zenmap', englishName: 'Zenmap', description: 'واجهة مستخدم رسومية لأداة Nmap لفحص الشبكات.', category: 'Z' },
];

// Get unique categories
const categories = Array.from(new Set(glossaryTerms.map((t) => t.category))).sort();

export default function GlossaryPage() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-indigo-700 to-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse" />
            أكثر من 60 مصطلحاً أمنياً
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">المصطلحات الأمنية</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-indigo-100">
            قاموس شامل للمصطلحات الأمنية الشائعة مع الترجمة العربية والإنجليزية والتعريف التفصيلي.
          </p>
        </div>
      </section>

      {/* Alphabetical Navigation */}
      <section className="bg-white py-6 shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#cat-${cat}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700 transition hover:bg-indigo-200"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary List */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category} id={`cat-${category}`} className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
                    {category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    الحرف {category}
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {glossaryTerms
                    .filter((t) => t.category === category)
                    .map((term) => (
                      <div
                        key={term.englishName}
                        className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                      >
                        <h3 className="mb-1 font-bold text-indigo-800">
                          {term.arabicName}
                        </h3>
                        <p className="mb-2 text-sm font-bold text-gray-500">
                          {term.englishName}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-700">
                          {term.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">هل تريد تعلم المزيد؟</h2>
          <p className="mb-8 text-lg text-indigo-100">
            استكشف قسمنا التعليمي الشامل لفهم هذه المصطلحات في السياق العملي.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/fundamentals"
              className="rounded-lg bg-white px-8 py-3 font-bold text-indigo-800 transition hover:bg-indigo-50"
            >
              تعلم الأساسيات
            </Link>
            <Link
              href="/vulnerabilities"
              className="rounded-lg border-2 border-white px-8 py-3 font-bold transition hover:bg-white hover:text-indigo-800"
            >
              استكشف الثغرات
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
