'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const displayName = 'GOLGATOR'

function LogoMark() {
  return <img src="/favicon.png" alt="GOLGATOR" width={36} height={36} className="h-9 w-9 object-contain" />
}

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

  const imageTask = SITE_CONFIG.tasks.find((t) => t.key === 'image' && t.enabled)

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <nav className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <LogoMark />
          <span className="text-xl font-black tracking-tight text-black">{displayName}</span>
        </Link>

        {imageTask ? (
          <Link href={imageTask.route} className="ml-6 hidden text-xs font-black uppercase tracking-[0.15em] text-[#FF6B00] lg:block">
            {imageTask.label}
          </Link>
        ) : null}

        <div className="ml-auto flex items-center gap-4">
          <form action="/search" className="hidden items-center gap-1 border border-black/15 px-3 py-1.5 md:flex">
            <input name="q" type="search" placeholder="SEARCH" className="w-20 bg-transparent text-xs font-black uppercase tracking-[0.1em] outline-none placeholder:text-black/60" />
            <button aria-label="Search"><Search className="h-4 w-4" /></button>
          </form>

          <Link href={session ? '/create' : '/signup'} className="hidden items-center gap-1.5 bg-black px-5 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#333] sm:inline-flex">
            {session ? 'Create' : 'JOIN'} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {session ? <button type="button" onClick={logout} className="hidden text-xs font-black uppercase tracking-[0.1em] hover:text-[#FF6B00] xl:block">Logout</button> : null}

          <button type="button" onClick={() => setOpen((v) => !v)} className="p-1 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <button type="button" onClick={() => setOpen((v) => !v)} className="hidden p-1 lg:block" aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-white px-4 py-6">
          <form action="/search" className="mb-5 flex border-2 border-black px-4 py-3 md:hidden">
            <Search className="h-4 w-4 opacity-50" />
            <input name="q" type="search" placeholder="Search posts..." className="min-w-0 flex-1 bg-transparent px-3 text-sm font-bold outline-none" />
          </form>
          <div className="grid gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
              return (
                <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className={`flex items-center justify-between border-b border-black/5 px-2 py-4 text-sm font-black uppercase tracking-[0.1em] transition hover:text-[#FF6B00] ${active ? 'text-[#FF6B00]' : ''}`}>
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )
            })}
            {accountItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-black/5 px-2 py-4 text-sm font-black uppercase tracking-[0.1em] transition hover:text-[#FF6B00]">
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
