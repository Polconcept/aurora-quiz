'use client'

import { CheckCircle2 } from 'lucide-react'

interface LandingPageProps {
  onStartQuiz: () => void
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  const benefits = [
    'Real relief for chronic allergies, congestion, and breathing issues — without inhalers that wear off',
    'Calmer, clearer skin without prescription creams or steroid treatments',
    'A complete mental reset without medication or supplements',
    '45 minutes in a natural salt room — no side effects, no recovery time',
    'Your first session comes with a free 15-minute consultation',
  ]

  return (
    <main className="min-h-screen bg-[#FDF8F4] relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-12 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D241E] mb-6 leading-tight text-balance">
            Still Managing Symptoms That Never Fully Go Away?
          </h1>
          
          <p className="text-base md:text-lg text-[#2D241E]/70 mb-10 leading-relaxed text-balance max-w-2xl mx-auto">
            Whether it&apos;s allergies, skin flare-ups, or a mind that won&apos;t switch off, find out if halotherapy is the natural, drug-free relief you&apos;ve been looking for. Takes 10 seconds.
          </p>

          {/* Top CTA Button */}
          <div className="flex justify-center mb-12">
            <button
              onClick={onStartQuiz}
              className="group px-8 py-4 bg-[#964B00] hover:bg-[#7D3E00] text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <span>👉 Click here to find out if halo therapy is for you 👈</span>
            </button>
          </div>
        </div>

        {/* Benefits List Section */}
        <div className="max-w-xl mx-auto mb-12 w-full">
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-left"
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#964B00]" />
                </div>
                <p className="text-base md:text-lg text-[#2D241E]/80 leading-snug">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="w-full flex justify-center">
          <button
            onClick={onStartQuiz}
            className="group px-8 py-4 bg-[#964B00] hover:bg-[#7D3E00] text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>👉 Click here to find out if halo therapy is for you 👈</span>
          </button>
        </div>
      </div>
    </main>
  )
}
