import Link from "next/link";
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function DNSRebindingPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-red-900 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            إعادة ربط DNS - DNS Rebinding
          </h1>
          <p className="text-xl text-red-100">
            ثغرة أمنية تسمح لمهاجم بتحويل اتصالات المستخدم إلى شبكات داخلية
          </p>
          <span className="inline-block mt-4 px-3 py-1 bg-red-800 rounded-full text-sm">
            مستوى الخطورة: متوسط إلى عالي
          </span>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mb-6">
        <ShareButtons title="إعادة ربط DNS" url={"https://web-security-guide.vercel.app/vulnerabilities/dns-rebinding"} />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Definition */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            ما هي ثغرة إعادة ربط DNS؟
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="leading-relaxed mb-4">
              <strong>إعادة ربط DNS (DNS Rebinding)</strong> هي ثغرة أمنية تعتمد
              على التلاعب بخوادم DNS لتغيير العنوان IP المرتبط بنطاق معين بعد
              أول طلب DNS. يقوم المهاجم بإنشاء نطاق مخادع يردّ على عنوان IP خارجي
              أولاً، ثم يغيّر الرد ليشير إلى عنوان IP داخلي (مثل{" "}
              <code className="bg-gray-100 px-1 rounded">127.0.0.1</code> أو{" "}
              <code className="bg-gray-100 px-1 rounded">192.168.1.1</code>)
              بعد مرور وقت قصير.
            </p>
            <p className="leading-relaxed">
              يعتمد الهجوم على ميزات التخزين المؤقت (Caching) في متصفح المستخدم
              أو خادم DNS، حيث يتم إعادة استخدام العنوان IP المخزّن مؤقتاً دون
              التحقق من صحته في كل مرة.
            </p>
          </div>
        </section>

        {/* How it Works */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            كيف تعمل إعادة ربط DNS؟
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  إنشاء نطاق مخادع
                </h3>
                <p className="leading-relaxed">
                  ينشئ المهاجم نطاقاً جديداً (مثل{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    malicious.example.com
                  </code>
                  ) ويثبّت خادم DNS خاصاً يتحكم في الردود.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  الأول DNS - الرد الأول
                </h3>
                <p className="leading-relaxed">
                  عند أول طلب DNS من المستخدم، يردّ المهاجم بعنوان IP خارجي
                  (مثل <code className="bg-gray-100 px-1 rounded">1.2.3.4</code>)
                  مع TTL قصير جداً (ثوانٍ قليلة). هذا العنوان يبدو شرعياً
                  ويتجاوز فحوصات الأمان الأولية.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  انتهاء TTL وتجديد الطلب
                </h3>
                <p className="leading-relaxed">
                  بعد انتهاء مهلة TTL، يطلب المتصفح العنوان مرة أخرى. هذا
                  الوقت يردّ المهاجم بعنوان IP داخلي (مثل{" "}
                  <code className="bg-gray-100 px-1 rounded">192.168.1.1</code>{" "}
                  وهو عنوان الراوتر). يتم الآن &quot;إعادة الربط&quot; إلى الشبكة
                  الداخلية.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">استغلال الوصول الداخلي</h3>
                <p className="leading-relaxed">
                  теперь يحاول المتصفح الوصول إلى العنوان الداخلي بناءً على
                  ثقة المستخدم في النطاق. يمكن للمهاجم إجراء طلبات HTTP
                  مزيفة إلى الخدمات الداخلية (لوحة تحكم الراوتر،
                  أجهزة IoT، إلخ).
                </p>
              </div>
            </div>
          </div>

          {/* TTL Diagram */}
          <div className="mt-6 bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`المهاجم                          خادم DNS المخادع                     المستخدم (المتصفح)
  |                                    |                                    |
  |---(1) إنشاء نطاق مخادع------------>|                                    |
  |                                    |                                    |
  |                                    |<----(2) طلب DNS الأول-------------|
  |                                    |----(3) رد: IP خارجي + TTL قصير--->|
  |                                    |                                    |
  |                                    |       (انتهاء TTL - بضع ثوانٍ)     |
  |                                    |                                    |
  |                                    |<----(4) طلب DNS الثاني------------|
  |                                    |----(5) رد: IP داخلي (192.168.1.1)->|
  |                                    |                                    |
  |                                    |<----(6) طلب HTTP للراوتر----------|
  |<----(7) تمرير الطلب من المتصفح-----|------------------------------------|`}</pre>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            أمثلة واقعية على الهجمات
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Router Attack */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-red-600 text-3xl mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">
                هجمات الراوتر
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                يمكن للمهاجم استخدام إعادة ربط DNS للوصول إلى واجهة إدارة
                الراوتر (<code className="bg-gray-100 px-1 rounded">
                  192.168.1.1
                </code>) وتغيير إعدادات DNS أو إنشاء قواعد تحويل
                بريد إلكتروني.
              </p>
            </div>

            {/* Internal Services */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-red-600 text-3xl mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">
                الوصول للخدمات الداخلية
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                يمكن للمهاجم الوصول إلى خدمات الشبكة الداخلية غير المكشوفة
                للإنترنت مثل قواعد البيانات، خوادم التطوير، أو واجهات API
                الخاصة بالشركات.
              </p>
            </div>

            {/* IoT Attacks */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-red-600 text-3xl mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">
                أجهزة IoT
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                يمكن للمهاجم السيطرة على أجهزة إنترنت الأشياء مثل الكاميرات
                والميكروفونات والحساسات من خلال إعادة ربط DNS إلى عناوين
                IP الخاصة بها.
              </p>
            </div>

            {/* Localhost Access */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-red-600 text-3xl mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">
                الوصول إلى localhost
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                يمكن إعادة ربط النطاق إلى{" "}
                <code className="bg-gray-100 px-1 rounded">127.0.0.1</code> للوصول
                إلى خدمات تعمل على جهاز المستخدم مثل{" "}
                <code className="bg-gray-100 px-1 rounded">SSH</code> أو{" "}
                <code className="bg-gray-100 px-1 rounded">Redis</code> بدون
                كلمة مرور.
              </p>
            </div>
          </div>
        </section>

        {/* Detection */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            كيف تكتشف ثغرة إعادة ربط DNS؟
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-green-500 flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>مراقبة تغييرات DNS:</strong> تابع أي تغييرات مفاجئة
                  في عناوين IP المرتبطة بالنطاقات المشبوهة.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>فحص TTL المنخفض جداً:</strong> انتبه للنطاقات التي
                  تستخدم TTL أقل من 60 ثانية، فهذا قد يدل على محاولة إعادة
                  ربط.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>تحليل سجلات HTTP:</strong> راقب الطلبات غير المعتادة
                  إلى عناوين IP خاصة في سجلات الخادم.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <strong>أدوات كشف专门ة:</strong> استخدم أدوات مثل{" "}
                  <code className="bg-gray-100 px-1 rounded">rebinder</code> أو{" "}
                  <code className="bg-gray-100 px-1 rounded">Whonow DNS</code>{" "}
                  لاختبار خوادم DNS المشبوهة.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Prevention */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            كيف تمنع ثغرة إعادة ربط DNS؟
          </h2>
          <div className="space-y-4">
            {/* DNS Pinning */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-green-700">
                1. تثبيت DNS (DNS Pinning)
              </h3>
              <p className="leading-relaxed mb-3">
                قم بتثبيت العنوان IP للنطاقات الموثوقة في تطبيقاتك. هذا يعني
                عدم إعادة طلب العنوان من DNS بعد التأكد من صحته.
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// مثال على DNS Pinning في Node.js
const dns = require('dns');
const cache = {};

function resolveDNS(hostname) {
  if (cache[hostname]) {
    return Promise.resolve(cache[hostname]);
  }
  
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {
      if (err) reject(err);
      cache[hostname] = addresses[0]; // تثبيت العنوان
      resolve(addresses[0]);
    });
  });
}`}</pre>
              </div>
            </div>

            {/* Validate Host Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-green-700">
                2. التحقق من رأس Host
              </h3>
              <p className="leading-relaxed mb-3">
                تأكد من أن رأس Host في الطلبات يطابق النطاق المتوقع. لا تقبل
                الطلبات التي تستخدم عناوين IP بدلاً من النطاقات.
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// middleware.js
export function middleware(request) {
  const host = request.headers.get('host');
  
  // رفض الطلبات التي تستخدم عناوين IP
  if (/^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/.test(host)) {
    return new Response('Forbidden', { status: 403 });
  }
  
  // التحقق من النطاق المسموح
  if (!host.endsWith('yourdomain.com')) {
    return new Response('Forbidden', { status: 403 });
  }
}`}</pre>
              </div>
            </div>

            {/* Use IP directly */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-green-700">
                3. استخدام العنوان IP مباشرة
              </h3>
              <p className="leading-relaxed mb-3">
                في التطبيقات الداخلية، استخدم عناوين IP مباشرة بدلاً من
                النطاقات لتجنب التعرض لهجمات إعادة ربط DNS.
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`# بدلاً من استخدام النطاق
http://internal-service.example.com

# استخدم العنوان IP مباشرة
http://192.168.1.100:8080`}</pre>
              </div>
            </div>

            {/* Other methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-green-700">
                4. إجراءات إضافية
              </h3>
              <ul className="space-y-3 mt-4">
                <li className="flex gap-3">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <div>
                    <strong>استخدام SameSite Cookies:</strong> اضبط ملفات
                    الارتباط على{" "}
                    <code className="bg-gray-100 px-1 rounded">SameSite=Strict</code>{" "}
                    لمنع إرسالها في الطلبات عبر النطاقات.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <div>
                    <strong>تطبيق CORS:</strong> اضبط{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      Access-Control-Allow-Origin
                    </code>{" "}
                    بأقل صلاحيات ممكنة.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <div>
                    <strong>استخدام HTTPS:</strong> افرض استخدام HTTPS لجميع
                    الاتصالات لتشفير البيانات ومنع التنصت.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <div>
                    <strong>مراقبة DNS:</strong> اراقب أي تغييرات في سجلات DNS
                    وقدّم تنبيهات فورية عند اكتشاف نشاط مشبوه.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            نصائح أمنية وأخطاء شائعة
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tips */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-3 text-green-800">
                نصائح أمنية
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    استخدم مكتبات DNS الموثوقة وحدّثها بانتظام
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    افحص جميع طلبات الويب قبل معالجتها
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    احفظ الإعدادات الآمنة في لوحة تحكم الراوتر
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    قم بتحديث خوادم DNS بانتظام
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    استخدم جدران الحماية المتقدمة
                  </span>
                </li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="font-bold text-lg mb-3 text-red-800">
                أخطاء شائعة
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>
                    عدم التحقق من رأس Host في الطلبات
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>
                    استخدام DNS عام بدون حماية
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>
                    عدم تثبيت عناوين IP للنطاقات الموثوقة
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>
                    السماح بطلبات HTTP من أي مصدر
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>
                    عدم مراقبة سجلات DNS
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            روابط ذات صلة
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/vulnerabilities/xss"
              className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 transition-colors"
            >
              <h4 className="font-bold text-red-700 mb-1">
                XSS - Cross-Site Scripting
              </h4>
              <p className="text-sm text-gray-600">
                ثغرة حقن السكربتات عبر المواقع
              </p>
            </Link>
            <Link
              href="/vulnerabilities/ssrf"
              className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 transition-colors"
            >
              <h4 className="font-bold text-red-700 mb-1">
                SSRF - Server-Side Request Forgery
              </h4>
              <p className="text-sm text-gray-600">
                تزوير طلبات من جانب الخادم
              </p>
            </Link>
            <Link
              href="/vulnerabilities/cors"
              className="block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 transition-colors"
            >
              <h4 className="font-bold text-red-700 mb-1">
                CORS Misconfiguration
              </h4>
              <p className="text-sm text-gray-600">
                تكوين خاطئ لمشاركة الموارد
              </p>
            </Link>
          </div>
        </section>

        {/* Tools Section */}
        <section>
          <LabsSection slug="dns-rebinding" />
          <ToolsSection slug="dns-rebinding" />
        </section>

        {/* Video Section */}
        <section>
          <Quiz slug="dns-rebinding" />
          <VideoSection slug="dns-rebinding" />
        </section>

        {/* Navigation */}
        <section className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/vulnerabilities"
            className="flex items-center gap-2 text-red-700 hover:text-red-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            جميع الثغرات
          </Link>
          <Link
            href="/vulnerabilities/ssrf"
            className="flex items-center gap-2 text-red-700 hover:text-red-900 transition-colors"
          >
            SSRF - تزوير طلبات الخادم
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </section>
      </div>
    </main>
  );
}
