import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f5f0eb] text-[#111]">
        <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1320px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="bg-white p-6 sm:p-8">
            <h1 className="text-2xl font-black uppercase italic tracking-tight">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-black/50">Already have an account? <Link href="/login" className="font-black text-[#FF6B00] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="editable-reveal">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-black/55">{pagesContent.auth.signup.description}</p>
            <Link href="/image" className="mt-8 inline-flex items-center gap-2 bg-[#FF6B00] px-6 py-3.5 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#e55f00]">Explore visuals <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
