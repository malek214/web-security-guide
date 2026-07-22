"use client";

import React, { useState } from "react";

type Question = {
  question: string;
  answer: string;
};

type Level = "junior" | "mid" | "senior";

const questionsByLevel: Record<
  Level,
  Record<string, Question[]>
> = {
  junior: {
    "أمن الشبكات": [
      {
        question: "ما هو الجدار الناري (Firewall)؟",
        answer:
          "الجدار الناري هو نظام أمني يراقب حركة المرور الواردة والصادرة من الشبكة ويتحكم فيها بناءً على مجموعة من القواعد المحددة مسبقاً. يتم وضعه بين الشبكة الداخلية والشبكات الخارجية مثل الإنترنت لمنع الوصول غير المصرح به.",
      },
      {
        question: "ما الفرق بين TCP وUDP؟",
        answer:
          "TCP هو بروتوكول موثوق يضمن وصول البيانات بشكل كامل ومرتب من خلال عملية المصافحة الثلاثية. أما UDP فهو أسرع لكنه لا يضمن وصول البيانات، ويستخدم في التطبيقات التي تحتاج سرعة مثل البث المباشر وألعاب الفيديو.",
      },
      {
        question: "ما هو اختلاق الهوية (IP Spoofing)؟",
        answer:
          "هو تقنية يستخدمها المهاجمون لتزييف عنوان IP المصدر في حزم البيانات لإخفاء هويتهم أو انتحال هوية نظام آخر. يُستخدم في هجمات DDoS وهجمات Man-in-the-Middle.",
      },
      {
        question: "ما هو DNS Spoofing؟",
        answer:
          "هو تقنية يتم فيها تسميم ذاكرة التخزين المؤقت لـ DNS لتحويل المستخدمين إلى مواقع خبيثة بدلاً من الموقع المطلوب. يُستخدم لسرقة بيانات تسجيل الدخول وتثبيت برامج خبيثة.",
      },
      {
        question: "ما هو البروتوكول SSL/TLS؟",
        answer:
          "SSL/TLS هو بروتوكول تشفير يوفر قنوات آمنة للاتصال عبر الإنترنت. SSL هو الإصدار القديم وTLS هو الإصدار الحديث. يتم تشفير البيانات المنقولة بين الخادم والمتصفح لمنع التنصت والتلاعب.",
      },
    ],
    "أمن الويب": [
      {
        question: "ما هي ثغرة XSS؟",
        answer:
          "Cross-Site Scripting هي ثغرة تسمح للمهاجم بحقن أكواد خبيثة في صفحات الويب التي يراها المستخدمون الآخرون. تُستخدم لسرقة الكوكيز وبيانات الجلسات أو إعادة توجيه المستخدمين إلى مواقع خبيثة.",
      },
      {
        question: "ما هي ثغرة SQL Injection؟",
        answer:
          "هي ثغرة تسمح للمهاجم بحقن أكواد SQL خبيثة في استعلامات قاعدة البيانات غير المُsanitized. يمكن أن تؤدي إلى سرقة البيانات أو حذفها أو الوصول غير المصرح به للنظام.",
      },
      {
        question: "ما هي الكوكيز (Cookies) وكيف تؤثر على الأمان؟",
        answer:
          "الكوكيز هي ملفات نصية صغيرة يخزنها المتصفح في جهاز المستخدم. تُستخدم لتخزين معلومات الجلسة وتفضيلات المستخدم. إذا لم يتم تأمينها يمكن اختراقها واستخدامها في هجمات Session Hijacking.",
      },
      {
        question: "ما الفرق بين HTTP وHTTPS؟",
        answer:
          "HTTP ينقل البيانات بدون تشفير بينما HTTPS يستخدم تشفير SSL/TLS لحماية البيانات المنقولة. HTTPS يضمن السرية والسلامة وعدم التلاعب بالبيانات أثناء النقل.",
      },
      {
        question: "ما هو CORS؟",
        answer:
          "Cross-Origin Resource Sharing هو آليات أمنية في المتصفح تتحكم في كيفية وصول المواقع المختلفة للموارد. يمنع المواقع الخبيثة من الوصول لبيانات مواقع أخرى إلا إذا كان هناك تصريح مناسب.",
      },
    ],
    "أمن السحابة": [
      {
        question: "ما هي أمنية السحابة (Cloud Security)؟",
        answer:
          "هي مجموعة من السياسات والتقنيات والعمليات المصممة لحماية البيانات والتطبيقات والبنية التحتية السحابية. تشمل تأمين الوصول والبيانات والشبكات والبنية التحتية.",
      },
      {
        question: "ما الفرق بين IaaS وPaaS وSaaS؟",
        answer:
          "IaaS (Infrastructure as a Service) يوفر بنية تحتية فقط. PaaS (Platform as a Service) يوفر منصة تطوير. SaaS (Software as a Service) يوفر تطبيقات جاهزة. كل منها يتطلب مستوى مختلف من المسؤولية الأمنية.",
      },
      {
        question: "ما هو نموذج المسؤولية المشتركة؟",
        answer:
          "هو إطار يحدد المسؤوليات الأمنية بين مزود الخدمة السحابية والعميل. مزود الخدمة مسؤول عن أمن البنية التحتية، بينما العميل مسؤول عن أمن البيانات والتطبيقات والإعدادات.",
      },
    ],
    "الاستجابة للحوادث": [
      {
        question: "ما هي خطوات الاستجابة للحوادث الأمنية؟",
        answer:
          "الخطوات هي: 1) الاكتشاف والتحديد، 2) الحصر والاحتواء، 3) القضاء على مصدر التهديد، 4) التعافي، 5) الدروس المستفادة. يجب توثيق كل خطوة بشكل مفصل.",
      },
      {
        question: "ما هو Incident Response Plan؟",
        answer:
          "هو خطة مكتوبة تحدد الإجراءات التي يجب اتخاذها عند حدوث حادثة أمنية. تتضمن الأدوار والمسؤوليات وطرق الاتصال وأدوات الاستجابة ومعايير التصنيف للحوادث.",
      },
      {
        question: "كيف تكتشف ثغرة في نظامك؟",
        answer:
          "يمكن اكتشاف الثغرات من خلال: مراقبة السجلات (Logs)، استخدام أنظمة كشف الاختراق (IDS)، فحوصات الأمان الدورية، تقارير البنتاغون، وأدوات مسح الثغرات الآلية.",
      },
    ],
  },
  mid: {
    "أمن الشبكات": [
      {
        question: "شرح عملية المصافحة الثلاثية (Three-Way Handshake) في TCP؟",
        answer:
          "هي عملية إنشاء اتصال TCP: 1) العميل يرسل SYN، 2) الخادم يرد بـ SYN-ACK، 3) العميل يرسل ACK. هذه العملية تضمن جاهزية الطرفين لتبادل البيانات بشكل موثوق.",
      },
      {
        question: "ما هو هجوم Man-in-the-Middle وكيف تمنعه؟",
        answer:
          "هو هجوم ي介入 فيه المهاجم بين طرفين متواصلين بدون علمهما. يُمنع باستخدام: تشفير SSL/TLS، التحقق من شهادات PKI، استخدام VPN، وبروتوكولات المصادقة القوية.",
      },
      {
        question: "ما هو هجوم DDoS وكيف تعمل حمايته؟",
        answer:
          "DDoS هو هجوم يُشل النظام بتوجيه حركة مرور ضخمة من مصادر متعددة. الحماية تشمل: استخدام خدمات حماية DDoS، توزيع الحمل، إعداد قواعد الجدار الناري، والمراقبة المستمرة.",
      },
      {
        question: "ما الفرق بين IDS وIPS؟",
        answer:
          "IDS (Intrusion Detection System) يراقب حركة المرور ويُبلغ بال威胁ات فقط. IPS (Intrusion Prevention System) يراقب ويمنع التهديدات تلقائياً. IPS فعال أكثر لأنه يمنع الهجمات قبل وصولها للنظام.",
      },
    ],
    "أمن الويب": [
      {
        question: "شرح ثغرة CSRF وكيف تتم حمايتها؟",
        answer:
          "CSRF هي ثغرة تجعل المستخدم المصادق عليه تنفيذ طلبات غير مقصودة. الحماية تتم باستخدام: توكن CSRF، التحقق من رأس Origin/Referer، وتعيين SameSite للكوكيز.",
      },
      {
        question: "ما هي ثغرة SSRF وكيف تستغل؟",
        answer:
          "SSRF هي ثغرة تسمح للمهاجم بجعل الخادم يرسل طلبات لخدمات داخلية. تستغل للوصول لخدمات الشبكة الداخلية أو الوصول للبيانات الحساسة أو تنفيذ أوامر على الخادم.",
      },
      {
        question: "كيف تؤمن تطبيق ويب من ثغرات Session Hijacking؟",
        answer:
          "الحماية تشمل: استخدام HTTPS، تعيين Secure وHttpOnly للكوكيز، تجديد معرف الجلسة بعد المصادقة، استخدام قياد الجلسة، ومراقبة الأنشطة المشبوهة.",
      },
      {
        question: "ما هي أفضل الممارسات لتأمين API؟",
        answer:
          "تشمل: استخدام OAuth 2.0 للمصادقة، تقييد معدل الطلبات (Rate Limiting)، التحقق من صحة الإدخال، استخدام HTTPS، تسجيل جميع الطلبات، وتطبيق مبدأ الامتياز الأدنى.",
      },
    ],
    "أمن السحابة": [
      {
        question: "كيف تأمين تطبيقات Kubernetes؟",
        answer:
          "يشمل: تقييد صلاحيات Pod Security Policy، استخدام Network Policies، تشفير البيانات المخزنة، إدارة الأسرار بأمان، فحوصات أمان الصور المخصصة، ومراقبة السجلات.",
      },
      {
        question: "ما هي أخطاء الإعداد الشائعة في AWS؟",
        answer:
          "تشمل: المجموعات الأمنية المفتوحة على المنفذ 0.0.0.0/0، تخزين S3 العام، مفاتيح AWS المكشوفة في الكود المصدري، عدم تفعيل التسجيل، واستخدام صلاحيات Root.",
      },
      {
        question: "ما هو IAM وكيف تأمينه؟",
        answer:
          "IAM (Identity and Access Management) يتحكم في الوصول للموارد السحابية. الأمان يشمل: تطبيق مبدأ الامتياز الأدنى، استخدام MFA، مراجعة الصلاحيات دورياً، وتجنب استخدام الحسابات الجذرية.",
      },
    ],
    "الاستجابة للحوادث": [
      {
        question: "كيف تقوم بال forensics رقمي؟",
        answer:
          "يشمل: حماية مسرح الجريمة الرقمي، جمع الأدلة بشكل مرتّب، صور للقرص الصلب، تحليل السجلات، تتبع سلاسل الادلة، وإعداد تقرير مفصل مع الحفاظ على سلامة الأدلة.",
      },
      {
        question: "ما هي أنواع الحوادث الأمنية الشائعة؟",
        answer:
          "تشمل: برامج الفدية (Ransomware)، تسريب البيانات، الوصول غير المصرح به، هجمات DDoS، التسلل، ثغرات البرمجيات، والاحتيال الإلكتروني.",
      },
      {
        question: "كيف تُنشئ خطة استجابة للحوادث فعّالة؟",
        answer:
          "تشمل: تشكيل فريق الاستجابة، تحديد الأدوار والمسؤوليات، إجراءات الاتصال، قائمة التحقق، أدوات الاستجابة، سيناريوهات محاكاة، ومراجعة وتحديث مستمر للخطة.",
      },
    ],
  },
  senior: {
    "أمن الشبكات": [
      {
        question: "شرح هجوم Zero-Day وكيف تتعامل معه؟",
        answer:
          "Zero-Day هي ثغرة مجهولة لم يتم اكتشافها بعد. التعامل معها يشمل: الحماية الإيجابية، المراقبة السلوكية، استخدام أنظمة كشف التسلل المتقدمة، وسرعة الاستجابة لتطبيقات التصحيح.",
      },
      {
        question: "كيف تصمم بنية أمنية لشبكة مؤسسية؟",
        answer:
          "يشمل: تقسيم الشبكة (Segmentation)، zones أمنية متعددة، المراقبة المركزية، التحكم في الوصول، التشفير، وخطط التعافي من الكوارث. يجب تطبيق مبدأ الثقة الصفرية.",
      },
      {
        question: "ما هي تقنيات الـ Deception في الأمن؟",
        answer:
          "تشمل: التخادع (Honeypots)، الح廄 المزيفة، البيانات الوهمية. تهدف إلى خداع المهاجمين وجمع معلومات عن تكتيكاتهم وتقنياتهم واكتشاف التسلل مبكراً.",
      },
    ],
    "أمن الويب": [
      {
        question: "كيف تفحص ثغرة SSRF متقدمة؟",
        answer:
          "يشمل: اختبار تجاوز الفلاتر، استخدام بروتوكولات مختلفة (Gopher, Dict)، استغلال دالة DNS Rebinding، التحقق من اختلاف الاستجابات، واستخدام Out-of-Band techniques.",
      },
      {
        question: "شرح ثغرة Prototype Pollution وكيف تستغل؟",
        answer:
          "هي ثغرة في JavaScript تسمح بتعديل كائنات prototype. تستغل لتثبيت خصائص خبيثة في الكائنات الأساسية، مما قد يؤدي لـ XSS أو RCE. الحماية تشمل التحقق من الإدخال واستخدام Object.freeze().",
      },
      {
        question: "كيف تصمم نظام مصادقة متعدد العوامل آمن؟",
        answer:
          "يشمل: استخدام FIDO2/WebAuthn، تطبيق MFA على جميع الحسابات، مفاتيح احتياطية، الحماية من هجمات التثبيت (Phishing)، وتجنّب SMS كوسيلة مصادقة وحيدة.",
      },
    ],
    "أمن السحابة": [
      {
        question: "كيف تكتشف اختراقاً في بيئة سحابية؟",
        answer:
          "يشمل: مراقبة سجلات CloudTrail، تحليل أنماط الوصول المشبوهة، استخدام Cloud Security Posture Management، فحوصات التوافق، ومراقبة تغييرات الإعدادات الأمنية.",
      },
      {
        question: "ما هي أفضل الممارسات لتأمين Serverless؟",
        answer:
          "تشمل: تقييد صلاحيات الدوال، استخدام Secrets Manager، تأمين الاعتماديات، مراقبة الأداء والتوظيف، استخدام WAF، وتطبيق مبدأ Least Privilege بشكل صارم.",
      },
      {
        question: "كيف تدار أمان متعدد السحابات (Multi-Cloud)?",
        answer:
          "يشمل: استخدام أداة إدارة أمن موحدة، توحيد السياسات، المراقبة المركزية، إدارة الهوية المركزة، والامتثال للوائح. يجب تجنب vendor lock-in أمنياً.",
      },
    ],
    "الاستجابة للحوادث": [
      {
        question: "كيف تدير حادثة اختراق مؤسسي كبير؟",
        answer:
          "يشمل: تفعيل خطة الاستجابة، إبلاغ الإدارة والlawyers، التواصل مع الجهات الرقابية، حماية الأدلة، التعافي المنهجي، التواصل العام، والدروس المستفادة.",
      },
      {
        question: "ما هي أدوات Threat Intelligence وكيف تستخدمها؟",
        answer:
          "تشمل: MITRE ATT&CK، STIX/TAXII، أوامر IOC. تُستخدم لتحسين الكشف، فهم تكتيكات المهاجمين، وتقييم التهديدات. يجب دمجها في أنظمة SIEM والجدار الناري.",
      },
      {
        question: "كيف تبني ثقافة أمنية مؤسسية؟",
        answer:
          "يشمل: التدريب المستمر، سيناريوهات المحاكاة، تقييم الأداء، المكافآت، التكامل مع عمليات DevSecOps، والتواصل المستمر حول التهديدات والأحداث الأمنية.",
      },
    ],
  },
};

const levelLabels: Record<Level, { label: string; color: string; icon: string }> = {
  junior: { label: "مبتدئ (Junior)", color: "bg-green-100 text-green-800", icon: "🌱" },
  mid: { label: "متوسط (Mid)", color: "bg-blue-100 text-blue-800", icon: "🔧" },
  senior: { label: "متقدم (Senior)", color: "bg-purple-100 text-purple-800", icon: "🚀" },
};

export default function InterviewQuestionsPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>("junior");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(questionsByLevel[selectedLevel]);
  const currentQuestions = questionsByLevel[selectedLevel];

  const toggleQuestion = (key: string) => {
    setExpandedQuestion(expandedQuestion === key ? null : key);
  };

  const filteredCategories = selectedCategory
    ? { [selectedCategory]: currentQuestions[selectedCategory] }
    : currentQuestions;

  const totalQuestions = Object.values(currentQuestions).reduce(
    (sum, qs) => sum + qs.length,
    0
  );

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-l from-emerald-900 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            أسئلة المقابلات الوظيفية
          </h1>
          <p className="text-xl text-center text-emerald-100 max-w-3xl mx-auto">
            استعد لمقابلات العمل في مجال الأمن السيبراني مع أكثر من 30 سؤالاً
            وإجابة تفصيلية
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* اختيار المستوى */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {(Object.keys(levelLabels) as Level[]).map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setSelectedCategory(null);
                  setExpandedQuestion(null);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedLevel === level
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                }`}
              >
                <span className="ml-2">{levelLabels[level].icon}</span>
                {levelLabels[level].label}
              </button>
            ))}
          </div>
          <p className="text-center text-gray-600">
            عدد الأسئلة: <span className="font-bold text-emerald-600">{totalQuestions}</span> سؤال
          </p>
        </section>

        {/* اختيار التصنيف */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
              }`}
            >
              جميع التصنيفات
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* الأسئلة */}
        <section className="mb-12">
          {Object.entries(filteredCategories).map(([category, qs]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="ml-3">📋</span>
                {category}
                <span className="mr-3 text-sm font-normal text-gray-500">
                  ({qs.length} أسئلة)
                </span>
              </h2>
              <div className="space-y-3">
                {qs.map((q, idx) => {
                  const key = `${category}-${idx}`;
                  const isExpanded = expandedQuestion === key;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(key)}
                        className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-medium text-gray-800">
                            {q.question}
                          </span>
                        </div>
                        <span
                          className={`text-gray-400 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <div className="pt-4 pr-11">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {q.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* نصائح للمقابلة */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            نصائح للنجاح في المقابلات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                ابحث عن السياق
              </h3>
              <p className="text-gray-600">
                لا تحفظ الإجابات فحسب، بل افهم المفاهيم الأساسية وكيف تُطبّق
                في بيئات العمل الحقيقية.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                تدرب عملياً
              </h3>
              <p className="text-gray-600">
                استخدم منصات مثل TryHackMe وHackTheBox لتطبيق ما تعلمته عملياً
                قبل المقابلة.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                كن على اطلاع
              </h3>
              <p className="text-gray-600">
                تابع آخر التهديدات والأحداث الأمنية. المقابلون يقدرون المرشحين
                الذين يظهرون شغفهم بمجال الأمن.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
