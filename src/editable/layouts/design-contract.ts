import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#202334',
  '--slot4-panel-bg': '#eef4f5',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#656b75',
  '--slot4-soft-muted-text': '#7d838b',
  '--slot4-accent': '#00695f',
  '--slot4-accent-fill': '#00695f',
  '--slot4-accent-soft': '#eef3f4',
  '--slot4-gold': '#ffcc42',
  '--slot4-dark-bg': '#006053',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#edf2f3',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7fafb',
  '--slot4-lavender': '#eef4f5',
  '--slot4-gray': '#f3f7f8',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 44%, #eef4f5 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-gold)]',
  goldBg: 'bg-[var(--slot4-gold)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.09]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_18px_55px_rgba(14,32,42,0.08)]',
  shadowStrong: 'shadow-[0_28px_85px_rgba(14,32,42,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.42))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1388px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center',
    rail: 'flex snap-x gap-6 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[330px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-sm font-extrabold uppercase italic tracking-normal',
    heroTitle: 'text-5xl font-black leading-[1.18] tracking-normal sm:text-6xl lg:text-[6rem]',
    sectionTitle: 'text-4xl font-black leading-[1.18] tracking-normal sm:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[18px] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[18px] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[18px] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-gold)] px-8 py-4 text-sm font-black text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(255,204,66,0.34)]',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-black text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]',
    accent: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-8 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(0,105,95,0.24)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[16px] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(14,32,42,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Keep all edits inside src/editable/.',
  'Use a UniHub-inspired structure: compact white nav, teal section panels, yellow CTAs, image-led cards, and generous vertical rhythm.',
  'Preserve dynamic post data and use fallbacks for missing images, summaries, and categories.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
