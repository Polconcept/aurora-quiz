'use client'

import { CheckCircle2, Leaf, Shield, Heart, Zap, Sparkles } from 'lucide-react'

interface LandingPageProps {
  onStartQuiz: () => void
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  const benefits = [
    { text: 'Real relief for chronic allergies, congestion, and breathing issues — without inhalers that wear off', icon: Shield },
    { text: 'Calmer, clearer skin without prescription creams or steroid treatments', icon: Heart },
    { text: 'A complete mental reset without medication or supplements', icon: Zap },
    { text: '45 minutes in a natural salt room — no side effects, no recovery time', icon: Leaf },
    { text: 'Your first session comes with a free 15-minute consultation', icon: Sparkles },
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl -ml-40 -mb-40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-12">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12 animate-fade-in">
          <Leaf className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Aurora Quiz</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Still Managing Symptoms That Never Fully Go Away?
          </h1>
          
          <p className="text-base md:text-lg text-foreground/70 mb-10 leading-relaxed text-balance mx-auto">
            Whether it's allergies, skin flare-ups, or a mind that won't switch off, find out if halotherapy is the natural, drug-free relief you've been looking for. Takes 10 seconds.
          </p>

          {/* Top CTA Button */}
          <div className="flex justify-center mb-12">
            <button
              onClick={onStartQuiz}
              className="group px-6 py-4 md:px-10 md:py-5 bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <span>👉 Click here to find out if halo therapy is for you 👈</span>
            </button>
          </div>
        </div>

        {/* Benefits List Section */}
        <div className="max-w-2xl mx-auto mb-16 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            What You&apos;ll Get with Aurora
          </h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors group border border-transparent hover:border-primary/10"
              >
                <div className="flex items-start gap-4 text-left">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-base md:text-lg text-foreground/80 leading-snug">
                    {benefit.text}
                  </p>
                </div>
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button Section with Decorative Design */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-primary/20 shadow-inner overflow-hidden">
            {/* Decorative background blur blobs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex justify-center">
              <button
                onClick={onStartQuiz}
                className="group px-8 py-4 md:px-12 md:py-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg md:text-xl rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
              >
                <span className="relative z-10">👉 Click here to find out if halo therapy is for you 👈</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
