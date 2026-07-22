import Link from 'next/link'
import VideoSection from '@/components/VideoSection'
import ToolsSection from '@/components/ToolsSection'
import ShareButtons from '@/components/ShareButtons'
import LabsSection from '@/components/LabsSection'
import Quiz from '@/components/Quiz'

export default function SocialEngineeringPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-lg" dir="rtl">
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">&#x1F9E0;</span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-0">Social Engineering - الهندسة الاجتماعية</h1>
            <p className="text-xl text-gray-500 mt-1">Social Engineering Attacks</p>
          </div>
        </div>
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-700 font-semibold mb-0">
            &#x26A0; مستوى الخطورة: عالي جداً
          </p>
        </div>
      </section>

      <div className="mb-6">
        <ShareButtons title="Social Engineering - الهندسة الاجتماعية" url={"https://web-security-guide.vercel.app/vulnerabilities/social-engineering"} />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">تعريف الهندسة الاجتماعية</h2>
        <p>
          الهندسة الاجتماعية هي فن التلاعب بالناس ودفعهم للقيام بأفعال يكشفون فيها معلومات حساسة أو يفعلون أفعالاً تضر بأمنهم. بدلاً من اختراق الأنظمة التقنية، تستهدف الهندسة الاجتماعية الضعف البشري.
        </p>
        <p>
          يُعتبر الضعف البشري أضعف حلقة في سلسلة الأمان، حيث أن حتى أكثر الأنظمة أماناً يمكن اختراقه عبر خداع المستخدمين. تستخدم المهاجمون نفسيات البشر مثل الثقة والخوف والعجلة والفضول لتحقيق أهدافهم.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ال心理学 وراء الهندسة الاجتماعية</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">&#x1F4A1; مبدأ المقابلة (Reciprocity)</h4>
            <p className="text-gray-600 mb-0">الناس يميلون لرد المعروف. المهاجم قد يقدم هدية أو مساعدة ثم يطلب مقابل.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">&#x1F4A1; مبدأ الندرة (Scarcity)</h4>
            <p className="text-gray-600 mb-0">عندما نشعر أن فرصة ستنتهي سريعاً، نتخذ قرارات متهورة. "عرض لفترة محدودة!"</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">&#x1F4A1; مبدأ السلطة (Authority)</h4>
            <p className="text-gray-600 mb-0">الناس يميلون لطاعة الشخصيات ذات السلطة. "أنا من قسم تقنية المعلومات في شركتكم"</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">&#x1F4A1; مبدأ الإلحاح (Urgency)</h4>
            <p className="text-gray-600 mb-0">الضغط على الضحية بضرورة اتخاذ قرار سريع يمنعه من التفكير ب清醒. "حسابك سيُغلق خلال ساعة!"</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-2">&#x1F4A1; مبدأ الثقة (Trust)</h4>
            <p className="text-gray-600 mb-0">بناء علاقة ودية مع الضحية قبل الهجوم يزيد فرص النجاح.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أنواع الهندسة الاجتماعية</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. التحويل (Pretexting)</h3>
          <p>
            المهاجم يختلق سيناريو (pretext) لخداع الضحية وجعله يكشف معلومات حساسة. عادة ما يتظاهر بأنه شخص آخر أو جهة رسمية.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`سيناريو التحويل:
───────────────────────────────
المهاجم يتصل بالضحية:
"مرحباً، أنا أحمد من الدعم الفني لشركتكم.
تلقينا تقريراً بأن جهازك قد يكون مصاباً
بذكاء اصطناعي خبيث. أحتاج فقط للتحقق من
بيانات الدخول للحسابorporate لفحصه."

المستخدم الثقة: يعطي بيانات الدخول
───────────────────────────────
المهاجم يستخدم بيانات الدخول للدخول
للنظام وسرقة المعلومات`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. الإغراء (Baiting)</h3>
          <p>
            استخدام إغراء (مثل USB مجاني أو ملف مجاني) لخداع الضحية وجعله يثبّت برمجيات خبيثة على جهازه.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`سيناريو الإغراء:
───────────────────────────────
المهاجم يترك USB بعنوان "رواتب 2024 - سري"
في مكان عام (مثل مكتب الشركة أو مقهى).

الضحية الفضولي: يأخذ الـ USB ويربطه بجهازه
لرؤية الملفات.

ما يحدث: الـ USB يحتوي على برمجيات خبيثة
تنexec تلقائياً وتهacker الجهاز.
───────────────────────────────
لا تربط أجهزة USB غير معروفة أبداً!`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. التتبع (Tailgating)</h3>
          <p>
            المهاجم يتبع شخصاً مصرحاً به للدخول لمنطقة محظورة. عادة ما يحمل شيئاً في يديه ليبدو مشغولاً ويتظاهر بأنه نسي بطاقته.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4">
            <pre className="text-sm">
{`سيناريو التتبع:
───────────────────────────────
المهاجم ينتظر عند مدخل الشركة مع صندوق كبير.

عندما يفتح موظف الباب بالبطاقة:
المهاجم: "شكراً! يدي مشغولة، هل يمكن..."
(يتبعه داخل المبنى)

أو:
المهاجم يمشي خلف الموظف بثقة وكأنه
من الموظفين، ويتظاهر بأن بطاقته في جيبه.
───────────────────────────────
لا تسمح لغير المعروفين بدخول مناطق
الدخول المحدودة`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">4. المقابلة (Quid Pro Quo)</h3>
          <p>
            المهاجم يعرض مساعدة على الضحية في مقابل معلومات حساسة. "سأساعدك في مشكلة الكمبيوتر إذا أعطيتني كلمة المرور".
          </p>
          <p>
            <strong>أمثلة:</strong> مكالمة هاتفية من "الدعم الفني" يعرضون مساعدة في مشكلة تقنية مقابل كلمة المرور أو رمز التحقق.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">5. التصيد (Phishing)</h3>
          <p>
            من أكثر أنواع الهندسة الاجتماعية شيوعاً، يستخدم رسائل بريد إلكتروني أو رسائل نصية أو مواقع مزيفة لسرقة المعلومات الحساسة.
          </p>
          <p>
            <strong>أنواعه:</strong> التصيد بالبريد الإلكتروني، التصيد الموجه (Spear Phishing)، التصيد الكبار (Whaling)، التصيد الصوتي (Vishing)، التصيد عبر الرسائل القصيرة (Smishing).
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">أمثلة واقعية</h2>
        <div className="space-y-4">
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <h4 className="font-bold text-warning-700 mb-2">&#x1F4CC; هجوم Twitter 2020</h4>
            <p className="text-gray-600 mb-0">استهدف موظفين من خلال مكالمات هاتفية لخداعهم للحصول على أداة داخلية، مما أدى لاختراق حسابات المشاهير والسياسيين.</p>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <h4 className="font-bold text-warning-700 mb-2">&#x1F4CC; هجوم RSA 2011</h4>
            <p className="text-gray-600 mb-0">بدأ برسالة بريد إلكتروني بملف مرفق مصابة ببرمجيات خبيثة، أدت لسرقة توقيعات SecurID لآلاف المستخدمين.</p>
          </div>
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <h4 className="font-bold text-warning-700 mb-2">&#x1F4CC; هجوم Ubiquiti Networks 2015</h4>
            <p className="text-gray-600 mb-0">خسرت الشركة 46.7 مليون دولار بسبب تصيد موجه للموظفين في قسم الماليات.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف تكتشف محاولات الهندسة الاجتماعية</h2>

        <h3 className="text-xl font-bold text-gray-800 mb-3">علامات التحذير</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>طلبات غير عادية أو غير متوقعة لمعلومات حساسة</li>
          <li>شعور بالإلحاح أو العجلة في اتخاذ قرار</li>
          <li>شخص يتظاهر بأنه من جهة رسمية لكن لا يمكن تأكيدها</li>
          <li>عروض مجانية أو مكافآت تبدو جيدة جداً لكونها حقيقية</li>
          <li>مكالمات هاتفية تطلب أرقام أو بيانات فورية</li>
          <li>طلبات تجاوز الإجراءات الأمنية المعتادة</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-800 mb-3">التحقق</h3>
        <ul className="list-disc mr-6 mb-4">
          <li>تأكد دائماً من هوية الشخص الذي يتواصل معك</li>
          <li>اتصل بالجهة المزعومة مباشرة عبر قنواتها الرسمية</li>
          <li>لا تعطِ أي معلومات عبر الهاتف أو البريد الإلكتروني بدون تأكيد</li>
          <li>اسأل مديرك أو فريق الأمان قبل اتخاذ أي إجراء غير معتاد</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">طرق الحماية</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">1. التثقيف والتوعية</h3>
            <p>
              تثقيف الموظفين وال familia حول أساليب الهندسة الاجتماعية وأحدث تقنيات المهاجمين هو أفضل خط دفاع. التدريب المستمر هو المفتاح.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">2. التحقق من الهوية</h3>
            <p>
              تحقق دائماً من هوية الشخص الذي يتواصل معك. لا تعتمد على معلوماته فقط، بل اتصل به من قنوات رسمية.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">3. حماية المعلومات الحساسة</h3>
            <p>
              لا تشارك كلمات المرور أو رموز التحقق أو أي معلومات حساسة عبر الهاتف أو البريد الإلكتروني.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">4. استخدام المصادقة الثنائية</h3>
            <p>
              فعّل المصادقة الثنائية على جميع الحسابات المهمة. حتى لو تم سرقة كلمة المرور، لن يتمكن المهاجم من الدخول.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">5. الحماية المادية</h3>
            <p>
              حماية المناطق المحدودة ببطاقات الدخول والمراقبة. لا تسمح لأحد بمتابعتك للمناطق المحظورة.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">6. سياسات الأمان</h3>
            <p>
              وضع وتطبيق سياسات أمان واضحة تشمل عدم مشاركة المعلومات عبر الهاتف والتحقق من الهويات قبل اتخاذ إجراءات.
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
              <span><strong>لا تثق أبداً بمن لا تعرفه</strong> حتى لو بدا مألوفاً</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>تحقق دائماً من هوية الشخص الذي يتواصل معك</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>لا تعطِ معلومات حساسة عبر الهاتف أو البريد الإلكتروني</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>احذر من الإلحاح والخوف والعجلة في الرسائل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>افتح الأجهزة الخارجية والملفات المشبوهة فقط بعد الفحص</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 mt-1">&#x2714;</span>
              <span>أبلغ فوراً عن أي محاولة اختراق مشبوهة</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <LabsSection slug="social-engineering" />
      </section>

      <section className="mb-12">
        <ToolsSection slug="social-engineering" />
      </section>

      <section className="mb-12">
        <Quiz slug="social-engineering" />
        <VideoSection slug="social-engineering" />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الثغرات الأخرى</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vulnerabilities/phishing" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F3A3;</span>
            <h4 className="font-bold mt-2">التصيد الاحتيالي</h4>
          </Link>
          <Link href="/vulnerabilities/malware" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F9E2;</span>
            <h4 className="font-bold mt-2">البرمجيات الخبيثة</h4>
          </Link>
          <Link href="/vulnerabilities/password-attacks" className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <span className="text-2xl">&#x1F512;</span>
            <h4 className="font-bold mt-2">هجمات كلمات المرور</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
