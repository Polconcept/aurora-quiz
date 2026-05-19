'use client'

import { useState } from 'react'
import { CheckCircle2, Play, ChevronUp, Star } from 'lucide-react'

interface LandingPageProps {
  onBook: () => void
  onStartQuiz: () => void
}

export function LandingPage({ onBook, onStartQuiz }: LandingPageProps) {
  const benefits = [
    'Real relief for chronic allergies, congestion, and breathing issues — without inhalers that wear off',
    'Calmer, clearer skin without prescription creams or steroid treatments',
    'A complete mental reset without medication or supplements',
  ]

  const [showTopVideo, setShowTopVideo] = useState(false)

  const testimonials = [
    {
      name: "Lynn Picos",
      role: "Local Guide • 56 reviews",
      rating: 5,
      time: "a month ago",
      image: "/Lynn Picos.jpg",
      text: (
        <>
          I&apos;ve been suffering from bronchitis and after my second session in the salt room I was able to <strong>breathe</strong> better less coughing and I had so much more energy! I was skeptical but now I&apos;m a believer.
        </>
      ),
      initials: "LP",
      avatarBg: "bg-amber-100 text-amber-800"
    },
    {
      name: "Bonnie Davis",
      role: "Verified Guest • 1 review",
      rating: 5,
      time: "a month ago",
      text: (
        <>
          Aurora Therapy’s halotherapy treatment has been a genuine life-changer for me. I used to suffer from chronic chest congestion that made intense cardio nearly impossible. Since starting my sessions, my <strong>breathing</strong> has improved significantly. I’ve gone from being unable to run to completing 5-mile runs and heavy cardio without any respiratory issues. I can’t recommend them enough!
        </>
      ),
      initials: "BD",
      avatarBg: "bg-blue-100 text-blue-800"
    },
    {
      name: "Lindsay Phillips",
      role: "Verified Guest • 1 review",
      rating: 5,
      time: "a month ago",
      image: "/Lindsay Phillips.jpg",
      text: (
        <>
          The space at Aurora Recovery immediately felt elevated, clean, calming, and zen-like in its aesthetic. It set the tone before anything even began.
          <br /><br />
          As I settled into the reclining chair in the salt room, I became aware of the ambiance, the soft lighting and the gentle sound of waves crashing. <strong>The environment</strong> made it easy for my body to begin unwinding.
          <br /><br />
          My therapist was knowledgeable and supportive, offering specific breathing exercises to enhance the effects of the treatment and help me stay present throughout the session. I look forward to continuing with the rest of my sessions and noticing how my body responds over time.
        </>
      ),
      initials: "LP",
      avatarBg: "bg-emerald-100 text-emerald-800"
    },
    {
      name: "Oyetola Oloyede",
      role: "Verified Guest • 5 reviews",
      rating: 5,
      time: "2 months ago",
      image: "/oyatola.jpg",
      text: (
        <>
          As a new mom, I’ve been feeling exhausted, stressed, and not sleeping well, so I decided to try the salt therapy room at Aurora Recovery Occupational Therapy—and it was such a beautiful experience. The space is calm, peaceful, and designed in a way that makes you feel relaxed the moment you walk in. Sitting in the halotherapy room and <strong>breathing</strong> in the salt-infused air felt incredibly soothing.
          <br /><br />
          By the end of the session I felt my <strong>breathing</strong> open up, my body relax, and my mind finally slow down. It honestly felt like my nervous system got a chance to reset. I also struggle with occasional sinus congestion and sensitive skin, and after the session everything felt clearer and calmer.
          <br /><br />
          Aurora truly feels like a boutique recovery space focused on helping your body heal and restore. If you’re feeling overwhelmed, stressed, or just need a moment to <strong>breathe</strong> and reset—especially as a new mom—I highly recommend booking a session. I’ll definitely be coming back.
        </>
      ),
      initials: "OO",
      avatarBg: "bg-rose-100 text-rose-800"
    }
  ]

  const renderEmbeddedVideo = () => (
    <div className="mt-4 mb-4 animate-fade-in w-full overflow-hidden rounded-xl border border-border/40 bg-black aspect-video relative">
      <video 
        src="/_How Halo Therapy Works_.mp4" 
        controls 
        className="w-full h-full object-contain"
      />
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FDF8F4] relative overflow-hidden" suppressHydrationWarning>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-8 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D241E] mb-3 leading-tight text-balance" suppressHydrationWarning>
            Still Managing Symptoms That Never Fully Go Away?
          </h1>
          
          <p className="text-base md:text-lg text-[#2D241E]/70 mb-5 leading-relaxed text-balance max-w-2xl mx-auto" suppressHydrationWarning>
            Whether it&apos;s allergies, skin flare-ups, or a mind that won&apos;t switch off, find out if halotherapy is the natural, drug-free relief you&apos;ve been looking for. Takes 10 seconds.
          </p>
 
          {/* Top CTA Button */}
          <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm mx-auto">
            <button
              onClick={() => setShowTopVideo(!showTopVideo)}
              className="w-full group relative overflow-hidden rounded-lg py-2.5 px-5 font-semibold text-base transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-[#964B00] text-[#964B00] hover:bg-[#964B00]/5 flex items-center justify-center gap-2"
              suppressHydrationWarning
            >
              {showTopVideo ? <ChevronUp className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>See how halo therapy works</span>
            </button>
            
            {showTopVideo && renderEmbeddedVideo()}
 
            <button
              onClick={onBook}
              className="w-full group py-2.5 px-5 bg-[#964B00] hover:bg-[#7D3E00] text-white font-semibold text-base rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              suppressHydrationWarning
            >
              <span>Get a Free 15-Minute Salt Therapy Consultation</span>
            </button>
          </div>
        </div>
 
        {/* Benefits List Section */}
        <div className="max-w-xl mx-auto my-6 w-full">
          <div className="space-y-2">
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
 
        {/* Middle CTA Button */}
        <div className="w-full max-w-sm mx-auto my-3 flex flex-col items-center justify-center gap-3">
          <button
            onClick={onBook}
            className="w-full group py-2.5 px-5 bg-[#964B00] hover:bg-[#7D3E00] text-white font-semibold text-base rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            suppressHydrationWarning
          >
            <span>Get a Free 15-Minute Salt Therapy Consultation</span>
          </button>
        </div>
 
        {/* Testimonials Section */}
        <div className="w-full max-w-4xl mt-10 mb-4 border-t border-[#964B00]/10 pt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D241E]">
              What our patients say
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#964B00]/10 shadow-sm hover:shadow-md hover:border-[#964B00]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating & Time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-[#2D241E]/40 font-medium">{t.time}</span>
                  </div>
 
                  {/* Review Text */}
                  <p className="text-[#2D241E]/80 text-sm leading-relaxed mb-6 font-normal">
                    {t.text}
                  </p>
                </div>
 
                {/* Author Info */}
                <div className="flex items-center gap-3 border-t border-[#964B00]/5 pt-4 mt-auto">
                  {t.image ? (
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-sm shadow-sm`}>
                      {t.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-[#2D241E]">{t.name}</h4>
                    <p className="text-xs text-[#2D241E]/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Testimonials Bottom CTA Button */}
        <div className="w-full max-w-sm mx-auto mt-6 mb-8 flex flex-col items-center justify-center gap-3">
          <button
            onClick={onBook}
            className="w-full group py-2.5 px-5 bg-[#964B00] hover:bg-[#7D3E00] text-white font-semibold text-base rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            suppressHydrationWarning
          >
            <span>Get a Free 15-Minute Salt Therapy Consultation</span>
          </button>
        </div>
      </div>
    </main>
  )
}
