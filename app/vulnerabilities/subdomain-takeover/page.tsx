import Link from "next/link";
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function SubdomainTakeoverPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100" dir="rtl">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Navigation */}
        <nav className="mb-10 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <Link href="/" className="transition-colors hover:text-cyan-400">
            الرئيسية
          </Link>
          <span>/</span>
          <Link
            href="/vulnerabilities"
            className="transition-colors hover:text-cyan-400"
          >
            الثغرات
          </Link>
          <span>/</span>
          <span className="text-cyan-400">استيلاء على النطاقات الفرعية</span>
        </nav>

        {/* Title */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-cyan-400 md:text-5xl">
            استيلاء على النطاقات الفرعية
          </h1>
          <p className="text-xl text-gray-300">Subdomain Takeover</p>
          <div className="mt-4 inline-block rounded-full bg-red-900/40 px-4 py-1 text-sm text-red-400 ring-1 ring-red-700">
            خطورة: عالية
          </div>
        </header>

        <div className="mb-6">
          <ShareButtons title="استيلاء على النطاقات" url={"https://web-security-guide.vercel.app/vulnerabilities/subdomain-takeover"} />
        </div>

        {/* Definition */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">التعريف</h2>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <p className="mb-4 text-lg leading-relaxed text-gray-300">
              <strong className="text-cyan-400">استيلاء على النطاقات الفرعية (Subdomain Takeover)</strong>{" "}
              هو نوع من أنواع الهجمات التي تسمح للمهاجم بالسيطرة على نطاق فرعي (Subdomain) ينتمي
              لمنظمة معينة، وذلك عن طريق استغلال سجلات DNS معلقة أو غير مستخدمة تشير إلى خدمة
              خارجية لم تعد تحت سيطرة تلك المنظمة.
            </p>
            <p className="leading-relaxed text-gray-300">
              عندما يسجل شخص ما النطاق الفرعي على المنظمة الم的目标 (Target Organization) ويُوجّهه
              عبر سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> إلى
              خدمة خارجية (مثل GitHub Pages أو Heroku) ثم يُنشئ حسابًا على تلك الخدمة باسم النطاق
              الفرعي المُعرّف، يستطيع المهاجم التحكم الكامل بالمحتوى الذي يُقدَّم من ذلك النطاق
              الفرعي.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">كيف يعمل الهجوم</h2>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-900 text-sm font-bold text-cyan-300">
                  1
                </span>
                <h3 className="text-lg font-bold text-white">وجود سجل DNS معلق</h3>
              </div>
              <p className="mr-11 text-gray-300">
                تقوم المنظمة بإنشاء سجل{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يُوجّه
                نطاقًا فرعيًا مثل{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">
                  old-app.example.com
                </code>{" "}
                إلى خدمة خارجية مثل{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">myproject.github.io</code>.
                لاحقًا، تُلغي المنظمة المشروع على تلك الخدمة لكنها تنسى حذف سجل DNS.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-900 text-sm font-bold text-cyan-300">
                  2
                </span>
                <h3 className="text-lg font-bold text-white">المهاجم ي discovers الفرصة</h3>
              </div>
              <p className="mr-11 text-gray-300">
                يكتشف المهاجم أن{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">old-app.example.com</code>{" "}
                يشير إلى خدمة{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">github.io</code> وأن
                المشروع المُعرّف لم يعد موجودًا. يظهر خطأ مثل{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">
                  No such account
                </code>{" "}
                أو{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">
                  There isn&apos;t a GitHub Pages site here.
                </code>
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-900 text-sm font-bold text-cyan-300">
                  3
                </span>
                <h3 className="text-lg font-bold text-white">إنشاء الحساب على الخدمة الخارجية</h3>
              </div>
              <p className="mr-11 text-gray-300">
                ينشئ المهاجم حسابًا أو مشروعًا على الخدمة الخارجية (مثل GitHub) ويُعيّن اسم النطاق
                الفرعي المُستهدف{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">old-app.example.com</code>{" "}
                كنطاق مخصص (Custom Domain).
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-900 text-sm font-bold text-red-300">
                  4
                </span>
                <h3 className="text-lg font-bold text-white">الاستيلاء الكامل</h3>
              </div>
              <p className="mr-11 text-gray-300">
                الآن يُقدِّم النطاق الفرعي محتوى المهاجم. يستطيع المهاجم نشر صفحات تصيد
                (Phishing)، أو سرقة الكوكيز (Cookies)، أو جمع بيانات المستخدمين، أو أي شر آخر
                باستخدام ثقة المستخدمين في النطاق الفرعي الخاص بالمنظمة.
              </p>
            </div>
          </div>

          {/* Diagram */}
          <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-bold text-white">مخطط التدفق</h3>
            <pre className="overflow-x-auto text-left text-sm text-gray-300" dir="ltr">
{`old-app.example.com
        │
        ▼
  ┌─────────────┐     CNAME     ┌──────────────────┐
  │  DNS Record  │ ───────────▶ │ myproject.github.io │
  └─────────────┘               └──────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │  No such account     │
                              │  (المشروع غير موجود) │
                              └──────────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │  المهاجم ينشئ حساب   │
                              │  بنفس الاسم          │
                              └──────────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │  استيلاء كامل         │
                              │  على النطاق الفرعي   │
                              └──────────────────────┘`}
            </pre>
          </div>
        </section>

        {/* Real-world examples */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">أمثلة واقعية</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-orange-400">GitHub Pages</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">username.github.io</code>{" "}
                والمشروع محذوف. يظهر خطأ &quot;There isn&apos;t a GitHub Pages site here.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-purple-400">AWS S3 Bucket</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                دلو S3 محذوف. يظهر خطأ &quot;NoSuchBucket&quot; عند الوصول للنطاق.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-blue-400">Heroku</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                تطبيق Heroku محذوف. يظهر خطأ &quot;No such app&quot; عند الطلب.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-green-400">Shopify</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                متجر Shopify غير النشط. يظهر خطأ &quot;Sorry, this shop is currently unavailable.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-yellow-400">Tencent Cloud</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                خادم Tencent محذوف. يظهر خطأ &quot;The account does not exist&quot;.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-pink-400">Fastly</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                خادم Fastly غير النشط. يظهر خطأ &quot;Fastly error: unknown domain&quot;.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-indigo-400">Azure</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                خدمة Azure محذوفة. يظهر خطأ &quot;Azure Web App - No such website&quot;.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-teal-400">Pantheon</h3>
              <p className="text-sm text-gray-300">
                سجل <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">CNAME</code> يشير إلى
                موقع Pantheon غير النشط. يظهر خطأ &quot;404 error unknown site!&quot;.
              </p>
            </div>
          </div>
        </section>

        {/* Detection */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">طرق الكشف</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-3 text-lg font-bold text-cyan-400">أداة Subjack</h3>
              <p className="mb-3 text-gray-300">
                أداة مفتوحة المصدر لاكتشاف ثغرات استيلاء على النطاقات الفرعية بشكل تلقائي.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-left text-sm text-green-400" dir="ltr">
{`subjack -w domains.txt -t 100 -timeout 30 -o results.txt -c fingerprints.json`}
              </pre>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-3 text-lg font-bold text-cyan-400">أداة Can-I-Take-Over-XYZ</h3>
              <p className="mb-3 text-gray-300">
                أداة تفاعلية لفحص إذا كان النطاق الفرعي معرضًا للtakeover.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-left text-sm text-green-400" dir="ltr">
{`# استخدام CURL لفحص رسائل الخطأ
curl -I https://old-app.example.com

# البحث عن رسائل مميزة
# "There isn't a GitHub Pages site here."
# "No such bucket"
# "No such app"`}
              </pre>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-3 text-lg font-bold text-cyan-400">فحص يدوي</h3>
              <ol className="mr-5 list-decimal space-y-2 text-gray-300">
                <li>
                  استخراج جميع النطاقات الفرعية باستخدام أدوات مثل{" "}
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">subfinder</code> أو{" "}
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">amass</code>
                </li>
                <li>
                  فحص سجلات DNS لكل نطاق فرعي باستخدام{" "}
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">dig</code> أو{" "}
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">nslookup</code>
                </li>
                <li>البحث عن سجلات CNAME التي تشير إلى خدمات خارجية</li>
                <li>التحقق مما إذا كانت الخدمة الخارجية لا تزال نشطة</li>
                <li>
                  محاولة الوصول للنطاق الفرعي وفحص رسائل الخطأ
                </li>
              </ol>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-3 text-lg font-bold text-cyan-400">أدوات إضافية</h3>
              <ul className="mr-5 list-disc space-y-2 text-gray-300">
                <li>
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">dnsrecon</code> - استكشاف DNS شامل
                </li>
                <li>
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">knockpy</code> - اكتشاف النطاقات الفرعية
                </li>
                <li>
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">nuclei</code> - اختبار الثغرات باستخدام القوالب
                </li>
                <li>
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">subfinder</code> - اكتشاف النطاقات الفرعية passive
                </li>
                <li>
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">amass</code> - استكشاف النطاقات الفرعية شامل
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">الوقاية والإصلاح</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-6">
              <h3 className="mb-3 text-lg font-bold text-green-400">إزالة سجلات DNS غير المستخدمة</h3>
              <ul className="mr-5 list-disc space-y-2 text-gray-300">
                <li>
                  مسح جميع سجلات CNAME والـ A القديمة التي تشير إلى خدمات لم تعد مستخدمة
                </li>
                <li>
                  مراجعة سجلات DNS بشكل دوري (كل شهر على الأقل)
                </li>
                <li>
                  استخدام نظام إدارة DNS يدعم التحديثات السريعة
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-6">
              <h3 className="mb-3 text-lg font-bold text-green-400">مراقبة DNS باستمرار</h3>
              <ul className="mr-5 list-disc space-y-2 text-gray-300">
                <li>إعداد تنبيهات لأي تغييرات في سجلات DNS</li>
                <li>
                  استخدام أدوات مراقبة مثل{" "}
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">DNSMonitor</code> أو{" "}
                  <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">Detectify</code>
                </li>
                <li>فحص النطاقات الفرعية المُعلنة علنًا بانتظام</li>
              </ul>
            </div>

            <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-6">
              <h3 className="mb-3 text-lg font-bold text-green-400">إدارة حسابات الخدمات الخارجية</h3>
              <ul className="mr-5 list-disc space-y-2 text-gray-300">
                <li>حذف التطبيقات والمشاريع غير المستخدمة من الخدمات الخارجية</li>
                <li>توثيق جميع اتصالات DNS مع أسماء الحسابات المقابلة</li>
                <li>
                  إنشاء قائمة مرجعية (Inventory) لجميع النطاقات الفرعية والخدمات المرتبطة بها
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-6">
              <h3 className="mb-3 text-lg font-bold text-green-400">استخدام DNSSEC</h3>
              <p className="text-gray-300">
                تفعيل{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-cyan-300">DNSSEC</code> يhelp في
                حماية سجلات DNS من التزوير، لكنه لا يمنع ثغرات الـ takeover الناتجة عن سجلات
                CNAME الصحيحة التي تشير إلى خدمات خارجية محذوفة.
              </p>
            </div>

            <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-6">
              <h3 className="mb-3 text-lg font-bold text-green-400">سياسة حذف الموارد</h3>
              <ul className="mr-5 list-disc space-y-2 text-gray-300">
                <li>وضع سياسة واضحة لإغلاق الحسابات والمشاريع القديمة</li>
                <li>
                  التأكد من حذف سجلات DNS قبل حذف الحسابات من الخدمات الخارجية
                </li>
                <li>إنشاء عملية موحدة لإنهاء المشاريع</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tips and common mistakes */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">نصائح أمنية وأخطاء شائعة</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tips */}
            <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-6">
              <h3 className="mb-4 text-lg font-bold text-green-400">نصائح أمنية</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-400">✓</span>
                  <span>
                    راجع سجلات DNS قبل حذف أي مشروع أو حساب من خدمة خارجية
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-400">✓</span>
                  <span>استخدم أتمتة لإدارة DNS لتقليل الأخطاء البشرية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-400">✓</span>
                  <span>
                    فعّل التنبيهات على تغييرات DNS غير المتوقعة
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-400">✓</span>
                  <span>وثّق جميع الارتباطات بين النطاقات الفرعية والخدمات الخارجية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-400">✓</span>
                  <span>
                    فحّص بشكل دوري أن جميع النطاقات الفرعية تشير لخدمات نشطة
                  </span>
                </li>
              </ul>
            </div>

            {/* Common mistakes */}
            <div className="rounded-xl border border-red-800/50 bg-red-900/20 p-6">
              <h3 className="mb-4 text-lg font-bold text-red-400">أخطاء شائعة</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-400">✗</span>
                  <span>
                    حذف الحسابات من الخدمات الخارجية دون حذف سجلات DNS أولاً
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-400">✗</span>
                  <span>عدم مراجعة سجلات DNS بشكل دوري</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-400">✗</span>
                  <span>
                    استخدام سجلات CNAME بدلاً من سجلات A (الأكثر أمانًا)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-400">✗</span>
                  <span>عدم وجود عملية موحدة لإنهاء المشاريع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-400">✗</span>
                  <span>
                    إهمال فحص النطاقات الفرعية القديمة التي تم إنشاؤها للمشاريع التجريبية
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Severity */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">مدى الخطورة</h2>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-300">التأثير المحتمل</span>
                <span className="text-red-400">عالي</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[85%] rounded-full bg-red-500" />
              </div>
            </div>

            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">سرقة بيانات المستخدمين:</strong> يمكن للمهاجم جمع
                بيانات تسجيل الدخول والمعلومات الشخصية
              </p>
              <p>
                <strong className="text-white">تصيد المستخدمين (Phishing):</strong> إنشاء صفحات
                تصيد مصغرة تبدو وكأنها صفحات حقيقية للمنظمة
              </p>
              <p>
                <strong className="text-white">حقن JavaScript:</strong> حقن سكريبتات خبيثة في
                صفحات النطاق الفرعي المُستولى عليها
              </p>
              <p>
                <strong className="text-white">سرقة الكوكيز (Cookie Theft):</strong> سرقة
                جلسات المستخدمين النشطة
              </p>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">المراجع</h2>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Subdomain_takeover"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  MDN - Subdomain Takeover
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/EdOverflow/can-i-take-over-xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Can I Take Over XYZ - GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://portswigger.net/web-security/subdomain-takeover"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  PortSwigger - Subdomain Takeover
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-12">
          <LabsSection slug="subdomain-takeover" />
          <ToolsSection slug="subdomain-takeover" />
        </section>

        {/* Video Section */}
        <section className="mb-12">
          <Quiz slug="subdomain-takeover" />
          <VideoSection slug="subdomain-takeover" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-8">
          <Link
            href="/vulnerabilities"
            className="rounded-lg bg-gray-800 px-6 py-3 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
          >
            العودة لقائمة الثغرات
          </Link>
          <Link
            href="/vulnerabilities/open-redirect"
            className="rounded-lg bg-cyan-900/50 px-6 py-3 text-cyan-300 transition-colors hover:bg-cyan-800/50 hover:text-cyan-200"
          >
            الثغرة التالية: Open Redirect ←
          </Link>
        </nav>
      </div>
    </main>
  );
}
