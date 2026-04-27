'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, Play, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { QuizAnswer } from './quiz-flow'

interface ResultsPageProps {
  answers: QuizAnswer[]
  onBook: () => void
  onStartOver: () => void
  onBack: () => void
}

export function ResultsPage({ answers, onBook, onStartOver, onBack }: ResultsPageProps) {
  const [showVideo, setShowVideo] = useState(false)
  
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

  const renderEmbeddedVideo = () => (
    <div className="mt-4 animate-fade-in w-full overflow-hidden rounded-xl border border-border/40 bg-black aspect-video relative">
      <video 
        src="/_How Halo Therapy Works_.mp4" 
        controls 
        className="w-full h-full object-contain"
      />
    </div>
  )

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

  const renderJustBrowsing = () => (
    <>
      {renderAssessmentSummary()}

      <div className="flex flex-col gap-3 animate-fade-in">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2"
        >
          {showVideo ? <ChevronUp className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>See how halo therapy works</span>
        </button>
        
        {showVideo && renderEmbeddedVideo()}

        <button
          onClick={onBook}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary/70" />
          <div className="relative flex items-center justify-center gap-2 text-primary-foreground">
            <span>Get a Free 15-Minute Salt Therapy Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </>
  )

  const renderSomewhatInterested = () => (
    <>
      <div className="text-center mb-8 animate-slide-down">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight text-balance">
          Somewhat interested?
        </h1>
        <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
          Here&apos;s exactly what your first halotherapy session at Aurora Recovery will look like:
        </p>
      </div>

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

      <div className="flex flex-col gap-3 animate-fade-in mb-8">
        <button
          onClick={onBook}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary/70" />
          <div className="relative flex items-center justify-center gap-2 text-primary-foreground text-center">
            <span>Get a Free 15-Minute Salt Therapy Consultation</span>
          </div>
        </button>

        <button 
          onClick={() => setShowVideo(!showVideo)}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2"
        >
          {showVideo ? <ChevronUp className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>Here&apos;s exactly what your first session looks like</span>
        </button>

        {showVideo && renderEmbeddedVideo()}
      </div>
    </>
  )

  const renderVeryReady = () => (
    <>
      <div className="text-center mb-8 animate-slide-down">
        <div className="inline-block mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
            <CheckCircle2 className="relative w-16 h-16 text-primary animate-bounce" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight text-balance">
          You&apos;ve unlocked a Free 15-Minutes Salt Therapy Consultation with your first session at Aurora Recovery OT in Katy, TX
        </h1>
        <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
          Our team will walk you through exactly what to expect and make sure halotherapy is the right fit for you before you begin
        </p>
      </div>

      {renderAssessmentSummary()}

      <div className="flex flex-col gap-3 animate-fade-in mb-8">
        <button
          onClick={onBook}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary/70" />
          <div className="relative flex items-center justify-center gap-2 text-primary-foreground">
            <span>Book Your First Session Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </>
  )

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -mr-48 -mt-24" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-48 -mb-24" />
      </div>

      <div className="relative z-10 px-4 md:px-8 py-8 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-2xl pt-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 animate-fade-in"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back</span>
          </button>

          {assessment.seriousness === 'Just browsing' && renderJustBrowsing()}
          {assessment.seriousness === 'Somewhat interested' && renderSomewhatInterested()}
          {(assessment.seriousness === 'Very ready to try something new' || assessment.seriousness === 'Unknown') && renderVeryReady()}

          {assessment.seriousness !== 'Very ready to try something new' && assessment.seriousness !== 'Unknown' && (
            <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '500ms' }}>
               <button
                onClick={onStartOver}
                className="text-sm font-medium text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
