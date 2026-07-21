"use client";

import React, { useState, useMemo } from "react";

interface FAQItem {
  question: string;
  answer: string;
  tags: string[];
}

interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: "general",
    title: "أسئلة عامة",
    icon: "❓",
    color: "blue",
    questions: [
      {
        question: "ما هو أمن المواقع الإلكترونية؟",
        answer:
          "أمن المواقع الإلكترونية هو مجموعة من الممارسات والتقنيات المستخدمة لحماية مواقع الويب والتطبيقات من الهجمات والثغرات الأمنية. يشمل ذلك حماية البيانات والأنظمة من الوصول غير المصرح به، ومنع الاختراقات، وضمان سرية وسلامة وتوافر المعلومات. يعتمد أمن الويب على عدة طبقات تشمل الأمان على مستوى الشبكة، ونظام التشغيل، وقاعدة البيانات، والتطبيق نفسه.",
        tags: ["أمن", "مواقع", "حماية"],
      },
      {
        question: "لماذا أمن المواقع الإلكترونية مهم؟",
        answer:
          "أمن المواقع الإلكترونية مهم لأسباب عديدة: حماية بيانات المستخدمين الشخصية والمصرحية، الامتثال للقوانين واللوائح مثل GDPR وPDPA، الحفاظ على سمعة المؤسسة، منع الخسائر المالية الناتجة عن الاختراقات، ضمان استمرارية الأعمال، وحماية الملكية الفكرية. في ظل التحول الرقمي المتسارع، أصبح كل موقع إلكتروني هدفاً محتملاً للمهاجمين.",
        tags: ["أهمية", "أمان", "بيانات"],
      },
      {
        question: "ما هي أكثر الثغرات الأمنية شيوعاً في مواقع الويب؟",
        answer:
          "وفقاً لـ OWASP Top 10، أكثر الثغرات شيوعاً تشمل: Broken Access Control (التحكم في الوصول المكسور)، Cryptographic Failures (فشل التشفير)، Injection (حقن البيانات مثل SQL Injection وXSS)، Insecure Design (التصميم غير الآمن)، Security Misconfiguration (الإعدادات الأمنية الخاطئة)، وVulnerable Components (المكونات الهشة). هذه الثغرات تستغل بشكل متكرر من قبل المهاجمين لاستهداف مواقع الويب.",
        tags: ["ثغرات", "OWASP", "أشهر"],
      },
      {
        question: "ما هو اختبار الاختراق (Penetration Testing)؟",
        answer:
          "اختبار الاختراق هو عملية اختبار أمني يحاكي فيها المتخصص هجمات المهاجمين الحقيقيين لاكتشاف الثغرات واستغلالها بشكل واعي ومسوح. الهدف هو تقييم أمن النظام والكشف عن نقاط الضعف قبل أن يستغلها المهاجمون الفعليون. يجب أن يُجرى اختبار الاختراق بتصريح رسمي من مالك النظام، ويجب توثيق جميع خطواته ونتائجه في تقارير مفصلة.",
        tags: ["اختبار", "اختراق", "Penetration Testing"],
      },
      {
        question: "ما الفرق بين اختبار الاختراق والاستبيان الأمني؟",
        answer:
          "اختبار الاختراق (Penetration Testing) يشمل محاكاة هجمات حقيقية واختبار قدرة النظام على صدها، بينما الاستبيان الأمني (Security Audit) هو تقييم شامل للمعايير والسياسات والإجراءات الأمنية المطبقة. اختبار الاختراق أكثر تركيزاً على اكتشاف الثغرات الفنية، بينما الاستبيان يشمل الجوانب التنظيمية والإجراءية أيضاً.",
        tags: ["اختبار اختراق", "استبيان", "مقارنة"],
      },
      {
        question: "هل أمن المواقع ضروري للمشاريع الصغيرة؟",
        answer:
          "نعم، أمن المواقع ضروري لجميع الأحجام سواء كانت مشاريع صغيرة أو مؤسسات كبيرة. المشاريع الصغيرة غالباً ما تكون هدفاً أسهل للمهاجمين لأنها تفتقر إلى الموارد الأمنية الكافية. كما أن خسارة بيانات العملاء أو التعطل يمكن أن يكون كارثياً للمشروع الصغير. بدأب أمني بسيط يمكن أن يحمي المشروع من أخطار كثيرة.",
        tags: ["مشاريع صغيرة", "ضرورة", "أمان"],
      },
      {
        question: "ما هي الشهادات المتاحة في مجال أمن الويب؟",
        answer:
          "هناك عدة شهادات معتمدة في مجال أمن الويب تشمل: CEH (Certified Ethical Hacker) من EC-Council، CompTIA Security+، OSCP (Offensive Security Certified Professional)، GWAPT (GIAC Web Application Penetration Tester) من SANS، وOSWE (Offensive Security Web Expert). هذه الشهادات تثبت الكفاءة والخبرة في مجال أمن تطبيقات الويب.",
        tags: ["شهادات", "احتراف", "تعلم"],
      },
    ],
  },
  {
    id: "technical",
    title: "أسئلة تقنية",
    icon: "🔧",
    color: "green",
    questions: [
      {
        question: "ما هي SQL Injection وكيف تعمل؟",
        answer:
          "SQL Injection (حقن SQL) هي ثغرة أمنية تسمح للمهاجم بإدخال أو تعديل استعلام SQL في تطبيق الويب. عندما يقوم التطبيق بإدخال البيانات المدخلة من المستخدم مباشرة في استعلام SQL بدون تنظيف كافٍ، يمكن للمهاجم التلاعب بالاستعلام للحصول على بيانات غير مصرح بها أو حذفها أو تعديلها. على سبيل المثال، يمكن للمهاجم إدخال ' OR '1'='1 في حقل تسجيل الدخول لتخطي المصادقة.",
        tags: ["SQL Injection", "حقن", "قاعدة بيانات"],
      },
      {
        question: "ما هي Cross-Site Scripting (XSS) وأنواعها؟",
        answer:
          "Cross-Site Scripting (XSS) هي ثغرة تسمح للمهاجم بحقن سكريبتات خبيثة في صفحات الويب التي يعرضها المستخدمون الآخرون. هناك ثلاثة أنواع رئيسية: Reflected XSS حيث ينعكس السكريبت الخبيث من الخادم، Stored XSS حيث يُخزّن السكريبت في قاعدة البيانات، وDOM-based XSS حيث يُعالج السكريبت في جانب العميل باستخدام DOM. هذه الثغرات يمكن أن تُستخدم لسرقة الكوكيز أو جلسات المستخدمين.",
        tags: ["XSS", "سكريبتات", "حقن"],
      },
      {
        question: "ما هو CSRF (Cross-Site Request Forgery)؟",
        answer:
          "CSRF هي ثغرة تسمح للمهاجم بإجبار المستخدم على تنفيذ طلبات غير مقصودة على تطبيق الويب الذي يكون مسجلاً فيه. على سبيل المثال، يمكن للمهاجم إنشاء صفحة تحتوي على نموذج مخفي يرسل طلب نقل أموال إلى بنك المستخدم. يتم استخدام هذه الثغرة عن طريق إرسال طلبات HTTP مع الكوكيز المخزنة تلقائياً في المتصفح.",
        tags: ["CSRF", "طلب", "مزيف"],
      },
      {
        question: "ما هي SSRF (Server-Site Request Forgery)؟",
        answer:
          "SSRF هي ثغرة تسمح للمهاجم بإجبار الخادم على إرسال طلبات HTTP إلى موارد داخلية أو خارجية غير مقصودة. يمكن استخدامها للاختراق من خلال جدار الحماية (Firewall)، الوصول إلى الخدمات الداخلية، أو حتى تشغيل أوامر على الخادم في بعض الحالات. تحدث هذه الثغرة عندما يقبل التطبيق روابط من المستخدم ويطلبها دون تحقق كافٍ.",
        tags: ["SSRF", "خادم", "طلبات"],
      },
      {
        question: "ما هو Clickjacking وكيف نمنعه؟",
        answer:
          "Clickjacking (الخداع بالنقر) هو تقنية يخفي فيها المهاجم عناصر واجهة المستخدم غير المرئية خلف صفحة شرعية يتفاعل معها المستخدم. يمكن للمهاجم التلاعب بالمستخدم للنقر على أزرار أو روابط غير مرئية. لمنعه، يمكن استخدام: X-Frame-Options header لإزالة الإطارات (iframes)، Content Security Policy (CSP)، وتعليمات X-Content-Type-Options.",
        tags: ["Clickjacking", "خداع", "نقر"],
      },
      {
        question: "ما هي أنظمة إدارة الأخطاء (Error Handling) الآمنة؟",
        answer:
          "الخطأ في معالجة الأخطاء يمكن أن يكشف معلومات حساسة للمهاجمين. يجب تطبيق: عرض رسائل أخطاء عامة بدون تفاصيل تقنية، تسجيل الأخطاء بشكل آمن بدون معلومات حساسة، استخدام صفحات أخطاء مخصصة، وتجنب عرض معلومات تصحيح الأخطاء في بيئة الإنتاج. كما يجب التأكد من أن رسائل الخطأ لا تكشف هيكل قاعدة البيانات أو مسارات الملفات أو إصدارات البرامج.",
        tags: ["أخطاء", "رسائل", "معلومات"],
      },
      {
        question: "ما هي أفضل ممارسات تشفير البيانات؟",
        answer:
          "أفضل ممارسات تشفير البيانات تشمل: استخدام خوارزميات تشفير قوية مثل AES-256 وRSA، تشفير البيانات أثناء النقل (TLS/SSL) وأثناء التخزين، إدارة المفاتيح بشكل آمن، عدم تخزين المفاتيح مع البيانات المشفرة، استخدام التوقيع الرقمي للتحقق من سلامة البيانات، وتحديث خوارزميات التشفير باستمرار لتجنب القديمة منها.",
        tags: ["تشفير", "خوارزميات", "حماية"],
      },
    ],
  },
  {
    id: "tools",
    title: "أسئلة حول الأدوات",
    icon: "🛠️",
    color: "purple",
    questions: [
      {
        question: "ما هي أفضل أدوات فحص أمن المواقع الإلكترونية؟",
        answer:
          "هناك عدة أدوات ممتازة لفحص أمن المواقع تشمل: OWASP ZAP (مجانية ومفتوحة المصدر)، Burp Suite (احترافية مع نسخة مجانية)، Nikto (لفحص الخوادم)، SQLMap (لاكتشاف SQL Injection)، XSStrike (لاكتشاف XSS)، وNmap (لفحص الشبكات). اختيار الأداة يعتمد على نوع الفحص المطلوب ومستوى الخبرة والميزانية المتاحة.",
        tags: ["أدوات", "فحص", "مواقع"],
      },
      {
        question: "كيف أبدأ في استخدام OWASP ZAP؟",
        answer:
          "للبدء مع OWASP ZAP: 1) قم بتحميل الأداة من الموقع الرسمي، 2) قم بتثبيتها وتشغيلها، 3) اضبط إعدادات البروكسي في المتصفح (localhost:8080)، 4) ابدأ بالمسح الأوتماتيكي (Automated Scan)، 5) استخدم Quick Start لفحص سريع، 6) استكشف التقارير المفصلة التي توفرها الأداة. ZAP توفر واجهة سهلة الاستخدام ومكتبة واسعة من الإضافات.",
        tags: ["OWASP ZAP", "بدء", "تثبيت"],
      },
      {
        question: "ما هي Burp Suite ولماذا تعتبر الأفضل؟",
        answer:
          "Burp Suite هي أداة احترافية من PortSwigger لاختبار اختراق تطبيقات الويب. تعتبر الأفضل لأنها توفر: Proxy قوي لاعتراض الطلبات، Scanner أوتوماتيكي لاكتشاف الثغرات، Intruder للاختبار المتكرر، Repeater لتعديل الطلبات يدوياً، وSpider لاكتشاف الروابط. النسخة المجانية (Community) توفر ميزات أساسية، بينما النسخة Professional توفر ميزات متقدمة.",
        tags: ["Burp Suite", "احترافي", "PortSwigger"],
      },
      {
        question: "هل يمكنني استخدام هذه الأدوات بشكل قانوني؟",
        answer:
          "نعم، يمكنك استخدام هذه الأدوات بشكل قانوني شريطة: الحصول على تصريح رسمي من مالك النظام قبل الفحص، استخدام الأدوات على أنظمة خاصة بك فقط، عدم استخدامها للاختراق غير المصرح به، اتباع القوانين المحلية والدولية المتعلقة بالأمن السيبراني. اختبار الاختراق بدون تصريح يعتبر جريمة يعاقب عليها القانون في معظم الدول.",
        tags: ["قانوني", "تصريح", "استخدام"],
      },
      {
        question: "ما الفرق بين الأدوات المجانية والمدفوعة؟",
        answer:
          "الأدوات المجانية مثل OWASP ZAP وSQLMap توفر ميزات أساسية جيدة للفحص، بينما الأدوات المدفوعة مثل Burp Suite Professional توفر ميزات متقدمة مثل: فحص أوتوماتيكي أكثر دقة، تقارير احترافية، دعم فني متخصص، تحديثات مستمرة، وتكامل مع أنظمة أخرى. للمبتدئين، الأدوات المجانية كافية للبدء، بينما المحترفون يحتاجون الأدوات المدفوعة لفعالية أعلى.",
        tags: ["مجاني", "مدفوع", "مقارنة"],
      },
      {
        question: "كيف أحضر بيئة اختبار آمنة للتدريب؟",
        answer:
          "لإعداد بيئة اختبار آمنة: 1) استخدم Virtual Machines مثل VirtualBox أو VMware، 2) ثبّت distributions أمنية مثل Kali Linux أو Parrot OS، 3) استخدم بيئات تعليمية مثل DVWA أو HackTheBox أو TryHackMe، 4) أنشئ شبكة معزولة باستخدام NAT أو Host-Only، 5) لا تتصل بالشبكات الحقيقية أثناء التدريب. هذه البيئات توفر تطبيقات مصابة بثغرات للتدريب بشكل قانوني.",
        tags: ["بيئة اختبار", "تدريب", "Vm"],
      },
      {
        question: "ما هي أفضل الممارسات لاستخدام أدوات الفحص؟",
        answer:
          "أفضل الممارسات تشمل: تحديث الأدوات باستمرار للحصول على أحدث قواعد بيانات الثغرات، استخدام Proxy لاعتراق الطلبات وفهمها، البدء بالفحص الأوتماتيكي ثم الفحص اليدوي، توثيق جميع النتائج في تقارير مفصلة، استخدام VPN أو شبكة معزولة أثناء الفحص، عدم استخدام أدوات الفحص على أنظمة بدون تصريح، وتجربة الأدوات على بيئة معزولة أولاً.",
        tags: ["ممارسات", "تحديث", "توثيق"],
      },
    ],
  },
  {
    id: "learning",
    title: "أسئلة حول التعلم",
    icon: "📚",
    color: "orange",
    questions: [
      {
        question: "كيف أبدأ في تعلم أمن الويب من الصفر؟",
        answer:
          "للبدء في تعلم أمن الويب: 1) تعلم أساسيات البرمجة (HTML, CSS, JavaScript, Python)، 2) افهم كيف تعمل بروتوكولات الويب (HTTP, HTTPS, DNS)، 3) تعلم أساسيات قواعد البيانات وSQL، 4) ادرس شبكات الكمبيوتر الأساسية، 5) ابدأ بتعلم OWASP Top 10، 6) تدرّب على بيئات مثل HackTheBox أو TryHackMe، 7) احصل على شهادة CEH أو CompTIA Security+.",
        tags: ["تعلم", "مبتدئ", "مسار"],
      },
      {
        question: "ما هي أفضل المصادر التعليمية المجانية؟",
        answer:
          "هناك مصادر مجانية ممتازة تشمل: PortSwigger Web Security Academy (أكاديمية شاملة ومجانية)، OWASP Learning Resources، Cybrary (دورات مجانية)، HackerOne (تحديات Bug Bounty)، TryHackMe (بيئات تدريبية)، HackTheBox (تحديات عملية)، SANS Cyber Aces (دورات أساسية)، وقناة LiveOverflow على YouTube للدروس العملية.",
        tags: ["مصادر", "مجاني", "تعلم"],
      },
      {
        question: "ما هو Bug Bounty وكيف أشارك فيه؟",
        answer:
          "Bug Bounty هو برنامج تابع للمؤسسات يدعو فيه المطورين والباحثين الأمنيين لاكتشاف وإبلاغ الثغرات مقابل مكافآت مالية. للبدء: 1) تعلم أساسيات أمن الويب، 2) سجّل في منصات مثل HackerOne أو Bugcrowd، 3) ابدأ بالبرامج الصغيرة، 4) اكتب تقارير واضحة ومفصلة، 5) تابع قواعد كل برنامج. بعض البرامج توفر مكافآت تبدأ من 100 دولار وقد تصل إلى آلاف الدولارات.",
        tags: ["Bug Bounty", "مكافآت", "اكتشاف"],
      },
      {
        question: "كم من الوقت يستغرق إتقان أمن الويب؟",
        answer:
          "لا يوجد وقت محدد لإتقان أمن الويب لأنه مجال يتغير باستمرار. بشكل عام: المبتدئ يحتاج 3-6 أشهر لفهم الأساسيات، المتوسط يحتاج 1-2 سنة للحصول على مهارات عملية، والمتقدم يحتاج 3-5 سنوات أو أكثر للخبرة الكاملة. المهم هو الاستمرارية في التعلم والتدريب العملي ومشاركة المجتمعات الأمنية.",
        tags: ["وقت", "إتقان", "خبرة"],
      },
      {
        question: "هل أحتاج خلفية برمجية لتعلم أمن الويب؟",
        answer:
          "خلفية برمجية مفيدة لكنها ليست شرطاً مطلقاً. يمكن البدء بتعلم أساسيات البرمجة مع أمن الويب بشكل متوازٍ. однако، فهم لغات البرمجة مثل JavaScript وPython وSQL يسهّل فهم الثغرات وكيفية استغلالها. يُنصح بتعلم أساسيات HTML/CSS وJavaScript أولاً لأنها الأساس لفهم تطبيقات الويب.",
        tags: ["خلفية", "برمجة", "lernen"],
      },
      {
        question: "ما هي الخطوات العملية لتطوير مهاراتي؟",
        answer:
          "لتطوير مهاراتك بشكل عملي: 1) شارك في Bug Bounty programs على HackerOne أو Bugcrowd، 2) تدرّب على HackTheBox وTryHackMe يومياً، 3) ادرس تحليل ثغرات حقيقية في bug reports، 4) أنشئ مشاريع أمنية شخصية، 5) شارك في CTF competitions، 6) اكتب مدونة عن تجاربك، 7) انضم لمجتمعات الأمن السيبراني المحلية والعالمية.",
        tags: ["تطوير", "ممارسة", "مهارات"],
      },
      {
        question: "ما هي المهارات المطلوبة لمحترف أمن الويب؟",
        answer:
          "المهارات المطلوبة تشمل: مهارات البرمجة بلغات متعددة، فهم بروتوكولات الويب وآليات عملها، معرفة الثغرات الشائعة وطرق استغلالها، مهارات البحث والاستكشاف، القدرة على كتابة التقارير الفنية، معرفة أنظمة التشغيل特别是 Linux، فهم قواعد البيانات، ومهارات الاتصال والتواصل. السمعة في مجتمع الأمن السيبراني مهمة جداً.",
        tags: ["مهارات", "محترف", "مؤهلات"],
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-500",
    hover: "hover:bg-blue-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-500",
    hover: "hover:bg-green-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-500",
    hover: "hover:bg-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-500",
    hover: "hover:bg-orange-100",
  },
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = faqData.flatMap((cat) =>
      cat.questions.map((_, idx) => `${cat.id}-${idx}`)
    );
    setExpandedItems(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return faqData;

    const query = searchQuery.toLowerCase();
    return faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query) ||
            q.tags.some((tag) => tag.toLowerCase().includes(query))
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchQuery]);

  const totalQuestions = faqData.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );
  const filteredCount = filteredData.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-l from-indigo-900 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">أسئلة متكررة</h1>
          <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
            إجابات شاملة على الأسئلة الشائعة حول أمن المواقع الإلكترونية
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-indigo-200">
            <span>总计 {totalQuestions} سؤال</span>
            <span>•</span>
            <span>{faqData.length} فئات</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن سؤال... (مثال: SQL Injection، اختبار الاختراق، أدوات)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-500 text-center">
                عُثر على {filteredCount} من {totalQuestions} سؤال
              </p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              جميع الفئات
            </button>
            {faqData.map((cat) => {
              const colors = colorMap[cat.color];
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat.id ? null : cat.id)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? `${colors.bg} ${colors.text} border-2 ${colors.border}`
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.icon} {cat.title} ({cat.questions.length})
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-8 flex justify-center gap-4">
          <button
            onClick={expandAll}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            توسيع الكل
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            طي الكل
          </button>
        </section>

        <div className="space-y-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-500">
                لم نجد أسئلة تطابق بحثك. جرّب كلمات مختلفة أو تصفح الفئات.
              </p>
            </div>
          ) : (
            filteredData.map((category) => {
              const colors = colorMap[category.color];
              return (
                <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div
                    className={`${colors.bg} px-6 py-4 border-r-4 ${colors.border} cursor-pointer`}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.id ? null : category.id
                      )
                    }
                  >
                    <h2 className={`text-2xl font-bold ${colors.text} flex items-center gap-3`}>
                      <span className="text-2xl">{category.icon}</span>
                      {category.title}
                      <span className="text-sm font-normal opacity-70">
                        ({category.questions.length} أسئلة)
                      </span>
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {category.questions.map((item, index) => {
                      const itemId = `${category.id}-${index}`;
                      const isExpanded = expandedItems.has(itemId);

                      return (
                        <div key={index} className={`${colors.hover} transition-colors`}>
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-6 py-4 text-right flex items-center justify-between gap-4"
                          >
                            <span className="font-semibold text-gray-800 text-lg leading-relaxed">
                              {item.question}
                            </span>
                            <span
                              className={`transform transition-transform duration-200 text-gray-500 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            >
                              ▼
                            </span>
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="px-6 pb-4">
                              <div className="bg-gray-50 rounded-lg p-4 border-r-4 border-gray-300">
                                <p className="text-gray-700 leading-relaxed text-base">
                                  {item.answer}
                                </p>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {item.tags.map((tag, tagIdx) => (
                                  <span
                                    key={tagIdx}
                                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <section className="mt-12 bg-gradient-to-l from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
          <div className="text-center">
            <span className="text-4xl mb-4 block">💬</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              إذا لم تجد إجابة في هذه الصفحة، يرجى التواصل معنا وسن竭竭
              للإجابة على سؤالك في أقرب وقت ممكن.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <span>✉️</span>
                تواصل معنا
              </a>
              <a
                href="/report"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                <span>📝</span>
                أرسل سؤالك
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">مصادر مفيدة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://owasp.org/www-project-top-ten/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">🌐</span>
              <div>
                <div className="font-semibold text-gray-800">OWASP Top 10</div>
                <div className="text-sm text-gray-500">أكثر الثغرات أماناً في تطبيقات الويب</div>
              </div>
            </a>
            <a
              href="https://portswigger.net/web-security"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">🎓</span>
              <div>
                <div className="font-semibold text-gray-800">PortSwigger Academy</div>
                <div className="text-sm text-gray-500">أكاديمية تعليمية شاملة ومجانية</div>
              </div>
            </a>
            <a
              href="https://tryhackme.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">💻</span>
              <div>
                <div className="font-semibold text-gray-800">TryHackMe</div>
                <div className="text-sm text-gray-500">بيئات تدريبية تفاعلية</div>
              </div>
            </a>
            <a
              href="https://www.hackthebox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">📦</span>
              <div>
                <div className="font-semibold text-gray-800">HackTheBox</div>
                <div className="text-sm text-gray-500">تحديات اختراق واقعية</div>
              </div>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
