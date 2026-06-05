'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, LogIn, Menu, PlusCircle, Search, Shield, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const displayName = 'golgator'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => {
    const enabled = SITE_CONFIG.tasks.filter((task) => task.enabled)
    return [
      { label: 'Home', href: '/' },
      { label: enabled.find((task) => task.key === 'image')?.label || 'Gallery', href: enabled.find((task) => task.key === 'image')?.route || '/image' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Login', href: '/login' },
      { label: 'Sign up', href: '/signup' },
    ]
  }, [])

  const accountItems = session
    ? [{ label: 'Create', href: '/create', icon: PlusCircle }]
    : [{ label: 'Login', href: '/login', icon: LogIn }, { label: 'Sign up', href: '/signup', icon: UserPlus }]

  return (
    <header className="sticky top-0 z-50 bg-white text-[var(--slot4-page-text)] shadow-[0_10px_28px_rgba(14,32,42,0.04)]">
      <nav className="mx-auto flex min-h-[88px] w-full max-w-[1388px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--slot4-accent)] transition group-hover:rotate-6">
            <Shield className="h-10 w-10 fill-[var(--slot4-accent)] stroke-[var(--slot4-accent)]" />
          </span>
          <span className="text-3xl font-black tracking-normal text-black">{displayName}</span>
        </Link>

        <div className="ml-8 hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link key={`${item.label}-${item.href}`} href={item.href} className={`text-sm font-black transition hover:text-[var(--slot4-accent)] ${active ? 'text-[var(--slot4-accent)]' : 'text-[#1f2430]'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-5">
          <form action="/search" className="hidden items-center gap-4 border-r border-black/15 pr-8 md:flex">
            <button className="rounded-full p-2 transition hover:bg-[#eef3f4]" aria-label="Search"><Search className="h-5 w-5" /></button>
          </form>
          {session ? <button type="button" onClick={logout} className="hidden text-sm font-black hover:text-[var(--slot4-accent)] xl:block">Logout</button> : null}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-black/10 bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-white px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-full border border-black/10 bg-[#eef3f4] px-4 py-3">
            <Search className="h-4 w-4 opacity-60" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none" />
          </form>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#f7fafb] px-4 py-3 text-sm font-black">
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
            {accountItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#f7fafb] px-4 py-3 text-sm font-black">
                  <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
