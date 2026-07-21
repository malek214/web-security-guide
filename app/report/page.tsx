import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إرسال تقرير - دليل أمن الويب",
  description: "أرسل تقريراً عن أخطاء أو ثغرات أمنية أو اقتراحات لتحسين الموقع",
};

export default function ReportPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">إرسال تقرير</h1>
          <p className="text-lg text-gray-600">
            ساعدنا في تحسين الموقع من خلال الإبلاغ عن الأخطاء أو الثغرات الأمنية
          </p>
        </div>

        {/* Guidelines Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">إرشادات تقديم التقارير</h2>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start">
              <span className="ml-2 text-blue-600">&#10003;</span>
              <span>كن واضحاً ودقيقاً في وصف المشكلة</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2 text-blue-600">&#10003;</span>
              <span>أرفق لقطات شاشة إن أمكن</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2 text-blue-600">&#10003;</span>
              <span>اذكر المتصفح ونظام التشغيل المستخدم</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2 text-blue-600">&#10003;</span>
              <span>لا تُرسل تقارير تتضمن معلومات شخصية حساسة</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2 text-blue-600">&#10003;</span>
              <span>تأكد من أن التقرير لم يُرسل سابقاً</span>
            </li>
          </ul>
        </div>

        {/* Report Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">نموذج إرسال التقرير</h2>
          <form className="space-y-6">
            {/* Report Type */}
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
                نوع التقرير <span className="text-red-500">*</span>
              </label>
              <select
                id="reportType"
                name="reportType"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">اختر نوع التقرير</option>
                <option value="bug">Bug Report - الإبلاغ عن خطأ</option>
                <option value="content">Content Error - خطأ في المحتوى</option>
                <option value="security">Security Vulnerability - ثغرة أمنية</option>
                <option value="suggestion">Suggestion - اقتراح</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="أدخل اسمك"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@domain.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                dir="ltr"
              />
            </div>

            {/* Page URL */}
            <div>
              <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                رابط الصفحة <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="pageUrl"
                name="pageUrl"
                required
                placeholder="https://example.com/page"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                dir="ltr"
              />
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                الأولوية <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">اختر الأولوية</option>
                <option value="low">Low - منخفضة</option>
                <option value="medium">Medium - متوسطة</option>
                <option value="high">High - عالية</option>
                <option value="critical">Critical - حرجة</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                وصف المشكلة <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="اشرح المشكلة بالتفصيل..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              />
            </div>

            {/* Steps to Reproduce */}
            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
                خطوات إعادة الإنتاج <span className="text-red-500">*</span>
              </label>
              <textarea
                id="steps"
                name="steps"
                required
                rows={5}
                placeholder={`1. افتح صفحة...\n2. اضغط على...\n3. أدخل...\n4. ستظهر النتيجة...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                معلومات إضافية (اختياري)
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                placeholder="أي معلومات إضافية تساعد في فهم المشكلة..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                إرسال التقرير
              </button>
            </div>
          </form>
        </div>

        {/* What Happens After Submission */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ماذا يحدث بعد الإرسال؟</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ml-4">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">تأكيد الاستلام</h3>
                <p className="text-gray-600">ستتلقى رسالة بريد إلكتروني تأكيداً لاستلام تقريرك خلال 24 ساعة</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">المراجعة والتقييم</h3>
                <p className="text-gray-600">سيقوم فريقنا بمراجعة التقرير وتقييم أهميته وتأثيره خلال 3-5 أيام عمل</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center ml-4">
                <span className="text-yellow-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">التحديث والإصلاح</h3>
                <p className="text-gray-600">في حالة ثبوت المشكلة، سنعمل على إصلاحها وسنinformك بالتحديثات</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center ml-4">
                <span className="text-purple-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">الاعتراف</h3>
                <p className="text-gray-600">إذا كان التقرير مفيداً، سنقوم باعتبارك في قائمة المساهمين (بإذنك)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible Disclosure Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">سياسة الإفصاح المسؤول</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              نقدّر جهود الباحثين الأمنيين المسئولين في مساعدتنا على حماية مستخدمينا. نلتزم بالتعامل مع جميع التقارير الأمنية بجدية وسرية تامة.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">ما نعد به:</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>ن胁تّم جميع التقارير الأمنية بسرية تامة</li>
              <li>لن نقوم بملاحقة أي باحث يعمل وفقاً لهذه السياسة</li>
              <li>نلتزم بالرد على التقارير خلال 48 ساعة</li>
              <li>نحتسب الباحثين المساهمين في قائمة الشكر الخاصة بنا</li>
            </ul>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">السلوكيات المقبولة:</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>الإبلاغ عن الثغرات الأمنية فقط</li>
              <li>عدم الوصول إلى البيانات الخاصة بالمستخدمين الآخرين</li>
              <li>عدم تعطيل أو تدمير النظام</li>
              <li>عدم استخدام الثغرة لأغراض شخصية</li>
              <li>العمل وفقاً لمعايير الإفصاح المسؤول</li>
            </ul>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">السلوكيات المحظورة:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>الوصول غير المصرح به إلى بيانات المستخدمين</li>
              <li>تعطيل الخدمات أو تدمير البيانات</li>
              <li>اختبار الثغرات على أنظمة إنتاجية دون إذن</li>
              <li>نشر الثغرات علناً قبل إصلاحها</li>
              <li>استخدام الثغرة للحصول على مكافآت مالية</li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <p className="text-yellow-800 font-medium">
                ملاحظة: أي نشاط يتجاوز حدود هذه السياسة قد يعرضك للمساءلة القانونية. نحتفظ بحق الإبلاغ عن أي سلوك غير مسئول لل authorities المختصة.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">للتواصل معنا</h2>
          <p className="text-gray-600 mb-4">
            إذا كان لديك أي استفسارات حول سياسة الإفصاح المسؤول، يرجى التواصل معنا عبر البريد الإلكتروني:
          </p>
          <a
            href="mailto:security@example.com"
            className="text-blue-600 hover:text-blue-800 font-medium text-lg"
            dir="ltr"
          >
            security@example.com
          </a>
        </div>
      </div>
    </div>
  );
}
