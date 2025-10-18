export interface Update {
  date: string
  title: string
  body: string
}

export const updates: Update[] = [
  {
    date: '2024-03-15',
    title: 'Series A Funding Round Announcement',
    body: `We're excited to announce that we've closed our Series A funding round, raising $8.5M led by Mobility Ventures with participation from Urban Growth Partners and several strategic angels from the fintech and mobility sectors.

This funding will accelerate our expansion into three new metropolitan areas and allow us to build out our proprietary risk assessment platform. We're also planning to grow our team from 12 to 30 members over the next 18 months.

Key milestones achieved this quarter:
- Reached $2.5M ARR (150% YoY growth)
- Expanded to 12,000 active users
- Launched partnerships with 3 major fleet operators
- Improved platform uptime to 99.97%

Thank you to all our investors and partners for your continued support.`,
  },
  {
    date: '2024-02-08',
    title: 'Q4 2023 Performance Update',
    body: `Q4 2023 was our strongest quarter yet, with revenue growing 62% QoQ to reach $780K. User acquisition exceeded targets by 34%, and we successfully launched our automated portfolio rebalancing feature.

Highlights:
- Total assets under management: $45M (+85% from Q3)
- Average investor IRR: 14.2%
- New city launch: Austin, TX
- Platform uptime: 99.94%

Looking ahead to Q1 2024, we're focused on:
1. Launching our mobile app (iOS & Android)
2. Expanding our asset insurance coverage
3. Building strategic partnerships with 2-3 institutional investors
4. Growing our data science team to improve risk models

We'll be hosting a virtual investor update on February 22nd. Calendar invites will be sent separately.`,
  },
  {
    date: '2024-01-12',
    title: 'New Partnership with MobilityTech Solutions',
    body: `We're thrilled to announce a strategic partnership with MobilityTech Solutions, a leading provider of IoT sensors and telematics for micro-mobility fleets.

This partnership will enable:
- Real-time asset tracking and health monitoring
- Predictive maintenance algorithms to reduce downtime
- Enhanced data insights for investors
- Improved risk assessment models

MobilityTech's sensor platform is already deployed across 50,000+ vehicles in 25 cities worldwide. Integrating their technology into our platform will give our investors unprecedented visibility into asset performance and help us further optimize returns.

The integration is currently in beta testing with select partners and will roll out to all users in Q2 2024.`,
  },
]
