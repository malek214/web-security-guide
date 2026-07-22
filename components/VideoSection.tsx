import { vulnerabilityVideos } from '@/lib/videos'

interface VideoSectionProps {
  slug: string
}

export default function VideoSection({ slug }: VideoSectionProps) {
  const videos = vulnerabilityVideos[slug]

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-4 mb-6">
        🎬 فيديوهات تعليمية
      </h2>
      <p className="text-gray-600 mb-6">
        شرح مفصل بالعربي مع أمثلة عملية لفهم الثغرة والاستغلال والحماية.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="aspect-video bg-gray-900 relative">
              <iframe
                src={`https://www.youtube.com/embed/${extractVideoId(video.url)}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-xs line-clamp-2">
                {video.description}
              </p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-primary-600 hover:text-primary-700 text-xs font-medium"
              >
                مشاهدة على يوتيوب ←
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function extractVideoId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/)
  if (match) return match[1]

  const playlistMatch = url.match(/list=([^&]+)/)
  if (playlistMatch) return playlistMatch[1]

  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return shortMatch[1]

  return ''
}
