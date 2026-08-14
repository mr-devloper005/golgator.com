import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const stock = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
]

function imageFor(post?: SitePost, index = 0) {
  const image = post ? getEditablePostImage(post) : ''
  return image.includes('/placeholder.svg') ? stock[index % stock.length] : image || stock[index % stock.length]
}

function OrangeButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 bg-[#FF6B00] px-7 py-4 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#e55f00]">
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const heroCards = posts.slice(0, 5)
  return (
    <section className="relative overflow-hidden bg-[#FF6B00]">
      <div className="absolute right-0 top-0 h-full w-[200px] bg-[#e55f00] opacity-30 lg:w-[300px]" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }} />

      <div className="relative mx-auto grid max-w-[1320px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="editable-reveal z-10">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-black/60">Stories / Visuals / Ideas</p>
          <h1 className="mt-6 text-[4.5rem] font-black italic leading-[0.9] tracking-tight text-black sm:text-[6rem] lg:text-[8rem]">
            WORK<br />
            <span className="text-stroke-white" style={{ WebkitTextStroke: '2px #000', color: 'transparent' }}>ON<br />YOUR</span><br />
            TERMS.
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-black/70">Fresh perspectives, visual inspiration and practical ideas for independent people building meaningful careers.</p>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div className="relative ml-auto w-[420px]">
            {heroCards.slice(0, 3).map((post, i) => (
              <Link key={post.id || post.slug} href={postHref('image', post, primaryRoute)} className="editable-card-hover group absolute block overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)]" style={{
                width: i === 0 ? '280px' : '240px',
                top: `${i * 120}px`,
                right: i === 1 ? '0' : i === 2 ? '20px' : '40px',
                transform: `rotate(${i === 0 ? '-2' : i === 1 ? '3' : '-1'}deg)`,
                zIndex: 3 - i,
              }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={imageFor(post, i)} alt={post.title || ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{getEditableCategory(post)}</p>
                  <p className="mt-1 line-clamp-2 text-xs font-black leading-tight">{post.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
          {heroCards.slice(0, 3).map((post, i) => (
            <Link key={post.id || post.slug} href={postHref('image', post, primaryRoute)} className="group overflow-hidden bg-white shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img src={imageFor(post, i)} alt={post.title || ''} className="h-full w-full object-cover" />
              </div>
              <p className="line-clamp-1 p-2 text-[10px] font-black">{post.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-[#8B3D00] py-3">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.35em] text-white/70">Independent ideas for independent work</p>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled && t.key !== 'profile')
  return (
    <section className="bg-[#111] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6B00]">Navigate the Journal</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-5xl font-black italic leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
            CHOOSE YOUR<br />
            <span style={{ WebkitTextStroke: '1.5px #fff', color: 'transparent' }}>STARTING LINE.</span>
          </h2>
          <OrangeButton href={primaryRoute}>View Everything</OrangeButton>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {enabled.slice(0, 4).map((task, index) => (
            <Link key={task.key} href={task.route} className="editable-card-hover group border border-white/10 p-6 transition hover:border-[#FF6B00]/50">
              <span className="text-xs font-black text-[#FF6B00]">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-2xl font-black uppercase tracking-tight">{task.label}</h3>
              <ArrowUpRight className="mt-6 h-5 w-5 text-white/30 transition group-hover:text-[#FF6B00]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts[0]
  const list = posts.slice(1, 6)
  if (!featured) return null

  return (
    <section className="bg-[#f5f0eb] py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-6">
          <h2 className="text-5xl font-black italic tracking-tight sm:text-6xl">ON THE GRID</h2>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-black/50">Latest Dispatches / {posts.length}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Link href={postHref(primaryTask, featured, primaryRoute)} className="editable-card-hover group relative block overflow-hidden bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={imageFor(featured, 0)} alt={featured.title || ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 text-white sm:p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B00]">{getEditableCategory(featured)}</span>
                <h3 className="mt-2 max-w-lg text-3xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-4xl">{featured.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/70">{getEditableExcerpt(featured, 160)}</p>
              </div>
            </div>
          </Link>

          <div className="grid gap-0">
            {list.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="editable-border-slide group flex items-center gap-4 border-b border-black/10 py-5 transition hover:bg-white/50">
                <div className="h-16 w-16 shrink-0 overflow-hidden sm:h-20 sm:w-20">
                  <img src={imageFor(post, index + 1)} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-black uppercase leading-tight tracking-tight sm:text-base">{post.title}</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-black/20 transition group-hover:text-[#FF6B00]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const merged = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const gallery = merged.slice(0, 6)
  const blog = merged.slice(6, 9).length ? merged.slice(6, 9) : posts.slice(0, 3)

  return (
    <>
      <section className="bg-[#111] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6B00]">Visual Discovery</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-5xl font-black italic leading-[0.92] tracking-tight sm:text-6xl">FRESH FINDS & FEATURED WORK</h2>
            <OrangeButton href={primaryRoute}>Explore All</OrangeButton>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`editable-card-hover group relative overflow-hidden ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                <div className={`overflow-hidden ${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
                  <img src={imageFor(post, index)} alt={post.title || ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-0 translate-y-2 p-5 text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{getEditableCategory(post)}</p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-black uppercase leading-tight">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0eb] py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF6B00]">The Journal</p>
              <h2 className="mt-2 text-4xl font-black italic tracking-tight sm:text-5xl">LATEST STORIES</h2>
            </div>
            <Link href={primaryRoute} className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 text-xs font-black uppercase tracking-[0.1em] transition hover:bg-black hover:text-white">Read more <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>

          <div className="mt-10">
            {blog.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="editable-border-slide group grid items-center gap-6 border-b border-black/10 py-8 transition md:grid-cols-[0.5fr_1fr_0.7fr_60px]">
                <p className="text-sm font-black text-black/40">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="text-2xl font-black uppercase italic leading-tight tracking-tight sm:text-3xl">{post.title}</h3>
                {index % 2 === 0 ? <img src={imageFor(post, index)} alt="" className="h-32 w-full object-cover" /> : <span />}
                <span className="flex h-12 w-12 items-center justify-center border border-black/10 transition group-hover:bg-[#FF6B00] group-hover:text-white"><ArrowUpRight className="h-5 w-5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled && t.key !== 'profile')
  return (
    <section className="bg-[#FF6B00] py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-3xl font-black italic tracking-tight text-black sm:text-4xl">Ready to discover something new?</h2>
          <div className="flex flex-wrap gap-3">
            {enabled.slice(0, 3).map((task) => (
              <Link key={task.key} href={task.route} className="bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#333]">{task.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
