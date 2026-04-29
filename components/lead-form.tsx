'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

interface LeadFormProps {
  onSubmit: (lead: { name: string; email: string; phone: string }) => Promise<void>
  buttonText: string
}

export function LeadForm({ onSubmit, buttonText }: LeadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({ name, email, phone })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-secondary/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Almost there!</h1>
          <p className="text-foreground/60">
            Enter your details below to finalize your request and unlock your free consultation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-foreground/70 ml-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border-2 border-border/40 bg-card/50 backdrop-blur-sm focus:border-primary/60 focus:ring-0 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-foreground/70 ml-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-border/40 bg-card/50 backdrop-blur-sm focus:border-primary/60 focus:ring-0 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold text-foreground/70 ml-1">
              Phone Number (Optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border-2 border-border/40 bg-card/50 backdrop-blur-sm focus:border-primary/60 focus:ring-0 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 group relative overflow-hidden rounded-xl p-4 font-bold text-base transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-secondary group-hover:from-primary/90 group-hover:to-primary/70" />
            <div className="relative flex items-center justify-center gap-2 text-primary-foreground">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-foreground/40">
          By clicking "{buttonText}", you agree to our privacy policy and terms of service.
        </p>
      </div>
    </main>
  )
}

