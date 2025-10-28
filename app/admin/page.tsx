'use client'

import { useState, useEffect } from 'react'
import { metrics as initialMetrics } from '@/content/metrics'
import { updates as initialUpdates } from '@/content/updates'
import { investmentPitch as initialPitch } from '@/content/investment-pitch'
import AIProjectChat from '@/components/AIProjectChat'
import ProjectList from '@/components/ProjectList'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'updates' | 'pitch' | 'projects'>('metrics')
  const [metrics, setMetrics] = useState(initialMetrics)
  const [updates, setUpdates] = useState(initialUpdates)
  const [pitch, setPitch] = useState(initialPitch)
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'backing-up' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editPitchText, setEditPitchText] = useState<string>('')

  const saveChanges = async (fileType: string, data: any) => {
    setSaving(true)
    setSaveState('backing-up')
    setMessage('📦 Creating backup...')

    try {
      // Simulate backup phase
      await new Promise(resolve => setTimeout(resolve, 500))

      setSaveState('saving')
      setMessage('💾 Saving changes...')

      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileType, data }),
      })

      if (response.ok) {
        setSaveState('success')
        setMessage('✅ Saved successfully!')
      } else {
        setSaveState('error')
        setMessage('❌ Failed to save changes')
      }
    } catch (error) {
      setSaveState('error')
      setMessage('❌ Error saving changes')
      console.error(error)
    } finally {
      setSaving(false)
      setTimeout(() => {
        setMessage('')
        setSaveState('idle')
      }, 3000)
    }
  }

  const handleEditProject = async (slug: string) => {
    try {
      // Fetch the saved pitch deck text
      const response = await fetch(`/api/projects/${slug}/pitch`)

      if (response.ok) {
        const data = await response.json()
        setEditPitchText(data.pitchText || '')
        setEditingProject(slug)

        // Scroll to AI Chat section
        setTimeout(() => {
          document.getElementById('ai-chat-section')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        alert('❌ Could not load pitch deck text for editing')
      }
    } catch (error) {
      console.error('Error loading pitch deck:', error)
      alert('❌ Failed to load project for editing')
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-black/60 mb-8">Edit website content easily</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-black/10">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'metrics'
                ? 'border-b-2 border-black text-black'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            📊 Metrics
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'updates'
                ? 'border-b-2 border-black text-black'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            📰 Updates
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'pitch'
                ? 'border-b-2 border-black text-black'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            💰 Investment Pitch
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'border-b-2 border-black text-black'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            🏗️ Projects
          </button>
        </div>

        {/* Message with animation */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium transition-all duration-300 ${
              saveState === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200 animate-pulse'
                : saveState === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {(saveState === 'backing-up' || saveState === 'saving') && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{message}</span>
            </div>
          </div>
        )}

        {/* Metrics Tab */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Homepage Metrics</h2>
              <button
                onClick={() => saveChanges('metrics', metrics)}
                disabled={saving}
                className="px-6 py-3 bg-black text-white font-medium hover:bg-black/90 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95 rounded-lg shadow-sm"
              >
                <span className="flex items-center gap-2">
                  {saving && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </span>
              </button>
            </div>

            {metrics.map((metric, index) => (
              <div key={index} className="border border-black/10 rounded-lg p-6">
                <h3 className="font-bold mb-4">Metric {index + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Label</label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const newMetrics = [...metrics]
                        newMetrics[index] = { ...metric, label: e.target.value }
                        setMetrics(newMetrics)
                      }}
                      className="w-full px-3 py-2 border border-black/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Value</label>
                    <input
                      type="number"
                      value={metric.value}
                      onChange={(e) => {
                        const newMetrics = [...metrics]
                        newMetrics[index] = { ...metric, value: Number(e.target.value) }
                        setMetrics(newMetrics)
                      }}
                      className="w-full px-3 py-2 border border-black/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Growth Text</label>
                    <input
                      type="text"
                      value={metric.growth || ''}
                      onChange={(e) => {
                        const newMetrics = [...metrics]
                        newMetrics[index] = { ...metric, growth: e.target.value }
                        setMetrics(newMetrics)
                      }}
                      className="w-full px-3 py-2 border border-black/20 rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Updates Tab */}
        {activeTab === 'updates' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">News/Updates</h2>
              <button
                onClick={() => saveChanges('updates', updates)}
                disabled={saving}
                className="px-6 py-3 bg-black text-white font-medium hover:bg-black/90 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95 rounded-lg shadow-sm"
              >
                <span className="flex items-center gap-2">
                  {saving && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </span>
              </button>
            </div>

            {updates.map((update, index) => (
              <div key={index} className="border border-black/10 rounded-lg p-6">
                <h3 className="font-bold mb-4">Update {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={update.title}
                      onChange={(e) => {
                        const newUpdates = [...updates]
                        newUpdates[index] = { ...update, title: e.target.value }
                        setUpdates(newUpdates)
                      }}
                      className="w-full px-3 py-2 border border-black/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Body</label>
                    <textarea
                      value={update.body}
                      onChange={(e) => {
                        const newUpdates = [...updates]
                        newUpdates[index] = { ...update, body: e.target.value }
                        setUpdates(newUpdates)
                      }}
                      rows={6}
                      className="w-full px-3 py-2 border border-black/20 rounded"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={update.pinned || false}
                      onChange={(e) => {
                        const newUpdates = [...updates]
                        newUpdates[index] = { ...update, pinned: e.target.checked }
                        setUpdates(newUpdates)
                      }}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium">Pin to homepage</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Investment Pitch Tab */}
        {activeTab === 'pitch' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Investment Pitch</h2>
              <button
                onClick={() => saveChanges('investmentPitch', pitch)}
                disabled={saving}
                className="px-6 py-3 bg-black text-white font-medium hover:bg-black/90 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95 rounded-lg shadow-sm"
              >
                <span className="flex items-center gap-2">
                  {saving && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </span>
              </button>
            </div>

            <div className="border border-black/10 rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Headline</label>
                <input
                  type="text"
                  value={pitch.headline}
                  onChange={(e) => setPitch({ ...pitch, headline: e.target.value })}
                  className="w-full px-3 py-2 border border-black/20 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fundraise Amount</label>
                  <input
                    type="text"
                    value={pitch.fundraise.amount}
                    onChange={(e) =>
                      setPitch({
                        ...pitch,
                        fundraise: { ...pitch.fundraise, amount: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-black/20 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Equity</label>
                  <input
                    type="text"
                    value={pitch.fundraise.equity}
                    onChange={(e) =>
                      setPitch({
                        ...pitch,
                        fundraise: { ...pitch.fundraise, equity: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-black/20 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Multi-Project Management</h2>
            </div>

            {/* Project List */}
            <div className="border border-black/10 rounded-lg p-6">
              <ProjectList onEdit={handleEditProject} />
            </div>

            {/* AI Chat Assistant */}
            <div id="ai-chat-section" className="border border-black/10 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">
                {editingProject ? `✏️ Edit Project: ${editingProject}` : '🤖 Create New Project with AI'}
              </h3>
              <p className="text-black/60 mb-4">
                {editingProject
                  ? 'The saved pitch deck text has been loaded below. You can re-extract the data or make changes.'
                  : 'Paste your pitch deck or let AI ask you questions to generate the project configuration automatically!'}
              </p>
              {editingProject && (
                <button
                  onClick={() => {
                    setEditingProject(null)
                    setEditPitchText('')
                  }}
                  className="mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                >
                  ← Cancel Edit (Create New Instead)
                </button>
              )}
              <AIProjectChat
                key={editingProject || 'new'}
                initialPitchText={editPitchText}
                editMode={editingProject}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
