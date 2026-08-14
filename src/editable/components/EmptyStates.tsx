import Link from 'next/link'
import { ArrowUpRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('border-2 border-dashed border-black/10 bg-white p-12 text-center', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#111] text-white">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-6 text-2xl font-black uppercase italic tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-black/50">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 bg-[#FF6B00] px-6 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#e55f00]">
        {actionLabel}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically. The layout stays ready while the feed is quiet.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
