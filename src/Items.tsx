import coffee from './assets/items/drinks/coffee.png'
import cola from './assets/items/drinks/coca_cola.png'
import water from './assets/items/drinks/water.png'
import strawberry_milkshake from './assets/items/drinks/strawberry_milkshake.png'


import rose from './assets/items/flowers/rose.png'
import cherry_blossom from './assets/items/flowers/cherry_blossom.png'
import sunflower from './assets/items/flowers/sunflower.png'

import instagram from './assets/items/social_media/insta_icon.png'
import tiktok from './assets/items/social_media/tiktok_icon.png'
import discord from './assets/items/social_media/discord_icon.png'
import snapchat from './assets/items/social_media/snapchat_icon.png'
import twitch from './assets/items/social_media/twitch_icon.png'
import whatsapp from './assets/items/social_media/whatsapp_icon.png'

export type FavoriteCategory = 'drink' | 'flower' | 'social'

export type Item = {
  id: string
  label: string
  img: string
}

export const DRINKS: Item[] = [
  { id: 'coffee', label: 'Coffee', img: coffee },
  { id: 'cola', label: 'Cola', img: cola },
  { id: 'water', label: 'Water', img: water },
  { id: 'strawberry_milkshake', label: 'Strawberry Milkshake', img: strawberry_milkshake },
]

export const FLOWERS: Item[] = [
  { id: 'rose', label: 'Rose', img: rose },
  { id: 'cherry_blossom', label: 'Cherry Blossom', img: cherry_blossom },
  { id: 'sunflower', label: 'Sunflower', img: sunflower },
]

export const SOCIALS: Item[] = [
  { id: 'instagram', label: 'Instagram', img: instagram },
  { id: 'tiktok', label: 'TikTok', img: tiktok },
  { id: 'discord', label: 'Discord', img: discord },
  { id: 'snapchat', label: 'Snapchat', img: snapchat },
  { id: 'twitch', label: 'Twitch', img: twitch },
  { id: 'whatsapp', label: 'WhatsApp', img: whatsapp },
]

export const getItemsByCategory = (category: FavoriteCategory): Item[] => {
  switch (category) {
    case 'drink':
      return DRINKS
    case 'flower':
      return FLOWERS
    case 'social':
      return SOCIALS
    default:
      return []
  }
}