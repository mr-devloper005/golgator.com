import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => {
  const withMd = linkifyMarkdown(value)
  return withMd.split(/(<a\s[^>]*>[\s\S]*?<\/a>)/gi).map((segment, i) => {
    if (i % 2 === 1) return segment
    return segment.replace(/(^|[\s(>])((https?:\/\/)[^\s<)"]+)/gi, (_m, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)
  }).join('')
}

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][^>]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || '')
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = { '--detail-bg': '#f5f0eb', '--detail-text': '#111', '--detail-surface': '#fff', '--detail-accent': '#FF6B00', '--editable-border': 'rgba(0,0,0,0.08)', '--editable-container': '1320px' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 border border-black/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.1em] transition hover:border-[#FF6B00]">
      <ArrowLeft className="h-3.5 w-3.5" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-16">
      <article className="min-w-0 bg-white p-6 sm:p-10">
        <BackLink task="article" />
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">{categoryOf(post, 'Article')}</p>
        <h1 className="mt-3 text-4xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
        {images[0] ? <img src={images[0]} alt="" className="mt-8 max-h-[550px] w-full object-cover" /> : null}
        <BodyContent post={post} />
        <EditableComments slug={post.slug} comments={comments} />
      </article>
      <RelatedPanel task="article" post={post} related={related} />
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <article className="bg-white p-6 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[140px_1fr]">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden bg-[#eae5df]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-12 w-12 opacity-30" />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">Business listing</p>
              <h1 className="mt-2 text-3xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl">{post.title}</h1>
              {hasUniqueBody(post) ? <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">{summaryText(post)}</p> : null}
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-4">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-16">
      <aside className="bg-[#111] p-7 text-white lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Classified notice</p>
        <h1 className="mt-3 text-3xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-8 grid gap-2">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {phone ? <a href={`tel:${phone}`} className="bg-white px-5 py-3 text-xs font-black uppercase text-black">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="border border-white/20 px-5 py-3 text-xs font-black uppercase">Email</a> : null}
        </div>
      </aside>
      <article className="bg-white p-6 sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
        <aside className="bg-white p-7 lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex items-center gap-2 bg-[#111] px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white"><Camera className="h-3.5 w-3.5" /> Image story</span>
          <h1 className="mt-5 text-3xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-4xl">{post.title}</h1>
          {hasUniqueBody(post) ? <p className="mt-4 text-sm leading-7 text-black/55">{summaryText(post)}</p> : null}
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-4 space-y-4 md:columns-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden bg-white">
              <img src={image} alt="" className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-4 text-xs font-bold text-black/40">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-16">
      <article className="bg-white p-7 sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-16 w-16 items-center justify-center bg-[#111] text-white"><Bookmark className="h-8 w-8" /></div>
        <h1 className="mt-6 text-3xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl">{post.title}</h1>
        {hasUniqueBody(post) ? <p className="mt-4 max-w-2xl text-base leading-7 text-black/55">{summaryText(post)}</p> : null}
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#111] px-5 py-3 text-xs font-black uppercase text-white">Open saved resource <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-16">
      <article className="bg-white p-6 sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-5 sm:grid-cols-[100px_1fr]">
          <div className="flex h-24 w-24 items-center justify-center bg-[#111] text-white"><FileText className="h-10 w-10" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">PDF resource</p>
            <h1 className="mt-2 text-3xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden border border-black/8 bg-[#f5f0eb]">
            <div className="flex items-center justify-between gap-3 border-b border-black/8 bg-white p-4">
              <span className="text-xs font-black uppercase">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#111] px-4 py-2 text-[10px] font-black uppercase text-white">Download <Download className="h-3.5 w-3.5" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8 lg:py-16">
      <aside className="bg-white p-8 text-center lg:sticky lg:top-24 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-8 flex h-36 w-36 items-center justify-center overflow-hidden bg-[#eae5df]">
          {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-14 w-14 text-black/30" />}
        </div>
        <h1 className="mt-5 text-3xl font-black uppercase italic leading-[0.92] tracking-tight">{post.title}</h1>
        {role ? <p className="mt-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="bg-white p-7 sm:p-10">
        <BodyContent post={post} />
        <ImageStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" post={post} related={related} />
      </article>
    </section>
  )
}

const hasUniqueBody = (post: SitePost) => {
  const body = getBody(post)
  const summary = summaryText(post)
  return !summary || stripHtml(body) !== summary
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  const body = getBody(post)
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-sm leading-7' : 'text-base leading-8'} text-black/70`} dangerouslySetInnerHTML={{ __html: formatPlainText(body) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-2 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="border border-black/8 bg-[#f5f0eb] p-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-black/40"><Icon className="h-3.5 w-3.5" /> {label}</div>
          <p className="mt-1 break-words text-sm font-bold leading-6 text-black/70">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B00]">{label}</p>
      <div className={`mt-3 grid gap-2 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] object-cover" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="flex items-center gap-2 border-b border-black/8 p-4 text-xs font-black uppercase"><MapPin className="h-3.5 w-3.5" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-72 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 border border-black/8 bg-white p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Quick actions</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#111] px-4 py-2 text-[10px] font-black uppercase text-white">Website <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 border border-black/10 px-4 py-2 text-[10px] font-black uppercase"><Phone className="h-3.5 w-3.5" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 border border-black/10 px-4 py-2 text-[10px] font-black uppercase"><Mail className="h-3.5 w-3.5" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border border-white/10 bg-white/5 px-4 py-3 text-sm"><span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">{label}</span><span className="font-black">{value}</span></div>
}

function RelatedPanel({ task, post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-4">
      {!compact ? (
        <div className="border border-black/8 bg-white p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">About this post</p>
          <div className="mt-3 grid gap-2 text-sm font-bold text-black/55">
            <p className="inline-flex items-center gap-2"><Tag className="h-3.5 w-3.5" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Site: {SITE_CONFIG.name}</p>
            {post.publishedAt ? <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p> : null}
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="border border-black/8 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-black uppercase tracking-tight">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-[10px] font-black uppercase tracking-[0.12em] text-[#FF6B00]">View all</Link>
          </div>
          <div className="mt-4 grid gap-2">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="editable-card-hover group flex gap-3 border border-black/5 bg-[#f5f0eb] p-3 transition hover:bg-white">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-16 w-16 shrink-0 object-cover" /> : <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#eae5df]"><FileText className="h-5 w-5 text-black/30" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-xs font-black uppercase leading-tight tracking-tight">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-black/40">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 border border-black/8 bg-[#f5f0eb] p-5">
      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-tight"><MessageCircle className="h-4 w-4" /> Comments</div>
      <div className="mt-4 grid gap-2">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border border-black/5 bg-white p-4">
            <p className="text-xs font-black">{comment.name}</p>
            <p className="mt-1 text-sm leading-6 text-black/60">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-black/40">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
