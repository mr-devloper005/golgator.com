import { cn } from '@/lib/utils'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-[18px] bg-[#dfe8ea]', className)} />
}

export function PageLoadingState({ label = 'Loading page', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1388px] px-4 py-16 sm:px-6 lg:px-8', className)} aria-live="polite" aria-busy="true">
      <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{label}</p>
      <PulseBlock className="mt-6 h-16 w-3/4 max-w-3xl" />
      <PulseBlock className="mt-5 h-5 w-2/3 max-w-2xl" />
      <div className="mt-10 grid gap-7 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-[18px] bg-white p-5 shadow-[0_20px_55px_rgba(14,32,42,0.08)]">
            <PulseBlock className="h-52 w-full" />
            <PulseBlock className="mt-6 h-6 w-4/5" />
            <PulseBlock className="mt-4 h-4 w-3/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-7 sm:grid-cols-2 lg:grid-cols-3', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-[18px] bg-white p-5 shadow-[0_20px_55px_rgba(14,32,42,0.08)]">
          <PulseBlock className="h-48 w-full" />
          <PulseBlock className="mt-5 h-6 w-5/6" />
          <PulseBlock className="mt-4 h-4 w-2/3" />
          <PulseBlock className="mt-7 h-12 w-36 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading detail', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto grid w-full max-w-[1388px] gap-8 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr]', className)} aria-live="polite" aria-busy="true">
      <PulseBlock className="h-[520px] w-full" />
      <div>
        <p className="text-sm font-black uppercase italic text-[var(--slot4-accent)]">{label}</p>
        <PulseBlock className="mt-6 h-16 w-4/5" />
        <PulseBlock className="mt-6 h-5 w-full" />
        <PulseBlock className="mt-4 h-5 w-5/6" />
        <PulseBlock className="mt-4 h-5 w-2/3" />
      </div>
    </div>
  )
}
