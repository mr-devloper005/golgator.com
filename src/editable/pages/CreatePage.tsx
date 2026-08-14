'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react'
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

const fieldClass = 'border border-black/10 bg-[#f5f0eb] px-4 py-3.5 text-sm font-bold text-[#111] outline-none transition placeholder:text-black/30 focus:border-[#FF6B00] focus:bg-white'

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
  const [task] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
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
        <main className="min-h-screen bg-[#f5f0eb] px-4 py-16 text-[#111] sm:px-6 lg:px-8 lg:py-24">
          <section className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex h-full min-h-72 items-center justify-center bg-[#111] text-white">
              <Lock className="h-16 w-16 opacity-60" />
            </div>
            <div className="self-center">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-4 text-4xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-black/55">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 bg-[#FF6B00] px-6 py-3.5 text-xs font-black uppercase tracking-[0.1em] text-white">Login <ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 border-2 border-black px-6 py-3.5 text-xs font-black uppercase tracking-[0.1em]">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f5f0eb] text-[#111]">
        <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-4 text-4xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-5xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-black/55">{pagesContent.create.hero.description}</p>
            </aside>

            <form onSubmit={submit} className="bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6B00]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-2xl font-black uppercase italic tracking-tight">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="bg-[#f5f0eb] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-3">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-20`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-40`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-4 w-4" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-70">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 bg-[#FF6B00] text-xs font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#e55f00]">
                <Send className="h-3.5 w-3.5" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
