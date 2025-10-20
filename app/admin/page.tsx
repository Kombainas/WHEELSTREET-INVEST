'use client'

import { useState, useEffect } from 'react'
import { metrics as initialMetrics } from '@/content/metrics'
import { updates as initialUpdates } from '@/content/updates'
import { investmentPitch as initialPitch } from '@/content/investment-pitch'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'updates' | 'pitch'>('metrics')
  const [metrics, setMetrics] = useState(initialMetrics)
  const [updates, setUpdates] = useState(initialUpdates)
  const [pitch, setPitch] = useState(initialPitch)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const saveChanges = async (fileType: string, data: any) => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileType, data }),
      })

      if (response.ok) {
        setMessage('✅ Saved successfully!')
      } else {
        setMessage('❌ Failed to save changes')
      }
    } catch (error) {
      setMessage('❌ Error saving changes')
      console.error(error)
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
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
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 bg-black/5 rounded-lg text-center">
            {message}
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
                className="px-6 py-3 bg-black text-white font-medium hover:bg-black/90 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
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
                className="px-6 py-3 bg-black text-white font-medium hover:bg-black/90 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
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
                className="px-6 py-3 bg-black text-white font-medium hover:bg-black/90 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
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
      </div>
    </div>
  )
}
