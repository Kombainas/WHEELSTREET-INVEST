import Section from '@/components/Section'
import { updates } from '@/content/updates'

export default function UpdatesPage() {
  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Investor Updates</h1>
        <p className="text-lg text-black/70 mb-12">
          Regular updates on company progress, milestones, and performance
        </p>

        <div className="space-y-12">
          {updates.map((update, index) => (
            <article
              key={index}
              className="border-b border-black/10 pb-12 last:border-b-0"
            >
              <div className="mb-3">
                <span className="label-caps text-black/40">
                  {new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{update.title}</h2>
              <div className="prose prose-lg max-w-none">
                {update.body.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 text-black/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
