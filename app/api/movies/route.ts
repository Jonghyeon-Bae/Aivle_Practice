import { NextResponse } from 'next/server';
import { mockMovies } from '@/lib/movies';

export async function GET(request: Request) {
  // URL에서 검색어(query) 추출
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  // 1초간의 네트워크 지연 시간 시뮬레이션 (로딩 스켈레톤 UI 체험용)
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!query) {
    return NextResponse.json(mockMovies);
  }

  const filtered = mockMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}
