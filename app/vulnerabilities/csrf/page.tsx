import Link from "next/link";
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function CSRFPage() {
  return (
    <div dir="rtl" className="max-w-4xl mx-auto prose prose-lg">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600 transition">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">CSRF</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F3A3;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">تزوير الطلبات بين المواقع</h1>
            <p className="text-xl text-gray-500 mt-1">Cross-Site Request Forgery (CSRF)</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي
          </p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="CSRF - تزوير الطلبات" url={"https://web-security-guide.vercel.app/vulnerabilities/csrf"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف CSRF</h2>
        <p>
          تزوير الطلبات بين المواقع (CSRF) هو ثغرة أمنية تسمح للمهاجم بإجبار متصفح المستخدم على إرسال طلب HTTP مزور إلى تطبيق ويب آخر دون علم المستخدم أو موافقته.
        </p>
        <p>
          يستغل المهاجم الثقة التي يوليها التطبيق لمصادقات المستخدم (مثل ملفات تعريف الارتباط الجلسة). عندما يزور المستخدم موقع المهاجم أو صفحة تحتوي على كود مغرض، يتم إرسال طلب تلقائي إلى التطبيق المستهدف باستخدام جلسة المستخدم الحالية.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تعمل هجمات CSRF</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <ol className="list-decimal mr-6 space-y-2">
            <li>يلogue المستخدم إلى موقع الويب المستهدف (مثل البنك الإلكتروني)</li>
            <li>يخزّن المتصفح ملف تعريف الارتباط (Session Cookie) للصيانة</li>
            <li>يزور المستخدم موقع المهاجم أو صفحة تحتوي على كود مغرض</li>
            <li>يتم إرسال طلب HTTP مزور تلقائياً إلى الموقع المستهدف</li>
            <li>يرسل المتصفح ملف تعريف الارتباط مع الطلب تلقائياً</li>
            <li>يقبل الموقع الطلب لأنه يحمل ملف تعريف الارتباط الصحيح</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الهجمات</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. نموذج بنكي مخفي</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`<!-- صفحة مغرضة تحتوي على نموذج مخفي -->
<html>
<body onload="document.getElementById('csrf-form').submit()">
  <form id="csrf-form" action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="to" value="attacker-account" />
    <input type="hidden" name="amount" value="10000" />
  </form>
</body>
</html>`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. صورة مغرضة</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`<!-- استخدام وسم صورة لإرسال طلب GET مزور -->
<img src="https://bank.com/transfer?to=attacker&amount=10000"
     style="display:none" />`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. JavaScript مخفي</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`<!-- كود JavaScript مخفي في صفحة -->
<script>
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://bank.com/transfer", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("to=attacker&amount=10000");
</script>`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة كود مصاب ومحصن</h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x274C; كود مصاب - نموذج بدون حماية</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`<!-- نموذج تحويل بنكي بدون CSRF Token -->
<form action="/transfer" method="POST">
  <input type="text" name="to" placeholder="الحساب المستلم" />
  <input type="number" name="amount" placeholder="المبلغ" />
  <button type="submit">تحويل</button>
</form>`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن - نموذج مع CSRF Token</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`<!-- نموذج مع CSRF Token -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}" />
  <input type="text" name="to" placeholder="الحساب المستلم" />
  <input type="number" name="amount" placeholder="المبلغ" />
  <button type="submit">تحويل</button>
</form>

<!-- في الخادم (Node.js/Express) -->
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/transfer', csrfProtection, (req, res) => {
  res.render('transfer', { csrfToken: req.csrfToken() });
});

app.post('/transfer', csrfProtection, (req, res) => {
  // يتم التحقق من CSRF Token تلقائياً
  // إذا كان الطلب مزوراً، سيرفض
});`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. رموز CSRF (CSRF Tokens)</h3>
            <p>
              يتم إنشاء رمز فريد لكل جلسة أو طلب ويُرسل مع كل نموذج. يتحقق الخادم من صحة الرمز قبل معالجة الطلب.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// توليد CSRF Token في Node.js
const crypto = require('crypto');

function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

// تخزين الرمز في الجلسة
req.session.csrfToken = generateCsrfToken();

// التحقق من الرمز في الطلبات POST
function verifyCsrfToken(req, res, next) {
  const token = req.body._csrf || req.headers['x-csrf-token'];
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'CSRF token invalid' });
  }
  next();
}`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. SameSite Cookies</h3>
            <p>
              تحدد الخاصية SameSite متى يتم إرسال ملفات تعريف الارتباط. القيمة &quot;Strict&quot; تمنع الإرسال في الطلبات بين المواقع.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// إعداد SameSite Cookie في Node.js
res.cookie('sessionId', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',  // يمنع إرسال الكوكيز في الطلبات بين المواقع
  maxAge: 24 * 60 * 60 * 1000
});

// في Python/Django
SESSION_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_SAMESITE = 'Strict'`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. التحقق من رؤوس Origin و Referer</h3>
            <p>
              تحقق من رؤوس HTTP للتأكد من أن الطلب قادم من مصدر موثوق.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// التحقق من Origin و Referer في Node.js
function checkOrigin(req, res, next) {
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = ['https://yourdomain.com'];
  
  if (!origin || !allowedOrigins.some(o => origin.startsWith(o))) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  next();
}

// استخدام مع Express
app.use('/api', checkOrigin, apiRoutes);`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. المصادقة الثنائية (2FA) للعمليات الحساسة</h3>
            <p>
              تتطلب المصادقة الثنائية للمعاملات المالية أو تغييرات الحساب، مما يضيف طبقة حماية إضافية.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نصائح أمنية</h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>القاعدة الذهبية:</strong> استخدم CSRF Token في جميع النماذج</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>فعّل SameSite=Strict على جميع الكوكيز الحساسة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم POST بدلاً من GET للعمليات الحساسة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>تحقق من رؤوس Origin و Referer في الطلبات المهمة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>أضف المصادقة الثنائية للعمليات المالية</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام GET للعمليات المالية</h4>
            <p className="text-gray-600 mb-0">طلبات GET يمكن حقنها بسهولة في صفحات مغرضة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم استخدام CSRF Token</h4>
            <p className="text-gray-600 mb-0">بدون CSRF Token، النماذج معرضة للتزوير بسهولة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام SameSite=None</h4>
            <p className="text-gray-600 mb-0">يسمح بإرسال الكوكيز في الطلبات بين المواقع</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="csrf" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="csrf" />
      </section>

      <section className="mb-12">
        <Quiz slug="csrf" />
        <VideoSection slug="csrf" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
          <Link href="/vulnerabilities/ssrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F5A5;&#xFE0F;</span>
            <h4 className="font-bold mt-2">SSRF</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
