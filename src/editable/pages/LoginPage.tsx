import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f5f0eb] text-[#111]">
        <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1320px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div className="editable-reveal">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-black/55">{pagesContent.auth.login.description}</p>
            <Link href="/image" className="mt-8 inline-flex items-center gap-2 bg-[#FF6B00] px-6 py-3.5 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#e55f00]">Browse first <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-black uppercase italic tracking-tight">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-black/50">New here? <Link href="/signup" className="font-black text-[#FF6B00] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
