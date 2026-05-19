'use client'

import { QuizAnswer } from './quiz-flow'
import { ArrowLeft } from 'lucide-react'

interface ResultsPageProps {
  answers: QuizAnswer[]
  onBack: () => void
  onStartOver: () => void
}

export function ResultsPage({ answers, onBack, onStartOver }: ResultsPageProps) {
  // Map answers to display labels
  const answerMap: { [key: number]: string } = {}
  answers.forEach((answer) => {
    answerMap[answer.question] = answer.answer
  })

  const assessment = {
    condition: answerMap[1] || 'Unknown',
    duration: answerMap[2] || 'Unknown',
    tried: answerMap[3] || 'Unknown',
    seriousness: answerMap[4] || 'Unknown',
  }

  const renderAssessmentSummary = () => (
    <div className="mb-8 animate-slide-up">
      <h3 className="text-lg font-bold text-foreground mb-4 text-left">Your Assessment Summary</h3>

      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-border/40 bg-card/40 p-4">
          <h4 className="font-bold text-foreground text-xs mb-1 uppercase tracking-wider">Current condition:</h4>
          <p className="text-sm text-foreground/80">{assessment.condition}</p>
        </div>
        <div className="rounded-lg border border-border/40 bg-card/40 p-4">
          <h4 className="font-bold text-foreground text-xs mb-1 uppercase tracking-wider">How long it has been going on:</h4>
          <p className="text-sm text-foreground/80">{assessment.duration}</p>
        </div>
        <div className="rounded-lg border border-border/40 bg-card/40 p-4">
          <h4 className="font-bold text-foreground text-xs mb-1 uppercase tracking-wider">What you have already tried:</h4>
          <p className="text-sm text-foreground/80">{assessment.tried}</p>
        </div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FDF8F4] relative overflow-hidden flex flex-col" suppressHydrationWarning>
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-24" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-24" />
      </div>

      <div className="relative z-10 px-4 md:px-8 py-12 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-2xl pt-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 animate-fade-in"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back</span>
          </button>

          {renderAssessmentSummary()}

          <div className="mb-8 animate-scale-in">
            <h3 className="text-lg font-bold text-foreground mb-4">Session Walkthrough</h3>
            <div className="flex flex-col gap-4">
              {[
                "You arrive and are welcomed into a calm, dimly lit salt room designed to feel like a natural salt cave.",
                "You sit back in a comfortable chair. Soft music plays. There are no screens, no distractions.",
                "A halogenerator quietly grinds pharmaceutical-grade salt into microscopic particles and disperses them into the air.",
                "You simply breathe normally. The salt particles travel deep into your airways, settle on your skin, and begin working naturally.",
                "45 minutes later you walk out. Airways clearer. Skin calmer. Mind lighter."
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed pt-1.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#2D241E] mb-6">
              See you soon
            </h2>

            <button
              onClick={onStartOver}
              className="text-sm font-medium text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
