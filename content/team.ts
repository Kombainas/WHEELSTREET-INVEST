export interface TeamMember {
  name: string
  role: string
  experience: string
  expertise: string[]
  linkedin?: string
  photo?: string
}

// Placeholder team data - update via admin panel with real names and photos
export const team: TeamMember[] = [
  {
    name: 'Įkūrėjas & CEO',
    role: 'Chief Executive Officer',
    experience: '10+ metų automobilių pramonėje',
    expertise: ['Strategy', 'Automotive Industry', 'Business Development', 'Fundraising'],
  },
  {
    name: 'Co-founder & CTO',
    role: 'Chief Technology Officer',
    experience: '8+ metų tech & product',
    expertise: ['Full-stack Development', 'AI/ML', 'Platform Architecture', 'Team Leadership'],
  },
  {
    name: 'COO',
    role: 'Chief Operating Officer',
    experience: '12+ metų operations & logistics',
    expertise: ['Supply Chain', 'Inventory Management', 'Process Optimization', 'Scaling'],
  },
  {
    name: 'CMO',
    role: 'Chief Marketing Officer',
    experience: '7+ metų marketing & growth',
    expertise: ['Social Media Growth', 'Content Strategy', 'Viral Marketing', 'Brand Building'],
  },
  {
    name: 'Head of Finance',
    role: 'Financial Controller',
    experience: '10+ metų finance & accounting',
    expertise: ['Financial Modeling', 'Investor Relations', 'Compliance', 'Reporting'],
  },
  {
    name: 'Lead Developer',
    role: 'Technical Lead',
    experience: '6+ metų software development',
    expertise: ['React/Next.js', 'Node.js', 'Database Design', 'DevOps'],
  },
]

// Advisors/Board Members
export const advisors: TeamMember[] = [
  {
    name: 'Industry Advisor',
    role: 'Automotive Expert',
    experience: '20+ metų auto dealership experience',
    expertise: ['Market Insights', 'Industry Connections', 'Regulatory Knowledge'],
  },
  {
    name: 'Tech Advisor',
    role: 'Technology Consultant',
    experience: '15+ metų scaling tech startups',
    expertise: ['Product Strategy', 'Technical Architecture', 'Team Scaling'],
  },
]
