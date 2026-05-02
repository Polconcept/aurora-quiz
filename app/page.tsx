'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { QuizFlow, QuizAnswer } from '@/components/quiz-flow'
import { ResultsPage } from '@/components/results-page'
import { ThankYouPage } from '@/components/thank-you-page'
import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

type PageState = 'landing' | 'quiz' | 'results' | 'thank-you'

export default function Home() {
  const [pageState, setPageState] = useState<PageState>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'halotherapy' });
      cal("on", {
        action: "bookingSuccessful",
        callback: (event) => {
          console.log("Booking successful", event);
          
          // Safely trigger the Facebook Pixel 'Lead' event
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead');
          }

          setPageState('thank-you');
        }
      });
    })();
  }, []);

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

  const handleBook = async () => {
    const answerMap: { [key: number]: string } = {}
    answers.forEach((a) => { answerMap[a.question] = a.answer })

    const assessment = {
      condition: answerMap[1] || 'Unknown',
      duration:  answerMap[2] || 'Unknown',
      tried:     answerMap[3] || 'Unknown',
      seriousness: answerMap[4] || 'Unknown',
    }

    const queryParams = new URLSearchParams()
    queryParams.append('metadata[condition]', assessment.condition)
    queryParams.append('metadata[duration]', assessment.duration)
    queryParams.append('metadata[tried]', assessment.tried)
    queryParams.append('metadata[seriousness]', assessment.seriousness)

    const calLinkWithParams = `aurorarecovery/halotherapy?${queryParams.toString()}`

    try {
      const cal = await getCalApi({ namespace: 'halotherapy' })
      cal('modal', {
        calLink: calLinkWithParams
      })
    } catch (calError) {
      console.error('Cal.com popup failed, falling back to redirect:', calError)
      const calUrl = `https://cal.com/aurorarecovery/halotherapy?${queryParams.toString()}`
      window.open(calUrl, '_blank')
    }
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
      {pageState === 'thank-you' && (
        <ThankYouPage onBackToHome={handleStartOver} />
      )}
    </>
  )
}
