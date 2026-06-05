import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, BriefcaseBusiness, CalendarDays, CheckCircle2, GraduationCap, Lightbulb, Map, Phone, Play, Rocket, ShieldCheck, Sparkles, Star } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
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

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{children}</p>
}

function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className={dc.button.primary}>{children} <ArrowUpRight className="h-4 w-4" /></Link>
}

function TealButton({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className={dc.button.accent}>{children} <ArrowUpRight className="h-4 w-4" /></Link>
}

function ProgramCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const Icon = [BriefcaseBusiness, BookOpen, ShieldCheck, CameraIcon][index % 4] || BookOpen
  return (
    <Link href={href} className="group overflow-hidden rounded-[18px] bg-white shadow-[0_20px_55px_rgba(14,32,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(14,32,42,0.14)]">
      <div className="editable-image-zoom relative aspect-[1.33] overflow-hidden">
        <img src={imageFor(post, index)} alt={post.title || 'Featured post'} className="h-full w-full object-cover" />
        <span className="absolute bottom-0 right-0 inline-flex items-center gap-1 bg-[var(--slot4-accent)] px-3 py-2 text-sm font-black text-white"><CalendarDays className="h-4 w-4" /> January/May</span>
      </div>
      <div className="p-7">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase italic text-[#263040]"><Icon className="h-4 w-4 text-[var(--slot4-accent)]" /> {getEditableCategory(post)}</p>
        <h3 className="mt-4 line-clamp-3 text-2xl font-black leading-snug">{post.title}</h3>
        <div className="mt-8 flex flex-wrap gap-4">
          
          
        </div>
      </div>
    </Link>
  )
}

function CameraIcon(props: ComponentProps<typeof BookOpen>) {
  return <Sparkles {...props} />
}

function BlogRow({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-h-[210px] grid-cols-1 items-center gap-6 border-t border-black/15 py-10 transition md:grid-cols-[0.6fr_1fr_0.8fr_72px]">
      <p className="font-black text-[#242838]">31 may 2025</p>
      <h3 className="max-w-md text-3xl font-black leading-tight">{post.title}</h3>
      {index % 2 === 0 ? <img src={imageFor(post, index)} alt="" className="h-40 w-full rounded-[18px] object-cover" /> : <span />}
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white"><ArrowUpRight className="h-5 w-5" /></span>
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const heroPost = posts[0]
  const second = posts[1]
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1388px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_470px] lg:px-8 lg:py-28">
        <div className="editable-reveal">
          <h1 className="max-w-5xl text-6xl font-black leading-[1.2] tracking-normal text-[#03050c] sm:text-7xl lg:text-[6.2rem]">Your Future Begins at Our University</h1>
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_0.95fr] lg:items-start">
            <div className="editable-image-zoom overflow-hidden rounded-t-[18px]">
              <img src={imageFor(second, 1)} alt={second?.title || 'Creative people collaborating'} className="aspect-[1.55] w-full object-cover" />
            </div>
            <div className="max-w-xl">
              <p className="text-xl leading-8 text-[#515963]">A polished discovery space for creative professionals, visual portfolios, and standout profiles. Browse work, read stories, and connect with new opportunities.</p>
              <p className="mt-5 text-xl font-bold italic leading-8 text-[#222734]">Profiles, images, and useful posts are organized with a clear editorial rhythm so every visit feels focused.</p>
              <p className="mt-5 text-xl leading-8 text-[#515963]">{getEditableExcerpt(heroPost, 140) || 'Explore fresh visual work and professional stories from across the community.'}</p>
              <div className="mt-9"><GoldButton href={primaryRoute}>Apply Now</GoldButton></div>
            </div>
          </div>
        </div>
        <div className="editable-image-zoom editable-reveal overflow-hidden lg:-mr-[252px]" style={{ animationDelay: '120ms' }}>
          <img src={imageFor(heroPost, 0)} alt={heroPost?.title || 'Featured visual'} className="h-[640px] w-full object-cover lg:w-[470px]" />
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 6)
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1388px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="relative min-h-[560px]">
          <img src={imageFor(featured[0], 2)} alt="" className="h-[436px] w-full max-w-[460px] rounded-[18px] object-cover" />
          <div className="editable-float absolute bottom-0 left-16 hidden items-center gap-5 rounded-[18px] border border-[var(--slot4-accent)] bg-[#eef3f4] p-6 shadow-xl sm:flex">
            <ShieldCheck className="h-16 w-16 text-[var(--slot4-accent)]" />
            <p className="text-3xl font-black leading-tight">150+<br /><span className="text-xl">Program Here</span></p>
          </div>
          <img src={imageFor(featured[1], 3)} alt="" className="absolute bottom-0 right-0 hidden h-[290px] w-[325px] rounded-[18px] object-cover shadow-xl md:block" />
          <Sparkles className="editable-spin-slow absolute right-8 top-28 h-36 w-36 text-[var(--slot4-gold)]" />
        </div>
        <div>
          <SectionLabel>001/ About us</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-5xl font-black leading-[1.22]">Explore Our World-Class Academic Programs</h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#666d75]">Discover image-led stories, portfolios, and professional pages designed to make visual work easier to browse and easier to remember.</p>
          <div className="mt-9 border-t border-black/15 pt-7">
            {['Graduate/Undergraduate Admissions Service', 'Scholarship and Financial Aid Office'].map((item, index) => (
              <Link key={item} href={primaryRoute} className="flex max-w-lg items-center gap-5 py-3 text-2xl font-medium italic text-[var(--slot4-accent)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#f8fafb]">{index ? <Lightbulb className="h-6 w-6" /> : <GraduationCap className="h-6 w-6" />}</span>
                {item}
              </Link>
            ))}
          </div>
          <div className="mt-8"><Link href="/about" className={dc.button.secondary}>Read more <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const cards = posts.slice(0, 6)
  if (!cards.length) return null
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1388px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionLabel>002/ Find your program</SectionLabel>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[1.22]">Empowering Students for a Global Future</h2>
            <p className="mt-7 text-lg leading-8 text-[#666d75]">Search the latest {taskLabel(primaryTask).toLowerCase()} or jump into popular creative paths.</p>
            <div className="mt-9 rounded-[18px] bg-white p-10 shadow-[0_26px_85px_rgba(14,32,42,0.08)]">
              <form action="/search" className="flex rounded-full border border-black/20 p-2">
                <input name="q" placeholder="Program Search" className="min-w-0 flex-1 bg-transparent px-7 text-sm outline-none" />
                <button className="rounded-full bg-[var(--slot4-gold)] px-8 text-sm font-black">Find Now</button>
              </form>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-lg">
                <span className="underline">Popular Search:</span>
                {['Business', 'Art & Design', 'Graduate', 'History'].map((item) => <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="rounded border border-black/15 px-4 py-2">{item}</Link>)}
              </div>
            </div>
            <div className="mt-8 grid gap-5">
              {cards.slice(0, 2).map((post, index) => (
                <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="flex items-center justify-between rounded-lg bg-[#eef3f4] px-5 py-4 font-black">
                  {String(index + 1).padStart(2, '0')}. {post.title}<ArrowUpRight className="h-5 w-5 rounded-full border border-black/10 p-1" />
                </Link>
              ))}
            </div>
          </div>
          <div className="relative grid min-h-[610px] place-items-center">
            <div className="absolute inset-10 bg-[radial-gradient(#d8dde0_1.4px,transparent_1.4px)] [background-size:18px_18px]" />
            <img src={imageFor(cards[2], 4)} alt="" className="relative ml-auto h-[470px] w-full max-w-[390px] rounded-[18px] object-cover" />
            <div className="absolute left-12 top-28 rounded-[18px] bg-[var(--slot4-accent)] px-8 py-5 text-white shadow-xl"><strong className="block text-4xl">9K+ Students</strong><span className="text-2xl font-black">Worldwide</span></div>
            <img src={imageFor(cards[3], 5)} alt="" className="absolute bottom-0 left-0 hidden h-[290px] w-[255px] rounded-[18px] object-cover md:block" />
            <div className="absolute bottom-12 right-0 rounded-[18px] bg-[#eef3f4] p-6 text-[#172033] shadow-xl"><PhoneIcon /> <strong className="ml-3 text-lg">Need help?</strong><span className="block pl-16 text-4xl font-black">(406) 555-0120</span></div>
          </div>
        </div>

        <div className="mt-24 flex items-end justify-between gap-6">
          <div><SectionLabel>003/ Popular program</SectionLabel><h2 className="mt-5 max-w-2xl text-5xl font-black leading-[1.22]">Shaping Leaders Through Quality Education</h2></div>
          <TealButton href={primaryRoute}>Find More</TealButton>
        </div>
        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {cards.map((post, index) => <ProgramCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
    </section>
  )
}

function PhoneIcon() {
  return <Phone className="inline h-12 w-12 rounded-full border border-[var(--slot4-accent)] p-2 text-[var(--slot4-accent)]" />
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const merged = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const gallery = merged.slice(0, 4)
  const blog = merged.slice(4, 7).length ? merged.slice(4, 7) : posts.slice(0, 3)
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1388px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[18px]">
            <img src={stock[2]} alt="" className="h-[610px] w-full object-cover" />
            <div className="-mt-64 ml-8 max-w-[430px] rounded-t-[18px] bg-[var(--slot4-accent)] text-white">
              <div className="p-8 text-2xl font-black"><Play className="mr-3 inline h-8 w-8 rounded-full bg-[var(--slot4-gold)] p-2 text-[#182033]" /> Watch Now</div>
              <p className="bg-black/35 p-8 text-2xl font-bold italic leading-10">University life is more than just lectures and textbooks. Campus life offers students</p>
            </div>
          </div>

          <div className="mt-28 grid overflow-hidden rounded-[18px] border border-black/10 lg:grid-cols-4">
            {[['9K+', 'Students', GraduationCap], ['10+', 'experience', Lightbulb], ['10+', 'Awards winner', Award], ['880+', 'Program Done', Map]].map(([value, label, Icon]) => (
              <div key={String(label)} className="border-black/10 p-16 lg:border-r">
                <Icon className="h-16 w-16 text-[var(--slot4-accent)]" />
                <p className="mt-8 text-6xl font-black">{String(value).replace('+', '')}<span className="text-[var(--slot4-gold)]">+</span></p>
                <p className="mt-2 text-2xl font-black">{String(label)}</p>
              </div>
            ))}
          </div>

          <div className="mt-28 grid gap-12 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <SectionLabel>004/ Our gallery</SectionLabel>
              <h2 className="mt-5 text-5xl font-black leading-[1.22]">Discover Opportunities for Global Education</h2>
              <div className="mt-16 grid gap-8">
                {gallery.slice(0, 2).map((post, index) => <img key={post.id || post.slug} src={imageFor(post, index)} alt="" className="h-[330px] w-full rounded-[18px] object-cover" />)}
              </div>
            </div>
            <div className="grid gap-8">
              {gallery.slice(2, 4).map((post, index) => <img key={post.id || post.slug} src={imageFor(post, index + 2)} alt="" className={index === 0 ? 'h-[365px] w-full rounded-[18px] object-cover' : 'h-[430px] w-full rounded-[18px] object-cover'} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4f5] py-24">
        <div className="mx-auto max-w-[1388px] px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel>005/ Admission aid</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[1.18]">Explore Our World-Class Academic Programs</h2>
          <div className="mt-20 grid overflow-hidden rounded-[8px] text-left lg:grid-cols-4">
            {['Fees & Financial', 'How to apply', 'Process Overview', 'Online Application'].map((title, index) => (
              <Link key={title} href={primaryRoute} className={`p-8 ${index % 2 ? 'bg-[var(--slot4-gold)] text-[#172033]' : 'bg-[var(--slot4-accent)] text-white'}`}>
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-5 text-base font-medium leading-7 opacity-90">Complete and submit information with a clear, guided process built for discovery.</p>
                <span className="mt-6 inline-flex items-center gap-2 font-black">Read More <ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--slot4-accent)] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1388px] px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel><span className="text-white">007/ Admissions journey</span></SectionLabel>
          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-[1.22]">Start Your Academic Future With a Simple 3-Step Process</h2>
          <div className="mt-28 grid gap-7 lg:grid-cols-3">
            {[['Submit Your Application Online', CheckCircle2], ['Attend the Entrance Assessment', BookOpen], ['Receive Admission & Begin', Rocket]].map(([title, Icon]) => (
              <div key={String(title)} className="relative rounded-[18px] bg-white/10 p-10 pt-24 text-left">
                <span className="absolute -top-10 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full border-2 border-dashed border-[var(--slot4-gold)] bg-[var(--slot4-gold)] text-[#172033]"><Icon className="h-10 w-10" /></span>
                <h3 className="text-2xl font-black">{String(title)}</h3>
                <p className="mt-7 text-lg leading-8 text-white/72">Complete the secure process with profile details, visual work, and supporting documents.</p>
                <div className="mt-8"><GoldButton href={primaryRoute}>Read More</GoldButton></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1388px] px-4 sm:px-6 lg:px-8">
          <SectionLabel>009/ Student review</SectionLabel>
          <div className="flex items-end justify-between gap-6"><h2 className="mt-5 max-w-2xl text-5xl font-black leading-[1.22]">Building Bright Minds for Tomorrow</h2><div className="hidden gap-4 md:flex"><button className="h-16 w-16 rounded-full border border-black/10"><ArrowLeft className="mx-auto h-6 w-6" /></button><button className="h-16 w-16 rounded-full border border-black/10"><ArrowRight className="mx-auto h-6 w-6" /></button></div></div>
          <div className="mt-16 grid gap-7 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className={`rounded-[18px] p-12 ${item === 1 ? 'bg-[var(--slot4-gold)] text-[#172033]' : 'bg-[var(--slot4-accent)] text-white'}`}>
                <div className="flex gap-2">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className={`h-6 w-6 ${star < 4 ? 'fill-current text-[var(--slot4-gold)]' : 'fill-current text-white'}`} />)}</div>
                <h3 className="mt-8 text-xl font-medium italic uppercase">Reliable and professional</h3>
                <p className="mt-7 text-lg leading-8">This site gave me a clearer way to present work, discover collaborators, and keep profile details easy to browse.</p>
                <div className="mt-10 flex items-center gap-5"><img src={stock[item + 3]} alt="" className="h-14 w-14 rounded-full object-cover" /><p><strong className="block text-2xl">Jane Cooper</strong><span>Marketing Manager</span></p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1388px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6"><div><SectionLabel>010/ Our blog</SectionLabel><h2 className="mt-5 max-w-xl text-5xl font-black leading-[1.22]">Experience a Vibrant Campus Life</h2></div><Link href={primaryRoute} className={dc.button.secondary}>Read more <ArrowUpRight className="h-4 w-4" /></Link></div>
          <div className="mt-14">
            {blog.map((post, index) => <BlogRow key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1388px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 rounded-[18px] border border-black/10 bg-white p-8 text-center sm:grid-cols-2 lg:grid-cols-5">
          {['University', 'Education', 'Portfolio', 'Creative', 'Profiles'].map((item) => (
            <div key={item} className="flex min-h-[160px] items-center justify-center border-black/10 lg:border-r">
              <p className="text-2xl font-black uppercase text-black/35">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
