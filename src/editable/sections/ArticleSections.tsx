import Link from 'next/link'
import type { SitePost } from '@/lib/site-connector'
import type { SiteFeedPagination } from '@/lib/site-connector'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export function EditableArticleArchive({
  posts,
  basePath,
}: {
  posts: SitePost[]
  pagination: SiteFeedPagination
  basePath: string
  category: string
}) {
  return (
    <section className="bg-[#f5f0eb] text-[#111]">
      <div className="bg-[#FF6B00] py-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">The Journal</p>
          <h1 className="mt-3 text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-black sm:text-6xl">Articles</h1>
        </div>
      </div>
      <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {posts.map((post, index) => (
            <Link key={post.id || post.slug} href={`${basePath}/${post.slug}`} className="editable-card-hover group overflow-hidden bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]">{getEditableCategory(post)}</span>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">{String(index + 1).padStart(2, '0')} / Story</p>
                <h2 className="mt-2 line-clamp-2 text-xl font-black uppercase italic leading-tight tracking-tight">{post.title}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">{getEditableExcerpt(post, 130)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableArticleDetailShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#f5f0eb] text-[#111]">
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        {children}
      </div>
    </section>
  )
}
