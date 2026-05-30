'use client'

import { useState, useEffect } from 'react'
import { LandingPage } from '@/components/landing-page'
import { QuizFlow, QuizAnswer } from '@/components/quiz-flow'
import { ResultsPage } from '@/components/results-page'
import { ThankYouPage } from '@/components/thank-you-page'
import { getCalApi } from '@calcom/embed-react'
import * as fpixel from '@/lib/fpixel'
import { saveQuizSubmission } from '@/lib/actions'

type PageState = 'landing' | 'quiz' | 'results' | 'thank-you'

export default function Home() {
  const [pageState, setPageState] = useState<PageState>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    // Check URL for booking ID on mount (in case of redirect)
    const params = new URLSearchParams(window.location.search)
    const id = params.get('bookingId') || params.get('booking_uid')
    if (id) {
      console.log('📍 Booking ID captured from URL:', id)
      setBookingId(id)
    }

    (async function () {
      const cal = await getCalApi({ namespace: 'halotherapy' });
      cal("on", {
        action: "bookingSuccessful",
        callback: (event) => {
          console.log("Booking successful", event);
          if (event?.detail) {
            setBookingDetails(event.detail);
            const eventBookingId = event.detail.bookingId || event.detail.id;
            if (eventBookingId) {
              console.log('📍 Booking ID captured from Event:', eventBookingId);
              setBookingId(String(eventBookingId));
            }
          }
          setPageState('thank-you');
        }
      });
    })();
  }, []);

  const handleStartQuiz = () => {
    fpixel.event('InitiateCheckout')
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

  const handleCompleteQuiz = async () => {
    const answerMap: { [key: number]: string } = {}
    answers.forEach((a) => { answerMap[a.question] = a.answer })

    const assessment = {
      condition: answerMap[1] || 'Unknown',
      duration:  answerMap[2] || 'Unknown',
      tried:     answerMap[3] || 'Unknown',
      seriousness: answerMap[4] || 'Unknown',
    }

    // Save to database
    try {
      fpixel.event('Subscribe')
      await saveQuizSubmission({
        bookingId,
        answers: assessment,
        bookingDetails
      })
    } catch (error) {
      console.error('Failed to save lead:', error)
    }

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
      {pageState === 'landing' && (
        <LandingPage 
          onBook={handleBook} 
          onStartQuiz={handleStartQuiz} 
        />
      )}
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
          bookingId={bookingId}
          onStartOver={handleStartOver}
          onBack={() => {
            setPageState('quiz')
            setCurrentQuestion(4)
          }}
        />
      )}
      {pageState === 'thank-you' && (
        <ThankYouPage 
          onBackToHome={handleStartOver} 
          onStartQuiz={handleStartQuiz} 
        />
      )}
    </>
  )
}
