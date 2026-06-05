import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'unihub-portfolio'
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'unihub-portfolio': {
    label: 'UniHub Portfolio',
    mood: 'clean academic editorial with portfolio discovery',
    fontDirection: 'large rounded sans headings with compact navigation',
    colors: {
      background: '#ffffff',
      foreground: '#202334',
      muted: '#656b75',
      primary: '#00695f',
      accent: '#00695f',
      surface: '#f7fafb',
    },
    shape: 'rounded image cards, yellow call-to-action pills, teal bands',
  },
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'calm magazine authority',
    fontDirection: 'serif headlines with quiet sans body',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'soft editorial cards with fine borders',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'high-contrast display headings with spacious tracking',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'large panels, fine hairlines, generous negative space',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'sharp indexing softened into screenshot-style sections',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'warm, natural, trustworthy',
    fontDirection: 'rounded humanist sans with soft captions',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'rounded cards and calm spacing',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp data accents',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'clean grids, pill filters, sharp hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'framed modules and playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'image-led, immersive, polished',
    fontDirection: 'minimal sans with oversized display moments',
    colors: { background: '#ffffff', foreground: '#202334', muted: '#656b75', primary: '#00695f', accent: '#00695f', surface: '#f7fafb' },
    shape: 'large media, rounded cards, editorial overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'unihub-portfolio',
  radius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.125rem' },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700 editable-reveal',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-sm font-black uppercase italic',
    heroTitle: 'text-5xl font-black sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-4xl font-black sm:text-5xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-black uppercase',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-black/10 bg-white shadow-[0_24px_70px_rgba(14,32,42,0.08)]',
    quiet: 'border border-black/10 bg-[#eef4f5]',
    dark: 'border border-white/10 bg-[var(--slot4-accent)] shadow-[0_24px_70px_rgba(0,105,95,0.2)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
    cardGrid: 'grid gap-7 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
