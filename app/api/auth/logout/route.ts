import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: '로그아웃 되었습니다.' });
  
  // 쿠키를 만료(MaxAge = 0)시켜 브라우저에서 제거
  response.cookies.set('antigravity_session', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
