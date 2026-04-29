'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { QuizFlow, QuizAnswer } from '@/components/quiz-flow'
import { ResultsPage } from '@/components/results-page'
import { LeadForm } from '@/components/lead-form'
import { getCalApi } from '@calcom/embed-react'

type PageState = 'landing' | 'quiz' | 'lead-capture' | 'results'

export default function Home() {
  const [pageState, setPageState] = useState<PageState>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [lead, setLead] = useState<{ name: string; email: string; phone: string } | null>(null)

  const handleStartQuiz = () => {
    setPageState('quiz')
    setCurrentQuestion(1)
    setAnswers([])
    setLead(null)
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
    setPageState('lead-capture')
  }

  const handleLeadSubmit = async (leadData: { name: string; email: string; phone: string }) => {
    setLead(leadData)

    // Build assessment from quiz answers
    const answerMap: { [key: number]: string } = {}
    answers.forEach((a) => { answerMap[a.question] = a.answer })

    const assessment = {
      condition: answerMap[1] || 'Unknown',
      duration:  answerMap[2] || 'Unknown',
      tried:     answerMap[3] || 'Unknown',
      seriousness: answerMap[4] || 'Unknown',
    }

    // Step 1 — Send everything to Latenode webhook
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: leadData, answers, assessment }),
      })

      const responseData = await response.json()

      if (response.ok && responseData.success) {
        // Step 2 — Webhook succeeded, open Cal.com popup with prefilled data
        try {
          const cal = await getCalApi({ namespace: 'halotherapy' })

          cal('modal', {
            calLink: 'aurorarecovery/halotherapy',
            config: {
              name:  leadData.name,
              email: leadData.email,
              ...(leadData.phone ? { phone: leadData.phone } : {}),
            },
          })

          // Navigate to results after popup is opened
          setTimeout(() => { setPageState('results') }, 1000)

        } catch (calError) {
          console.error('Cal.com popup failed, falling back to redirect:', calError)
          // Fallback — redirect directly to Cal.com
          const calUrl = process.env.NEXT_PUBLIC_CAL_BOOKING_URL || 'https://cal.com/aurorarecovery/halotherapy'
          window.open(calUrl, '_blank')
          setPageState('results')
        }

      } else {
        const msg = responseData.error || 'Something went wrong. Please try again.'
        alert(msg)
      }

    } catch (error: any) {
      console.error('Submission failed:', error)
      alert('Network error: ' + error.message)
    }
  }

  const getButtonText = () => {
    const answerMap: { [key: number]: string } = {}
    answers.forEach((a) => { answerMap[a.question] = a.answer })
    const seriousness = answerMap[4]
    if (seriousness === 'Just browsing' || seriousness === 'Somewhat interested') {
      return 'Get a Free 15-Minute Salt Therapy Consultation'
    }
    return 'Book Your First Session Now'
  }

  const handleStartOver = () => {
    setPageState('landing')
    setCurrentQuestion(1)
    setAnswers([])
    setLead(null)
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
      {pageState === 'lead-capture' && (
        <LeadForm onSubmit={handleLeadSubmit} buttonText={getButtonText()} />
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
