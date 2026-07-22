import Link from 'next/link'
import VideoSection from '@/components/VideoSection'

export default function SessionFixationPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F510;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">تثبيت الجلسة</h1>
            <p className="text-xl text-gray-500 mt-1">Session Fixation</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف تثبيت الجلسة</h2>
        <p>
          تثبيت الجلسة (Session Fixation) هي ثغرة أمنية تسمح للمهاجم بتثبيت معرّف جلسة (Session ID) معروف مسبقاً لدى الضحية قبل المصادقة. بعد أن يسجل الدخول الضحية، يستخدم المهاجم المعرّف نفسه للوصول إلى حساب الضحية.
        </p>
        <p>
          تعتمد هذه الثغرة على فكرة بسيطة: إذا كان المهاجم يعرف معرّف جلسة الضحية قبل تسجيل الدخول، فسيتمكن من الوصول إلى الجلسة بعد المصادقة.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف يعمل تثبيت الجلسة</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">خطوات الهجوم</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`1. المهاجم يختار معرّف جلسة ثابت (مثل: "abc123")
2. المهاجم يرسل رابطاً مغرضاً للضحية يحتوي على المعرّف:
   https://example.com/login?session_id=abc123
3. الضحية يفتح الرابط ويسجل الدخول
4. الخادم يربط المعرّف "abc123" بجلسة المستخدم المصادق عليه
5. المهاجم يستخدم المعرّف "abc123" للوصول إلى الحساب`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">الآليات الشائعة للتثبيت</h3>
          <ul className="list-disc mr-6">
            <li><strong> عبر URL:</strong> تمرير Session ID كمعامل في الرابط</li>
            <li><strong> عبر نموذج مخفي:</strong> إدراج Session ID في حقل مخفي في نموذج تسجيل الدخول</li>
            <li><strong> عبر Cookie:</strong> تعيين Session ID في Cookie قبل المصادقة</li>
            <li><strong> عبر XSS:</strong> استخدام ثغرة XSS لتثبيت Session ID في متصفح الضحية</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية بالكود</h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x274C; كود مصاب</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// Node.js/Express - كود مصاب (يقبل Session ID من المستخدم)
app.get('/login', (req, res) => {
  // المهاجم يمكنه تمرير session_id في الرابط
  let sessionId = req.query.session_id;
  
  if (!sessionId) {
    sessionId = generateSessionId();
  }
  
  // ربط الجلسة بالمعرّف المقدم
  req.session.id = sessionId;
  res.redirect('/dashboard');
});

// كود مصاب آخر - عدم تجديد Session ID بعد المصادقة
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (authenticate(username, password)) {
    // الخطأ: لا يتم تجديد Session ID
    req.session.userId = user.id;
    res.redirect('/dashboard');
  }
});`}
            </pre>
          </div>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-success-700 mb-3">&#x2705; كود محصن</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`// Node.js/Express - كود محصن (تجديد Session ID بعد المصادقة)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (authenticate(username, password)) {
    // تجديد Session ID بعد المصادقة بنجاح
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).send('خطأ في الخادم');
      }
      
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          return res.status(500).send('خطأ في الخادم');
        }
        res.redirect('/dashboard');
      });
    });
  }
});

// استخدام express-session مع الإعدادات الآمنة
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,    // HTTPS فقط
    httpOnly: true,  // غير قابل للوصول من JavaScript
    sameSite: 'strict', // حماية CSRF
    maxAge: 24 * 60 * 60 * 1000 // يوم واحد
  }
}));`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف ثغرة تثبيت الجلسة</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>الحفاظ على نفس Session ID بعد تسجيل الدخول</li>
          <li>قبول Session ID من طلبات المستخدمين</li>
          <li>عدم تجديد الجلسة بعد المصادقة</li>
          <li>وجود ثغرات XSS يمكن استغلالها لتثبيت الجلسة</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الاكتشاف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>Burp Suite</strong> - أداة شاملة لاختبار أمن تطبيقات الويب</li>
          <li><strong>OWASP ZAP</strong> - أداة مجانية لاكتشاف الثغرات</li>
          <li><strong>Acunetix</strong> - أداة آلي لاكتشاف ثغرات الويب</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">خطوات الاختبار اليدوي</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// خطوات اختبار تثبيت الجلسة
1. سجّل الدخول واستخرج Session ID من الكوكيز
2. افتح نافذة خفية (Incognito) واستخدم نفس Session ID
3. حاول تسجيل الدخول بالحساب
4. تحقق من الاحتفاظ بـ Session ID القديم
5. استخدم Session ID القديم للوصول إلى الحساب`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. تجديد Session ID بعد المصادقة</h3>
            <p>
              أهم الإجراء هو تجديد Session ID بعد تسجيل الدخول بنجاح. هذا يمنع المهاجم من استخدام المعرّف القديم.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// Node.js مع express-session
req.session.regenerate((err) => {
  req.session.userId = user.id;
  req.session.save();
});

// PHP
session_regenerate_id(true);

// Python/Flask
session.clear()
session['user_id'] = user.id`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. إعدادات Cookie الآمنة</h3>
            <p>
              استخدم الإعدادات الآمنة للكوكيز لتقليل مخاطر تثبيت الجلسة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// إعدادات Cookie الآمنة
Set-Cookie: sessionid=abc123;
  Path=/;
  Secure;        // HTTPS فقط
  HttpOnly;      // غير قابل للوصول من JavaScript
  SameSite=Strict;  // حماية CSRF
  Max-Age=86400  // انتهاء الصلاحية بعد يوم`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. عدم قبول Session ID من المستخدم</h3>
            <p>
              لا تقبل أبداً Session ID من مصادر خارجية مثل الرابط أو النماذج.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// كود مصاب - قبول Session ID من الرابط
app.get('/login', (req, res) => {
  const sessionId = req.query.session_id; // خطر!
  req.session.id = sessionId;
});

// كود محصن - تجاهل أي Session ID من المستخدم
app.get('/login', (req, res) => {
  // يتم تجاهل req.query.session_id
  // الخادم يولد Session ID جديد تلقائياً
  res.render('login');
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. مراقبة اتصالات الجلسة</h3>
            <p>
              راقب وتتبع اتصالات الجلسة لاكتشاف النشاط المشبوه.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// مثال على مراقبة الجلسة
app.use((req, res, next) => {
  if (req.session.userId) {
    const currentIP = req.ip;
    const currentUA = req.get('User-Agent');
    
    // تحقق من تغيير IP أو المتصفح
    if (req.session.lastIP && 
        req.session.lastIP !== currentIP) {
      // تغيير مفاجئ - احتمال تثبيت جلسة
      req.session.destroy();
      return res.redirect('/login');
    }
    
    req.session.lastIP = currentIP;
    req.session.lastUA = currentUA;
  }
  next();
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
              <span><strong>القاعدة الذهبية:</strong> عدّل Session ID دائماً بعد المصادقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>لا تقبل Session ID من مصادر خارجية أبداً</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم Secure و HttpOnly و SameSite للكوكيز</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>احذف ثغرات XSS لأنها يمكن أن تُستخدم لتثبيت الجلسة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم HTTPS لمنع التقاط Session ID</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>عيّن انتهاء صلاحية مناسب لجلسات المستخدمين</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>راقب وتتبع نشاط الجلسة للكشف عن الشذوذ</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم تجديد Session ID بعد المصادقة</h4>
            <p className="text-gray-600 mb-0">الحفاظ على نفس المعرّف يجعل الهجوم ممكناً</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; قبول Session ID من الرابط</h4>
            <p className="text-gray-600 mb-0">السماح بتمرير Session ID كمعامل في URL خطير جداً</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم استخدام Secure و HttpOnly للكوكيز</h4>
            <p className="text-gray-600 mb-0">يسمح بالتقاط أو سرقة Session ID بسهولة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; السماح بـ XSS</h4>
            <p className="text-gray-600 mb-0">ثغرات XSS يمكن أن تُستخدم لتثبيت Session ID في متصفح الضحية</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/csrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">CSRF</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
        </div>
      </section>

      <VideoSection slug="session-fixation" />
    </div>
  )
}
