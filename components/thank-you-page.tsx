'use client'

import { useEffect } from 'react'
import { CheckCircle2, MapPin, Phone } from 'lucide-react'

interface ThankYouPageProps {
  onBackToHome: () => void
}

export function ThankYouPage({ onBackToHome }: ThankYouPageProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  }, []);

  const addressLink = "https://www.google.com/maps/search/605+A+park+grove+dr+katy+texas+77450?entry=gmail&source=g"
  const addressText = "A park grove dr katy texas 77450"
  const phoneNumber = "(832) 437-0242" // Placeholder or found if possible. I'll use a clear placeholder if unsure.

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background Blobs matching ResultsPage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -mr-48 -mt-24" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-48 -mb-24" />
      </div>

      <div className="relative z-10 px-4 md:px-8 py-8 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
              <CheckCircle2 className="relative w-20 h-20 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            Thank you for booking with Aurora Recovery
          </h1>

          <p className="text-lg text-foreground/70 mb-10 max-w-lg mx-auto">
            You&apos;ll receive a confirmation text via SMS and a reminder on the day of your session
          </p>

          <div className="flex flex-col gap-6 items-center">
            <div className="w-full">
              <p className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-3">
                Google Maps Address Link👇
              </p>
              <a
                href={addressLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-border/40 rounded-xl hover:border-primary/40 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-bold text-foreground">{addressText}</span>
              </a>
            </div>

            <div className="w-full">
              <p className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-3">
                Front desk number👇
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-border/40 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:8324370242" className="font-bold text-foreground hover:text-primary transition-colors">(832) 437-0242</a>
              </div>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="mt-12 text-sm font-medium text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}
