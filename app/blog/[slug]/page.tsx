import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  // Next.js 15에서는 params가 Promise이므로, 두 버전에 모두 대응하는 방어적 래핑 적용
  const resolvedParams = 'then' in params ? await params : params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 네비게이션 헤더 */}
        <div className="space-y-4 border-b border-slate-900 pb-6">
          <Link href="/blog" className="text-xs text-teal-400 hover:underline font-semibold">
            &larr; 전체 목록으로
          </Link>
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500">{post.date} 작성</span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
              {post.title}
            </h1>
          </div>
        </div>

        {/* 파싱된 마크다운 본문 노출 */}
        <div 
          className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm md:text-base space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 하단 푸터 영역 */}
        <div className="border-t border-slate-900 pt-8 flex justify-between items-center text-xs text-slate-500">
          <span>작성자: 김개발 (Kim Dev)</span>
          <Link href="/blog" className="text-teal-400 hover:underline font-semibold">
            목록으로 돌아가기 &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
