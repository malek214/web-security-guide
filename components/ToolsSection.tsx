import { vulnerabilityTools } from '@/lib/tools'

interface ToolsSectionProps {
  slug: string
}

export default function ToolsSection({ slug }: ToolsSectionProps) {
  const tools = vulnerabilityTools[slug]

  if (!tools || tools.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-4 mb-6">
        🔧 أفضل أدوات اكتشاف واستغلال الثغرة
      </h2>
      <p className="text-gray-600 mb-6">
        أدوات متخصصة لفحص واكتشاف واستغلال ثغرة {slug}. استخدمها بشكل مسؤول وأخلاقي فقط.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">
                  {tool.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tool.type === 'free' 
                    ? 'bg-green-100 text-green-700' 
                    : tool.type === 'paid' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                }`}>
                  {tool.type === 'free' ? 'مجاني' : tool.type === 'paid' ? 'مدفوع' : 'مجاني + مدفوع'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                <span>ال访问 الموقع</span>
                <span>←</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-bold text-yellow-800 mb-1">تنبيه أمني</h4>
            <p className="text-sm text-yellow-700 mb-0">
              استخدم هذه الأدوات فقط على أنظمةown own permission. الاختبار بدون إذن يعتبر جريمة إلكترونية في معظم الدول.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
