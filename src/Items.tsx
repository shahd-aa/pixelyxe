// Items.tsx

export type FavoriteCategory = 'drink' | 'flower' | 'social'

export type Item = {
  id: string
  label: string
  img: string
}

export const DRINKS: Item[] = [
  { id: 'coffee', label: 'Coffee', img: '/items/drinks/coffee.png' },
  { id: 'cola', label: 'Cola', img: '/items/drinks/cola.png' },
  { id: 'tea', label: 'Tea', img: '/items/drinks/tea.png' },
  { id: 'matcha', label: 'Matcha', img: '/items/drinks/matcha.png' },
]

/*
export const FLOWERS: Item[] = [
  { id: 'rose', label: 'Rose', img: '/items/flowers/rose.png' },
  { id: 'tulip', label: 'Tulip', img: '/items/flowers/tulip.png' },
  { id: 'sunflower', label: 'Sunflower', img: '/items/flowers/sunflower.png' },
  { id: 'lily', label: 'Lily', img: '/items/flowers/lily.png' },
] */

export const SOCIALS: Item[] = [
  { id: 'instagram', label: 'Instagram', img: '/items/social/instagram.png' },
  { id: 'tiktok', label: 'TikTok', img: '/items/social/tiktok.png' },
  { id: 'discord', label: 'Discord', img: '/items/social/discord.png' },
  { id: 'snapchat', label: 'Snapchat', img: '/items/social/snapchat.png' },
] 

// helper (optional, useful later)
export const getItemsByCategory = (category: FavoriteCategory): Item[] => {
  switch (category) {
    case 'drink':
      return DRINKS;
   // case 'flower':
     // return FLOWERS
    case 'social':
      return SOCIALS;
    default:
      return [];
  }
}