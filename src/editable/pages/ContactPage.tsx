'use client'

import { ArrowUpRight, Camera, Mail, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Camera, title: 'Gallery launches', body: 'Share portfolio updates, image collections, and visual campaigns that need a stronger public presentation.' },
  { icon: Sparkles, title: 'Creator features', body: 'Discuss professional profiles, editorial support, or visual feature placement across the site.' },
  { icon: Mail, title: 'Partnership support', body: 'Reach out about usage rights, commercial requests, and collaboration opportunities.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1388px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="editable-reveal">
              <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-6xl font-black leading-[1.16] text-[#03050c] sm:text-7xl">{pagesContent.contact.title}</h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-[#515963]">{pagesContent.contact.description}</p>
              <div className="mt-10 grid gap-5">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-[18px] border border-black/10 bg-[#f7fafb] p-7 shadow-[0_18px_55px_rgba(14,32,42,0.05)]">
                    <lane.icon className="h-7 w-7 text-[var(--slot4-accent)]" />
                    <h2 className="mt-4 text-2xl font-black">{lane.title}</h2>
                    <p className="mt-3 text-base leading-8 text-[#606873]">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] border border-black/10 bg-[#eef4f5] p-5 shadow-[0_26px_85px_rgba(14,32,42,0.08)] sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">Message</p>
                  <h2 className="mt-2 text-3xl font-black">{pagesContent.contact.formTitle}</h2>
                </div>
                <Link href="/search" className="hidden items-center gap-2 rounded-full bg-[var(--slot4-gold)] px-6 py-3 text-sm font-black text-[#111521] sm:inline-flex">Browse <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
              <EditableContactLeadForm />
              <div className="mt-6 flex items-center gap-3 rounded-[18px] bg-white p-5 text-[#515963]">
                <MessageCircle className="h-6 w-6 text-[var(--slot4-accent)]" />
                <p className="text-sm font-bold leading-6">Your message uses the existing contact workflow and keeps backend behavior unchanged.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
