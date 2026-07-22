'use client'

import { useState, useEffect } from 'react'

const TOTAL_PAGES = 37
const STORAGE_KEY = 'web-security-guide-progress'

function getReadPages(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveReadPages(pages: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
}

export default function ProgressTracker() {
  const [readPages, setReadPages] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReadPages(getReadPages())
  }, [])

  useEffect(() => {
    if (!mounted) return

    const currentPath = window.location.pathname
    const vulnMatch = currentPath.match(/\/vulnerabilities\/(.+)/)
    if (vulnMatch) {
      const pageId = vulnMatch[1]
      setReadPages((prev) => {
        if (prev.includes(pageId)) return prev
        const updated = [...prev, pageId]
        saveReadPages(updated)
        return updated
      })
    }
  }, [mounted])

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setReadPages([])
  }

  if (!mounted) return null

  const percentage = Math.round((readPages.length / TOTAL_PAGES) * 100)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 text-sm">تقدم القراءة</h3>
        <span className="text-xs font-semibold text-blue-600">
          {readPages.length} من {TOTAL_PAGES} صفحة
        </span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{percentage}% مكتمل</span>
        {readPages.length > 0 && (
          <button
            onClick={handleReset}
            className="text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            إعادة التعيين
          </button>
        )}
      </div>

      {readPages.length === TOTAL_PAGES && (
        <div className="mt-3 p-2 bg-green-50 rounded-lg text-center">
          <span className="text-sm text-green-700 font-semibold">
            ✓ أحسنت! قمت بقراءة جميع الصفحات
          </span>
        </div>
      )}
    </div>
  )
}
