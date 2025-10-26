'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectConfig } from '@/lib/projects/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIProjectChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pitchText, setPitchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [extractedConfig, setExtractedConfig] = useState<ProjectConfig | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [createSuccess, setCreateSuccess] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Start conversation
  const startConversation = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/projects/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [] }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiMessage = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          aiMessage += chunk

          // Update messages in real-time (streaming effect)
          setMessages([{ role: 'assistant', content: aiMessage }])
        }
      }
    } catch (error) {
      console.error('Error starting conversation:', error)
      setMessages([{
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please make sure OPENAI_API_KEY is set in your .env.local file.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/projects/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiMessage = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          aiMessage += chunk

          // Update last message (streaming)
          setMessages([...updatedMessages, { role: 'assistant', content: aiMessage }])
        }

        // Try to extract ProjectConfig JSON if conversation is complete
        const jsonMatch = aiMessage.match(/```json\n([\s\S]*?)\n```/)
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[1])
            if (data.complete && data.projectConfig) {
              setExtractedConfig(data.projectConfig)
            }
          } catch (e) {
            // Not valid JSON yet
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Extract data from pasted text
  const extractFromText = async () => {
    if (!pitchText.trim() || isLoading) return

    setIsLoading(true)
    const extractionMessage: Message = {
      role: 'user',
      content: `Please extract ALL project information from this pitch deck text and return it in JSON format:\n\n${pitchText}`
    }
    setMessages([extractionMessage])

    try {
      const response = await fetch('/api/projects/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [extractionMessage] }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiMessage = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          aiMessage += chunk

          // Update messages in real-time
          setMessages([extractionMessage, { role: 'assistant', content: aiMessage }])
        }

        // Try to extract ProjectConfig JSON
        const jsonMatch = aiMessage.match(/```json\n([\s\S]*?)\n```/)
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[1])
            if (data.complete && data.projectConfig) {
              setExtractedConfig(data.projectConfig)
            }
          } catch (e) {
            // Not valid JSON yet
          }
        }
      }
    } catch (error) {
      console.error('Error extracting from text:', error)
      setMessages([extractionMessage, {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error while reading your text. Please try again or use the chat option.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Create project
  const createProject = async () => {
    if (!extractedConfig) return

    setIsCreating(true)
    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectConfig: extractedConfig }),
      })

      const data = await response.json()

      if (response.ok) {
        setCreateSuccess(true)
        setMessages([...messages, {
          role: 'assistant',
          content: `🎉 Success! Your project "${extractedConfig.name}" has been created!\n\n✅ View it at: ${data.url}\n\nYou can now close this chat and visit your new investor page.`
        }])
      } else {
        setMessages([...messages, {
          role: 'assistant',
          content: `❌ Error: ${data.error}\n\nPlease try a different project name.`
        }])
      }
    } catch (error) {
      setMessages([...messages, {
        role: 'assistant',
        content: '❌ Failed to create project. Please try again.'
      }])
    } finally {
      setIsCreating(false)
    }
  }

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="border border-black/10 rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-black/90 text-white p-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span>🤖</span>
          <span>AI Project Generator</span>
        </h3>
        <p className="text-sm text-white/70 mt-1">
          I'll ask you questions about your project and generate an investor page automatically
        </p>
      </div>

      {/* Messages */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-black/[0.02]">
        {messages.length === 0 ? (
          <div className="py-6 px-4">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🤖💬</div>
              <h4 className="text-xl font-bold mb-2">Create Your Investor Page</h4>
              <p className="text-black/60 text-sm">
                Choose how you want to provide your project information
              </p>
            </div>

            {/* Option 1: Paste Text */}
            <div className="mb-6 p-4 border border-black/10 rounded-lg bg-white">
              <h5 className="font-bold mb-2 flex items-center gap-2">
                <span>📄</span>
                <span>Option 1: Paste Your Pitch Deck (RECOMMENDED)</span>
              </h5>
              <p className="text-sm text-black/60 mb-3">
                Paste your business plan, pitch deck, or any project description. AI will read it and extract all information automatically!
              </p>
              <textarea
                placeholder="Paste your pitch deck, business plan, or project description here...&#10;&#10;Example:&#10;We're building AI Automation Platform, an AI/SaaS solution.&#10;Raising €500,000 for 10% equity at €5M valuation.&#10;Target MRR is €100K in 24 months..."
                rows={6}
                value={pitchText}
                onChange={(e) => setPitchText(e.target.value)}
                className="w-full p-3 border border-black/20 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/20"
                disabled={isLoading}
              />
              <button
                onClick={extractFromText}
                disabled={isLoading || !pitchText.trim()}
                className="mt-3 w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '🤖 AI is reading...' : '✨ Extract Data from Text'}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-black/10"></div>
              <span className="text-black/40 text-sm font-medium">OR</span>
              <div className="flex-1 border-t border-black/10"></div>
            </div>

            {/* Option 2: Chat */}
            <div className="p-4 border border-black/10 rounded-lg bg-black/[0.02]">
              <h5 className="font-bold mb-2 flex items-center gap-2">
                <span>💬</span>
                <span>Option 2: Answer Questions</span>
              </h5>
              <p className="text-sm text-black/60 mb-3">
                AI will ask you 7 questions one by one to collect all information.
              </p>
              <button
                onClick={startConversation}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? '🤔 Thinking...' : '🚀 Start Q&A Conversation'}
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white border border-black/10'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">
                      {message.role === 'user' ? '👤' : '🤖'}
                    </span>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {messages.length > 0 && !createSuccess && (
        <div className="border-t border-black/10 p-4 bg-white">
          {extractedConfig ? (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✅</span>
                  <span className="font-bold text-green-800">
                    Project Configuration Ready!
                  </span>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  I've collected all the information. Ready to create your investor page?
                </p>
                <div className="text-xs text-green-600 space-y-1">
                  <div>📌 Project: {extractedConfig.name}</div>
                  <div>💰 Fundraise: {extractedConfig.fundraise.amount} for {extractedConfig.fundraise.equity}</div>
                  <div>🎯 Target MRR: {extractedConfig.target.mrr}</div>
                </div>
              </div>
              <button
                onClick={createProject}
                disabled={isCreating}
                className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isCreating ? '⏳ Creating Project...' : '✨ Create Project'}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 px-4 py-3 border border-black/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black/20"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
