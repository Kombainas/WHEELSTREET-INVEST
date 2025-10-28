'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Project {
  slug: string
  name: string
  fundraise: {
    target: number
    currency: string
  }
  equity: number
  createdAt?: string
  lastModified?: string
}

interface ProjectListProps {
  onEdit?: (slug: string) => void
}

export default function ProjectList({ onEdit }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/projects/list')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }

      setProjects(data.projects)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleView = (slug: string) => {
    window.open(`/?project=${slug}`, '_blank')
  }

  const handleEdit = (slug: string) => {
    if (onEdit) {
      onEdit(slug)
    }
  }

  const handleDuplicate = async (slug: string) => {
    if (actionLoading) return

    try {
      setActionLoading(slug)
      const response = await fetch(`/api/projects/${slug}/duplicate`, {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to duplicate project')
      }

      alert(`✅ ${data.message}`)
      await fetchProjects() // Refresh list
    } catch (err) {
      alert(`❌ ${err instanceof Error ? err.message : 'Failed to duplicate project'}`)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (slug: string) => {
    if (actionLoading) return
    if (deleteConfirm !== slug) {
      setDeleteConfirm(slug)
      return
    }

    try {
      setActionLoading(slug)
      const response = await fetch(`/api/projects/${slug}/delete`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project')
      }

      alert(`✅ ${data.message}`)
      setDeleteConfirm(null)
      await fetchProjects() // Refresh list
    } catch (err) {
      alert(`❌ ${err instanceof Error ? err.message : 'Failed to delete project'}`)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('lt-LT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border-2 border-black p-8 text-center">
        <p className="text-gray-600">Loading projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg border-2 border-red-500 p-8 text-center">
        <p className="text-red-600">❌ {error}</p>
        <button
          onClick={fetchProjects}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-8 text-center">
        <p className="text-gray-600">No projects yet. Create your first project above! 🚀</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Your Projects ({projects.length})</h3>
        <button
          onClick={fetchProjects}
          className="text-sm text-gray-600 hover:text-black"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg border-2 border-black p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-black mb-2">{project.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Fundraise:</span>{' '}
                    <span className="font-semibold">
                      {formatCurrency(project.fundraise.target, project.fundraise.currency)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Equity:</span>{' '}
                    <span className="font-semibold">{project.equity}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Created:</span>{' '}
                    <span className="font-semibold">{formatDate(project.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Slug:</span>{' '}
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {project.slug}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[120px]">
                <button
                  onClick={() => handleView(project.slug)}
                  className="px-3 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm font-medium transition-colors"
                >
                  👁️ View
                </button>
                <button
                  onClick={() => handleEdit(project.slug)}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDuplicate(project.slug)}
                  disabled={actionLoading === project.slug}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading === project.slug ? '⏳' : '📋'} Duplicate
                </button>
                <button
                  onClick={() => handleDelete(project.slug)}
                  disabled={actionLoading === project.slug || project.slug === 'wheelstreet'}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
                    deleteConfirm === project.slug
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title={project.slug === 'wheelstreet' ? 'Cannot delete main project' : ''}
                >
                  {deleteConfirm === project.slug
                    ? '⚠️ Confirm?'
                    : actionLoading === project.slug
                    ? '⏳'
                    : '🗑️ Delete'}
                </button>
                {deleteConfirm === project.slug && (
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
