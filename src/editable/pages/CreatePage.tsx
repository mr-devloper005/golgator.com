'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-[18px] border border-black/10 bg-[#f7fafb] px-4 py-4 text-sm font-bold text-[#202334] outline-none transition placeholder:text-current/35 focus:border-[var(--slot4-accent)] focus:bg-white'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-white px-4 py-20 text-[var(--slot4-page-text)] sm:px-6 lg:px-8 lg:py-28">
          <section className="mx-auto grid max-w-[1388px] gap-10 rounded-[18px] bg-[#eef4f5] p-7 shadow-[0_26px_85px_rgba(14,32,42,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-80 items-center justify-center rounded-[18px] bg-[var(--slot4-accent)] text-white">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[1.16] text-[#03050c] sm:text-6xl lg:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#515963]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-gold)] px-8 py-4 text-sm font-black text-[#111521]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1388px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 rounded-[18px] bg-[#eef4f5] p-6 shadow-[0_26px_85px_rgba(14,32,42,0.08)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <aside>
              <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[1.16] text-[#03050c] sm:text-6xl lg:text-7xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#515963]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-[18px] border p-5 text-left transition ${active ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent)] text-white' : 'border-black/10 bg-white hover:-translate-y-0.5'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-black">{item.label}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-65">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[18px] bg-white p-5 shadow-[0_18px_55px_rgba(14,32,42,0.08)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-3xl font-black">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-[#eef4f5] px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
