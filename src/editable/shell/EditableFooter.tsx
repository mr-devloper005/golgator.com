'use client'

import Link from 'next/link'
import { Phone, Shield } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const displayName = 'golgator'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 4)

  return (
    <footer className="bg-[#eef4f5] text-[var(--slot4-page-text)]">
      <section className="bg-[var(--slot4-accent)] text-white">
        <div className="mx-auto grid max-w-[1388px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8 lg:py-24">
          <h2 className="max-w-md text-5xl font-black leading-[1.22] tracking-normal">Lets Start Something Great Together</h2>
          <form action="/search" className="flex min-h-[64px] overflow-hidden rounded-full bg-white/15 p-1 backdrop-blur">
            <input name="q" placeholder="Email Address..." className="min-w-0 flex-1 bg-transparent px-7 text-sm font-bold text-white outline-none placeholder:text-white/70" />
            <button className="rounded-full bg-[var(--slot4-gold)] px-8 text-sm font-black text-[#111521]">Subscribe Now</button>
          </form>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1388px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] lg:px-8 lg:py-24">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <Shield className="h-10 w-10 fill-[var(--slot4-accent)] stroke-[var(--slot4-accent)]" />
            <span className="text-3xl font-black text-[#1e2333]">{displayName}</span>
          </Link>
          <p className="mt-8 max-w-xs text-base leading-8 text-[#606773]">A polished space for visual work, professional profiles, and useful discoveries across the site.</p>
        </div>

        <div>
          <h3 className="text-2xl font-black">Our Campus</h3>
          <div className="mt-7 grid gap-4">
            {taskLinks.map((task) => <Link key={task.key} href={task.route} className="text-base text-[#333848] hover:text-[var(--slot4-accent)]">{task.label}</Link>)}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black">Page</h3>
          <div className="mt-7 grid gap-4">
            {[['About Us', '/about'], ['Contact', '/contact'], ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']])].map(([label, href]) => (
              <Link key={href} href={href} className="text-base text-[#333848] hover:text-[var(--slot4-accent)]">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-base text-[#333848] hover:text-[var(--slot4-accent)]">Logout</button> : null}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black">Address</h3>
          <div className="mt-7 grid gap-7">
            <div className="flex gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--slot4-accent)] text-[var(--slot4-accent)]"><Phone className="h-6 w-6" /></span>
              <p className="text-base leading-7"><strong className="block">Phone number</strong> +1 (444) 000-8888</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1388px] flex-wrap items-center justify-between gap-4 border-t border-black/10 px-4 py-6 text-sm sm:px-6 lg:px-8">
        <p>©{year} {displayName} | All Rights Reserved</p>
        <div className="flex gap-8"><Link href="/about">Terms Of Service</Link><Link href="/contact">Privacy Policy</Link><Link href="/contact">Legal</Link></div>
      </div>
    </footer>
  )
}
