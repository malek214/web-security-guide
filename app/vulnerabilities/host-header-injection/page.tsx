import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'

export default function HostHeaderInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F3E0;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن رأس الاستضافة</h1>
            <p className="text-xl text-gray-500 mt-1">Host Header Injection</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: متوسط إلى عالي
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف حقن رأس الاستضافة</h2>
        <p>
          حقن رأس الاستضافة (Host Header Injection) هو ثغرة أمنية تسمح للمهاجم بتغيير قيمة رأس HTTP Host في الطلبات المرسلة للخادم. عندما يقوم الخادم باستخدام هذه القيمة دون التحقق من صحتها، يمكن للمهاجم استغلال ذلك لتنفيذ هجمات متعددة مثل تسميم إعادة تعيين كلمة المرور أو تسميم التخزين المؤقت.
        </p>
        <p>
          رأس Host هو رأس إلزامي في طلبات HTTP/1.1 ويحدد اسم النطاق الذي يطلب منه العميل. يعتمد عليه الخادم في تحديد كيفية معالجة الطلب وإعادة التوجيه.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع حقن رأس الاستضافة</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. تسميم إعادة تعيين كلمة المرور (Password Reset Poisoning)</h3>
          <p>
            عندما يرسل الخادم رابط إعادة تعيين كلمة المرور يحتوي على رأس Host، يمكن للمهاجم تغيير النطاق في الرابط ليوجّه الضحية لموقع ضار. يتمكن المهاجم من سرقة التوكن الخاص بإعادة تعيين كلمة المرور.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// طلب إعادة تعيين كلمة المرور الأصلي
POST /forgot-password HTTP/1.1
Host: legitimate-site.com
Content-Type: application/x-www-form-urlencoded

email=victim@example.com

// الرد من الخادم يحتوي على رابط إعادة التعيين
// https://legitimate-site.com/reset?token=abc123

// المهاجم يرسل طلب مع Host مغرض
POST /forgot-password HTTP/1.1
Host: attacker.com
Content-Type: application/x-www-form-urlencoded

email=victim@example.com

// الرد من الخادم يستخدم Host المغرض
// https://attacker.com/reset?token=abc123

// الضحية يتلقى رابط لموقع المهاجم
// يدخل التوكن في موقع ضار
// المهاجم يسرق التوكن`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. تسميم التخزين المؤقت (Cache Poisoning)</h3>
          <p>
            عندما يستخدم الخادم أو الوسيط (Proxy) رأس Host في مفتاح التخزين المؤقت، يمكن للمهاجم حقن Host مغرض لتخزين صفحة ضارة. ثم يصل الضحية للصفحة المسمومة من التخزين المؤقت.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// طلب مع Host مغرض
GET / HTTP/1.1
Host: attacker.com
X-Forwarded-Host: attacker.com

// الخادم أو البروكسي يخزن الاستجابة
// بناءً على Host header المغرض

// الضحية يطلب الصفحة الرئيسية
GET / HTTP/1.1
Host: legitimate-site.com

// البروكسي يُرجع الصفحة المخزنة مؤقتاً
// التي تحتوي على محتوى ضار`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. خداع التخزين المؤقت للويب (Web Cache Deception)</h3>
          <p>
            يجمع هذا النوع بين حقن Host واستغلال سلوك التخزين المؤقت. يقوم المهاجم بحقن مسار ملف حساس (مثل /etc/passwd) مع Host header مغرض لتخزين محتوى حساس في التخزين المؤقت.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// طلب مع مسار ملف حساس
GET /logo.png HTTP/1.1
Host: attacker.com
X-Original-URL: /etc/passwd

// البروكسي يخزن محتوى الملف الحساس
// في التخزين المؤقت بمفتاح logo.png

// المهاجم يطلب logo.png
GET /logo.png HTTP/1.1
Host: attacker.com

// يتلقى محتوى /etc/passwd`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">مثال 1: هجوم على نظام إعادة تعيين كلمة المرور</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// Node.js/Express - كود مصاب
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const token = generateResetToken();

  // استخدام req.headers.host مباشرة - خطير!
  const resetLink = \`http://\${req.headers.host}/reset?token=\${token}\`;

  // إرسال البريد الإلكتروني بالرابط
  sendEmail(email, \`اضغط هنا لإعادة تعيين كلمة المرور: \${resetLink}\`);

  // المهاجم يغير Host header في الطلب
  // فيحصل على رابط لموقعه
  res.json({ message: 'تم إرسال رابط إعادة التعيين' });
});

// مثال على الطلب المغرض
// POST /forgot-password HTTP/1.1
// Host: attacker.com
// Content-Type: application/json
//
// {"email": "victim@example.com"}

// النتيجة: الضحية يتلقى رابط لإعادة التعيين
// على موقع المهاجم بدلاً من الموقع الشرعي`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">مثال 2: ثغرة في تطبيق ويب شهير</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// CVE-2017-5638 - ثغرة Apache Struts
// استغلت رأس Host في إعادة التوجيه

// الطلب المغرض
POST /login.action HTTP/1.1
Host: vulnerable-server.com
Content-Type: %{#context['com.opensymphony.xwork2.dispatcher.HttpServletResponse'].addHeader('X-Injected','true')}.multipart/form-data

// النتيجة: تنفيذ كود على الخادم

// مثال على ثغرة في WordPress
// حقن Host في ملفات التكوين الديناميكية
GET /wp-admin/install.php HTTP/1.1
Host: attacker.com

// الخادم يستخدم Host في إعدادات WordPress
// مما يسبب إعادة توجيه أو تكوين خاطئ`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">مثال 3: استغلال مع X-Forwarded-Host</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// بعض التطبيقات تستخدم X-Forwarded-Host بدلاً من Host
// هذا يشكل خطراً إضافياً

// الطلب العادي
GET /api/data HTTP/1.1
Host: api.example.com

// الطلب المغرض مع X-Forwarded-Host
GET /api/data HTTP/1.1
Host: api.example.com
X-Forwarded-Host: attacker.com

// بعض التطبيقات تستخدم X-Forwarded-Host
// في بناء الروابط أو إعادة التوجيه

// مثال على استغلال CSRF token
POST /transfer HTTP/1.1
Host: bank.com
X-Forwarded-Host: attacker.com

amount=1000&to=attacker-account

// الخادم يتحقق من CSRF token
// لكن الرابط يحتوي على X-Forwarded-Host المغرض`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف ثغرات حقن رأس الاستضافة</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف المحتملة</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>استخدام الخادم لرأس Host في بناء الروابط أو إعادة التوجيه</li>
          <li>وجود آليات إعادة تعيين كلمة المرور تعتمد على Host header</li>
          <li>استخدام X-Forwarded-Host في تطبيقات الويب</li>
          <li>وجود أخطاء HTTP 421 (Misdirected Request) عند تغيير Host</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الاكتشاف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>Burp Suite</strong> - أداة شاملة لاختبار أمن تطبيقات الويب</li>
          <li><strong>OWASP ZAP</strong> - أداة مجانية لاكتشاف الثغرات</li>
          <li><strong>Param Miner</strong> - إضافة Burp لاكتشاف المعلمات المخفية</li>
          <li><strong>Host Header Injection Scanner</strong> - أدوات متخصصة</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">تقنيات الاختبار اليدوية</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// اختبار أساسي مع curl
curl -v -H "Host: attacker.com" https://legitimate-site.com/

// اختبار مع X-Forwarded-Host
curl -v -H "X-Forwarded-Host: attacker.com" https://legitimate-site.com/

// اختبار إعادة تعيين كلمة المرور
curl -X POST https://legitimate-site.com/forgot-password \\
  -H "Host: attacker.com" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"victim@example.com"}'

// اختبار مع تحليل الاستجابة
curl -I -H "Host: attacker.com" https://legitimate-site.com/

// ملاحظة: تحقق من تغيير الروابط في الاستجابة
// ومراقبة أي إعادة توجيه أو محتوى متغير`}
          </pre>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">تقنيات التحايل على الفلاتر</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// استخدام رؤوس HTTP متعددة
Host: legitimate-site.com
X-Forwarded-Host: attacker.com

// استخدام Host مع أحرف خاصة
Host: legitimate-site.com%0d%0aInjected-Header:value

// استخدام Unicode encoding
Host: l&#101;gitimate-site.com

// استخدام Case variations
HOST: attacker.com
host: attacker.com

// استخدام مسافات إضافية
Host:  attacker.com
Host:attacker.com`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. التحقق من رأس Host (Validate Host Header)</h3>
            <p>
              تحقق دائماً من أن رأس Host يطابق النطاق الشرعي للتطبيق. لا تثق بمقدمة الخادم في تحديد Host header.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Node.js/Express - التحقق من Host
const ALLOWED_HOSTS = ['example.com', 'www.example.com', 'app.example.com'];

app.use((req, res, next) => {
  const host = req.headers.host?.split(':')[0]; // إزالة البورت

  if (!ALLOWED_HOSTS.includes(host)) {
    return res.status(403).json({ error: 'Host غير مصرح به' });
  }

  next();
});

// في Next.js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const allowedHosts = ['example.com', 'www.example.com'];

  if (!allowedHosts.includes(host)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. استخدام قائمة بيضاء للنطاقات (Whitelist)</h3>
            <p>
              أنشئ قائمة بيضاء تحتوي على جميع النطاقات المسموح بها واستخدمها للتحقق من أي استخدام لرأس Host في التطبيق.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// قائمة بيضاء شاملة
const HOST_WHITELIST = new Set([
  'example.com',
  'www.example.com',
  'api.example.com',
  'app.example.com',
  'staging.example.com'
]);

// دالة للتحقق من Host
function validateHost(host) {
  if (!host) return false;

  // إزالة البورت إن وجدت
  const hostname = host.split(':')[0].toLowerCase().trim();

  return HOST_WHITELIST.has(hostname);
}

// استخدام مع Express
app.use((req, res, next) => {
  if (!validateHost(req.headers.host)) {
    console.warn('Host injection attempt:', req.headers.host);
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// التحقق من X-Forwarded-Host أيضاً
app.use((req, res, next) => {
  const xfh = req.headers['x-forwarded-host'];
  if (xfh && !validateHost(xfh)) {
    console.warn('X-Forwarded-Host injection:', xfh);
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. عدم استخدام Host header في بناء الروابط</h3>
            <p>
              لا تستخدم رأس Host مباشرة في بناء الروابط أو إعادة التوجيه. استخدم روابط مطلقة محددة مسبقاً أو روابط نسبية.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// خطأ - استخدام Host header
const resetLink = \`http://\${req.headers.host}/reset?token=\${token}\`;

// صحيح - استخدام نطاق ثابت
const resetLink = \`https://example.com/reset?token=\${token}\`;

// صحيح - استخدام بيئة التكوين
const resetLink = \`\${process.env.APP_URL}/reset?token=\${token}\`;

// صحيح - استخدام رابط نسبي
const resetLink = \`/reset?token=\${token}\`;

// في Next.js مع البيئة
// .env.local
NEXT_PUBLIC_APP_URL=https://example.com

// استخدام في الكود
const resetLink = \`\${process.env.NEXT_PUBLIC_APP_URL}/reset?token=\${token}\`;`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. استخدام آمن لإعادة تعيين كلمة المرور</h3>
            <p>
              عند إرسال روابط إعادة تعيين كلمة المرور، لا تعتمد على Host header. استخدم نطاق ثابت محدد في التكوين.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Node.js/Express - إعادة تعيين كلمة المرور آمنة
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // إنشاء التوكن
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 3600000; // ساعة واحدة

  // حفظ التوكن في قاعدة البيانات
  await db.passwordResets.create({
    email,
    token: resetToken,
    expires
  });

  // استخدام نطاق ثابت من البيئة
  const baseUrl = process.env.APP_URL || 'https://example.com';
  const resetLink = \`\${baseUrl}/reset-password?token=\${resetToken}\`;

  // إرسال البريد الإلكتروني
  await sendEmail({
    to: email,
    subject: 'إعادة تعيين كلمة المرور',
    html: \`<a href="\${resetLink}">اضغط هنا لإعادة تعيين كلمة المرور</a>\`
  });

  res.json({ message: 'تم إرسال رابط إعادة التعيين' });
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. تعطيل أو تقييد X-Forwarded-*</h3>
            <p>
              قيّد استخدام رؤوس X-Forwarded-* وتأكد من أن الخادم يثق فقط بالبروكسيات الموثوقة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Express مع trust proxy
// ثقة فقط بالبروكسيات الموثوقة
app.set('trust proxy', 1); // ثقة بالبروكسي الواحد

// أو تحديد نطاقات موثوقة
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

// Nginx - تقييد X-Forwarded-*
proxy_set_header Host $host;
# لا تمرير X-Forwarded-Host من العميل
proxy_set_header X-Forwarded-Host "";

// Apache - تقييد Trust
RemoteIPHeader X-Forwarded-For
RemoteIPTrustedProxy 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">6. استخدام HTTPS وإعدادات أمان الإطارات</h3>
            <p>
              أ强制 استخدام HTTPS واضبط إعدادات أمان الإطارات (Frame Options) لمنع هجمات التضمين.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// HTTP Strict Transport Security (HSTS)
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// X-Frame-Options
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});

// في Next.js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نصائح أمنية</h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>القاعدة الذهبية:</strong> لا تثق أبداً برأس Host coming من العميل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم قائمة بيضاء (whitelist) للنطاقات المسموح بها فقط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>لا تستخدم Host header في بناء الروابط أو إعادة التوجيه</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم نطاقات ثابتة من ملفات التكوين للروابط المطلقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>قيّد استخدام رؤوس X-Forwarded-* وثق فقط بالبروكسيات الموثوقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>فعّل HSTS و X-Frame-Options و CSP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>راجع الكود بشكل دوري واختبر جميع نقاط استخدام Host header</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام req.headers.host مباشرة في بناء الروابط</h4>
            <p className="text-gray-600 mb-0">هذا يسمح للمهاجم بتغيير النطاق في أي رابط ينشئه الخادم</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم التحقق من X-Forwarded-Host</h4>
            <p className="text-gray-600 mb-0">بعض التطبيقات تستخدم X-Forwarded-Host بدلاً من Host، مما يشكل ثغرة إضافية</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام blacklist بدلاً من whitelist</h4>
            <p className="text-gray-600 mb-0">القوائم السوداء لا يمكنها تغطية جميع النطاقات الضارة المحتملة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم تسجيل محاولات الحقن</h4>
            <p className="text-gray-600 mb-0">عدم تسجيل محاولات حقن Host header يمنع اكتشاف الهجمات</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <ToolsSection slug="host-header-injection" />
      </section>

      <section className="mb-12">
        <VideoSection slug="host-header-injection" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/http-smuggling" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4E8;</span>
            <h4 className="font-bold mt-2">تهريب HTTP</h4>
          </Link>
          <Link href="/vulnerabilities/ssrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F5A5;&#xFE0F;</span>
            <h4 className="font-bold mt-2">SSRF</h4>
          </Link>
          <Link href="/vulnerabilities/open-redirect" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F504;</span>
            <h4 className="font-bold mt-2">إعادة توجيه مفتوحة</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
