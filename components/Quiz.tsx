'use client'

import { useState } from 'react'
import { quizData, QuizQuestion } from '@/lib/quiz-data'

interface QuizProps {
  slug: string
}

interface AnswerStatus {
  selected: number
  isCorrect: boolean
}

export default function Quiz({ slug }: QuizProps) {
  const questions = quizData[slug]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerStatus[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  if (!questions || questions.length === 0) {
    return null
  }

  const currentQuestion: QuizQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const score = answers.filter((a) => a.isCorrect).length

  const handleSelectOption = (index: number) => {
    if (answered) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return
    const isCorrect = selectedOption === currentQuestion.correctIndex
    const newAnswers = [...answers, { selected: selectedOption, isCorrect }]
    setAnswers(newAnswers)
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setAnswers([])
    setShowResult(false)
    setSelectedOption(null)
    setAnswered(false)
  }

  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100)
    return (
      <section className="mt-12 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
        <div className="text-center">
          <div className="mb-6">
            <span className="text-6xl">
              {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            نتائج الاختبار
          </h3>
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-700">
              <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {score}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/</span>
              <span className="text-2xl text-gray-600 dark:text-gray-300">
                {totalQuestions}
              </span>
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            النسبة: {percentage}%
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {percentage >= 80
              ? 'ممتاز! أنت تملك معرفة جيدة بالثغرات الأمنية'
              : percentage >= 50
              ? 'جيد! يمكنك تحسين معلوماتك بمراجعة المحتوى'
              : 'يُنصح بمراجعة محتوى الثغرة لتحسين فهمك'}
          </p>
          <button
            onClick={handleRetry}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            إعادة الاختبار
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-12 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          اختبار المعرفة
        </h3>
        <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let optionStyle = ''
            if (answered) {
              if (index === currentQuestion.correctIndex) {
                optionStyle = 'border-success-500 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400'
              } else if (index === selectedOption && index !== currentQuestion.correctIndex) {
                optionStyle = 'border-danger-500 bg-danger-50 dark:bg-danger-900/20 text-danger-700 dark:text-danger-400'
              } else {
                optionStyle = 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              }
            } else if (selectedOption === index) {
              optionStyle = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-200 dark:ring-primary-800'
            } else {
              optionStyle = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 cursor-pointer'
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={answered}
                className={`w-full text-right px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-4 ${optionStyle} ${
                  answered ? 'cursor-default' : ''
                }`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    answered && index === currentQuestion.correctIndex
                      ? 'bg-success-500 text-white'
                      : answered && index === selectedOption && index !== currentQuestion.correctIndex
                      ? 'bg-danger-500 text-white'
                      : selectedOption === index
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {answered && index === currentQuestion.correctIndex
                    ? '✓'
                    : answered && index === selectedOption && index !== currentQuestion.correctIndex
                    ? '✗'
                    : String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-right leading-relaxed">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {answered && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            selectedOption === currentQuestion.correctIndex
              ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-700 dark:text-success-400'
              : 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-400'
          }`}
        >
          <p className="font-semibold">
            {selectedOption === currentQuestion.correctIndex
              ? '✅ إجابة صحيحة! أحسنت.'
              : `❌ إجابة خاطئة. الإجابة الصحيحة: ${currentQuestion.options[currentQuestion.correctIndex]}`}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-4">
        {!answered ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            تأكيد الإجابة
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            {currentIndex < totalQuestions - 1 ? 'السؤال التالي' : 'عرض النتائج'}
          </button>
        )}
      </div>
    </section>
  )
}
