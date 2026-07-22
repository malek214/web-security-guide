import Link from 'next/link'

export default function OpenRedirectPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F504;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">إعادة توجيه مفتوحة</h1>
            <p className="text-xl text-gray-500 mt-1">Open Redirect</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: متوسط إلى عالي
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف إعادة التوجيه المفتوحة</h2>
        <p>
          إعادة التوجيه المفتوحة (Open Redirect) هي ثغرة أمنية تسمح للمهاجم بتحويل المستخدم من موقع ويب شرعي إلى موقع ضار دون علمه. يحدث ذلك عندما تقوم تطبيقات الويب بإعادة توجيه المستخدمين إلى عناوين URL خارجية بناءً على مدخلات المستخدم دون التحقق من صحتها.
        </p>
        <p>
          تستغل هذه الثغرة ثقة المستخدم في الموقع الشرعي لخداعه وجمع بياناته الشخصية أو تسريب حساسية المصادقة أو تثبيت برامج ضارة على جهازه.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع إعادة التوجيه المفتوحة</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. إعادة التوجيه عبر معلمات URL</h3>
          <p>
            النوع الأكثر شيوعاً حيث يتم تمرير رابط إعادة التوجيه كمعلمة في URL. يستخدم المهاجم معلمة مثل <code>redirect</code> أو <code>url</code> أو <code>next</code> لتوجيه الضحية لموقع ضار.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// مثال على ثغرة إعادة التوجيه
https://example.com/redirect?url=https://attacker.com

// مثال آخر باستخدام معلمة next
https://example.com/login?next=https://attacker.com/phishing

// المهاجم يرسل رابط للضحية يبدو شرعياً
https://example.com/redirect?url=https://example.com (يبدو آمناً)
// لكنه يعادة التوجيه فعلياً للموقع الضار`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. إعادة التوجيه عبر Meta Refresh</h3>
          <p>
            يستخدم المهاجم وسم <code>&lt;meta&gt;</code> مع سمة <code>http-equiv="refresh"</code> لإعادة توجيه المتصفح إلى موقع ضار بعد فترة قصيرة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`<!-- إعادة توجيه فورية بعد 0 ثانية -->
<meta http-equiv="refresh" content="0; url=https://attacker.com">

<!-- إعادة توجيه بعد 5 ثوانٍ -->
<meta http-equiv="refresh" content="5; url=https://attacker.com">

<!-- في صفحة HTML مصابة -->
<html>
<head>
  <title>صفحة شرعية</title>
  <meta http-equiv="refresh" content="0; url=https://attacker.com/phishing">
</head>
<body>
  <h1>تم تحديث الموقع</h1>
  <p>جاري التوجيه...</p>
</body>
</html>`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. إعادة التوجيه عبر JavaScript</h3>
          <p>
            يستخدم المهاجم أكواد JavaScript لإعادة توجيه المتصفح. يمكن حقن هذا الكود في صفحات مصابة أو عبر ثغرات XSS.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// إعادة توجيه باستخدام window.location
<script>window.location.href = "https://attacker.com";</script>

// إعادة توجيه باستخدام window.location.replace
<script>window.location.replace("https://attacker.com");</script>

// إعادة توجيه مع تأخير
<script>
  setTimeout(function() {
    window.location.href = "https://attacker.com";
  }, 3000); // بعد 3 ثوانٍ
</script>

// إعادة توجيه باستخدام document.location
<script>document.location = "https://attacker.com";</script>`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">سيناريو 1: هجومishing عبر إعادة التوجيه</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// المهاجم ينشئ رابط مغرض
https://bank.com/redirect?url=https://attacker-bank.com/login

// الخطوات:
// 1. الضحية ينقر على الرابط
// 2. الموقع الشرعي يعيد التوجيه للموقع الضار
// 3. الموقع الضار يعرض نموذج تسجيل دخول مزيف
// 4. الضحية يدخل بيانات تسجيل الدخول
// 5. المهاجم يسرق البيانات`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">سيناريو 2: اختراق OAuth tokens</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// تطبيق يستخدم OAuth مع إعادة توجيه ضعيفة
https://app.com/auth/callback?redirect=https://attacker.com

// الخطوات:
// 1. المستخدم يحاول تسجيل الدخول عبر OAuth
// 2. الخادم يطلب صلاحية الوصول
// 3. بعد الموافقة، يعيد التوجيه للموقع الضار
// 4. الموقع الضار يحصل على OAuth token
// 5. المهاجم يستخدم التوكن للوصول للحساب`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">سيناريو 3: تسريب بيانات من URL</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// إعادة التوجيه قد تكشف معلومات حساسة في URL
https://example.com/redirect?url=https://attacker.com?token=abc123&user=john

// إذا كان الـ URL يحتوي على:
// - session tokens
// - API keys
// - بيانات تعريف المستخدم

// المهاجم يمكنه رؤية هذه البيانات في سجل الطلبات`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف ثغرات إعادة التوجيه المفتوحة</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف المحتملة</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>وجود معلمات URL مثل <code>redirect</code>، <code>url</code>، <code>next</code>، <code>return</code></li>
          <li>صفحات تسجيل الدخول تعيد التوجيه بعد المصادقة</li>
          <li>روابط خروج (outbound links) في الموقع</li>
          <li>استجابة HTTP تحتوي على Header Location مع URL خارجي</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الاكتشاف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>Burp Suite</strong> - أداة شاملة لاختبار أمن تطبيقات الويب</li>
          <li><strong>OWASP ZAP</strong> - أداة مجانية لاكتشاف الثغرات</li>
          <li><strong>Param Miner</strong> - إضافة Burp لاكتشاف المعلمات المخفية</li>
          <li><strong>GoogD0rker</strong> - أداة متخصصة في اكتشاف Open Redirect</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">تقنيات الاختبار اليدوية</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// اختبار أساسي باستخدام curl
curl -v "https://example.com/redirect?url=https://attacker.com"

// اختبار مع تحليل الاستجابة
curl -I "https://example.com/redirect?url=https://attacker.com"

// البحث عن معلمات إعادة التوجيه المخفية
// جرب هذه المعلمات:
// ?redirect=
// ?url=
// ?next=
// ?return=
// ?continue=
// ?goto=
// ?target=
// ?dest=
// ?destination=
// ?redir=
// ?redirect_uri=
// ?return_url=`}
            </pre>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">تقنيات التحايل على الفلاتر</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// إذا كان الموقع يتحقق من النطاق فقط
https://example.com/redirect?url=https://example.com.attacker.com

// استخدام بروتوكولات مختلفة
https://example.com/redirect?url=javascript:alert(1)
https://example.com/redirect?url=data:text/html,<script>alert(1)</script>

// استخدام URL encoding
https://example.com/redirect?url=https%3A%2F%2Fattacker.com

// استخدام URL parsing tricks
https://example.com/redirect?url=https://example.com@attacker.com
https://example.com/redirect?url=https://attacker.com#https://example.com`}
            </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. قائمة بيضاء للنطاقات المسموحة (Whitelist)</h3>
            <p>
              أفضل طريقة للحماية هي استخدام قائمة بيضاء تحتوي على النطاقات المسموح بها فقط لإعادة التوجيه. أي طلب لإعادة توجيه لموقع غير في القائمة يتم رفضه.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Node.js/Express - قائمة بيضاء آمنة
const allowedRedirects = [
  'https://example.com',
  'https://www.example.com',
  'https://app.example.com'
];

app.get('/redirect', (req, res) => {
  const url = req.query.url;

  // التحقق من أن الرابط في القائمة البيضاء
  if (!url || !allowedRedirects.some(allowed =>
    url.startsWith(allowed)
  )) {
    return res.status(400).send('رابط إعادة التوجيه غير مسموح');
  }

  res.redirect(url);
});

// مثال أكثر تطوراً باستخدام URL parsing
const { URL } = require('url');

function isAllowedRedirect(redirectUrl, allowedDomains) {
  try {
    const parsed = new URL(redirectUrl);
    return allowedDomains.includes(parsed.hostname);
  } catch {
    return false;
  }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. التحقق من النطاق الجذري (Root Domain Validation)</h3>
            <p>
              تأكد من أن رابط إعادة التوجيه ينتمي لنطاقك الأساسي أو نطاقات فرعية معتمدة فقط. هذا يمنع التحايل عبر نطاقات مشابهة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// التحقق من النطاق الجذري
function isSameDomain(url, allowedDomain) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    // التحقق من التطابق الكامل أو النطاق الفرعي
    return hostname === allowedDomain ||
           hostname.endsWith('.' + allowedDomain);
  } catch {
    return false;
  }
}

// استخدام
const allowedDomain = 'example.com';
const testUrls = [
  'https://example.com',        // ✓ مسموح
  'https://sub.example.com',    // ✓ مسموح
  'https://attacker.com',       // ✗ مرفوض
  'https://example.com.attacker.com'  // ✗ مرفوض
];

testUrls.forEach(url => {
  console.log(url, isSameDomain(url, allowedDomain));
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. استخدام Relative Redirects</h3>
            <p>
              استخدم إعادة التوجيه النسبية بدلاً من المطلقة لضمان البقاء داخل نطاقك. معظم أطر العمل توفر هذه الميزة تلقائياً.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// إعادة توجيه نسبي - آمن
res.redirect('/dashboard');
res.redirect('/login');

// إعادة توجيه مطلق - خطر
res.redirect('https://example.com/dashboard');

// في Next.js - آمن بشكل افتراضي
import { redirect } from 'next/navigation';

// إعادة توجيه نسبي
redirect('/dashboard');

// إعادة توجيه مطلق (تجنبها)
// redirect('https://external-site.com');

// في PHP
// آمن - مسار نسبي
header('Location: /dashboard');

// خطر - مسار مطلق
header('Location: https://example.com/dashboard');`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. صفحة تأكيد إعادة التوجيه</h3>
            <p>
              اعرض صفحة تأكيد للمستخدم قبل إعادة التوجيه لموقع خارجي، مما يتيح له معرفة الوجهة والموافقة عليها.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// صفحة تأكيد إعادة التوجيه
function RedirectConfirmation({ targetUrl }) {
  return (
    <div className="redirect-confirmation">
      <h2>تنبيه أمني</h2>
      <p>أنت على وشك التوجيه إلى موقع خارجي:</p>
      <div className="url-display">{targetUrl}</div>
      <p>هل أنت متأكد أنك تريد المتابعة؟</p>
      <button onClick={() => window.location.href = targetUrl}>
        متابعة
      </button>
      <button onClick={() => history.back()}>
        العودة
      </button>
    </div>
  );
}

// التحقق من النطاق قبل عرض صفحة التأكيد
function shouldConfirmRedirect(url) {
  const allowedDomains = ['example.com', 'app.example.com'];
  const parsed = new URL(url);
  return !allowedDomains.includes(parsed.hostname);
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. استخدام CSRF tokens مع إعادة التوجيه</h3>
            <p>
              اربط طلبات إعادة التوجيه بتوكن CSRF لمنع الاستغلال من خلال هجمات Cross-Site.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Node.js/Express مع CSRF protection
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/redirect', csrfProtection, (req, res) => {
  const url = req.query.url;
  const csrfToken = req.query._csrf;

  // التحقق من صحة CSRF token
  if (!csrfToken || !verifyCsrfToken(csrfToken)) {
    return res.status(403).send('CSRF token غير صالح');
  }

  // التحقق من الرابط
  if (!isAllowedRedirect(url)) {
    return res.status(400).send('رابط غير مسموح');
  }

  res.redirect(url);
});`}
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
              <span><strong>القاعدة الذهبية:</strong> لا تثق أبداً بمدخلات المستخدم في روابط إعادة التوجيه</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم قائمة بيضاء (whitelist) للنطاقات المسموح بها فقط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>أكد دائماً على النطاق الجذري للموقع المستهدف</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>فضل إعادة التوجيه النسبية عن المطلقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>اعرض صفحة تأكيد للمستخدم قبل إعادة التوجيه لمواقع خارجية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم CSRF tokens مع طلبات إعادة التوجيه</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>راجع الكود بشكل دوري واختبر جميع نقاط إعادة التوجيه</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; التحقق فقط من بداية الرابط (startswith)</h4>
            <p className="text-gray-600 mb-0">يمكن التحايل عبر إضافة نطاقك كـ subdomain للموقع الضار مثل example.com.attacker.com</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام blacklist بدل whitelist</h4>
            <p className="text-gray-600 mb-0">القوائم السوداء لا يمكنها تغطية جميع النطاقات الضارة المحتملة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم التحقق من بروتوكول الرابط</h4>
            <p className="text-gray-600 mb-0">السماح ببروتوكولات مثل javascript: أو data: يشكل خطراً كبيراً</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; تمرير معلومات حساسة في URL</h4>
            <p className="text-gray-600 mb-0">بيانات الدخول أو التوكنات في URL يمكن رؤيتها في السجلات والبروكسي</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
          <Link href="/vulnerabilities/ssrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F5A5;&#xFE0F;</span>
            <h4 className="font-bold mt-2">SSRF</h4>
          </Link>
          <Link href="/vulnerabilities/csrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">CSRF</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
