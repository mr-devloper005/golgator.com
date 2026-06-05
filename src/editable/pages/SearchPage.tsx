import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 4 === 0

  return (
    <Link href={href} className={`group grid overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(14,32,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(14,32,42,0.14)] ${strong ? 'lg:col-span-2 lg:grid-cols-[1.08fr_0.92fr]' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-black ${strong ? 'min-h-[360px]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">{taskLabel}</span>
        </div>
      ) : null}
      <div className="flex flex-col justify-center p-7 sm:p-8">
        {!image ? <span className="w-fit rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">{taskLabel}</span> : null}
        <h2 className={`mt-4 line-clamp-3 font-black leading-tight text-[#202334] ${strong ? 'text-4xl' : 'text-2xl'}`}>{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-base font-medium leading-8 text-[#606873]">{summary}</p> : null}
        <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black transition group-hover:border-[var(--slot4-accent)] group-hover:text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1388px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 rounded-[18px] bg-[#eef4f5] p-6 shadow-[0_26px_85px_rgba(14,32,42,0.08)] md:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[1.16] text-[#03050c] sm:text-6xl lg:text-7xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#515963]">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-center rounded-[18px] bg-white p-5 shadow-[0_18px_55px_rgba(14,32,42,0.08)] sm:p-6">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-[18px] border border-black/10 bg-[#f7fafb] px-4 py-4">
                <Search className="h-5 w-5 opacity-45" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-current/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-[18px] border border-black/10 bg-[#f7fafb] px-4 py-4">
                  <Filter className="h-4 w-4 opacity-45" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" />
                </label>
                <select name="task" defaultValue={task} className="rounded-[18px] border border-black/10 bg-[#f7fafb] px-4 py-4 text-sm font-black outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-full bg-[var(--slot4-accent)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="mt-2 text-4xl font-black">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/image" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-7 lg:grid-cols-2">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[18px] border border-dashed border-black/15 bg-[#eef4f5] p-10 text-center">
              <p className="text-2xl font-black">No matching posts found.</p>
              <p className="mt-3 text-sm font-semibold opacity-60">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
