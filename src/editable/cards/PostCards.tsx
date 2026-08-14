import Link from 'next/link'
import { ArrowRight, ArrowUpRight, UserRound } from 'lucide-react'
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

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="editable-card-hover group relative block min-h-[480px] overflow-hidden bg-black text-white">
      <img src={getEditablePostImage(post)} alt={post.title || label} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 sm:p-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B00]">{label}</span>
        <h3 className="mt-3 max-w-2xl text-4xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-5xl">{post.title}</h3>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-6 inline-flex w-fit items-center gap-2 bg-[#FF6B00] px-6 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">Read story <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="editable-card-hover group block w-[300px] shrink-0 overflow-hidden bg-white">
      <div className="editable-image-zoom relative aspect-[4/3] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post image'} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-base font-black uppercase leading-tight tracking-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="editable-border-slide group flex items-center justify-between gap-4 border-b border-black/10 py-4 transition hover:bg-white/50">
      <span className="line-clamp-1 text-sm font-black uppercase tracking-tight">
        <span className="mr-3 text-xs text-[#FF6B00]">{String(index + 1).padStart(2, '0')}</span>
        {post.title}
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-black/20 transition group-hover:text-[#FF6B00]" />
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="editable-border-slide group grid items-center gap-6 border-b border-black/10 py-8 transition md:grid-cols-[0.5fr_1fr_0.7fr_60px]">
      <p className="text-sm font-black text-black/40">{String(index + 1).padStart(2, '0')}</p>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{getEditableCategory(post)}</p>
        <h2 className="mt-1 max-w-md text-2xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">{getEditableExcerpt(post, 130)}</p>
      </div>
      {index % 2 === 0 ? <img src={getEditablePostImage(post)} alt="" className="h-32 w-full object-cover" /> : <span />}
      <span className="flex h-12 w-12 items-center justify-center border border-black/10 transition group-hover:bg-[#FF6B00] group-hover:text-white"><ArrowRight className="h-5 w-5" /></span>
    </Link>
  )
}

export function HorizontalProfileCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="editable-card-hover group flex items-center gap-5 border border-black/8 bg-white p-5 transition">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-[#eae5df]">
        {getEditablePostImage(post) ? <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-8 w-8 text-black/30" />}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{getEditableCategory(post)}</p>
        <h3 className="mt-1 line-clamp-2 text-lg font-black uppercase tracking-tight">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-black/50">{getEditableExcerpt(post, 105)}</p>
      </div>
    </Link>
  )
}
