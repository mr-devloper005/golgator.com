'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const displayName = 'GOLGATOR'

function LogoMark() {
  return <img src="/favicon.png" alt="GOLGATOR" width={32} height={32} className="h-8 w-8 object-contain" />
}

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').slice(0, 4)

  return (
    <footer className="bg-[#111] text-white">
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr_0.6fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <LogoMark />
              <span className="text-xl font-black tracking-tight">{displayName}</span>
            </Link>
            <p className="mt-8 max-w-xs text-sm leading-7 text-white/50">A bold discovery space for visual work, creative stories, and useful resources across every category.</p>
            <div className="mt-8 flex gap-3">
              {['X', 'In', 'Fb'].map((label) => (
                <span key={label} className="flex h-10 w-10 items-center justify-center border border-white/15 text-xs font-black text-white/40 transition hover:border-[#FF6B00] hover:text-[#FF6B00]">{label}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6B00]">Explore</h3>
            <div className="mt-6 grid gap-3">
              {taskLinks.map((task) => <Link key={task.key} href={task.route} className="text-sm text-white/60 transition hover:text-[#FF6B00]">{task.label}</Link>)}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6B00]">Pages</h3>
            <div className="mt-6 grid gap-3">
              {[['About', '/about'], ['Contact', '/contact'], ['Search', '/search'], ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']])].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-white/60 transition hover:text-[#FF6B00]">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm text-white/60 transition hover:text-[#FF6B00]">Logout</button> : null}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6B00]">Stay Connected</h3>
            <p className="mt-6 text-sm leading-7 text-white/50">Get updates on the latest visual work, stories, and featured content.</p>
            <form action="/search" className="mt-6 flex border border-white/15">
              <input name="q" placeholder="Your email..." className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30" />
              <button className="bg-[#FF6B00] px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#e55f00]">Go</button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs text-white/35">©{year} {displayName}. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-white/35">
            <Link href="/about" className="transition hover:text-white/60">Terms</Link>
            <Link href="/contact" className="transition hover:text-white/60">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
