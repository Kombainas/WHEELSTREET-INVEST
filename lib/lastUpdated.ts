import { execSync } from 'child_process'

export interface LastUpdatedInfo {
  date: string
  hash: string
}

export function getLastUpdated(filePath: string = 'content/business-plan.mdx'): LastUpdatedInfo {
  try {
    // Get last commit date for the file (ISO format YYYY-MM-DD)
    const dateCmd = `git log -1 --format=%cs -- ${filePath}`
    const date = execSync(dateCmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim()

    // Get short hash (7 chars) of last commit touching the file
    const hashCmd = `git log -1 --format=%h -- ${filePath}`
    const hash = execSync(hashCmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim()

    // If we got valid results, return them
    if (date && hash && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return { date, hash }
    }

    // Fallback if git command returned empty (file not committed yet)
    throw new Error('No git history')
  } catch (error) {
    // Graceful fallback to today's date and placeholder hash
    const today = new Date().toISOString().split('T')[0]
    return {
      date: today,
      hash: 'draft',
    }
  }
}
