import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CalendarDays, Camera, Clock3, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const fallbackImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
]

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const titleSeed = post?.title ? post.title.length % fallbackImages.length : 0
  return mediaUrl || contentImage || logo || fallbackImages[titleSeed]
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="editable-image-zoom group relative block min-h-[560px] overflow-hidden rounded-[18px] bg-[var(--slot4-accent)] text-white shadow-[0_28px_80px_rgba(14,32,42,0.18)]">
      <img src={getEditablePostImage(post)} alt={post.title || label} className="absolute inset-0 h-full w-full object-cover opacity-68" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,72,65,0.86))]" />
      <div className="relative z-10 flex min-h-[560px] flex-col justify-end p-8 sm:p-10">
        <span className="text-sm font-black uppercase italic text-[var(--slot4-gold)]">{label}</span>
        <h3 className="mt-5 max-w-3xl text-5xl font-black leading-[1.05]">{post.title}</h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-gold)] px-6 py-4 text-sm font-black text-[#172033]">Read story <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[330px] shrink-0 overflow-hidden rounded-[18px] bg-white shadow-[0_20px_55px_rgba(14,32,42,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="editable-image-zoom relative aspect-[4/3] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post image'} className="h-full w-full object-cover" />
        <span className="absolute bottom-0 right-0 inline-flex items-center gap-1 bg-[var(--slot4-accent)] px-3 py-2 text-sm font-black text-white"><CalendarDays className="h-4 w-4" /> January/May</span>
      </div>
      <div className="p-7">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase italic text-[#263040]"><Camera className="h-4 w-4 text-[var(--slot4-accent)]" /> {getEditableCategory(post)}</p>
        <h3 className="mt-4 line-clamp-3 text-2xl font-black leading-snug">{post.title}</h3>
        <div className="mt-7 flex items-center gap-4">
          <span className="rounded-2xl bg-[#eef3f4] px-4 py-3 font-medium">4 Years</span>
          <span className="rounded-full border border-black/10 px-5 py-3 font-medium">Find Now <ArrowUpRight className="ml-1 inline h-4 w-4" /></span>
        </div>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block rounded-lg bg-[#eef3f4] px-5 py-4 font-black transition hover:bg-white hover:shadow-lg">
      <span className="flex items-center justify-between gap-4">
        <span className="line-clamp-1">{String(index + 1).padStart(2, '0')}. {post.title}</span>
        <ArrowUpRight className="h-5 w-5 shrink-0 rounded-full border border-black/10 p-1" />
      </span>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-h-[210px] grid-cols-1 items-center gap-6 border-t border-black/15 py-10 transition md:grid-cols-[0.55fr_1fr_0.8fr_72px]">
      <p className="font-black text-[#242838]">31 may 2025</p>
      <div>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase text-[var(--slot4-accent)]"><Clock3 className="h-4 w-4" /> Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="max-w-md text-3xl font-black leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#666d75]">{getEditableExcerpt(post, 130)}</p>
      </div>
      {index % 2 === 0 ? <img src={getEditablePostImage(post)} alt="" className="h-40 w-full rounded-[18px] object-cover" /> : <span />}
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white"><ArrowRight className="h-5 w-5" /></span>
    </Link>
  )
}

export function HorizontalProfileCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group flex items-center gap-5 rounded-[18px] border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef3f4]">
        {getEditablePostImage(post) ? <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-8 w-8" />}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase italic text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-1 line-clamp-2 text-2xl font-black">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#666d75]">{getEditableExcerpt(post, 105)}</p>
      </div>
    </Link>
  )
}
