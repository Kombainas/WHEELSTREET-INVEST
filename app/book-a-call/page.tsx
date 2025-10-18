import Section from '@/components/Section'

export default function BookACallPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_BOOK_URL || 'https://calendly.com/your-link'

  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Book a Call</h1>
        <p className="text-lg text-black/70 mb-12">
          Schedule a time to discuss investment opportunities
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="border border-black/10 p-6">
            <h3 className="font-bold mb-3">What to Expect</h3>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• 30-minute introductory call</li>
              <li>• Deep dive into our business model</li>
              <li>• Q&A session</li>
              <li>• Investment process overview</li>
            </ul>
          </div>

          <div className="border border-black/10 p-6">
            <h3 className="font-bold mb-3">Who You'll Meet</h3>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• Founding team members</li>
              <li>• Head of Investor Relations</li>
              <li>• Technical leadership (if needed)</li>
            </ul>
          </div>

          <div className="border border-black/10 p-6">
            <h3 className="font-bold mb-3">Next Steps</h3>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• Access to data room</li>
              <li>• Follow-up materials</li>
              <li>• Term sheet discussion</li>
              <li>• Due diligence process</li>
            </ul>
          </div>
        </div>

        <div className="border border-black/10 p-2">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="700"
            frameBorder="0"
            title="Book a Call"
            className="w-full"
          />
        </div>
      </div>
    </Section>
  )
}
