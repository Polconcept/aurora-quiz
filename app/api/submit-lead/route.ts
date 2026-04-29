import { NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  lead: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional()
  }),
  answers: z.array(z.object({
    question: z.number(),
    answer: z.string()
  })),
  assessment: z.object({
    condition: z.string(),
    duration: z.string(),
    tried: z.string(),
    seriousness: z.string()
  })
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const result = leadSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request data', 
        details: result.error.format() 
      }, { status: 400 })
    }

    const { lead, answers, assessment } = result.data
    const latenodeWebhookUrl = process.env.LATENODE_WEBHOOK_URL

    if (!latenodeWebhookUrl) {
      console.error('LATENODE_WEBHOOK_URL is not defined')
      return NextResponse.json({ success: false, error: 'Webhook configuration missing' }, { status: 500 })
    }

    console.log('Submitting lead to webhook:', latenodeWebhookUrl.substring(0, 30) + '...')

    const response = await fetch(latenodeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lead,
        answers,
        assessment,
        source: 'Aurora Quiz',
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Webhook error response:', errorText)
      throw new Error(`Webhook responded with status: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Submission error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit lead to webhook',
      details: error.message 
    }, { status: 500 })
  }
}
