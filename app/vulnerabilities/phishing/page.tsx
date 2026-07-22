import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function PhishingPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F3A3;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">Phishing - التصيد الاحتيالي</h1>
            <p className="text-xl text-gray-500 mt-1">Phishing Attacks</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="Phishing - التصيد الاحتيالي" url={"https://web-security-guide.vercel.app/vulnerabilities/phishing"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف التصيد الاحتيالي</h2>
        <p>
          التصيد الاحتيالي (Phishing) هو نوع من الهجمات التي يستخدم فيها المهاجمون تقنيات خداعية لخداع المستخدمين وسرقة معلوماتهم الحساسة مثل كلمات المرور وأرقام بطاقات الائتمان والبيانات الشخصية. يتم ذلك عبر رسائل بريد إلكتروني مزيفة أو مواقع ويب تحاكي المواقع الشرعية.
        </p>
        <p>
          تعتمد هذه الهجمات على الهندسة الاجتماعية لاستغلال الثقة والخوف والعجلة لدى المستخدمين، مما يجعلهم يكشفون معلوماتهم دون وعي.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع التصيد الاحتيالي</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. التصيد بالبريد الإلكتروني (Email Phishing)</h3>
          <p>
            هو الأكثر شيوعاً، حيث يرسل المهاجم رسائل بريد إلكتروني تحاكي رسائل شركات أو بنوك معروفة لخداع المستخدمين ودفعهم للنقر على روابط ضارة أو فتح مرفقات تحتوي على برامج خبيثة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`مثال: رسالة مزيفة من البنك
───────────────────────────────
من: support@bank-example.com (مُرقّم)
إلى: victim@email.com
الموضوع: تحذير أمني - حسابك متأثر!

عزيزي العميل،

تم رصد نشاط غير عادي على حسابك.
يرجى تأكيد بياناتك من خلال الرابط:
https://secure-bank-example.fake.com/login

مع تحياتنا،
فريق الأمان - بنك Example
───────────────────────────────
الرابط يقود لموقع مزيف لسرقة بيانات الدخول`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. التصيد الموجه (Spear Phishing)</h3>
          <p>
            هجمات مستهدفة تستخدم معلومات شخصية عن الضحية لجعل الرسالة أكثر مصداقية. يستخدم المهاجم معلومات من ملفات التواصل الاجتماعي أو المواقع العامة ل个性化 الرسالة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`مثال: رسالة موجهة لموظف في شركة
───────────────────────────────
الموضوع: تحديث نظام HR - إجراء إلزامي

مرحباً [الاسم]،

نود إبلاغك بضرورة تحديث بياناتك في
نظام الموارد البشرية الجديد. يرجى استخدام
رابط الدخول التالي وتحديث معلوماتك:

https://hr-update.[company]-internal.fake.com

ينتهي الموعد النهائي: الجمعة القادمة
───────────────────────────────
المعلومات الشخصية تجعل الرسالة تبدو حقيقية`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. التصيد الكبار (Whaling)</h3>
          <p>
            نوع متخصص من التصيد الموجه يستهدف كبار المسؤولين والمديرين التنفيذيين في الشركات. تتطلب هذه الهجمات بحثاً عميقاً وتحضيرات كبيرة.
          </p>
          <p>
            <strong>أمثلة:</strong> رسائل مزيفة تدّعي أنها من هيئة ضريبية أو من كبار الشركاء التجاريين أو من مجلس الإدارة.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">4. التصيد الصوتي (Vishing)</h3>
          <p>
            التصيد عبر المكالمات الهاتفية، حيث يتصل المهاجم بالضحية مدعياً أنه من بنك أو شركة أو هيئة حكومية ويطلب معلومات حساسة.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`سيناريو شائع:
───────────────────────────────
المهاجم: "مرحباً، أ致电 من قسم أمن البنك.
تم اكتشاف معاملة مشبوهة على حسابك.
لقد أرسلنا لك رمز تحقق على هاتفك.
يرجى إخبارنا بالرمز للتحقق من هويتك."

الضحية: يخترع الرمز ويرسله للمهاجم
المهاجم: يستخدم الرمز للدخول للحساب
───────────────────────────────
لا تشارك رموز التحقق مع أي شخص أبداً!`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">5. التصيد عبر الرسائل القصيرة (Smishing)</h3>
          <p>
            استخدام الرسائل النصية القصيرة (SMS) لخداع الضحايا. عادة ما تحتوي على روابط لمواقع مزيفة أو أوامر بإرسال معلومات حساسة.
          </p>
          <p>
            <strong>أمثلة:</strong> رسالة من "البريد السعودي" أو "أرامكز" أو "خدمة التوصيل" تحمل رابط لتأكيد استلام شحنة أو دفع فاتورة.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية</h2>
        <div className="space-y-4">
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <h4 className="font-bold text-warning-700 mb-2">&#x1F4CC; هجوم Twitter 2020</h4>
            <p className="text-gray-600 mb-0">استهدف موظفين من خلال التصيد الموجه للحصول على أداة إدارة الحسابات内部ية، مما أدى لاختراق حسابات المشاهير والسياسيين.</p>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <h4 className="font-bold text-warning-700 mb-2">&#x1F4CC; هجوم Sony Pictures 2014</h4>
            <p className="text-gray-600 mb-0">بدأ برسائل تصيد موجهة للموظفين أدت لسرقة بيانات حساسة وإتلاف أنظمة الشركة بالكامل.</p>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <h4 className="font-bold text-warning-700 mb-2">&#x1F4CC; هجمات COVID-19</h4>
            <p className="text-gray-600 mb-0">استغل المهاجمون جائحة كوفيد-19 لإرسال رسائل تصيد مزيفة عن معلومات اللقاح أو التحويلات الحكومية.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف رسائل التصيد</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات التصيد الشائعة</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>عناوين البريد الإلكتروني مشابهة لكن مختلفة عن العنوان الشرعي (مثل support@bank-examp1e.com)</li>
          <li>أخطاء إملائية ونحوية في الرسالة</li>
          <li>طلبات معلومات حساسة بشكل غير عادي</li>
          <li>urgency وعجلة في الرسالة (حسابك سيُغلق خلال 24 ساعة!)</li>
          <li>روابط تحمل نطاقات مشبوهة أو مختصرة</li>
          <li>مرفقات غير متوقعة (*.exe أو *.zip)</li>
          <li>الترحيب العام بدلاً من استخدام اسمك الحقيقي</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">كيف تتحقق من صحة الرسالة</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>انقر بزر الفأرة الأيمن على الرابط وانسخ الرابط للتحقق من العنوان الحقيقي</li>
          <li>تحقق من عنوان المرسل بدقة</li>
          <li>اتصل بالجهة المزعومة مباشرة عبر قنواتها الرسمية</li>
          <li>لا تدخل أي معلومات عبر روابط في الرسائل المشبوهة</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. التحقق من هوية المرسل</h3>
            <p>
              تحقق دائماً من عنوان البريد الإلكتروني للمرسل ولا تثق بالرسائل التي تطلب معلومات حساسة. تذكر أن عنوان "الاسم" يمكن تزويره بسهولة.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. عدم النقر على روابط مشبوهة</h3>
            <p>
              لا تنقر على روابط في الرسائل المشبوهة مباشرة. بدلاً من ذلك، افتح المتصفح يدوياً وسجل الدخول من الموقع الرسمي.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. التحقق من شهادة SSL</h3>
            <p>
              تأكد من أن الموقع يحمل شهادة SSL صالحة (القفل الأخضر) وأن النطاق مطابق للنطاق الرسمي للشركة.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. استخدام المصادقة الثنائية (2FA)</h3>
            <p>
              فعّل المصادقة الثنائية على جميع حساباتك المهمة. حتى لو تم سرقة كلمة المرور، لن يتمكن المهاجم من الدخول بدون الرمز الثاني.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. التثقيف والتوعية</h3>
            <p>
              تثقيف نفسك وعائلتك حول أساليب التصيد الاحتيالي وأحدث تقنيات المهاجمين. المعرفة هي أفضل خط دفاع.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">6. استخدام مكافح الفيروسات وجدار الحماية</h3>
            <p>
              استخدم برامج مكافحة الفيروسات الحديثة وجدار الحماية للكشف عن الروابط والمرفقات الضارة.
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
              <span><strong>لا تثق أبداً برسائل تطلب معلومات حساسة</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>تحقق دائماً من عنوان المرسل والنطاق</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>فعّل المصادقة الثنائية على كل حساباتك</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>حدّث كلمات مرورك بانتظام واستخدم كلمات مرور قوية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>أبلغ فوراً عن رسائل التصيد المشبوهة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>احذر من الرسائل التي تثير الإلحاح أو الخوف</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="phishing" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="phishing" />
      </section>

      <section className="mb-12">
        <Quiz slug="phishing" />
        <VideoSection slug="phishing" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/social-engineering" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F9E0;</span>
            <h4 className="font-bold mt-2">الهندسة الاجتماعية</h4>
          </Link>
          <Link href="/vulnerabilities/password-attacks" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F512;</span>
            <h4 className="font-bold mt-2">هجمات كلمات المرور</h4>
          </Link>
          <Link href="/vulnerabilities/malware" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F9E2;</span>
            <h4 className="font-bold mt-2">البرمجيات الخبيثة</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
