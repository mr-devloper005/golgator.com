import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, UserRoundPlus } from 'lucide-react'
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
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-[1388px] items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="rounded-[18px] border border-black/10 bg-[#eef4f5] p-5 shadow-[0_26px_85px_rgba(14,32,42,0.08)] sm:p-8">
            <div className="rounded-[18px] bg-white p-6 shadow-[0_18px_55px_rgba(14,32,42,0.08)] sm:p-8">
              <UserRoundPlus className="h-12 w-12 text-[var(--slot4-accent)]" />
              <h1 className="mt-5 text-3xl font-black">{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className="mt-5 text-sm text-[#606873]">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
          </div>
          <div className="editable-reveal">
            <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-3xl text-6xl font-black leading-[1.16] text-[#03050c] sm:text-7xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-7 max-w-xl text-xl leading-9 text-[#515963]">{pagesContent.auth.signup.description}</p>
            <Link href="/image" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-gold)] px-8 py-4 text-sm font-black text-[#111521] transition hover:-translate-y-0.5">Explore visuals <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
