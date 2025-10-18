import Section from '@/components/Section'
import Link from 'next/link'

interface TeamMember {
  name: string
  role: string
  bio: string
  expertise: string[]
  linkedin?: string
  avatar: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Jonas Čelkis',
    role: 'Co-Founder & CEO',
    bio: 'Automobilių verslo ekspertas su X metų patirtimi. Įkūrė WheelStreet siekdamas transformuoti automobilių pirkimo procesą Baltijos šalyse.',
    expertise: ['Verslo strategija', 'Automobilių rinka', 'Operacijos'],
    linkedin: 'https://linkedin.com/in/jonascelkis',
    avatar: '👨‍💼'
  },
  {
    name: 'Tech Lead',
    role: 'Co-Founder & CTO',
    bio: 'Technologijų ekspertas su patirtimi fintech ir marketplace platformose. Atsakingas už produkto ir technologijų plėtrą.',
    expertise: ['Full-stack development', 'Platform architecture', 'AI/ML'],
    avatar: '👨‍💻'
  },
  {
    name: 'Operations Lead',
    role: 'Head of Operations',
    bio: 'Automobilių pirkimo ir pardavimo procesų ekspertas. Užtikrina sklandžią operacijų eigą ir klientų pasitenkinimą.',
    expertise: ['Logistika', 'Procesų optimizavimas', 'Klientų aptarnavimas'],
    avatar: '👔'
  }
]

const advisors = [
  {
    name: 'Advisor 1',
    role: 'Automobilių verslo ekspertas',
    description: '20+ metų patirtis automobilių pramonėje, XX kompanijos įkūrėjas',
    avatar: '🎯'
  },
  {
    name: 'Advisor 2',
    role: 'FinTech ir investicijų ekspertas',
    description: 'Patirtis su XX investicijų fondais, XX kompanijos board member',
    avatar: '💼'
  }
]

export default function TeamPage() {
  return (
    <Section className="pt-16 pb-24">
      {/* Hero */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Komanda</h1>
        <p className="text-xl text-black/70 leading-relaxed">
          Investuojate ne tik į platformą, bet ir į komandą. Susipažinkite su žmonėmis,
          kurie kuria WheelStreet ir keičia automobilių rinką Baltijos šalyse.
        </p>
      </div>

      {/* Why Team Matters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 border border-black/10 rounded-lg bg-white">
          <div className="text-3xl mb-3">🎯</div>
          <div className="font-bold mb-2">Domain expertise</div>
          <div className="text-sm text-black/60">
            Komanda su gilia patirtimi automobilių ir tech sektoriuose
          </div>
        </div>
        <div className="p-6 border border-black/10 rounded-lg bg-white">
          <div className="text-3xl mb-3">🚀</div>
          <div className="font-bold mb-2">Startup patirtis</div>
          <div className="text-sm text-black/60">
            Įgyvendinom projektus nuo idėjos iki produkto rinkoje
          </div>
        </div>
        <div className="p-6 border border-black/10 rounded-lg bg-white">
          <div className="text-3xl mb-3">💪</div>
          <div className="font-bold mb-2">Execution ability</div>
          <div className="text-sm text-black/60">
            Rezultatai kalba patys - žr. traction metrikus
          </div>
        </div>
      </div>

      {/* Core Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Core Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="p-8 border border-black/10 rounded-lg bg-white hover:border-black/20 hover:shadow-md transition-all duration-200"
            >
              {/* Avatar */}
              <div className="text-6xl mb-4">{member.avatar}</div>

              {/* Name & Role */}
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <div className="text-sm text-black/60 uppercase tracking-wide mb-4">
                {member.role}
              </div>

              {/* Bio */}
              <p className="text-black/70 leading-relaxed mb-4">{member.bio}</p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {member.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-black/5 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* LinkedIn */}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  LinkedIn →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Advisors */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Advisors & Mentoriai</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((advisor) => (
            <div
              key={advisor.name}
              className="p-6 border border-black/10 rounded-lg bg-white hover:border-black/20 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{advisor.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{advisor.name}</h3>
                  <div className="text-sm text-black/60 mb-2">{advisor.role}</div>
                  <p className="text-sm text-black/70">{advisor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="max-w-3xl mx-auto text-center bg-black text-white p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Plečiame komandą</h2>
        <p className="text-lg text-white/80 mb-6">
          Ieškome talentų, kurie nori prisidėti prie automobilių rinkos transformacijos.
          Esame atviri tech, sales, ir operations specialistams.
        </p>
        <Link
          href="mailto:invest@wheelstreet.lt?subject=Career opportunities"
          className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-all duration-200"
        >
          Susisiekti dėl karjeros
        </Link>
      </div>

      {/* Investors Section */}
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Tapk dalimi WheelStreet</h2>
        <p className="text-lg text-black/70 mb-6">
          Ieškome investuotojų, kurie tiki automobilių rinkos transformacija ir nori
          prisidėti prie augimo kelionės.
        </p>
        <Link
          href="/deck"
          className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-white hover:text-black border border-black transition-all duration-200"
        >
          Peržiūrėti investicinį planą
        </Link>
      </div>
    </Section>
  )
}
