import React from "react";

export const metadata = {
  title: "المدونة | دليل أمن الويب",
  description:
    "أحدث المقالات والأخبار في مجال أمن الويب وحماية المواقع الإلكترونية",
};

const blogPosts = [
  {
    id: 1,
    title: "ثغرة Log4Shell: تحليل شامل وطرق الحماية",
    date: "2026-07-15",
    category: "آخر الثغرات",
    excerpt:
      "شرح مفصل لثغرة Log4Shell الخطيرة التي أثرت على ملايين الأنظمة حول العالم، وكيفية كشفها وإصلاحها.",
    readTime: "12 دقيقة",
    tags: ["RCE", "Java", "Log4j"],
  },
  {
    id: 2,
    title: "10 نصائح ذهبية لحماية تطبيقك من XSS",
    date: "2026-07-10",
    category: "نصائح أمنية",
    excerpt:
      "قائمة بأهم 10 ممارسات لمنع ثغرات Cross-Site Scripting في تطبيقات الويب الحديثة.",
    readTime: "8 دقائق",
    tags: ["XSS", "HTML Sanitization", "CSP"],
  },
  {
    id: 3,
    title: "مراجعة Burp Suite Professional 2026",
    date: "2026-07-05",
    category: "مراجعة أدوات",
    excerpt:
      "مراجعة شاملة لأحدث إصدار من Burp Suite Professional وميزاته الجديدة المتقدمة في اختبار اختراق تطبيقات الويب.",
    readTime: "15 دقيقة",
    tags: ["Burp Suite", "Web Security", "Testing"],
  },
  {
    id: 4,
    title: "أبرز التهديدات الأمنية في نصف عام 2026",
    date: "2026-06-28",
    category: "أخبار الصناعة",
    excerpt:
      "ملخص لأهم التهديدات والاستغلالات الأمنية التي شهدها العالم في النصف الأول من عام 2026.",
    readTime: "10 دقائق",
    tags: ["Threats", "CVE", "Zero-Day"],
  },
  {
    id: 5,
    title: "بناء منظومة أمنية لتطبيق الويب من الصفر",
    date: "2026-06-20",
    category: "نصائح أمنية",
    excerpt:
      "دليل عملي لبناء بنية تحتية أمنية شاملة لتطبيق الويب، يشمل المصادقة والتفويض وتأمين API.",
    readTime: "20 دقيقة",
    tags: ["Architecture", "OAuth", "JWT"],
  },
  {
    id: 6,
    title: "استخدام AI في اكتشاف الثغرات الأمنية",
    date: "2026-06-15",
    category: "أخبار الصناعة",
    excerpt:
      "كيف تستخدم تقنيات الذكاء الاصطناعي في اكتشاف الثغرات الأمنية بشكل أوتوماتيكي وكفاءة أعلى.",
    readTime: "14 دقيقة",
    tags: ["AI", "Machine Learning", "Security"],
  },
  {
    id: 7,
    title: "شرح ثغرات API Security في REST APIs",
    date: "2026-06-10",
    category: "آخر الثغرات",
    excerpt:
      "تحليل مفصل لأكثر ثغرات API شيوعاً وطرق حماية واجهات برمجة التطبيقات من الاستغلال.",
    readTime: "18 دقيقة",
    tags: ["API", "REST", "OWASP"],
  },
  {
    id: 8,
    title: "مقارنة أفضل أدوات فحص الثغرات 2026",
    date: "2026-06-01",
    category: "مراجعة أدوات",
    excerpt:
      "مقارنة شاملة بين أفضل أدوات فحص الثغرات المتاحة في 2026 مع توصيات حسب مستوى الخبرة.",
    readTime: "16 دقيقة",
    tags: ["Tools", "Comparison", "Scanner"],
  },
];

const categories = [
  "جميع المقالات",
  "آخر الثغرات",
  "نصائح أمنية",
  "مراجعة أدوات",
  "أخبار الصناعة",
];

const categoryColors: Record<string, string> = {
  "آخر الثغرات": "bg-red-100 text-red-800",
  "نصائح أمنية": "bg-green-100 text-green-800",
  "مراجعة أدوات": "bg-blue-100 text-blue-800",
  "أخبار الصناعة": "bg-purple-100 text-purple-800",
};

export default function BlogPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-l from-indigo-900 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">المدونة</h1>
          <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
            أحدث المقالات والأخبار والنصائح في مجال أمن الويب وحماية المواقع
            الإلكترونية
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* التصنيفات */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-indigo-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* المقالات */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        categoryColors[post.category] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{post.date}</span>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      اقرأ المزيد ←
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* المزيد من المقالات */}
        <section className="text-center">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            تحميل المزيد من المقالات
          </button>
        </section>
      </main>
    </div>
  );
}
