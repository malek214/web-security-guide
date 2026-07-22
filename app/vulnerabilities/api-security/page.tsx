import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'

export default function ApiSecurityPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">🔐</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">أمن واجهات البرمجة</h1>
            <p className="text-xl text-gray-500 mt-1">API Security</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <span className="inline-block bg-danger-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
            خطيرة جداً
          </span>
          <p className="text-gray-700 mb-0">
            واجهات البرمجة (APIs) هي العمود الفقري لتطبيقات الويب الحديثة. إذا لم تُحمَّ بشكل صحيح، يمكن للمهاجمين الوصول إلى البيانات الحساسة، وسرقة معلومات المستخدمين، وحتى السيطرة على النظام بالكامل. حسب تصنيف OWASP API Security Top 10، تُعد ثغرات API من أكثر الثغرات شيوعاً وخطورة.
          </p>
        </div>
      </section>

      {/* Definition Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تعريف أمن واجهات البرمجة</h2>
        <p>
          أمن واجهات البرمجة (API Security) هو مجموعة من الممارسات والتقنيات المستخدمة لحماية واجهات البرمجة (APIs) من الهجمات وال Threats المختلفة. تُعرّف API كواجهة برمجية تسمح بالاتصال بين التطبيقات المختلفة، وتُستخدم لتبادل البيانات والخدمات.
        </p>
        <p>
          تشمل APIs أنواعاً مختلفة مثل:
        </p>
        <ul>
          <li><strong>REST APIs:</strong> الأكثر شيوعاً، تعمل فوق HTTP باستخدام JSON</li>
          <li><strong>GraphQL APIs:</strong> بديل مرن لـ REST يسمح بالاستعلامات المخصصة</li>
          <li><strong>SOAP APIs:</strong> بروتوكول تقليدي يعتمد على XML</li>
          <li><strong>WebSocket APIs:</strong> للاتصالات في الوقت الفعلي</li>
          <li><strong>gRPC:</strong> إطار عمل عالي الأداء للاتصالات بين الخدمات</li>
        </ul>
        <p>
          تُعد APIs نقطة دخول رئيسية للمهاجمين لأنها تتصل مباشرة بقاعدة البيانات والخدمات الداخلية. أي ثغرة في API يمكن أن تؤدي إلى:
        </p>
        <ul>
          <li><strong>سرقة البيانات:</strong> الوصول إلى بيانات المستخدمين الحساسة</li>
          <li><strong>التحكم غير المصرح به:</strong> تعديل أو حذف البيانات</li>
          <li><strong>تعطيل الخدمة:</strong> جعل التطبيق غير متاح</li>
          <li><strong>التحكم في النظام:</strong> في الحالات الشديدة، الوصول الكامل للخادم</li>
        </ul>
      </section>

      {/* Vulnerabilities Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">ثغرات API الشائعة</h2>

        {/* 1. BOLA */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">1. Broken Object Level Authorization (BOLA)</h3>
          <p>
            تُعد هذه الثغرة الأكثر شيوعاً في تطبيقات API. تحدث عندما يمكن للمهاجم الوصول إلى كائنات (objects) لا يملك صلاحية الوصول إليها عن طريق تعديل معرف الكائن (ID) في الطلب.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`// مثال على هجوم BOLA
// الطلب الأصلي (مستخدم عادي):
GET /api/users/123/orders

// الطلب المعدّل (المهاجم يغيّر المعرف):
GET /api/users/456/orders

// إذا كان الخادم لا يتحقق من الصلاحيات، سيحصل المهاجم على بيانات المستخدم 456`}</code></pre>
          </div>
        </div>

        {/* 2. Broken Authentication */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">2. Broken Authentication (ضعف المصادقة)</h3>
          <p>
            تحدث عندما تكون آليات المصادقة (Authentication) ضعيفة أو غير مُنفّذة بشكل صحيح. يشمل ذلك كلمات مرور ضعيفة، وسرقة التوكن، وضعف إدارة الجلسات.
          </p>
          <ul>
            <li>缺少 Rate Limiting على محاولات تسجيل الدخول</li>
            <li>缺允许 كلمات مرور ضعيفة</li>
            <li>缺 يُعيد استخدام التوكن (Token) القديم</li>
            <li>缺 لا يُوقّت الجلسات تلقائياً</li>
          </ul>
        </div>

        {/* 3. Excessive Data Exposure */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">3. Excessive Data Exposure (التعرض المفرط للبيانات)</h3>
          <p>
            تحدث عندما يقوم API بإرجاع المزيد من البيانات ممّا يحتاجه العميل. المهاجم يمكنه التقاط هذه البيانات من حركة المرور بين العميل والخادم.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`// مثال: API يُعيد بيانات زائد
GET /api/users/me

// الاستجابة تُعيد كل شيء:
{
  "id": 123,
  "name": "أحمد",
  "email": "ahmed@example.com",
  "password_hash": "$2b$10$...",  // ❌ لا حاجة لإرسالها
  "credit_card": "4532-...",       // ❌ لا حاجة لإرسالها
  "ssn": "123-45-6789",           // ❌ لا حاجة لإرسالها
  "internal_notes": "..."         // ❌ لا حاجة لإرسالها
}`}</code></pre>
          </div>
        </div>

        {/* 4. Lack of Resources & Rate Limiting */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">4. Lack of Resources & Rate Limiting (نقص الموارد وتحديد المعدل)</h3>
          <p>
            تحدث عندما لا يُحدد API عدد الطلبات المسموح بها خلال فترة زمنية معينة. هذا يسمح للمهاجم بـ:
          </p>
          <ul>
            <li>تنفيذ هجمات Brute Force على كلمات المرور</li>
            <li>استنزاف موارد الخادم (Denial of Service)</li>
            <li>استخراج البيانات بشكل مكثف</li>
          </ul>
        </div>

        {/* 5. Broken Function Level Authorization */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">5. Broken Function Level Authorization (ضعف صلاحيات الدوال)</h3>
          <p>
            تحدث عندما يمكن للمستخدم العادي الوصول إلى دوال تُخصّص للمشرفين فقط. المهاجم يستغل عدم التحقق من الصلاحيات على مستوى الدوال.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`// مثال: دالة مخصصة للمشرفين فقط
DELETE /api/users/123

// إذا لم يتحقق الخادم من صلاحيات المستخدم، يمكن لأي مستخدم حذف حسابات أخرى`}</code></pre>
          </div>
        </div>

        {/* 6. Mass Assignment */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">6. Mass Assignment (التعيين الجماعي)</h3>
          <p>
            تحدث عندما يقوم API بتطبيق جميع الخصائص المُرسلة في الطلب على الكائن، بما في ذلك那些 غير المقصودة. المهاجم يمكنه إضافة خصائص غير مصرح بها.
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
            <pre><code className="font-mono text-sm">{`// مثال على هجوم Mass Assignment
// الطلب الأصلي (تسجيل مستخدم جديد):
POST /api/users
{
  "name": "أحمد",
  "email": "ahmed@example.com",
  "password": "123456"
}

// الطلب المعدّل (المهاجم يضيف حقل role):
POST /api/users
{
  "name": "مهاجم",
  "email": "attacker@evil.com",
  "password": "hacked",
  "role": "admin"  // ❌ محاولة ترقية الصلاحيات
}`}</code></pre>
          </div>
        </div>

        {/* 7. Security Misconfiguration */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">7. Security Misconfiguration (خطأ في التكوين الأمني)</h3>
          <p>
            تشمل الأخطاء الأمنية في تكوين API مثل:
          </p>
          <ul>
            <li>缺 استخدام اتصال HTTP بدلاً من HTTPS</li>
            <li>缺 عدم تفعيل CORS بشكل صحيح</li>
            <li>缺 عرض رسائل خطأ مفصلة تحتوي معلومات حساسة</li>
            <li>缺 استخدام إعدادات افتراضية غير آمنة</li>
            <li>缺 عدم تعطيل الميزات غير المستخدمة</li>
          </ul>
        </div>

        {/* 8. Injection */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">8. Injection (الحقن)</h3>
          <p>
            تحدث عندما يقوم المهاجم بحقن أكواد ضارة في مدخلات API. تشمل أنواع الحقن:
          </p>
          <ul>
            <li><strong>SQL Injection:</strong> حقن أكواد SQL في الاستعلامات</li>
            <li><strong>NoSQL Injection:</strong> حقن أكواد في قواعد البيانات غير العلائقية</li>
            <li><strong>OS Command Injection:</strong> تنفيذ أوامر نظام</li>
            <li><strong>LDAP Injection:</strong> حقن في استعلامات Director</li>
            <li><strong>GraphQL Injection:</strong> حقن في استعلامات GraphQL</li>
          </ul>
        </div>

        {/* 9. Improper Assets Management */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">9. Improper Assets Management (إدارة غير سليمة للأصول)</h3>
          <p>
            تحدث عندما يتم نشر نسخ قديمة من API دون تحديثات أمنية، أو عدم حذف endpoints غير مستخدمة. المهاجم يمكنه استغلال هذه النسخ القديمة.
          </p>
          <ul>
            <li>缺 عدم حذف النسخ القديمة من API (v1، v2، etc.)</li>
            <li>缺 عدم تحديث endpoints القديمة مع التحديثات الأمنية</li>
            <li>缺 عدم توثيق جميع endpoints النشطة</li>
          </ul>
        </div>

        {/* 10. Insufficient Logging & Monitoring */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">10. Insufficient Logging & Monitoring (نقص التسجيل والمراقبة)</h3>
          <p>
            تحدث عندما لا يسجّل API الأنشطة المشبوهة بشكل كافٍ. هذا يمنع اكتشاف الهجمات والاستجابة لها في الوقت المناسب.
          </p>
          <ul>
            <li>缺 عدم تسجيل محاولات تسجيل الدخول الفاشلة</li>
            <li>缺 عدم تسجيل الوصول للبيانات الحساسة</li>
            <li>缺 عدم مراقبة الطلبات غير الطبيعية</li>
            <li>缺 عدم إرسال تنبيهات عند اكتشاف Threats</li>
          </ul>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أمثلة عملية على الأكواد</h2>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 1: Broken Object Level Authorization (BOLA)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود ضعيف
app.get('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  
  // ❌ لا يوجد تحقق من صلاحيات المستخدم
  const order = await db.orders.findById(orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});`}</code></pre>
            </div>
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-danger-700 mb-0">
                <strong>المشكلة:</strong> لا يوجد تحقق من أن المستخدم يملك صلاحية الوصول لهذا الطلب. المهاجم يمكنه تغيير المعرف للوصول لطلبات المستخدمين الآخرين.
              </p>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود آمن
app.get('/api/orders/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id; // المستخدم الحالي
  
  // ✅ التحقق من أن الطلب ينتمي للمستخدم
  const order = await db.orders.findOne({
    _id: orderId,
    userId: userId  // فلترة حسب المستخدم
  });
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});`}</code></pre>
            </div>
            <div className="bg-success-50 border border-success-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-success-700 mb-0">
                <strong>الحل:</strong> التحقق من أن المستخدم يملك صلاحية الوصول لهذا الكائن عن طريق فلترة حسب معرف المستخدم.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 2: Broken Authentication</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود ضعيف
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // ❌ لا يوجد Rate Limiting
  // ❌ لا يوجد تحقق من قوة كلمة المرور
  const user = await db.users.findOne({ email });
  
  if (!user || user.password !== password) {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      // ❌ رسالة خطأ مفصلة تساعد المهاجم
      hint: user ? 'Wrong password' : 'Email not found'
    });
  }
  
  // ❌ التوكن لا ينتهي أبداً
  const token = jwt.sign({ userId: user.id }, SECRET);
  res.json({ token });
});`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود آمن
const rateLimit = require('express-rate-limit');

// Rate Limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5, // 5 محاولات فقط
  message: { error: 'Too many attempts' }
});

app.post('/api/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.users.findOne({ email });
  
  // ✅ رسالة خطأ عامة فقط
  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid credentials' 
    });
  }
  
  // ✅ استخدام bcrypt للمقارنة
  const validPassword = await bcrypt.compare(
    password, user.password
  );
  
  if (!validPassword) {
    return res.status(401).json({ 
      error: 'Invalid credentials' 
    });
  }
  
  // ✅ التوكن ينتهي خلال ساعة
  const token = jwt.sign(
    { userId: user.id }, 
    SECRET, 
    { expiresIn: '1h' }
  );
  res.json({ token });
});`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 3: Mass Assignment</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود ضعيف
app.post('/api/users', async (req, res) => {
  // ❌ تطبيق جميع الخصائص المُرسلة
  const user = await db.users.create(req.body);
  
  res.json(user);
});

// إذا أرسل المهاجم:
// { "name": "hacker", "email": "h@evil.com", "role": "admin" }
// سيُنشئ المستخدم بصلاحية admin!`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود آمن
app.post('/api/users', async (req, res) => {
  // ✅ تحديد الحقول المسموح بها
  const allowedFields = ['name', 'email', 'password'];
  const sanitizedData = {};
  
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      sanitizedData[field] = req.body[field];
    }
  }
  
  const user = await db.users.create(sanitizedData);
  res.json(user);
});

// أو باستخدام Joi للتحقق
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
  // ❌ لا يوجد حقل role في السماح
});

const { error, value } = schema.validate(req.body);
if (error) return res.status(400).json({ error: error.details });
  
const user = await db.users.create(value);`}</code></pre>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">مثال 4: Rate Limiting و Brute Force</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vulnerable Code */}
          <div>
            <h4 className="text-lg font-semibold text-danger-700 mb-3">كود ضعيف ❌</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود ضعيف
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // ❌ لا يوجد أي Rate Limiting
  // المهاجم يمكنه تجربة ملايين كلمات المرور
  const user = await db.users.findOne({ email });
  
  if (user && user.password === password) {
    return res.json({ token: generateToken(user) });
  }
  
  res.status(401).json({ error: 'Wrong credentials' });
});`}</code></pre>
            </div>
          </div>

          {/* Secure Code */}
          <div>
            <h4 className="text-lg font-semibold text-success-700 mb-3">كود آمن ✅</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre><code className="font-mono text-sm">{`// Node.js/Express - كود آمن
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Rate Limiting على مستوى التطبيق
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5, // 5 محاولات
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts' }
});

// إبطاء الاستجابة بعد محاولات كثيرة
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 3,
  delayMs: 500
});

app.post('/api/login', 
  loginLimiter, 
  speedLimiter, 
  async (req, res) => {
  // ... باقي الكود
});`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تكتشف ثغرات API Security</h2>

        <h3 className="text-2xl font-semibold text-gray-800">علامات وجود الثغرة</h3>
        <ul>
          <li>إمكانية الوصول لبيانات مستخدمين آخرين بتغيير المعرفات</li>
          <li>استجابة API تُعيد بيانات حساسة غير ضرورية</li>
          <li>عدم وجود Rate Limiting على endpoints الحساسة</li>
          <li>رسائل خطأ مفصلة تكشف معلومات النظام</li>
          <li>عدم تفعيل HTTPS على جميع endpoints</li>
          <li>وجود نسخ قديمة من API غير مُحدّثة</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">أدوات الاكتشاف</h3>
        <ul>
          <li><strong>OWASP API Security Project:</strong> دليل شامل وأدوات لاختبار API</li>
          <li><strong>Burp Suite:</strong> منصة شاملة لاختبار أمن التطبيقات</li>
          <li><strong>Postman:</strong> أداة اختبار APIs مع إمكانية اختبار الأمان</li>
          <li><strong>OWASP ZAP:</strong> أداة مجانية لفحص ثغرات APIs</li>
          <li><strong>Nuclei:</strong> أداة فحص ثغرات مخصصة لـ APIs</li>
          <li><strong>Arjun:</strong> أداة اكتشاف endpoints المخفية في APIs</li>
        </ul>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`# مثال على اختبار API Security باستخدام curl

# اختبار BOLA - تغيير معرف المستخدم
curl -H "Authorization: Bearer <token>" \\
  https://api.example.com/users/123

# اختبار مع معرف مستخدم آخر
curl -H "Authorization: Bearer <token>" \\
  https://api.example.com/users/456

# اختبار Excessive Data Exposure
curl -H "Authorization: Bearer <token>" \\
  https://api.example.com/users/me | jq .

# اختبار Rate Limiting
for i in {1..100}; do
  curl -s -o /dev/null -w "%{http_code}\\n" \\
    -X POST https://api.example.com/login \\
    -d "email=test@test.com&password=wrong"
done

# استخدام Nuclei لفحص APIs
nuclei -u https://api.example.com -t api/`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">حركات اختبار شائعة</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="mb-0">
            <li><code>GET /api/users/{'{user_id}'}</code> - اختبار BOLA بتغيير المعرف</li>
            <li><code>GET /api/admin/users</code> - اختبار Broken Function Level Authorization</li>
            <li><code>POST /api/users</code> مع إضافة <code>&quot;role&quot;: &quot;admin&quot;</code> - اختبار Mass Assignment</li>
            <li>إرسال 100+ طلب في الدقيقة - اختبار Rate Limiting</li>
            <li><code>GET /api/v1/users</code> - اختبار النسخ القديمة</li>
            <li>إرسال request bodies كبيرة جداً - اختبار Resource Exhaustion</li>
          </ul>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">كيف تمنع ثغرات API Security</h2>

        <h3 className="text-2xl font-semibold text-gray-800">1. المصادقة القوية (Strong Authentication)</h3>
        <ul>
          <li>استخدم OAuth 2.0 أو JWT مع توقيع قوي</li>
          <li>فعّل المصادقة الثنائية (2FA) للحسابات الحساسة</li>
          <li>استخدم كلمات مرور قوية ومُعرّفات فريدة</li>
          <li>أوقّت الجلسات تلقائياً</li>
        </ul>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js - مثال على JWT آمن
const jwt = require('jsonwebtoken');

// إنشاء توكن آمن
function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '1h',        // انتهاء صلاحية
      algorithm: 'HS256',     // خوارزمية قوية
      issuer: 'myapp',        // مُصدر التوكن
      audience: 'myapp-api'   // الجمهور المستهدف
    }
  );
}

// التحقق من التوكن
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: 'myapp',
    audience: 'myapp-api'
  });
}`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">2. التحقق من الصلاحيات (Authorization)</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js/Express - middleware للتحقق من الصلاحيات
function authorize(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// استخدام middleware
app.delete('/api/users/:id', 
  authenticate, 
  authorize(['admin']), 
  deleteUser
);

// التحقق من صلاحيات الكائن (Object-level)
async function checkOwnership(req, res, next) {
  const resource = await db.findById(req.params.id);
  
  if (!resource) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  if (resource.userId !== req.user.id && 
      req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  req.resource = resource;
  next();
}`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">3. تحديد المعدل (Rate Limiting)</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js - إعدادات Rate Limiting متنوعة
const rateLimit = require('express-rate-limit');

// Rate Limiting عام
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب
  standardHeaders: true,
  legacyHeaders: false
});

// Rate Limiting للتسجيل
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});

// Rate Limiting للـ API الحساسة
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 1000, // دقيقة واحدة
  max: 10,
  keyGenerator: (req) => req.user.id
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);
app.use('/api/admin/', sensitiveLimiter);`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">4. التحقق من صحة المدخلات (Input Validation)</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js مع Joi
const Joi = require('joi');

// مخطط التحقق من بيانات المستخدم
const userSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'
    })
});

// middleware للتحقق
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: error.details[0].message 
      });
    }
    next();
  };
}

app.post('/api/users', validate(userSchema), createUser);`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">5. استخدام HTTPS</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js/Express - إجبار HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, \`https://\${req.headers.host}\${req.url}\`);
  }
  next();
});

// أو في next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">6. CORS (Cross-Origin Resource Sharing)</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js/Express - إعداد CORS آمن
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    // السماح بمصادر محددة فقط
    const allowedOrigins = [
      'https://myapp.com',
      'https://www.myapp.com'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));`}</code></pre>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">7. التسجيل والمراقبة (Logging & Monitoring)</h3>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
          <pre><code className="font-mono text-sm">{`// Node.js - تسجيل الأنشطة الأمنية
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ 
      filename: 'security.log' 
    })
  ]
});

// تسجيل محاولات تسجيل الدخول
app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  const ip = req.ip;
  
  try {
    // ... منطق تسجيل الدخول
    logger.info('Login successful', {
      email,
      ip,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.warn('Login failed', {
      email,
      ip,
      reason: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// تسجيل الوصول للبيانات الحساسة
app.get('/api/users/:id', authenticate, async (req, res) => {
  logger.info('User data accessed', {
    accessorId: req.user.id,
    targetId: req.params.id,
    endpoint: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});`}</code></pre>
        </div>
      </section>

      {/* Security Tips Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">نصائح أمنية مهمة</h2>

        <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="font-bold text-success-800 mb-2">القاعدة الذهبية</h4>
              <p className="mb-0 text-success-700">
                لا تثق أبداً بالعميل (Client). جميع التحقق من الصلاحيات والمصادقة يجب أن يتم على الخادم. المدخلات كلها يجب أن تُعتبر ضارة حتىثبت العكس.
              </p>
            </div>
          </div>
        </div>

        <ul>
          <li><strong>استخدم OWASP API Security Top 10:</strong> كمرجع لفحص تطبيقك</li>
          <li><strong>طبّق المبدأ الأدنى (Least Privilege):</strong> أعطِ كل خدمة أقل صلاحيات تحتاجها</li>
          <li><strong>استخدم API Gateway:</strong> لإدارة المصادقة والتحقق من الصلاحيات</li>
          <li><strong>فعّل التشفير:</strong> استخدم TLS لجميع الاتصالات</li>
          <li><strong>حدّث API بانتظام:</strong> حذف النسخ القديمة وتحديث endpoints</li>
          <li><strong>راجع الكود بشكل أمني:</strong> افحص جميع endpoints بشكل دوري</li>
          <li><strong>استخدم Static Analysis:</strong> أدوات مثل OWASP ZAP و Burp Suite</li>
          <li><strong>سجّل جميع الأنشطة:</strong> راقب الطلبات المشبوهة</li>
          <li><strong>استخدم Schema Validation:</strong> للتحقق من شكل البيانات المُرسلة</li>
          <li><strong>استخدم Dependency Scanning:</strong> للتحقق من ثغرات المكتبات المستخدمة</li>
        </ul>
      </section>

      {/* Common Mistakes Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">الأخطاء الشائعة التي يجب تجنبها</h2>

        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم التحقق من الصلاحيات على الكائنات</h4>
            <p className="text-danger-700 mb-0">
              استخدام معرف المستخدم من الطلب بدلاً من التوكن للمصادقة. هذا يسمح بـ BOLA.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام كلمات مرور ضعيفة أو قديمة</h4>
            <p className="text-danger-700 mb-0">
              عدم فرض قواعد قوية لكلمات المرور أو استخدام خوارزميات تشفير قديمة مثل MD5.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم استخدام Rate Limiting</h4>
            <p className="text-danger-700 mb-0">
              عدم تحديد عدد الطلبات المسموح بها يسمح بهجمات Brute Force و Denial of Service.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ إرجاع بيانات زائدة في الاستجابة</h4>
            <p className="text-danger-700 mb-0">
              إرسال جميع خصائص الكائن بدلاً من الحقول المطلوبة فقط. هذا يكشف بيانات حساسة.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام HTTP بدلاً من HTTPS</h4>
            <p className="text-danger-700 mb-0">
              عدم تشفير حركة المرور يسمح بالتنصت على البيانات الحساسة مثل التوكن وكلمات المرور.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم تحديث النسخ القديمة من API</h4>
            <p className="text-danger-700 mb-0">
              الاحتفاظ بنسخ قديمة (v1, v2) دون تحديثات أمنية يترك ثغرات مفتوحة.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ عدم تسجيل الأنشطة الأمنية</h4>
            <p className="text-danger-700 mb-0">
              عدم تسجيل محاولات تسجيل الدخول الفاشلة والوصول للبيانات الحساسة يمنع اكتشاف الهجمات.
            </p>
          </div>

          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-800 mb-2">❌ استخدام التوكن في URL</h4>
            <p className="text-danger-700 mb-0">
              وضع التوكن في query string يسمح بتسجيله في سجلات الخادم والمتصفحات.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">تأثير الثغرة ومدى خطورتها</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على السرية</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - سرقة البيانات الحساسة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على النزاهة</h4>
            <p className="text-danger-700 mb-0">مرتفع جداً - تعديل البيانات والتحكم غير المصرح به</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🔴</div>
            <h4 className="font-bold text-danger-800 mb-2">التأثير على التوفر</h4>
            <p className="text-danger-700 mb-0">مرتفع - تعطيل الخدمات واستنزاف الموارد</p>
          </div>
        </div>

        <blockquote className="border-r-4 border-danger-500 pr-4 italic text-gray-600 my-6">
          وفقاً لـ OWASP، تُعد ثغرات API من أكثر Threats أمنية نمواً. في عام 2023، أثرت على أكثر من 90% من تطبيقات الويب التي تستخدم APIs. يُقدر أن ثغرات API تسبب خسائر تتجاوز مليار دولار سنوياً بسبب سرقة البيانات والهجمات.
        </blockquote>

        <h3 className="text-2xl font-semibold text-gray-800">أمثلة حقيقية على هجمات API</h3>
        <ul>
          <li><strong>Facebook (2019):</strong> ثغرة في API سمح بسرقة أرقام هواتف 533 مليون مستخدم</li>
          <li><strong>Twitter (2022):</strong> ثغرة API سمح بجمع بيانات 5.4 مليون مستخدم</li>
          <li><strong>T-Mobile (2023):</strong> هجوم API على بيانات 37 مليون عميل</li>
          <li><strong>Optus (2022):</strong> ثغرة API في شركة اتصالات أسترالية سمح بسرقة بيانات 10 مليون عميل</li>
        </ul>
      </section>

      <ToolsSection slug="api-security" />
      <VideoSection slug="api-security" />

      {/* Navigation Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">أنواع أخرى من الثغرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/vulnerabilities/sql-injection"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">💉</span>
            <h4 className="font-bold text-gray-900 mb-1">SQL Injection</h4>
            <p className="text-sm text-gray-600 mb-0">حقن SQL</p>
          </Link>
          <Link
            href="/vulnerabilities/xss"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">📜</span>
            <h4 className="font-bold text-gray-900 mb-1">XSS</h4>
            <p className="text-sm text-gray-600 mb-0">برمجة النصوص بين المواقع</p>
          </Link>
          <Link
            href="/vulnerabilities/csrf"
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
          >
            <span className="text-2xl block mb-2">🎣</span>
            <h4 className="font-bold text-gray-900 mb-1">CSRF</h4>
            <p className="text-sm text-gray-600 mb-0">تزوير الطلبات بين المواقع</p>
          </Link>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </section>
    </div>
  )
}