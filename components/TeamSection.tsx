'use client'

import { motion } from 'motion/react'
import { team, advisors } from '@/content/team'

export default function TeamSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-caps text-black/60">Komanda</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">
            Patyrusi Komanda su Track Record
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Sujungiame gilų automotive pramonės išmanymą su modernia technologija ir growth hacking expertise
          </p>
        </div>

        {/* Core Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
            Core Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-black/10 rounded-lg p-6 hover:border-black/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Photo placeholder */}
                <div className="w-20 h-20 bg-gradient-to-br from-black/10 to-black/5 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>

                {/* Name and Role */}
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <div className="text-black/60 text-sm mb-3">{member.role}</div>

                {/* Experience */}
                <div className="text-sm mb-4 text-black/80">
                  {member.experience}
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black/5 text-xs rounded-full text-black/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* LinkedIn placeholder */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <span>in</span>
                    LinkedIn
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
            Advisors & Board
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-black/[0.02] to-white border border-black/10 rounded-lg p-6 hover:border-black/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Photo placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-black/10 to-black/5 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>

                {/* Name and Role */}
                <h4 className="font-bold text-lg mb-1">{advisor.name}</h4>
                <div className="text-black/60 text-sm mb-3">{advisor.role}</div>

                {/* Experience */}
                <div className="text-sm mb-4 text-black/80">
                  {advisor.experience}
                </div>

                {/* Expertise */}
                <div className="flex flex-wrap gap-2">
                  {advisor.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black/5 text-xs rounded-full text-black/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-black text-white rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-3">Prisijunk prie Komandos</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Ieškome talentų operations, tech ir sales pozicijoms. Dabar auginame komandą iki 15-20 žmonių.
          </p>
          <a
            href="mailto:careers@wheelstreet.lt?subject=Career Opportunity"
            className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors rounded"
          >
            Karjeros galimybės →
          </a>
        </div>
      </div>
    </div>
  )
}
