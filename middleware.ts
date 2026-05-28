import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('antigravity_session');
  const { pathname } = request.nextUrl;

  // 대시보드 경로로 접근하는데 쿠키가 없는 경우 ➡️ 로그인으로 리다이렉트
  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 로그인 페이지로 오는데 이미 쿠키(로그인 정보)가 있는 경우 ➡️ 대시보드로 자동 연결
  if (pathname.startsWith('/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 작동할 경로 정의
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
