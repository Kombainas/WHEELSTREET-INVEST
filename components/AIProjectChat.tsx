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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h4 className="text-xl font-bold mb-2">Ready to create your investor page?</h4>
            <p className="text-black/60 mb-6">
              Click the button below to start a conversation with the AI assistant
            </p>
            <button
              onClick={startConversation}
              disabled={isLoading}
              className="px-6 py-3 bg-black text-white font-medium rounded hover:bg-black/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? '🤔 Thinking...' : '🚀 Start Conversation'}
            </button>
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
