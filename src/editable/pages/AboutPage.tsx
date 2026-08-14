import { ArrowUpRight, Camera, CheckCircle2, UserRound } from 'lucide-react'
import Link from 'next/link'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const displayName = 'GOLGATOR'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f5f0eb] text-[#111]">
        <section className="bg-[#FF6B00] py-16 lg:py-24">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">{pagesContent.about.badge}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-black sm:text-6xl lg:text-7xl">About {displayName}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/65">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="editable-reveal">
              <div className="grid gap-5 text-base leading-7 text-black/60">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/image" className="inline-flex items-center gap-2 bg-[#FF6B00] px-6 py-3.5 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#e55f00]">Explore images <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-black px-6 py-3.5 text-xs font-black uppercase tracking-[0.1em] transition hover:bg-black hover:text-white">Contact <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>

            <div className="grid gap-4">
              {pagesContent.about.values.map((value, index) => {
                const Icon = [Camera, UserRound, CheckCircle2][index] || Camera
                return (
                  <div key={value.title} className="editable-card-hover bg-white p-7">
                    <span className="flex h-12 w-12 items-center justify-center bg-[#111] text-white"><Icon className="h-6 w-6" /></span>
                    <h2 className="mt-5 text-xl font-black uppercase italic tracking-tight">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-black/50">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
