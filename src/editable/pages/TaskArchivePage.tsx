import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 lg:grid-cols-2', promise: 'Readable editorial cards with room for headlines and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 lg:grid-cols-2', promise: 'Directory cards highlight company identity, location, contacts, and service details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 lg:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3', promise: 'Image posts with a gallery-first browsing experience.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-5 lg:grid-cols-2', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 lg:grid-cols-2', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#f5f0eb', '--archive-text': '#111', '--archive-surface': '#fff', '--archive-accent': '#FF6B00' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="bg-[#f5f0eb]">
          <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">{SITE_CONFIG.name} &gt; {label}</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">{voice?.headline || `${label} Posts`}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/55">{voice?.description || deck.promise}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[#FF6B00] px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white"><Icon className="h-3.5 w-3.5" /> {label}</div>
              <Link href={basePath} className="border border-black/10 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition hover:border-[#FF6B00]">Browse all</Link>
              <Link href="/search" className="border border-black/10 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition hover:border-[#FF6B00]">Search</Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black py-4">
            <p className="text-xs font-black uppercase tracking-[0.15em]">Results: {posts.length}</p>
            <form action={basePath} className="flex items-center gap-2">
              <select name="category" defaultValue={category} className="border border-black/10 bg-white px-3 py-2 text-xs font-black outline-none focus:border-[#FF6B00]">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="bg-[#FF6B00] px-4 py-2 text-xs font-black uppercase text-white transition hover:bg-[#e55f00]">Apply</button>
            </form>
          </div>
        </div>

        <section className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="border-2 border-dashed border-black/10 bg-white p-12 text-center">
              <Search className="mx-auto h-8 w-8 opacity-30" />
              <h2 className="mt-4 text-2xl font-black uppercase italic tracking-tight">No posts found</h2>
              <p className="mt-2 text-sm text-black/50">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-black/10 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.1em] transition hover:border-[#FF6B00]">Previous</Link> : null}
            <span className="bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">Page {page} / {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-black/10 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.1em] transition hover:border-[#FF6B00]">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="editable-card-hover group overflow-hidden bg-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]">{category}</span>
      </div>
      <div className="p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{String(index + 1).padStart(2, '0')} / Story</p>
        <h2 className="mt-2 line-clamp-2 text-xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="editable-card-hover group grid gap-5 bg-white p-6 sm:grid-cols-[140px_1fr]">
      <div className="flex h-32 w-32 items-center justify-center overflow-hidden bg-[#eae5df]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-30" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#FF6B00] px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 border border-black/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-3 text-xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">{getSummary(post)}</p>
        <div className="mt-3 grid gap-1 text-[10px] font-bold text-black/40 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="editable-card-hover group overflow-hidden bg-white">
      <div className="grid min-h-56 sm:grid-cols-[0.7fr_1fr]">
        <div className="relative bg-[#111] p-6 text-white">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6B00]">Classified</span>
          <h2 className="mt-6 text-2xl font-black uppercase italic leading-[0.95] tracking-tight">{price || 'Open offer'}</h2>
          <p className="mt-3 text-xs font-bold text-white/50">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-3 right-3 h-16 w-16 object-cover opacity-70" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">{getSummary(post)}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#FF6B00]">View listing <ArrowRight className="h-3.5 w-3.5" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Visual')
  return (
    <Link href={href} className="editable-card-hover group break-inside-avoid overflow-hidden bg-white">
      <div className="overflow-hidden">
        <img src={image} alt="" className="w-full object-cover transition duration-500 group-hover:scale-105" style={{ aspectRatio: index % 3 === 0 ? '3/4' : index % 3 === 1 ? '1/1' : '4/3' }} />
      </div>
      <div className="p-4">
        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{category}</p>
        <h2 className="mt-1 line-clamp-2 text-sm font-black uppercase leading-tight tracking-tight">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="editable-card-hover group border border-black/8 bg-white p-7 transition hover:border-[#FF6B00]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5 text-black/20" />
      </div>
      <h2 className="mt-5 text-xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">{getSummary(post)}</p>
      {website ? <p className="mt-4 truncate text-[10px] font-black uppercase tracking-[0.12em] text-black/30">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="editable-card-hover group bg-white p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="bg-[#111] p-4 text-white"><FileText className="h-7 w-7" /></div>
        <span className="bg-[#eae5df] px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em]">{category}</span>
      </div>
      <h2 className="mt-5 text-xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">{getSummary(post)}</p>
      <p className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#FF6B00]">Open document <Download className="h-3.5 w-3.5" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="editable-card-hover group bg-white p-7 text-center">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden bg-[#eae5df]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-black/30" />}
      </div>
      <h2 className="mt-5 text-lg font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
      {role ? <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#FF6B00]">{role}</p> : null}
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">{getSummary(post)}</p>
    </Link>
  )
}
