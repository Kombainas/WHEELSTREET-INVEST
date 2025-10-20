export interface PressMention {
  outlet: string
  logo?: string
  quote: string
  author?: string
  date: string
  url?: string
  type: 'article' | 'podcast' | 'video' | 'feature'
}

export const pressMentions: PressMention[] = [
  {
    outlet: 'Verslo žinios',
    quote: 'WheelStreet revoliucionizuoja automobilių prekybą Baltijos šalyse su inovatyviu 24 valandų atsiskaitymo modeliu.',
    author: 'Verslo žurnalistas',
    date: '2024-12',
    type: 'article',
  },
  {
    outlet: 'Startup Lithuania',
    quote: 'Vienas greičiausiai augančių automotive tech startup\'ų regione su įspūdingu organinio social media reach.',
    date: '2024-11',
    type: 'feature',
  },
  {
    outlet: 'LRT Ekonomika',
    quote: 'Lietuvos automobilių rinkoje atsiranda naujų žaidėjų, kurie keičia tradicinę prekybos logiką.',
    date: '2024-10',
    type: 'feature',
  },
]
