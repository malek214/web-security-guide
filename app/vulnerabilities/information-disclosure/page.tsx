import Link from "next/link";
import VideoSection from '@/components/VideoSection'

export const metadata = {
  title: "الكشف عن المعلومات - Information Disclosure | دليل أمن الويب",
  description:
    "دليل شامل عن ثغرة الكشف عن المعلومات (Information Disclosure) وكيفية كشفها ومنعها في تطبيقات الويب",
};

const errorExamples = [
  {
    title: "رسائل الخطأ التفصيلية",
    language: "javascript",
    vulnerable: `// ❌ خطأ: عرض معلومات التفصيل للمستخدمين
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await db.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'المستخدم غير موجود',
        query: \`SELECT * FROM users WHERE id = \${req.params.id}\`,
        database: 'postgresql',
        host: 'db.internal.company.com'
      });
    }
    res.json(user);
  } catch (err) {
    // ❌ خطأ: عرض رسالة الخطأ الكاملة
    res.status(500).json({
      error: err.message,
      stack: err.stack,
      file: err.fileName,
      line: err.lineNumber
    });
  }
})`,
    secure: `// ✅ صحيح: معالجة الأخطاء بشكل آمن
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await db.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'المستخدم غير موجود'
      });
    }
    res.json(user);
  } catch (err) {
    // ✅ صحيح: تسجيل الخطأ للمطورين فقط
    logger.error('Database error:', {
      userId: req.params.id,
      error: err.message,
      stack: err.stack
    });
    
    // ✅ صحيح: إرسال رسالة عامة للمستخدم
    res.status(500).json({
      error: 'حدث خطأ في الخادم'
    });
  }
})`,
  },
  {
    title: "معلومات الخادم في الرؤوس",
    language: "javascript",
    vulnerable: `// ❌ خطأ: عرض معلومات الخادم في الرؤوس HTTP
app.use((req, res, next) => {
  // هذه الرؤوس تكشف معلومات عن الخادم
  res.setHeader('X-Powered-By', 'Express 4.18.2');
  res.setHeader('Server', 'nginx/1.24.0');
  next();
});`,
    secure: `// ✅ صحيح: إخفاء معلومات الخادم
app.use(helmet()); // مكتبة helmet تزيل معلومات الخادم

// أو يدوياً:
app.use((req, res, next) => {
  // ✅ إزالة معلومات الخادم
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  
  // ✅ إضافة رؤوس أمنية
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});`,
  },
  {
    title: "قائمة المجلدات المفتوحة",
    language: "javascript",
    vulnerable: `// ❌ خطأ: السماح بتصفح المجلدات
const express = require('express');
const app = express();

// ❌ هذا يسمح بتصفح جميع الملفات في المجلد
app.use(express.static('public'));

// ❌ بدون تكوين proper
app.use('/uploads', express.static('uploads'));
app.use('/backup', express.static('backup'));
app.use('/config', express.static('config'));`,
    secure: `// ✅ صحيح: تقييد المجلدات المكشوفة
const express = require('express');
const path = require('path');
const app = express();

// ✅ صحيح: تقييد المجلدات المكشوفة
app.use(express.static('public', {
  dotfiles: 'deny',        // ❌ رفض الملفات المخفية
  index: false,            // ❌ تعطيل فهرس المجلدات
  extensions: ['html'],    // ✅ فقط ملفات HTML
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store');
    }
  }
}));

// ✅ صحيح: التحقق من الصلاحيات قبل الملفات
app.use('/uploads', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(403).json({ error: 'غير مصرح' });
  }
  next();
}, express.static('uploads'));`,
  },
  {
    title: "التكوينات المكشوفة",
    language: "javascript",
    vulnerable: `// ❌ خطأ: الكشف عن معلومات التكوين
app.get('/api/config', (req, res) => {
  // ❌ إرجاع جميع معلومات التكوين
  res.json({
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD // ❌ كشف كلمة المرور!
    },
    api: {
      secretKey: process.env.JWT_SECRET,
      encryptionKey: process.env.ENCRYPTION_KEY
    },
    mail: {
      host: process.env.SMTP_HOST,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
});`,
    secure: `// ✅ صحيح: إخفاء معلومات التكوين الحساسة
app.get('/api/config', (req, res) => {
  // ✅ فقط المعلومات العامة الآمنة
  res.json({
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,
    features: {
      darkMode: true,
      notifications: true
    }
  });
});

// ✅ صحيح: استخدام متغيرات بيئة في بيئة التطوير فقط
if (process.env.NODE_ENV === 'development') {
  app.get('/debug/config', (req, res) => {
    // فقط في بيئة التطوير
    res.json({
      database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      }
    });
  });
}`,
  },
];

const detectionMethods = [
  {
    title: "فحص رسائل الخطأ",
    description: "إرسال مدخلات غير صالحة وتحليل رسائل الخطأ",
    commands: [
      {
        title: "اختبار SQL Injection مع عرض الخطأ",
        code: `# إرسال مدخلات SQL غير صالحة
curl -v "http://example.com/users?id=1'"

# فحص ما إذا كانت رسائل الخطأ تحتوي على معلومات SQL
# يجب ألا تظهر: اسم الجدول، هيكل قاعدة البيانات، أو تفاصيل الاستعلام`,
      },
      {
        title: "اختبار رسائل الخطأ التفصيلية",
        code: `# اختبار مسارات غير موجودة
curl -v "http://example.com/nonexistent"

# اختبار مسار غير صالح
curl -v "http://example.com/../../../etc/passwd"

# فحص ما إذا كانت الرساله تحتوي على مسار الملف الكامل
# يجب ألا يظهر: /var/www/html/ أو /home/user/`,
      },
    ],
  },
  {
    title: "فحص رؤوس HTTP",
    description: "تحليل رؤوس الاستجابة للحصول على معلومات الخادم",
    commands: [
      {
        title: "فحص رؤوس الاستجابة",
        code: `# فحص جميع رؤوس الاستجابة
curl -I http://example.com

# البحث عن هذه الرؤوس المكشوفة:
# Server: nginx/1.24.0
# X-Powered-By: Express 4.18.2
# X-AspNet-Version: 4.0.30319
# X-Generator: WordPress

# استخدام أداة مايكروسوفت لفحص الرؤوس
curl -s -D- http://example.com | grep -E "^(Server|X-Powered|X-Generator|X-AspNet)"`,
      },
    ],
  },
  {
    title: "فحص المجلدات المكشوفة",
    description: "البحث عن مجلدات وملفات مكشوفة",
    commands: [
      {
        title: "استخدام DirBuster لفحص المجلدات",
        code: `# استخدام DirBuster لفحص المجلدات
dirb http://example.com /path/to/wordlist.txt

# استخدام Gobuster
gobuster dir -u http://example.com -w /usr/share/wordlists/dirb/common.txt

# فحص المجلدات الشائعة المكشوفة
curl -s http://example.com/backup/
curl -s http://example.com/config/
curl -s http://example.com/.env
curl -s http://example.com/.git/
curl -s http://example.com/debug/`,
      },
    ],
  },
  {
    title: "فحص ملفات التكوين",
    description: "البحث عن ملفات التكوين المكشوفة",
    commands: [
      {
        title: "البحث عن ملفات التكوين",
        code: `# البحث عن ملفات التكوين المكشوفة
curl -s http://example.com/.env
curl -s http://example.com/config.php
curl -s http://example.com/config.json
curl -s http://example.com/config.yaml
curl -s http://example.com/web.config
curl -s http://example.com/.htaccess

# البحث عن ملفات GIT المكشوفة
curl -s http://example.com/.git/config
curl -s http://example.com/.git/HEAD

# استخدام Nmap لفحص الثغرات
nmap --script http-enum -p 80,443 example.com`,
      },
    ],
  },
];

const preventionMethods = [
  {
    title: "معالجة الأخطاء الآمنة",
    description: "إخفاء تفاصيل الأخطاء عن المستخدمين",
    code: `// معالجة الأخطاء المركزية
app.use((err, req, res, next) => {
  // تسجيل الخطأ للمطورين
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id
  });

  // إرسال رسالة عامة للمستخدم
  res.status(err.status || 500).json({
    error: 'حدث خطأ في الخادم',
    code: err.code || 'INTERNAL_ERROR'
  });
});

// معالجة أخطاء 404
app.use((req, res) => {
  res.status(404).json({
    error: 'المسار غير موجود'
  });
});`,
  },
  {
    title: "إخفاء معلومات الخادم",
    description: "إزالة معلومات الإصدار والنوع من الرؤوس",
    code: `// استخدام helmet لإخفاء معلومات الخادم
const helmet = require('helmet');
app.use(helmet());

// إزالة معلومات الخادم يدوياً
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  res.removeHeader('X-AspNet-Version');
  res.removeHeader('X-Generator');
  next();
});

// في Nginx
// server_tokens off;
// proxy_hide_header X-Powered-By;

// في Apache
// ServerSignature Off
// ServerTokens Prod`,
  },
  {
    title: "تأمين المجلدات",
    description: "تمنع تصفح المجلدات والملفات المكشوفة",
    code: `// تقييد المجلدات المكشوفة
app.use('/uploads', express.static('uploads', {
  dotfiles: 'deny',
  index: false,
  extensions: ['jpg', 'png', 'gif', 'pdf']
}));

// التحقق من الصلاحيات
const checkAuth = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'غير مصرح' });
  }
  next();
};

// تطبيق على المجلدات الحساسة
app.use('/admin', checkAuth, express.static('admin'));
app.use('/backup', checkAuth, express.static('backup'));`,
  },
  {
    title: "تأمين التكوين",
    description: "إخفاء معلومات التكوين الحساسة",
    code: `// استخدام ملفات بيئة آمنة
// .env (لا تضيفه لـ Git)
DB_HOST=localhost
DB_NAME=myapp
JWT_SECRET=your-secret-key

// في الكود: استخدام متغيرات البيئة فقط
const config = {
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
    // لا تقم بتخزين كلمات المرور في الكود
  }
};

// في Next.js: استخدام متغيرات البيئة العامة فقط
// فقطNEXT_PUBLIC_ variables are exposed to client
const publicConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL
};`,
  },
];

const commonMistakes = [
  {
    mistake: "عرض رسائل الخطأ التفصيلية للمستخدمين",
    impact: "كشف معلومات حساسة عن البنية التحتية",
    fix: "استخدم معالج أخطاء مركزي يخفي التفاصيل",
  },
  {
    mistake: "ترك وضع التصحيح (Debug Mode) مفعلاً في الإنتاج",
    impact: "كشف معلومات حساسة عن التطبيق والخادم",
    fix: "تأكد من تعطيل Debug Mode في بيئة الإنتاج",
  },
  {
    mistake: "استخدام إعدادات التكوين الافتراضية",
    impact: "كشف معلومات عن نوع الخادم والإصدار",
    fix: "قم بتخصيص إعدادات الخادم وإخفاء المعلومات",
  },
  {
    mistake: "عدم تقييد المجلدات المكشوفة",
    impact: "الوصول للملفات الحساسة والتكوينات",
    fix: "قيّد المجلدات وتحقق من الصلاحيات",
  },
  {
    mistake: "حفظ كلمات المرور والأسرار في الكود المصدري",
    impact: "الوصول للأسرار عبر مستودع Git",
    fix: "استخدم متغيرات البيئة ولا تضيف ملفات .env لـ Git",
  },
  {
    mistake: "عدم استخدام HTTPS",
    impact: "اعتراض البيانات في الطريق",
    fix: "استخدم HTTPS دائماً وقم بإعادة توجيه HTTP إلى HTTPS",
  },
];

export default function InformationDisclosurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12" dir="rtl">
        {/* Header */}
        <header className="mb-16">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              href="/vulnerabilities"
              className="hover:text-emerald-400 transition-colors"
            >
              الثغرات
            </Link>
            <span>/</span>
            <span className="text-emerald-400">الكشف عن المعلومات</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30">
              ثغرة أمنية
            </span>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">
              متوسط الخطورة
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-l from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            الكشف عن المعلومات - Information Disclosure
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
            ثغرة الكشف عن المعلومات (Information Disclosure) هي ثغرة أمنية تحدث
            عندما يكشف التطبيق عن معلومات حساسة عن بنيته التحتية أو إعداداته أو
            بياناته للمستخدمين غير المصرح لهم.
          </p>
        </header>

        {/* Definition Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            ما هو الكشف عن المعلومات؟
          </h2>
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              الكشف عن المعلومات (Information Disclosure) يشير إلى الكشف غير
              المقصود أو غير المصرح به عن معلومات حساسة في تطبيقات الويب. يمكن أن
              تشمل هذه المعلومات معلومات تقنية عن الخادم وقاعدة البيانات، أو بيانات
              المستخدمين الحساسة، أو معلومات عن بنية التطبيق الداخلية.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                  أمثلة على المعلومات المكشوفة
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    رسائل الخطأ التفصيلية
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    إصدار الخادم ونوعه
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    مسارات الملفات الكاملة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    إعدادات قاعدة البيانات
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    معلومات التكوين الحساسة
                  </li>
                </ul>
              </div>
              <div className="bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                  لماذا هي خطيرة؟
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    تسهيل الهجمات المتقدمة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    كشف نقاط الضعف
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    خصوصية المستخدمين
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    انتهاك لوائح حماية البيانات
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">&#x2022;</span>
                    خسائر مالية وسمعة
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Types Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            أنواع الكشف عن المعلومات
          </h2>
          <div className="grid gap-6">
            {[
              {
                name: "رسائل الخطأ التفصيلية",
                description:
                  "عرض رسائل خطأ تحتوي على معلومات تقنية حساسة مثل مسارات الملفات و strSQL queries وتفاصيل الخادم",
                severity: "مرتفع",
                example: "SQLSTATE[42S02]: Base table or view not found",
              },
              {
                name: "معلومات وضع التصحيح (Debug Information)",
                description:
                  "معلومات تفصيلية تظهر في وضع التطوير مثل تتبع الاستدعاء (Stack Traces) وسجلات الأخطاء",
                severity: "مرتفع",
                example:
                  "TypeError: Cannot read property of undefined at /app/src/index.js:42",
              },
              {
                name: "إصدار الخادم ونوعه",
                description:
                  "الكشف عن اسم وإصدار الخادم مثل Apache, Nginx, IIS وأي إصدارات معروفة بالثغرات",
                severity: "متوسط",
                example: "Server: Apache/2.4.52 (Ubuntu)",
              },
              {
                name: "قائمة المجلدات (Directory Listing)",
                description:
                  "السماح بتصفح محتويات المجلدات والوصول للملفات المكشوفة",
                severity: "مرتفع",
                example: "Index of /backup/ - contains database.sql, config.php",
              },
              {
                name: "الكشف عن الكود المصدري",
                description:
                  "الوصول لملفات الكود المصدري أو ملفات التكوين عبر روابط مباشرة",
                severity: "حرج",
                example: "Access to .git/config, .env, composer.json",
              },
            ].map((type, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {type.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      type.severity === "حرج"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : type.severity === "مرتفع"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {type.severity}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{type.description}</p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-sm text-red-300">
                  {type.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            أمثلة حقيقية مع الكود
          </h2>
          <div className="space-y-8">
            {errorExamples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-white">
                    {example.title}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 divide-x divide-gray-700">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-sm font-medium text-red-400">
                        كود غير آمن
                      </span>
                    </div>
                    <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-gray-300">{example.vulnerable}</code>
                    </pre>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                      <span className="text-sm font-medium text-emerald-400">
                        كود آمن
                      </span>
                    </div>
                    <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-gray-300">{example.secure}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detection Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            كيف تكتشف الكشف عن المعلومات؟
          </h2>
          <div className="space-y-6">
            {detectionMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <div className="space-y-4">
                  {method.commands.map((cmd, cmdIndex) => (
                    <div key={cmdIndex}>
                      <h4 className="text-sm font-medium text-cyan-400 mb-2">
                        {cmd.title}
                      </h4>
                      <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-gray-300">{cmd.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            كيف تمنع الكشف عن المعلومات؟
          </h2>
          <div className="grid gap-6">
            {preventionMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{method.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            الأخطاء الشائعة
          </h2>
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                      الخطأ
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                      التأثير
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                      الحل
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commonMistakes.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-red-400">
                        {item.mistake}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {item.impact}
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-400">
                        {item.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Security Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            نصائح أمنية مهمة
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                &#x2705; افعل
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">&#x2713;</span>
                  استخدم معالج أخطاء مركزي يخفي التفاصيل
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">&#x2713;</span>
                  سجّل الأخطاء في ملفات السجل للمطورين فقط
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">&#x2713;</span>
                  استخدم مكتبة helmet لإخفاء معلومات الخادم
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">&#x2713;</span>
                  قيّد المجلدات المكشوفة وتحقق من الصلاحيات
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">&#x2713;</span>
                  استخدم متغيرات البيئة للتكوينات الحساسة
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">&#x2713;</span>
                  اختبر تطبيقك بانتظام لاكتشاف الثغرات
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                &#x274C; لا تفعل
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#x2717;</span>
                  لا تعرض رسائل الخطأ التفصيلية للمستخدمين
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#x2717;</span>
                  لا تترك Debug Mode مفعلاً في الإنتاج
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#x2717;</span>
                  لا تحفظ كلمات المرور في الكود المصدري
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#x2717;</span>
                  لا تستخدم إعدادات الخادم الافتراضية
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#x2717;</span>
                  لا تسمح بتصفح المجلدات بدون تحقق
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&#x2717;</span>
                  لا تكشف معلومات البنية التحتية للجمهور
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">
            روابط ذات صلة
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/vulnerabilities/sql-injection"
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                حقن SQL
              </h3>
              <p className="text-gray-400 text-sm">
                SQL Injection - ثغرة حقن استعلامات SQL
              </p>
            </Link>
            <Link
              href="/vulnerabilities/cross-site-scripting"
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                نشر سكريبتات مواقع
              </h3>
              <p className="text-gray-400 text-sm">
                Cross-Site Scripting (XSS)
              </p>
            </Link>
            <Link
              href="/vulnerabilities/cross-site-request-forgery"
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                تزوير الطلبات
              </h3>
              <p className="text-gray-400 text-sm">
                Cross-Site Request Forgery (CSRF)
              </p>
            </Link>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <VideoSection slug="information-disclosure" />
        </section>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/vulnerabilities"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>&#x2190;</span>
            <span>العودة لقائمة الثغرات</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
