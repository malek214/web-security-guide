export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

export interface QuizData {
  [slug: string]: QuizQuestion[]
}

export const quizData: QuizData = {
  'sql-injection': [
    {
      question: 'ما هي ثغرة SQL Injection؟',
      options: [
        'ثغرة تسمح بتنفيذ أوامر نظام التشغيل على الخادم',
        'ثغرة تسمح بإدخال استعلامات SQL خبيثة في تطبيقات الويب',
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بتجاوز المصادقة متعددة العوامل',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تكتشف ثغرة SQL Injection؟',
      options: [
        'باستخدام أدوات مثل SQLMap و Burp Suite',
        'باستخدام برامج مكافحة الفيروسات فقط',
        'بفحص ملفات النظام يدوياً',
        'باستخدام ماسح ضوئي للشبكة',
      ],
      correctIndex: 0,
    },
    {
      question: 'ما هي أفضل طريقة لمنع SQL Injection؟',
      options: [
        'استخدام كلمات مرور قوية',
        'استخدام Prepared Statements و Parameterized Queries',
        'إخفاء رسائل الخطأ فقط',
        'تشفير قاعدة البيانات بالكامل',
      ],
      correctIndex: 1,
    },
    {
      question: 'أي من הבאים هو Payload شائع لاختبار SQL Injection؟',
      options: [
        '<script>alert(1)</script>',
        "' OR '1'='1",
        "eval(base64_decode('...'))",
        "../../etc/passwd",
      ],
      correctIndex: 1,
    },
  ],
  'xss': [
    {
      question: 'ما هي ثغرة XSS (Cross-Site Scripting)؟',
      options: [
        'ثغرة تسمح بحقن ملفات CSS خبيثة',
        'ثغرة تسمح بحقن سكريبتات ضارة في صفحات الويب',
        'ثغرة تسمح بسرقة اتصال SSL',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأنواع الرئيسية لثغرات XSS؟',
      options: [
        'Reflected و Stored و DOM-based',
        'Internal و External و Hybrid',
        'Static و Dynamic و Temporary',
        'Local و Remote و Cloud',
      ],
      correctIndex: 0,
    },
    {
      question: 'كيف تمنع ثغرات XSS؟',
      options: [
        'باستخدام جدران الحماية فقط',
        'بتنقية المدخلات وتأمين عرض المخرجات',
        'باستخدام بروتوكول HTTP فقط',
        'بإخفاء شريط العنوان',
      ],
      correctIndex: 1,
    },
    {
      question: 'أي من הבאים يُستخدم لاكتشاف XSS؟',
      options: [
        'Nmap',
        'XSStrike',
        'SQLMap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'csrf': [
    {
      question: 'ما هي ثغرة CSRF (Cross-Site Request Forgery)؟',
      options: [
        'ثغرة تسمح بحقن SQL في نماذج تسجيل الدخول',
        'ثغرة تسمح ب Executing طلبات غير مصرح بها نيابة عن المستخدم',
        'ثغرة تسمح بسرقة ملفات المستخدمين',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تعمل هجمات CSRF؟',
      options: [
        'من خلال إرسال بريد إلكتروني مخادع فقط',
        'من خلال إجبار المتصفح على إرسال طلبات بتوكنات المستخدم',
        'من خلال كسر تشفير HTTPS',
        'من خلال حقن سكريبتات في عنوان URL',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هو أفضل حماية ضد CSRF؟',
      options: [
        'استخدام كلمة مرور قوية',
        'استخدام CSRF Tokens في جميع النماذج',
        'تعطيل JavaScript في المتصفح',
        'استخدام بريد إلكتروني آمن',
      ],
      correctIndex: 1,
    },
  ],
  'ssrf': [
    {
      question: 'ما هي ثغرة SSRF (Server-Side Request Forgery)؟',
      options: [
        'ثغرة تسمح للمهاجم ب Executing طلبات من الخادم إلى موارد داخلية',
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بحقن SQL في خادم الويب',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 0,
    },
    {
      question: 'كيف تكتشف ثغرة SSRF؟',
      options: [
        'باستخدام ماسح ضوئي للشبكة فقط',
        'باختبار URLs المدخلة وفحص الطلبات الصادرة من الخادم',
        'باستخدام برامج مكافحة الفيروسات',
        'بفحص ملفات السجل يدوياً',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة المتخصصة في استغلال SSRF؟',
      options: [
        'SQLMap',
        'SSRFmap',
        'Hydra',
        'Nmap',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة SSRF؟',
      options: [
        'باستخدام قوائم السماح للعناوين IP',
        'بتشفير جميع الطلبات فقط',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 0,
    },
  ],
  'command-injection': [
    {
      question: 'ما هي ثغرة Command Injection؟',
      options: [
        'ثغرة تسمح بحقن سكريبتات في صفحة الويب',
        'ثغرة تسمح بتنفيذ أوامر نظام التشغيل على الخادم',
        'ثغرة تسمح بسرقة ملفات قاعدة البيانات',
        'ثغرة تسمح بتجاوز المصادقة',
      ],
      correctIndex: 1,
    },
    {
      question: 'أي من הבאים هو Payload شائع لـ Command Injection؟',
      options: [
        "' OR '1'='1",
        "; cat /etc/passwd",
        "<script>alert(1)</script>",
        "../../etc/passwd",
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة الرئيسية لاكتشاف Command Injection؟',
      options: [
        'Nmap',
        'Commix',
        'SQLMap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'nosql-injection': [
    {
      question: 'ما هي ثغرة NoSQL Injection؟',
      options: [
        'ثغرة تؤثر على قواعد البيانات العلائقية فقط',
        'ثغرة تسمح بحقن استعلامات في قواعد البيانات غير العلائقية',
        'ثغرة تسمح بسرقة ملفات النظام',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'أي من قواعد البيانات يتعرض لثغرة NoSQL Injection؟',
      options: [
        'Oracle و MySQL فقط',
        'MongoDB و CouchDB',
        'PostgreSQL فقط',
        'SQL Server فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة المتخصصة في اكتشاف NoSQL Injection؟',
      options: [
        'SQLMap',
        'NoSQLMap',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'xxe': [
    {
      question: 'ما هي ثغرة XXE (XML External Entity)؟',
      options: [
        'ثغرة تسمح بحقن HTML في صفحات الويب',
        'ثغرة تسمح بحقن كيانات XML خارجية للوصول للملفات',
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة XXE؟',
      options: [
        'بتشفير XML فقط',
        'بعطيل تحليل الكيانات الخارجية في مكتبات XML',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة المتخصصة في استغلال XXE؟',
      options: [
        'SQLMap',
        'XXEinjector',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'ssti': [
    {
      question: 'ما هي ثغرة SSTI (Server-Side Template Injection)؟',
      options: [
        'ثغرة تسمح بحقن قوالب في صفحات العميل',
        'ثغرة تسمح بحقن قوالب في خادم الويب مما يؤدي لتنفيذ أوامر',
        'ثغرة تسمح بسرقة ملفات قاعدة البيانات',
        'ثغرة تسمح بتجاوز المصادقة',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تكتشف ثغرة SSTI؟',
      options: [
        'بإدخال تعبيرات حسابية مثل {{7*7}} وفحص الناتج',
        'باستخدام ماسح ضوئي للشبكة فقط',
        'بفحص ملفات السجل يدوياً',
        'باستخدام برامج مكافحة الفيروسات',
      ],
      correctIndex: 0,
    },
    {
      question: 'ما هي الأداة الرئيسية لاكتشاف SSTI؟',
      options: [
        'SQLMap',
        'Tplmap',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'lfi': [
    {
      question: 'ما هي ثغرة LFI (Local File Inclusion)؟',
      options: [
        'ثغرة تسمح بسرقة ملفات من الخادم المحلي',
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 0,
    },
    {
      question: 'ما هو Payload الشائع لـ LFI؟',
      options: [
        "<script>alert(1)</script>",
        "' OR '1'='1",
        "../../etc/passwd",
        "eval(base64_decode('...'))",
      ],
      correctIndex: 2,
    },
    {
      question: 'كيف تمنع ثغرة LFI؟',
      options: [
        'بتشفير الملفات فقط',
        'بتعطيل دعم PHP في الخادم',
        'ب التنقية و تقييد الوصول للملفات',
        'باستخدام JavaScript في الخادم',
      ],
      correctIndex: 2,
    },
  ],
  'idor': [
    {
      question: 'ما هي ثغرة IDOR (Insecure Direct Object References)؟',
      options: [
        'ثغرة تسمح بالوصول المباشر للكائنات بدون تحقق من الصلاحية',
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 0,
    },
    {
      question: 'كيف تكتشف ثغرة IDOR؟',
      options: [
        'بتغيير معرفات الكائنات في الطلب والتحقق من الوصول',
        'باستخدام ماسح ضوئي للشبكة فقط',
        'بفحص ملفات السجل يدوياً',
        'باستخدام برامج مكافحة الفيروسات',
      ],
      correctIndex: 0,
    },
    {
      question: 'كيف تمنع ثغرة IDOR؟',
      options: [
        'باستخدام معرفات عشوائية مع التحقق من الصلاحية',
        'بتشفير الملفات فقط',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 0,
    },
  ],
  'open-redirect': [
    {
      question: 'ما هي ثغرة Open Redirect؟',
      options: [
        'ثغرة تسمح بتحويل المستخدم لموقع ضار',
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 0,
    },
    {
      question: 'لماذا ثغرة Open Redirect خطرة؟',
      options: [
        'لأنها تسمح بسرقة كلمات المرور مباشرة',
        'لأنها يمكن استخدامها في هجماتishing وسرقة credentials',
        'لأنها تسمح بحقن SQL',
        'لأنها تسمح بتعطيل الخادم',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة Open Redirect؟',
      options: [
        'بتشفير الرابط فقط',
        'باستخدام قوائم سماح للروابط المسموح بها',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
  'cors': [
    {
      question: 'ما هي ثغرة CORS Misconfiguration؟',
      options: [
        'خطأ في تكوين بروتوكول HTTP',
        'خطأ في تكوين سياسة مشاركة الموارد عبر النطاقات',
        'خطأ في تكوين قاعدة البيانات',
        'خطأ في تكوين خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هو الهدف من CORS؟',
      options: [
        'تشفير البيانات فقط',
        'التحكم في مشاركة الموارد بين النطاقات المختلفة',
        'منع هجمات SQL Injection',
        'تحسين أداء الموقع',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تكتشف ثغرة CORS؟',
      options: [
        'باستخدام ماسح ضوئي للشبكة فقط',
        'بفحص headers CORS والتحقق من تكوينها',
        'باستخدام برامج مكافحة الفيروسات',
        'بفحص ملفات السجل يدوياً',
      ],
      correctIndex: 1,
    },
  ],
  'jwt': [
    {
      question: 'ما هو JWT (JSON Web Token)؟',
      options: [
        'بروتوكول تشفير للملفات',
        'وسيلة للتحقق من هوية المستخدم عبر tokens مشفرة',
        'أداة لفحص الثغرات',
        'خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الثغرات الشائعة في JWT؟',
      options: [
        'SQL Injection فقط',
        'Weak Signing Keys و Algorithm Confusion و Lack of Expiration',
        'XSS فقط',
        'CSRF فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة الرئيسية لاختبار JWT؟',
      options: [
        'SQLMap',
        'JWT_Tool',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'oauth': [
    {
      question: 'ما هي ثغرات OAuth الشائعة؟',
      options: [
        'SQL Injection و XSS',
        'Insufficient State Validation و Redirect URI Manipulation',
        'Command Injection',
        'File Inclusion',
      ],
      correctIndex: 1,
    },
    {
      question: 'لماذا ثغرة Redirect URI في OAuth خطيرة؟',
      options: [
        'لأنها تسمح بسرقة ملفات النظام',
        'لأنها يمكن أن تسمح للمهاجم بسرقة Access Token',
        'لأنها تسمح بحقن SQL',
        'لأنها تسمح بتعطيل الخادم',
      ],
      correctIndex: 1,
    },
  ],
  'password-attacks': [
    {
      question: 'ما هي أنواع هجمات كلمات المرور؟',
      options: [
        'SQL Injection فقط',
        'Brute Force و Dictionary Attack و Rainbow Tables',
        'XSS فقط',
        'CSRF فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تحمي حساباتك من هجمات Brute Force؟',
      options: [
        'باستخدام كلمة مرور قصيرة فقط',
        'باستخدام كلمات مرور قوية و تثبيت خطوتين و قيود محاولات الدخول',
        'بتخزين كلمة المرور في المتصفح فقط',
        'باستخدام نفس كلمة المرور لجميع الحسابات',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة الشهيرة لكسر كلمات المرور؟',
      options: [
        'Nmap',
        'Hashcat و John the Ripper',
        'SQLMap',
        'Postman',
      ],
      correctIndex: 1,
    },
  ],
  'session-fixation': [
    {
      question: 'ما هي ثغرة Session Fixation؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح للمهاجم بتحديد معرّف الجلسة قبل تسجيل الدخول',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة Session Fixation؟',
      options: [
        'بتشفير الملفات فقط',
        'بتوليد معرّف جلسة جديد بعد تسجيل الدخول بنجاح',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
  'clickjacking': [
    {
      question: 'ما هي ثغرة Clickjacking؟',
      options: [
        'ثغرة تسمح بسرقة كلمات المرور مباشرة',
        'ثغرة تسمح بخداع المستخدم بالنقر على عناصر مخفية',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة Clickjacking؟',
      options: [
        'بتشفير الملفات فقط',
        'باستخدام X-Frame-Options و CSP frame-ancestors',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
  'api-security': [
    {
      question: 'ما هي الثغرات الشائعة في REST APIs؟',
      options: [
        'SQL Injection فقط',
        'Broken Object Level Authorization و Excessive Data Exposure',
        'XSS فقط',
        'CSRF فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تحمي APIs من هجمات Brute Force؟',
      options: [
        'باستخدام كلمة مرور قصيرة فقط',
        'بتطبيق Rate Limiting و API Keys و OAuth',
        'بتخزين كلمة المرور في المتصفح فقط',
        'باستخدام نفس المفتاح لجميع APIs',
      ],
      correctIndex: 1,
    },
  ],
  'insecure-deserialization': [
    {
      question: 'ما هي ثغرة Insecure Deserialization؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بحقن كائنات ضارة في تدفقات البيانات',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة لإنشاء payloads لـ Java Deserialization؟',
      options: [
        'SQLMap',
        'ysoserial',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'security-misconfiguration': [
    {
      question: 'ما هي ثغرة Security Misconfiguration؟',
      options: [
        'ثغرة في كود التطبيق فقط',
        'ثغرة ناتجة عن إعدادات خاطئة في الخادم أو التطبيق أو الشبكة',
        'ثغرة في نظام التشغيل فقط',
        'ثغرة في قاعدة البيانات فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة الشهيرة لفحص أخطاء التكوين؟',
      options: [
        'SQLMap',
        'Nmap و Nikto',
        'Hydra',
        'Postman',
      ],
      correctIndex: 1,
    },
  ],
  'broken-access-control': [
    {
      question: 'ما هي ثغرة Broken Access Control؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح للمستخدم بتجاوز القيود والوصول لموارد غير مصرح بها',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تكتشف ثغرة Broken Access Control؟',
      options: [
        'باستخدام ماسح ضوئي للشبكة فقط',
        'بتجربة الوصول للموارد بصلاحيات مختلفة',
        'باستخدام برامج مكافحة الفيروسات',
        'بفحص ملفات السجل يدوياً',
      ],
      correctIndex: 1,
    },
  ],
  'information-disclosure': [
    {
      question: 'ما هي ثغرة Information Disclosure؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح بعرض معلومات حساسة غير مقصودة',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'أي من הבאים يُعد مثالاً على Information Disclosure؟',
      options: [
        'استخدام HTTPS',
        'عرض رسائل خطأ مفصلة تحتوي على معلومات النظام',
        'استخدام جدار حماية',
        'تشفير قاعدة البيانات',
      ],
      correctIndex: 1,
    },
  ],
  'mass-assignment': [
    {
      question: 'ما هي ثغرة Mass Assignment؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح بتعيين خصائص غير مقصودة للكائنات',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة Mass Assignment؟',
      options: [
        'بتشفير الملفات فقط',
        'بحماية الخصائص الحساسة من التعيين التلقائي',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
  'business-logic': [
    {
      question: 'ما هي ثغرات المنطق التجاري؟',
      options: [
        'ثغرات في البروتوكولات فقط',
        'ثغرات ناتجة عن عيوب في تصميم منطق التطبيق',
        'ثغرات في نظام التشغيل فقط',
        'ثغرات في قاعدة البيانات فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تكتشف ثغرات المنطق التجاري؟',
      options: [
        'باستخدام ماسح ضوئي للشبكة فقط',
        'بفهم سير عمل التطبيق واختبار حالات غير متوقعة',
        'باستخدام برامج مكافحة الفيروسات',
        'بفحص ملفات السجل يدوياً',
      ],
      correctIndex: 1,
    },
  ],
  'race-condition': [
    {
      question: 'ما هي ثغرة Race Condition؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح بتنفيذ عمليات متزامنة تؤدي لنتائج غير متوقعة',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة لاختبار Race Conditions؟',
      options: [
        'SQLMap',
        'Turbo Intruder',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'http-smuggling': [
    {
      question: 'ما هي ثغرة HTTP Smuggling؟',
      options: [
        'ثغرة في بروتوكول DNS',
        'ثغرة تسمح بحقن طلبات HTTP خبيثة بين الخوادم',
        'ثغرة في تشفير HTTPS',
        'ثغرة في قاعدة البيانات',
      ],
      correctIndex: 1,
    },
    {
      question: 'لماذا HTTP Smuggling خطيرة؟',
      options: [
        'لأنها تسمح بسرقة ملفات النظام فقط',
        'لأنها يمكن أن تسمح بتجاوز أجهزة الحماية وسرقة الجلسات',
        'لأنها تسمح بحقن SQL فقط',
        'لأنها تسمح بتعطيل الخادم فقط',
      ],
      correctIndex: 1,
    },
  ],
  'host-header-injection': [
    {
      question: 'ما هي ثغرة Host Header Injection؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح بحقن قيم خاطئة في رأس Host',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'لماذا ثغرة Host Header Injection خطيرة؟',
      options: [
        'لأنها تسمح بسرقة ملفات النظام فقط',
        'لأنها يمكن أن تؤدي لتهيكلة cached pages و Password Reset Poisoning',
        'لأنها تسمح بحقن SQL فقط',
        'لأنها تسمح بتعطيل الخادم فقط',
      ],
      correctIndex: 1,
    },
  ],
  'subdomain-takeover': [
    {
      question: 'ما هي ثغرة Subdomain Takeover؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح للمهاجم بالسيطرة على subdomain غير مستخدم',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تكتشف ثغرة Subdomain Takeover؟',
      options: [
        'باستخدام ماسح ضوئي للشبكة فقط',
        'بالبحث عن subdomains تشير لخدمات خارجية غير مستخدمة',
        'باستخدام برامج مكافحة الفيروسات',
        'بفحص ملفات السجل يدوياً',
      ],
      correctIndex: 1,
    },
  ],
  'dns-rebinding': [
    {
      question: 'ما هي ثغرة DNS Rebinding؟',
      options: [
        'ثغرة في بروتوكول HTTP',
        'ثغرة تسمح بربط DNS بعناوين IP متغيرة لتجاوز حماية الشبكة الداخلية',
        'ثغرة في تشفير HTTPS',
        'ثغرة في قاعدة البيانات',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة DNS Rebinding؟',
      options: [
        'بتشفير الملفات فقط',
        'بتحقق من رؤوس HTTP وفحص طلبات DNS',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
  'prototype-pollution': [
    {
      question: 'ما هي ثغرة Prototype Pollution؟',
      options: [
        'ثغرة في قواعد البيانات العلائقية',
        'ثغرة في JavaScript تسمح بتعديل كائنات Prototype',
        'ثغرة في بروتوكول HTTP',
        'ثغرة في تشفير HTTPS',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة لفحص ثغرات Node.js بما في ذلك Prototype Pollution؟',
      options: [
        'SQLMap',
        'NodeJsScan',
        'Nmap',
        'Hydra',
      ],
      correctIndex: 1,
    },
  ],
  'denial-of-service': [
    {
      question: 'ما هي ثغرة Denial of Service؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط',
        'ثغرة تسمح بجعل النظام غير متاح للمستخدمين الشرعيين',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بسرقة البيانات',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هي الأداة المعروفة لاختبار DoS؟',
      options: [
        'SQLMap',
        'LOIC و HULK',
        'Nmap',
        'Postman',
      ],
      correctIndex: 1,
    },
  ],
  'file-upload': [
    {
      question: 'ما هي ثغرة File Upload؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح برفع ملفات ضارة إلى الخادم',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة File Upload؟',
      options: [
        'بتشفير الملفات فقط',
        'بالتحقق من نوع الملف وحجمه ومحتواه وتخزينه خارج الوصول المباشر',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
  'ai-security': [
    {
      question: 'ما هي ثغرات أمان الذكاء الاصطناعي؟',
      options: [
        'ثغرات في قواعد البيانات فقط',
        'ثغرات تشمل Prompt Injection و Model Theft و Data Poisoning',
        'ثغرات في بروتوكول HTTP فقط',
        'ثغرات في تشفير HTTPS فقط',
      ],
      correctIndex: 1,
    },
    {
      question: 'ما هو Prompt Injection؟',
      options: [
        'ثغرة في قاعدة البيانات',
        'تقنية لتلاعب بنماذج الذكاء الاصطناعي عبر مدخلات مصممة بعناية',
        'ثغرة في بروتوكول DNS',
        'ثغرة في نظام التشغيل',
      ],
      correctIndex: 1,
    },
  ],
  'cookie-poisoning': [
    {
      question: 'ما هي ثغرة Cookie Poisoning؟',
      options: [
        'ثغرة تسمح بسرقة ملفات تعريف الارتباط فقط',
        'ثغرة تسمح بتغيير ملفات تعريف الارتباط لتضليل التطبيق',
        'ثغرة تسمح بحقن SQL في قاعدة البيانات',
        'ثغرة تسمح بتعطيل خادم DNS',
      ],
      correctIndex: 1,
    },
    {
      question: 'كيف تمنع ثغرة Cookie Poisoning؟',
      options: [
        'بتشفير الملفات فقط',
        'بتشفير ملفات تعريف الارتباط واستخدام HttpOnly و Secure flags',
        'باستخدام JavaScript في الخادم',
        'بإخفاء رسائل الخطأ',
      ],
      correctIndex: 1,
    },
  ],
}
