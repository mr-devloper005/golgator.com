import { ArrowUpRight, Camera, CheckCircle2, Sparkles, UserRound } from 'lucide-react'
import Link from 'next/link'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const displayName = 'golgator'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1388px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <article className="editable-reveal">
              <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[1.16] text-[#03050c] sm:text-7xl">About {displayName}</h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-[#515963]">{pagesContent.about.description}</p>
              <div className="mt-10 grid gap-5 text-base leading-8 text-[#606873]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/image" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-gold)] px-8 py-4 text-sm font-black text-[#111521] transition hover:-translate-y-0.5">Explore images <ArrowUpRight className="h-4 w-4" /></Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-black transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Contact <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </article>

            <aside className="grid gap-5">
              {pagesContent.about.values.map((value, index) => {
                const Icon = [Camera, UserRound, CheckCircle2][index] || Sparkles
                return (
                  <div key={value.title} className="rounded-[18px] border border-black/10 bg-[#f7fafb] p-8 shadow-[0_18px_55px_rgba(14,32,42,0.06)]">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--slot4-accent)] shadow-sm"><Icon className="h-7 w-7" /></span>
                    <h2 className="mt-6 text-3xl font-black leading-tight">{value.title}</h2>
                    <p className="mt-4 text-base leading-8 text-[#606873]">{value.description}</p>
                  </div>
                )
              })}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
