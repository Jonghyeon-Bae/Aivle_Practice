'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  releaseYear: number;
  overview: string;
  image: string;
}

export default function MovieExplorerPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // 영화 데이터 검색 페칭 함수
  const fetchMovies = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/movies?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      console.error('영화 데이터를 가져오는 데 실패했습니다.', e);
    } finally {
      setLoading(false);
    }
  };

  // 타이핑 시 0.3초 딜레이 후 자동 API 호출 (디바운싱 유사 구현)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 상단 헤더 */}
        <div className="space-y-1">
          <Link href="/" className="text-xs text-teal-400 hover:underline font-semibold">
            &larr; 홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Movie Explorer
          </h1>
          <p className="text-slate-500 text-sm">
            Next.js API Route Handler 서버를 경유하여 실시간 필터링된 영화 데이터를 호출합니다.
          </p>
        </div>

        {/* 검색창 인풋 */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="영화 제목 또는 장르를 검색하세요..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-teal-500 text-slate-100 transition-all pl-12"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.636z" />
            </svg>
          </div>
        </div>

        {/* 결과 디스플레이 영역 */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-900/50 border border-slate-900 rounded-2xl h-80 animate-pulse flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-slate-800 rounded-md w-2/3" />
                  <div className="h-4 bg-slate-800 rounded-md w-1/3" />
                  <div className="space-y-2 pt-4">
                    <div className="h-3 bg-slate-800 rounded w-full" />
                    <div className="h-3 bg-slate-800 rounded w-5/6" />
                  </div>
                </div>
                <div className="h-8 bg-slate-800 rounded-md w-1/4" />
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/20 border border-slate-900 rounded-3xl">
            <span className="text-4xl">🎬</span>
            <p className="text-slate-500 text-sm mt-4">검색 조건에 맞는 영화를 찾을 수 없습니다.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-teal-500/50 transition-all flex flex-col justify-between group shadow-lg"
              >
                {/* 영화 포스터 대용 비주얼 그라데이션 박스 */}
                <div className={`h-40 bg-gradient-to-br ${movie.image} p-6 flex flex-col justify-between relative`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                  <span className="bg-slate-950/80 backdrop-blur text-[10px] font-bold text-teal-400 border border-teal-800/30 px-2 py-1 rounded-md self-start z-10">
                    {movie.genre}
                  </span>
                  <div className="flex justify-between items-end z-10">
                    <span className="text-xs text-slate-300 font-medium">{movie.releaseYear}년 개봉</span>
                    <span className="text-amber-400 text-xs font-bold bg-slate-950/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-500/20">
                      ★ {movie.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* 영화 소개 본문 */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg group-hover:text-teal-400 transition-colors">{movie.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`[${movie.title}] 영화 상세 소개 페이지가 구현 중입니다.`)} 
                    className="w-full py-2 bg-slate-950 border border-slate-800 group-hover:border-teal-500/40 rounded-xl text-xs font-semibold hover:bg-slate-950/60 transition-colors"
                  >
                    상세보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
