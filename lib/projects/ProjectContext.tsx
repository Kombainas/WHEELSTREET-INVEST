'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { Project } from './types'

// Create context
const ProjectContext = createContext<Project | null>(null)

// Provider component
export function ProjectProvider({
  children,
  project,
}: {
  children: ReactNode
  project: Project
}) {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

// Custom hook to use project data
export function useProject(): Project {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProject must be used within ProjectProvider')
  }

  return context
}
