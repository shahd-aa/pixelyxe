export function analyzeAnswer(text: string) {
  let score = 0

  const lower = text.toLowerCase()

  const emotionalWords = [
  'weil',
  'fühle',
  'fühlte',
  'gefühlt',
  'wirkt',
  'erinnere',
  'erinnerung',
  'erinnerungen',
  'vermisse',
  'liebe',
  'lieblings',
  'hasse',
  'angst',
  'ängste',
  'traum',
  'träume',
  'hoffnung',
  'hoffe',
  'familie',
  'freundschaft',
  'freunde',
  'kindheit',
  'zukunft',
  'vergangenheit',
  'wichtig',
  'bedeutet',
  'bedeutsam',
  'traurig',
  'glücklich',
  'einsam',
  'allein',
  'vertrauen',
  'unsicher',
  'besonders',
  'damals',
  'früher',
  'momente',
  'moment',
  'aufgewachsen',
  'emotion',
  'emotional',
  'leidenschaft',
  'sehnsucht',
  'verletzlich',
  'nachdenklich',
  'schwer',
  'schwierige',
  'motiviert',
  'inspiration',
  'inspiriert',
  'stolz',
  'scham',
  'bereue',
  'bereut',
  'vermisst',
  'verbunden',
  'nähe',
  'geborgen',
  'unsicherheit',
  'zweifel',
  'stress',
  'überfordert',
  'dankbar',
  'enttäuscht',
  'enttäuschung',
  'berührt',
  'bedeutung',
  'hoffnungsvoll',
  'schönste',
  'schlimmste',
  'verändert',
  'beeinflusst',
  'wertvoll',
  'unterstützt',
  'verstanden',
  'verständnis',
  'verletzung',
  'mut',
  'mutig',
  'stärke',
  'schwach',
  'verletzlichkeit'
]

  // length
  if (text.length > 40) score += 1

  // detailed answer
  if (text.split(' ').length > 12) score += 1

  // emotional/contextual language
  const hasEmotionWord = emotionalWords.some(word =>
    lower.includes(word)
  )

  if (hasEmotionWord) score += 1

  // storytelling structure
  if (text.includes(',') || text.includes('.')) score += 1

  // longer storytelling
  if (text.split('.').length > 1) score += 1

  // hard cap
  return Math.min(score, 5)
}