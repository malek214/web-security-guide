import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function NoSqlInjectionPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">NoSQL Injection</span>
      </nav>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F5C4;&#xFE0F;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">حقن قواعد البيانات غير العلائقية</h1>
            <p className="text-xl text-gray-500 mt-1">NoSQL Injection</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold mb-0">&#x26A0; مستوى الخطورة: عالية</p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="NoSQL Injection" url={"https://web-security-guide.vercel.app/vulnerabilities/nosql-injection"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف NoSQL Injection</h2>
        <p>
          حقن قواعد البيانات غير العلائقية (NoSQL Injection) هو هجوم يستهدف قواعد البيانات
          غير العلائقية مثل MongoDB و CouchDB و Redis.
        </p>
        <p>
          يتم حقن مشغلات (Operators) غير متوقعة في الطلبات للتحايل على المصادقة
          أو الوصول لبيانات غير مصرح بها.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواعه</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. حقن المشغلات (Operator Injection)</h3>
            <p>استخدام مشغلات MongoDB مثل <code>$gt</code> و <code>$ne</code> للتحايل.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. حقن JavaScript</h3>
            <p>استخدام <code>$where</code> لتنفيذ أكواد JavaScript على الخادم.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. حقن BSON</h3>
            <p>تحريف استعلامات BSON لتعديل الاستعلام.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة على الكود</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3">&#x274C; كود مصاب</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// MongoDB - كود مصاب
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // الاستعلام مصاب بحقن NoSQL
  const user = await User.findOne({
    username: username,
    password: password
  });
  
  if (user) {
    res.json({ success: true, token: generateToken(user) });
  } else {
    res.status(401).json({ success: false });
  }
});

// المهاجم يرسل:
// POST /login
// {"username": {"$ne": ""}, "password": {"$ne": ""}}
// سيتسجيل الدخول لأي مستخدم!`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-3">&#x2705; كود محصن</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`// MongoDB - كود محصن
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // التحقق من أن المدخلات نصوص
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  
  // استخدام Mongoose Schema مع strict mode
  const user = await User.findOne({
    username: username,
    password: await bcrypt.hash(password, 12)
  });
  
  if (user) {
    res.json({ success: true, token: generateToken(user) });
  } else {
    res.status(401).json({ success: false });
  }
});

// تعطيل المشغلات في MongoDB
// mongod --setParameter enableOperatorInjection=false`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">1. التحقق من نوع البيانات</h4>
            <p className="text-gray-600 mb-0">تأكد من أن كل حقل يحتوي على النوع المتوقع</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">2. استخدام Schema Validation</h4>
            <p className="text-gray-600 mb-0">حدد هيكل البيانات في قاعدة MongoDB</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">3. تعطيل المشغلات</h4>
            <p className="text-gray-600 mb-0">استخدم <code>--setParameter enableOperatorInjection=false</code></p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="nosql-injection" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="nosql-injection" />
      </section>

      <section className="mb-12">
        <Quiz slug="nosql-injection" />
        <VideoSection slug="nosql-injection" />
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
          <Link href="/vulnerabilities/ldap-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4C2;</span>
            <h4 className="font-bold mt-2">LDAP Injection</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
