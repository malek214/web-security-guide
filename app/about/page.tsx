import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عن الموقع | دليل أمان الويب',
  description:
    'تعرف على رؤيتنا وفريق العمل والقيم التي نؤمن بها في دليل أمان الويب.',
};

const teamMembers = [
  {
    name: 'أحمد العلي',
    role: 'مؤسس الموقع',
    bio: 'خبير أمن سيبراني بخبرة تزيد عن 10 سنوات في حماية التطبيقات والشبكات.',
  },
  {
    name: 'سارة المحمدي',
    role: 'محللة أمنية',
    bio: 'متخصصة في اختبار الاختراق وتحليل الثغرات الأمنية في تطبيقات الويب.',
  },
  {
    name: 'خالد الحسن',
    role: 'مطور واجهات أمامية',
    bio: 'مطور Next.js وReact مع شغف بالتعليم وتصميم تجارب مستخدم سلسة.',
  },
  {
    name: 'نورة الزهراء',
    role: 'محتوى تعليمي',
    bio: 'كاتبة محتوى تقني متخصصة في تبسيط المفاهيم الأمنية للمطورين.',
  },
];

const values = [
  {
    icon: '🔒',
    title: 'الأمان أولاً',
    description:
      'نؤمن بأن الأمان ليس ميزة اختيارية بل ضرورة أساسية في كل مشروع ويب.',
  },
  {
    icon: '📖',
    title: 'التعليم المفتوح',
    description:
      'نلتزم بتقديم المعرفة الأمنية بشكل مجاني ومفتوح للجميع.',
  },
  {
    icon: '🤝',
    title: 'المجتمع',
    description:
      'ندعم بناء مجتمع من المطورين والأمنيين الذين يشاركون المعرفة والخبرات.',
  },
  {
    icon: '🔄',
    title: 'التحديث المستمر',
    description:
      'نحدث محتواناً باستمرار لمواكبة أحدث التهديدات والتقنيات الأمنية.',
  },
];

const timeline = [
  {
    year: '2021',
    event: 'تأسيس المشروع كمدونة بسيطة لمشاركة ملاحظات الأمان.',
  },
  {
    year: '2022',
    event: 'إطلاق النسخة الأولى من الدليل الشامل مع أكثر من 50 مقالاً.',
  },
  {
    year: '2023',
    event: 'إضافة قسم التدريب العملي والتطبيقات التفاعلية.',
  },
  {
    year: '2024',
    event: 'إطلاق مجتمع المساهمين ودعم اللغة العربية بشكل كامل.',
  },
  {
    year: '2025',
    event: 'توسيع الشراكات مع جامعات ومنظمات أمنية إقليمية.',
  },
];

export default function AboutPage() {
  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-emerald-700 to-emerald-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">عن الموقع</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-emerald-100">
            دليل أمان الويب هو منصة تعليمية عربية مفتوحة المصدر تهدف إلى تعزيز
            ثقافة الأمان السيبراني بين مطوري الويب والمهندسات البرمجية في العالم
            العربي.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            مهمتنا
          </h2>
          <div className="rounded-xl border border-emerald-100 bg-white p-8 shadow-sm">
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              مهمتنا هي تمكين كل مطور عربية من بناء تطبيقات ويب آمنة من خلال
              توفير محتوى تعليمي عملي وشامل باللغة العربية. نسعى لإزالة
              الحواجز اللغوية التي تمنع الكثير من المطورين من الوصول إلى
              المعرفة الأمنية الحديثة.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              نؤمن بأن الأمان مسؤولية مشتركة، لذلك نعمل على جعل مبادئ
              Secure by Design في متناول الجميع، من المبتدئين إلى الخبراء.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            فريق العمل
          </h2>
          <p className="mb-10 text-lg text-gray-600">
            فريق ملتزم من الخبراء والمهتمين بالأمن السيبراني والتعليم.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center transition hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-emerald-600">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            قيمنا وأهدافنا
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{value.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="mb-3 text-xl font-bold text-emerald-800">
              أهدافنا الرئيسية
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-500">✓</span>
                توفير أكثر من 200 دليل عملي في أمان الويب.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-500">✓</span>
                تعليم 10,000 مطور عربي مبادئ الأمان الأساسية.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-500">✓</span>
                بناء مجتمع عربي نشط يشارك المعرفة والخبرات الأمنية.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-500">✓</span>
                التعاون مع الجامعات لدمج أمان الويب في المناهج الدراسية.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            تاريخ المشروع
          </h2>
          <p className="mb-10 text-lg text-gray-600">
            رحلة نمو وتطور بدأت بفكرة بسيطة وأصبحت مرجعاً عربياً في أمان
            الويب.
          </p>
          <div className="relative">
            <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-emerald-200 md:right-1/2 md:-translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col items-center gap-4 md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute right-4 h-4 w-4 rounded-full border-4 border-emerald-500 bg-white md:right-1/2 md:-translate-x-1/2" />
                  <div
                    className={`w-full rounded-xl border border-gray-100 bg-gray-50 p-6 md:w-1/2 ${
                      index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                    }`}
                  >
                    <span className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                      {item.year}
                    </span>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            المصدر المفتوح
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-100 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                لماذا مفتوح المصدر؟
              </h3>
              <p className="mb-4 leading-relaxed text-gray-600">
                نؤمن بأن المعرفة الأمنية يجب أن تكون متاحة للجميع. المشروع
                مفتوح المصدر بالكامل لتتمكن من:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">•</span>
                  مراجعة الكود والتأكد من جودته وأمانه.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">•</span>
                  اقتراح تحسينات وإضافة محتوى جديد.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">•</span>
                  استخدام المحتوى في مشاريعك التعليمية.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">•</span>
                  بناء مشاريع مشتقة ومشاركتها مع المجتمع.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                كيف تساهم؟
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-bold text-emerald-700">
                    1. الإبلاغ عن الأخطاء
                  </h4>
                  <p className="text-sm text-gray-600">
                    إذا وجدت خطأ في المحتوى أو الكود، يرجى فتح issue على
                    GitHub.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-bold text-emerald-700">
                    2. اقتراح المحتوى
                  </h4>
                  <p className="text-sm text-gray-600">
                    لديك موضوع أمني تريد أن نغطيه؟ اقترحه عبر issue أو pull
                    request.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-bold text-emerald-700">
                    3. كتابة المقالات
                  </h4>
                  <p className="text-sm text-gray-600">
                    ساهم بكتابة مقال أو دليل جديد باتباع إرشادات الكتابة في
                    المستودع.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-bold text-emerald-700">
                    4. الترجمة
                  </h4>
                  <p className="text-sm text-gray-600">
                    ساعد في ترجمة المحتوى إلى لهجات عربية أخرى أو لغات مختلفة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            تواصل معنا
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-gray-50 p-6 text-center">
              <div className="mb-3 text-3xl">📧</div>
              <h3 className="mb-2 font-bold text-gray-900">البريد الإلكتروني</h3>
              <p className="text-emerald-600">info@websecurityguide.dev</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-gray-50 p-6 text-center">
              <div className="mb-3 text-3xl">🐙</div>
              <h3 className="mb-2 font-bold text-gray-900">GitHub</h3>
              <p className="text-emerald-600">github.com/web-security-guide</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-gray-50 p-6 text-center">
              <div className="mb-3 text-3xl">💬</div>
              <h3 className="mb-2 font-bold text-gray-900">Twitter / X</h3>
              <p className="text-emerald-600">@websecurityguide</p>
            </div>
          </div>
          <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="mb-3 text-xl font-bold text-emerald-800">
              للاستفسارات العامة
            </h3>
            <p className="text-gray-700">
              سواء كنت طالباً، مطوراً محترفاً، أو جهة تعليمية، يسعدنا التواصل
              معك. نرد على جميع الرسائل خلال 48 ساعة عمل.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Summary */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            سياسة الخصوصية
          </h2>
          <div className="rounded-xl border border-emerald-100 bg-white p-8 shadow-sm">
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
              ملخص تنفيذي — للتفاصيل الكاملة، يرجى الاطلاع على سياسة
              الخصوصية الكاملة.
            </p>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="mb-1 font-bold text-gray-900">
                  جمع البيانات
                </h3>
                <p className="leading-relaxed">
                  نجمع فقط البيانات الضرورية لتشغيل الموقع، مثل عنوان IP
                  ومعلومات المتصفح لأغراض التحليلات. لا نجمع بيانات التعريف
                  الشخصية إلا عند تقديمها طوعاً عبر نموذج التواصل.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">
                  استخدام البيانات
                </h3>
                <p className="leading-relaxed">
                  نستخدم البيانات المجمعة لتحسين المحتوى وتجربة المستخدم فقط.
                  لا نبيع البيانات لأطراف ثالثة ولا نستخدمها لأغراض تسويقية.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">
                  ملفات تعريف الارتباط
                </h3>
                <p className="leading-relaxed">
                  نستخدم ملفات تعريف الارتباط الأساسية فقط لتشغيل الموقع.
                  يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">أمان البيانات</h3>
                <p className="leading-relaxed">
                  نتخذ إجراءات أمنية مناسبة لحماية البيانات المخزنة ضد الوصول
                  غير المصرح به أو الاستخدام أو التغيير أو الإتلاف.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Use Summary */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-800">
            شروط الاستخدام
          </h2>
          <div className="rounded-xl border border-emerald-100 bg-gray-50 p-8 shadow-sm">
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
              ملخص تنفيذي — للتفاصيل الكاملة، يرجى الاطلاع على شروط الاستخدام
              الكاملة.
            </p>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="mb-1 font-bold text-gray-900">
                  الاستخدام المقبول
                </h3>
                <p className="leading-relaxed">
                  المحتوى مخصص لأغراض تعليمية وبحثية. يُحظر استخدام الدليل
                  لأغراض غير قانونية أو غير أخلاقية أو لمهاجمة أنظمة دون إذن
                  مسبق.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">
                  الملكية الفكرية
                </h3>
                <p className="leading-relaxed">
                  المحتوى مرخص بموجب رخصة Creative Commons
                  Attribution-ShareAlike 4.0. يمكنك استخدامه وتعديله مع ذكر
                  المصدر.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">الإخلاء من المسؤولية</h3>
                <p className="leading-relaxed">
                  المعلومات المقدمة &quot;كما هي&quot; بدون أي ضمان. المسؤولية الكاملة
                  تقع على المستخدم عند تطبيق تقنيات الأمان على بيئات الإنتاج.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">
                  تعديل الشروط
                </h3>
                <p className="leading-relaxed">
                  نحتفظ بحق تعديل شروط الاستخدام في أي وقت. يُنصح بمراجعة هذه
                  الصفحة بشكل دوري.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">ابدأ رحلتك في الأمان</h2>
          <p className="mb-8 text-lg text-emerald-100">
            سواء كنت مبتدئاً أو خبيراً، لدينا محتوى يناسبك.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/guides"
              className="rounded-lg bg-white px-8 py-3 font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              استعرض الأدلة
            </a>
            <a
              href="https://github.com/web-security-guide"
              className="rounded-lg border-2 border-white px-8 py-3 font-bold transition hover:bg-white hover:text-emerald-800"
            >
              ساهم على GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
