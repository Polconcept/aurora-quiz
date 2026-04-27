'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { QuizFlow, QuizAnswer } from '@/components/quiz-flow'
import { ResultsPage } from '@/components/results-page'

type PageState = 'landing' | 'quiz' | 'results'

export default function Home() {
  const [pageState, setPageState] = useState<PageState>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

  const handleStartQuiz = () => {
    setPageState('quiz')
    setCurrentQuestion(1)
    setAnswers([])
  }

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.question !== currentQuestion)
      return [...filtered, { question: currentQuestion, answer }]
    })
  }

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1)
  }

  const handleBackQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1)
    } else {
      setPageState('landing')
    }
  }

  const handleCompleteQuiz = () => {
    setPageState('results')
  }

  const handleBook = () => {
    // In a real implementation, this would navigate to a booking page or open a calendar
    alert('Redirecting to booking page...')
  }

  const handleStartOver = () => {
    setPageState('landing')
    setCurrentQuestion(1)
    setAnswers([])
  }

  return (
    <>
      {pageState === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
      {pageState === 'quiz' && (
        <QuizFlow
          currentQuestion={currentQuestion}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onBack={handleBackQuestion}
          onComplete={handleCompleteQuiz}
        />
      )}
      {pageState === 'results' && (
        <ResultsPage
          answers={answers}
          onBook={handleBook}
          onStartOver={handleStartOver}
          onBack={() => setPageState('quiz')}
        />
      )}
    </>
  )
}
