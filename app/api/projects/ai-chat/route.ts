import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import type { ProjectConfig } from '@/lib/projects/types'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a helpful AI assistant that helps entrepreneurs create investor pages for their projects.

Your job is to have a friendly conversation and extract the following information:

**Required Information:**
1. Project Name (e.g., "WheelStreet", "AI Automation Platform")
2. Industry/Category (e.g., "Automotive Marketplace", "AI / SaaS")
3. Fundraise Amount (e.g., "€200,000", "€500,000")
4. Equity Percentage (e.g., "20%", "10%")
5. Valuation (e.g., "€3.3-5M", "€5M")
6. Target MRR (Monthly Recurring Revenue, e.g., "€250-330K", "€100K")
7. Timeframe (e.g., "24 months", "18 months")

**Optional Information:**
- Project tagline/description
- Break-even target (e.g., "2026 Q2")
- Key features to enable

**Conversation Style:**
- Be friendly and conversational in Lithuanian or English (match user's language)
- Ask ONE question at a time
- If user provides multiple pieces of info at once, acknowledge all and ask for missing pieces
- Use natural follow-up questions
- When all required info is collected, summarize and ask for confirmation

**When Complete:**
Return a JSON object with this structure:
{
  "complete": true,
  "projectConfig": {
    "id": "project-slug",
    "name": "Project Name",
    "slug": "project-slug",
    "industry": "Industry",
    "tagline": "Brief description",
    "logo": "/wheel-street-logo.png",
    "status": "active",
    "fundraise": {
      "amount": "€X",
      "equity": "Y%",
      "valuation": "€Z",
      "structure": "Direct equity"
    },
    "target": {
      "timeframe": "N months",
      "mrr": "€X",
      "arr": "€Y",
      "breakEven": "YYYY QN"
    },
    "theme": {
      "primaryColor": "#000000",
      "accentColor": "#10b981",
      "gradient": "from-black to-black/90"
    },
    "features": {
      "showLoadingScreen": true,
      "showRevenueChart": true,
      "showSocialMediaStats": false,
      "showPartnerSection": false,
      "showCompetitiveTable": false,
      "showFinancialModel": true,
      "showInvestmentCalculator": true,
      "showExitStrategy": true
    }
  }
}

Start by greeting the user and asking for the project name.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'OpenAI API key not configured. Add OPENAI_API_KEY to your .env.local file.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Create chat completion with streaming
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and affordable
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      stream: true,
    })

    // Create a readable stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(encoder.encode(content))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('AI Chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat message' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
