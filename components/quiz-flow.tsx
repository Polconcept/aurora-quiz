'use client'

import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react'

export interface QuizAnswer {
  question: number
  answer: string
}

interface QuizFlowProps {
  currentQuestion: number
  answers: QuizAnswer[]
  onAnswer: (answer: string) => void
  onNext: () => void
  onBack: () => void
  onComplete: () => void
}

export function QuizFlow({
  currentQuestion,
  answers,
  onAnswer,
  onNext,
  onBack,
  onComplete,
}: QuizFlowProps) {
  const questions = [
    {
      id: 1,
      question: 'What are you currently dealing with?',
      subtitle: 'Select one option',
      options: [
        'Allergies / Congestion / Breathing difficulties',
        'Skin condition (Eczema, Psoriasis, Acne)',
        'Stress / Anxiety / Sleep issues',
        'Post-viral symptoms (lingering cough, chest tightness)',
        'General wellness / Immune support',
      ],
    },
    {
      id: 2,
      question: 'How long have you been dealing with this?',
      subtitle: 'Select one option',
      options: [
        'A few days',
        'A few weeks',
        'Several months',
        'Over a year',
        'Multiple years',
      ],
    },
    {
      id: 3,
      question: 'What have you already tried?',
      subtitle: 'Select one or more options',
      options: [
        'Antihistamines / Allergy medications',
        'Prescription inhalers',
        'Steroid creams / Topical treatments',
        'Nasal sprays / Decongestants',
        'Supplements (Melatonin, Ashwagandha, Vitamin C, etc.)',
        'Meditation apps / Breathing exercises',
        'Dietary changes',
        'Nothing yet',
      ],
    },
    {
      id: 4,
      question: 'How serious are you about finding a solution in the next 30 days?',
      subtitle: 'Choose the statement that best matches where you are',
      options: [
        'Just browsing',
        'Somewhat interested',
        'Very ready to try something new',
      ],
    },
  ]

  const current = questions[currentQuestion - 1]
  const selectedAnswer = answers.find((a) => a.question === currentQuestion)?.answer
  const progressPercent = ((currentQuestion - 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    onAnswer(answer)
  }

  const handleNext = () => {
    if (currentQuestion === questions.length) {
      onComplete()
    } else {
      onNext()
    }
  }

  const isAnswered = !!selectedAnswer

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float-up" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-secondary/8 to-transparent rounded-full blur-3xl animate-float-up" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Enhanced Progress Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                Step {currentQuestion} of {questions.length}
              </span>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur">
              {Math.round(progressPercent)}% Complete
            </span>
          </div>
          
          {/* Ultra-Modern Progress Bar */}
          <div className="relative h-2 bg-primary/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Section */}
        <div className="animate-slide-up mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight text-balance">
            {current.question}
          </h1>
          <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mb-2" />
          <p className="text-sm text-foreground/50 font-medium">{current.subtitle}</p>
        </div>

        {/* Modern Pill-Style Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
          {current.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`group relative overflow-hidden rounded-lg transition-all duration-300 animate-scale-in transform hover:scale-105 ${
                  isSelected
                    ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
                    : 'hover:ring-2 hover:ring-primary/40 hover:ring-offset-1 hover:ring-offset-background'
                }`}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isSelected
                    ? 'bg-gradient-to-br from-primary/20 to-secondary/10'
                    : 'bg-gradient-to-br from-card/80 to-card/40 group-hover:from-primary/10 group-hover:to-secondary/5'
                }`} />
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
                </div>

                {/* Border */}
                <div className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-primary/60'
                    : 'border-border/40 group-hover:border-primary/30'
                }`} />

                {/* Content */}
                <div className="relative p-3 md:p-4 flex flex-col items-start gap-2 h-full min-h-[70px] justify-between">
                  <span className={`text-sm md:text-base font-bold transition-colors text-left leading-snug ${
                    isSelected
                      ? 'text-primary'
                      : 'text-foreground/80 group-hover:text-foreground'
                  }`}>
                    {option}
                  </span>
                  
                  {/* Animated Checkmark */}
                  <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all duration-300 ml-auto ${
                    isSelected
                      ? 'bg-primary border-primary'
                      : 'border-border/60 group-hover:border-primary/40'
                  }`}>
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Premium Bottom Navigation */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-border/30 animate-fade-in">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm text-foreground/60 hover:text-foreground font-bold transition-all hover:bg-border/40 rounded-lg"
          >
            ← Back
          </button>
          
          <div className="flex-1" />
          
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-xl group ${
              isAnswered
                ? 'bg-gradient-to-r from-primary via-primary/90 to-secondary hover:shadow-2xl hover:shadow-primary/40 text-primary-foreground hover:scale-105 active:scale-95'
                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-40'
            }`}
          >
            {currentQuestion === questions.length ? 'See Results' : 'Continue'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  )
}
