'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectConfig } from '@/lib/projects/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ValidationError {
  field: string
  message: string
}

export default function AIProjectChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pitchText, setPitchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [extractedConfig, setExtractedConfig] = useState<ProjectConfig | null>(null)
  const [editableConfig, setEditableConfig] = useState<ProjectConfig | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
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

  // Validation function
  const validateConfig = (config: ProjectConfig): ValidationError[] => {
    const errors: ValidationError[] = []

    // Validate required fields
    if (!config.name || config.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Project name is required' })
    }

    if (!config.slug || config.slug.trim().length === 0) {
      errors.push({ field: 'slug', message: 'Project slug is required' })
    } else if (!/^[a-z0-9-]+$/.test(config.slug)) {
      errors.push({ field: 'slug', message: 'Slug must be lowercase letters, numbers, and hyphens only' })
    }

    if (!config.industry || config.industry.trim().length === 0) {
      errors.push({ field: 'industry', message: 'Industry is required' })
    }

    // Validate fundraise amounts
    if (!config.fundraise.amount) {
      errors.push({ field: 'fundraise.amount', message: 'Fundraise amount is required' })
    }

    if (!config.fundraise.equity) {
      errors.push({ field: 'fundraise.equity', message: 'Equity percentage is required' })
    } else {
      const equityNum = parseFloat(config.fundraise.equity)
      if (isNaN(equityNum) || equityNum <= 0 || equityNum > 100) {
        errors.push({ field: 'fundraise.equity', message: 'Equity must be between 0% and 100%' })
      }
    }

    if (!config.fundraise.valuation) {
      errors.push({ field: 'fundraise.valuation', message: 'Valuation is required' })
    }

    // Validate target fields
    if (!config.target.mrr) {
      errors.push({ field: 'target.mrr', message: 'Target MRR is required' })
    }

    if (!config.target.timeframe) {
      errors.push({ field: 'target.timeframe', message: 'Timeframe is required' })
    }

    return errors
  }

  // Restart conversation
  const restartConversation = () => {
    if (confirm('Are you sure you want to start over? All current progress will be lost.')) {
      setMessages([])
      setInput('')
      setPitchText('')
      setExtractedConfig(null)
      setEditableConfig(null)
      setIsEditing(false)
      setValidationErrors([])
      setCreateSuccess(false)
    }
  }

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
              setEditableConfig(data.projectConfig)
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
              setEditableConfig(data.projectConfig)
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

  // Start editing
  const startEditing = () => {
    setIsEditing(true)
    setValidationErrors([])
  }

  // Save edits
  const saveEdits = () => {
    if (!editableConfig) return

    const errors = validateConfig(editableConfig)
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setExtractedConfig(editableConfig)
    setIsEditing(false)
    setValidationErrors([])
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditableConfig(extractedConfig)
    setIsEditing(false)
    setValidationErrors([])
  }

  // Create project
  const createProject = async () => {
    if (!extractedConfig) return

    // Final validation before creating
    const errors = validateConfig(extractedConfig)
    if (errors.length > 0) {
      setValidationErrors(errors)
      alert('Please fix validation errors before creating the project.')
      return
    }

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
          content: `❌ Error: ${data.error}\n\nPlease try a different project name or slug.`
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>🤖</span>
              <span>AI Project Generator</span>
            </h3>
            <p className="text-sm text-white/70 mt-1">
              I'll ask you questions about your project and generate an investor page automatically
            </p>
          </div>
          {messages.length > 0 && !createSuccess && (
            <button
              onClick={restartConversation}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-colors"
            >
              🔄 Restart
            </button>
          )}
        </div>
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

      {/* Input / Preview & Edit */}
      {messages.length > 0 && !createSuccess && (
        <div className="border-t border-black/10 p-4 bg-white">
          {extractedConfig && !isEditing ? (
            // Preview Mode
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span className="font-bold text-green-800">
                      Project Configuration Ready!
                    </span>
                  </div>
                  <button
                    onClick={startEditing}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Review your project details below. Click "Edit" to make changes or "Create Project" to proceed.
                </p>
                <div className="text-xs text-green-700 space-y-1 bg-white/50 p-3 rounded">
                  <div><strong>📌 Name:</strong> {extractedConfig.name}</div>
                  <div><strong>🔗 Slug:</strong> {extractedConfig.slug}</div>
                  <div><strong>🏢 Industry:</strong> {extractedConfig.industry}</div>
                  <div><strong>💰 Fundraise:</strong> {extractedConfig.fundraise.amount} for {extractedConfig.fundraise.equity}</div>
                  <div><strong>📊 Valuation:</strong> {extractedConfig.fundraise.valuation}</div>
                  <div><strong>🎯 Target MRR:</strong> {extractedConfig.target.mrr}</div>
                  <div><strong>⏱️ Timeframe:</strong> {extractedConfig.target.timeframe}</div>
                </div>
              </div>
              <button
                onClick={createProject}
                disabled={isCreating}
                className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isCreating ? '⏳ Creating Project...' : '✨ Create Project'}
              </button>
            </div>
          ) : editableConfig && isEditing ? (
            // Edit Mode
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✏️</span>
                  <span className="font-bold text-blue-800">
                    Edit Project Configuration
                  </span>
                </div>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded p-3">
                    <div className="font-bold text-red-800 mb-2">⚠️ Please fix these errors:</div>
                    <ul className="text-xs text-red-700 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>• {error.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Edit Form */}
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block font-medium mb-1 text-black/70">Project Name *</label>
                    <input
                      type="text"
                      value={editableConfig.name}
                      onChange={(e) => setEditableConfig({...editableConfig, name: e.target.value})}
                      className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-black/70">Slug (URL) *</label>
                    <input
                      type="text"
                      value={editableConfig.slug}
                      onChange={(e) => setEditableConfig({...editableConfig, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                      className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-xs"
                      placeholder="project-name"
                    />
                    <p className="text-xs text-black/50 mt-1">Will be accessible at: /?project={editableConfig.slug}</p>
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-black/70">Industry *</label>
                    <input
                      type="text"
                      value={editableConfig.industry}
                      onChange={(e) => setEditableConfig({...editableConfig, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium mb-1 text-black/70">Fundraise Amount *</label>
                      <input
                        type="text"
                        value={editableConfig.fundraise.amount}
                        onChange={(e) => setEditableConfig({...editableConfig, fundraise: {...editableConfig.fundraise, amount: e.target.value}})}
                        className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="€500K"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-black/70">Equity % *</label>
                      <input
                        type="text"
                        value={editableConfig.fundraise.equity}
                        onChange={(e) => setEditableConfig({...editableConfig, fundraise: {...editableConfig.fundraise, equity: e.target.value}})}
                        className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="10%"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-black/70">Valuation *</label>
                    <input
                      type="text"
                      value={editableConfig.fundraise.valuation}
                      onChange={(e) => setEditableConfig({...editableConfig, fundraise: {...editableConfig.fundraise, valuation: e.target.value}})}
                      className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="€5M"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium mb-1 text-black/70">Target MRR *</label>
                      <input
                        type="text"
                        value={editableConfig.target.mrr}
                        onChange={(e) => setEditableConfig({...editableConfig, target: {...editableConfig.target, mrr: e.target.value}})}
                        className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="€100K"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-black/70">Timeframe *</label>
                      <input
                        type="text"
                        value={editableConfig.target.timeframe}
                        onChange={(e) => setEditableConfig({...editableConfig, target: {...editableConfig.target, timeframe: e.target.value}})}
                        className="w-full px-3 py-2 border border-black/20 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="24 months"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={cancelEditing}
                  className="flex-1 px-6 py-3 bg-black/10 text-black font-medium rounded-lg hover:bg-black/20 transition-colors"
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={saveEdits}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✅ Save Changes
                </button>
              </div>
            </div>
          ) : (
            // Chat Input
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
