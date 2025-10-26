import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import type { Project, ProjectConfig } from './types'

/**
 * Load project data by slug
 * Falls back to 'wheelstreet' if project not found
 */
export async function loadProject(slug: string = 'wheelstreet'): Promise<Project> {
  const projectPath = join(process.cwd(), 'content', 'projects', slug)

  // Check if project exists
  if (!existsSync(projectPath)) {
    console.warn(`Project '${slug}' not found, falling back to 'wheelstreet'`)
    return loadProject('wheelstreet')
  }

  const configPath = join(projectPath, 'config.json')

  if (!existsSync(configPath)) {
    throw new Error(`Project config not found for '${slug}'`)
  }

  // Load config (required)
  const config: ProjectConfig = JSON.parse(
    readFileSync(configPath, 'utf-8')
  )

  // Load optional data files
  const project: Project = { config }

  // Try to load metrics
  try {
    const metricsPath = join(projectPath, 'metrics.json')
    if (existsSync(metricsPath)) {
      project.metrics = JSON.parse(readFileSync(metricsPath, 'utf-8'))
    }
  } catch (e) {
    console.warn(`Could not load metrics for '${slug}'`)
  }

  // Try to load team
  try {
    const teamPath = join(projectPath, 'team.json')
    if (existsSync(teamPath)) {
      project.team = JSON.parse(readFileSync(teamPath, 'utf-8'))
    }
  } catch (e) {
    console.warn(`Could not load team for '${slug}'`)
  }

  // Try to load financials
  try {
    const financialsPath = join(projectPath, 'financials.json')
    if (existsSync(financialsPath)) {
      project.financials = JSON.parse(readFileSync(financialsPath, 'utf-8'))
    }
  } catch (e) {
    console.warn(`Could not load financials for '${slug}'`)
  }

  return project
}

/**
 * Get list of all available projects
 */
export function listProjects(): string[] {
  const projectsDir = join(process.cwd(), 'content', 'projects')

  if (!existsSync(projectsDir)) {
    return ['wheelstreet']
  }

  const fs = require('fs')
  return fs.readdirSync(projectsDir)
    .filter((name: string) => {
      // Skip template and hidden folders
      if (name.startsWith('_') || name.startsWith('.')) return false

      // Check if it's a directory with config.json
      const configPath = join(projectsDir, name, 'config.json')
      return existsSync(configPath)
    })
}
