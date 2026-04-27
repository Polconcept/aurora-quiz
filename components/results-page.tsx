'use client'

import { CheckCircle2, ArrowRight, Star, Sparkles, Leaf, Play, ArrowLeft } from 'lucide-react'
import { QuizAnswer } from './quiz-flow'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'

interface ResultsPageProps {
  answers: QuizAnswer[]
  onBook: () => void
  onStartOver: () => void
  onBack: () => void
}

export function ResultsPage({ answers, onBook, onStartOver, onBack }: ResultsPageProps) {
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

  const renderVideoModal = (trigger: React.ReactNode) => (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black overflow-hidden border-none shadow-2xl">
        <DialogTitle className="sr-only">How Halotherapy Works</DialogTitle>
        <div className="aspect-video w-full relative">
          <video 
            src="/_How Halo Therapy Works_.mp4" 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )

  const renderAssessmentSummary = () => (
    <div className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-bold text-foreground mb-4">Your Assessment Summary</h3>
      
      <div className="flex flex-col gap-3">
        <div className="group rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-card hover:shadow-lg transition-all duration-300">
          <h4 className="font-bold text-foreground text-xs mb-1">Current condition:</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{assessment.condition}</p>
        </div>
        <div className="group rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-card hover:shadow-lg transition-all duration-300">
          <h4 className="font-bold text-foreground text-xs mb-1">How long it has been going on:</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{assessment.duration}</p>
        </div>
        <div className="group rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-card hover:shadow-lg transition-all duration-300">
          <h4 className="font-bold text-foreground text-xs mb-1">What you have already tried:</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{assessment.tried}</p>
        </div>
      </div>
    </div>
  )

  const renderJustBrowsing = () => (
    <>
      <div className="text-center mb-8 animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight text-balance">
          Start by learning how halo therapy works, or skip ahead to a free consultation.
        </h1>
      </div>

      {renderAssessmentSummary()}

      <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
        {renderVideoModal(
          <button
            className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            <span>See how halo therapy works</span>
          </button>
        )}
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

      <div className="mb-8 animate-scale-in" style={{ animationDelay: '100ms' }}>
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

      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in mb-8" style={{ animationDelay: '300ms' }}>
        <button
          onClick={onBook}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary/70" />
          <div className="relative flex items-center justify-center gap-2 text-primary-foreground text-center">
            <span>Get a Free 15-Minute Salt Therapy Consultation</span>
          </div>
        </button>

        {renderVideoModal(
          <button className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            <span>Learn more about how it works</span>
          </button>
        )}
      </div>

      {renderAssessmentSummary()}
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
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight text-balance">
          You&apos;re a Great Fit!
        </h1>
        <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
          Based on your responses, halotherapy can be an excellent natural solution for your needs.
        </p>
      </div>

      <div className="mb-8 animate-scale-in" style={{ animationDelay: '100ms' }}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
            <div className="flex gap-3 items-start mb-4">
              <div className="flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary animate-float-up" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Your Personal Path Forward</h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Book your first 45-minute salt therapy session—absolutely free consultation included. Our specialists will walk you through the experience and answer any questions about how halotherapy can support your specific wellness goals.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
              <div className="flex items-center gap-1.5 text-xs text-foreground/70">
                <Star className="w-3.5 h-3.5 text-secondary" />
                <span>Trusted by 10,000+ users</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-foreground/70">
                <Leaf className="w-3.5 h-3.5 text-primary" />
                <span>100% natural & safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-lg font-bold text-foreground mb-4">Your Assessment Summary</h3>
        
        <div className="grid md:grid-cols-2 gap-2.5">
          {[
            { label: 'Current Condition', value: assessment.condition, icon: '🎯' },
            { label: 'Duration', value: assessment.duration, icon: '⏰' },
            { label: 'What You\'ve Tried', value: assessment.tried, icon: '✓' },
            { label: 'Readiness Level', value: assessment.seriousness, icon: '🚀' },
          ].map((item, index) => (
            <div
              key={index}
              className="group rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm p-4 md:p-5 hover:border-primary/40 hover:bg-card hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 50}ms` }}
            >
              <div className="flex gap-2 mb-2">
                <span className="text-lg">{item.icon}</span>
                <h4 className="font-bold text-foreground text-xs">{item.label}</h4>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <button
          onClick={onBook}
          className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex items-center justify-center gap-2 text-primary-foreground">
            <span>Book Your Free Session</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {renderVideoModal(
          <button className="flex-1 group relative overflow-hidden rounded-lg p-4 font-bold text-base transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            <span>How it works</span>
          </button>
        )}

        <button
          onClick={onStartOver}
          className="px-6 py-4 border-2 border-primary/30 hover:border-primary/60 text-foreground hover:bg-primary/5 font-bold text-base rounded-lg transition-all duration-300 active:scale-95"
        >
          Retake Quiz
        </button>
      </div>

      <div className="mt-8 pt-6 text-center border-t border-border/40 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <p className="text-sm text-foreground/70 mb-2">
          ⏱️ First available appointments can be scheduled within <span className="font-bold text-primary">24 hours</span>
        </p>
        <p className="text-xs text-foreground/50">
          Your data is safe with us. We never share your information.
        </p>
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
