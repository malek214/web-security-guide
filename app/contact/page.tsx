"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const faqItems = [
  {
    question: "ما هو وقت الاستجابة المتوقع للرسائل؟",
    answer:
      "نحرص على الرد على جميع الاستفسارات خلال 24-48 ساعة عمل. في حالات الطوارئ الأمنية، نسعى للرد خلال ساعات قليلة.",
  },
  {
    question: "هل يمكنني الإبلاغ عن ثغرة أمنية مباشرة؟",
    answer:
      "نعم، يمكنك الإبلاغ عن الثغرات الأمنية عبر البريد الإلكتروني المخصص. نحن ندعم برنامج Bug Bounty ونكافئ المُبلّغين عن الثغرات.",
  },
  {
    question: "هل تقدمون استشارات أمنية خاصة؟",
    answer:
      "نعم، نقدم استشارات أمنية مخصصة للمؤسسات. تواصل معنا لتحديد موعد لمناقشة احتياجاتك.",
  },
  {
    question: "هل يمكنني المساهمة في المحتوى التعليمي؟",
    answer:
      "نرحب بالمساهمات! يمكنك التواصل معنا لمناقشة أفكار المقالات أو التدريبات العملية التي تريد إضافتها.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "يجب أن يحتوي الاسم على حرفين على الأقل";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "الموضوع مطلوب";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "يجب أن يحتوي الموضوع على 5 أحرف على الأقل";
    }

    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "يجب أن تحتوي الرسالة على 10 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus({
        type: "success",
        message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" dir="rtl">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. سواء كان لديك سؤال关于我们 أو تحتاج إلى دعم فني،
            لا تتردد في التواصل معنا.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  ✉
                </span>
                أرسل لنا رسالة
              </h2>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/20 border border-green-500 text-green-300"
                      : "bg-red-500/20 border border-red-500 text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    الاسم الكامل <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.name ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="أدخل اسمك الكامل"
                    dir="rtl"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    البريد الإلكتروني <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    الموضوع <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      errors.subject ? "border-red-500" : "border-gray-600"
                    }`}
                    dir="rtl"
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="استفسار عام">استفسار عام</option>
                    <option value="دعم فني">دعم فني</option>
                    <option value="إبلاغ عن ثغرة أمنية">
                      إبلاغ عن ثغرة أمنية
                    </option>
                    <option value="شراكة أو تعاون">شراكة أو تعاون</option>
                    <option value="اقتراح محتوى">اقتراح محتوى</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    الرسالة <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none ${
                      errors.message ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="اكتب رسالتك هنا..."
                    dir="rtl"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.message.length}/500 حرف
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-l from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    "إرسال الرسالة"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  📞
                </span>
                معلومات التواصل
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xl">✉</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      البريد الإلكتروني
                    </h3>
                    <a
                      href="mailto:contact@web-security-guide.com"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      dir="ltr"
                    >
                      contact@web-security-guide.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xl">🐦</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Twitter</h3>
                    <a
                      href="https://twitter.com/websecurityguide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      dir="ltr"
                    >
                      @websecurityguide
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">GitHub</h3>
                    <a
                      href="https://github.com/web-security-guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      dir="ltr"
                    >
                      web-security-guide
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xl">🔗</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
                    <a
                      href="https://linkedin.com/company/web-security-guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Web Security Guide
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  ⏱
                </span>
                أوقات الاستجابة
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-green-400 text-lg">✓</span>
                  <div>
                    <p className="text-white font-medium">الاستفسارات العامة</p>
                    <p className="text-gray-400 text-sm">24-48 ساعة عمل</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-yellow-400 text-lg">⚡</span>
                  <div>
                    <p className="text-white font-medium">الدعم الفني</p>
                    <p className="text-gray-400 text-sm">12-24 ساعة عمل</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-red-400 text-lg">🔥</span>
                  <div>
                    <p className="text-white font-medium">
                      الإبلاغ عن ثغرات أمنية
                    </p>
                    <p className="text-gray-400 text-sm">4-8 ساعات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
              <span className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                ❓
              </span>
              الأسئلة الشائعة حول التواصل
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gradient-to-l from-cyan-600 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            هل واجهت ثغرة أمنية؟
          </h2>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
            إذا كنت قد واجهت ثغرة أمنية في أحد خدماتنا، يرجى إبلاغنا فوراً عبر
            البريد الإلكتروني المخصص لمعالجة الثغرات.
          </p>
          <a
            href="mailto:security@web-security-guide.com"
            className="inline-block px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            الإبلاغ عن ثغرة أمنية
          </a>
        </section>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Web Security Guide. جميع الحقوق محفوظة.
          </p>
        </footer>
      </div>
    </div>
  );
}
