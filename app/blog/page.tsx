import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

// 캐시를 하지 않고 정적 빌드로 유도하기 위해 명시적 명명
export const dynamic = 'force-static';

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* 상단 타이틀 */}
        <div className="space-y-2 border-b border-slate-900 pb-8">
          <Link href="/" className="text-xs text-teal-400 hover:underline font-semibold">
            &larr; 홈으로 돌아가기
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Static Tech Blog
          </h1>
          <p className="text-slate-500 text-sm">
            빌드 시점(Build Time)에 Node.js 파일 시스템을 사용해 마크다운 포스트를 사전 렌더링(SSG)하는 서버 컴포넌트 블로그입니다.
          </p>
        </div>

        {/* 블로그 포스팅 목록 */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 bg-slate-900/10 border border-slate-900 rounded-2xl">
              📝 작성된 블로그 글이 없습니다.
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="group space-y-3 p-6 bg-slate-900/40 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all">
                <span className="text-xs font-semibold text-teal-400">{post.date}</span>
                <h2 className="text-2xl font-bold tracking-tight group-hover:text-teal-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="pt-2">
                  <Link href={`/blog/${post.slug}`} className="text-xs text-teal-400 font-bold hover:underline flex items-center gap-1">
                    자세히 보기 &rarr;
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
