import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f5f0eb',
  '--slot4-page-text': '#111111',
  '--slot4-panel-bg': '#111111',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#666666',
  '--slot4-soft-muted-text': '#888888',
  '--slot4-accent': '#FF6B00',
  '--slot4-accent-fill': '#FF6B00',
  '--slot4-accent-soft': '#fff3e8',
  '--slot4-gold': '#FF6B00',
  '--slot4-dark-bg': '#111111',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eae5df',
  '--slot4-cream': '#f5f0eb',
  '--slot4-warm': '#faf7f4',
  '--slot4-lavender': '#eae5df',
  '--slot4-gray': '#f0ebe6',
  '--slot4-body-gradient': 'none',
  '--editable-border': 'rgba(0,0,0,0.08)',
  '--editable-container': '1320px',
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
  accentSoftText: 'text-[var(--slot4-accent)]',
  goldBg: 'bg-[var(--slot4-gold)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.08]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_4px_24px_rgba(0,0,0,0.06)]',
  shadowStrong: 'shadow-[0_8px_40px_rgba(0,0,0,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.55))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[320px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.2em]',
    heroTitle: 'text-5xl font-black italic leading-[0.95] tracking-tight sm:text-7xl lg:text-[7rem]',
    sectionTitle: 'text-4xl font-black italic leading-[0.95] tracking-tight sm:text-5xl',
    body: 'text-base leading-7',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 bg-[var(--slot4-accent)] px-7 py-4 text-sm font-black uppercase tracking-[0.1em] text-white transition duration-300 hover:bg-[#e55f00]',
    secondary: 'inline-flex items-center justify-center gap-2 border-2 border-[var(--slot4-page-text)] px-7 py-4 text-sm font-black uppercase tracking-[0.1em] text-[var(--slot4-page-text)] transition duration-300 hover:bg-[var(--slot4-page-text)] hover:text-white',
    accent: 'inline-flex items-center justify-center gap-2 bg-[var(--slot4-page-text)] px-7 py-4 text-sm font-black uppercase tracking-[0.1em] text-white transition duration-300 hover:bg-[#333]',
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Keep all edits inside src/editable/.',
  'Use a MANGCONHIET-inspired structure: bold orange accent, black/cream palette, italic condensed headlines, editorial card variety.',
  'Preserve dynamic post data and use fallbacks for missing images, summaries, and categories.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
