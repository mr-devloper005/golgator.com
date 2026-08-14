'use client'

import { ArrowUpRight, Camera, Mail, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Camera, title: 'Gallery launches', body: 'Share portfolio updates, image collections, and visual campaigns that need a stronger public presentation.' },
  { icon: Sparkles, title: 'Creator features', body: 'Discuss editorial support, creative showcases, or visual feature placement across the site.' },
  { icon: Mail, title: 'Partnership support', body: 'Reach out about usage rights, commercial requests, and collaboration opportunities.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f5f0eb] text-[#111]">
        <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="editable-reveal">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-black/55">{pagesContent.contact.description}</p>
              <div className="mt-10 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="editable-card-hover bg-white p-6">
                    <lane.icon className="h-6 w-6 text-[#FF6B00]" />
                    <h2 className="mt-3 text-lg font-black uppercase italic tracking-tight">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-black/50">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">Message</p>
                  <h2 className="mt-1 text-2xl font-black uppercase italic tracking-tight">{pagesContent.contact.formTitle}</h2>
                </div>
                <Link href="/search" className="hidden items-center gap-2 bg-[#FF6B00] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-white sm:inline-flex">Browse <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </div>
              <EditableContactLeadForm />
              <div className="mt-6 flex items-center gap-3 border border-black/8 bg-[#f5f0eb] p-4 text-black/50">
                <MessageCircle className="h-5 w-5 text-[#FF6B00]" />
                <p className="text-xs font-bold leading-5">Your message uses the existing contact workflow and keeps backend behavior unchanged.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
