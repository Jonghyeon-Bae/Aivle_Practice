import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 데모용 가상 계정 검증
    if (username === 'admin' && password === 'admin123') {
      const response = NextResponse.json({ success: true, message: '로그인 성공!' });
      
      // 세션 쿠키 발급 (HttpOnly 옵션으로 보안 강화)
      response.cookies.set('antigravity_session', 'demo-session-token-999', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 30, // 30분 유효
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: '아이디(admin) 또는 비밀번호(admin123)가 맞지 않습니다.' },
      { status: 401 }
    );
  } catch (e) {
    return NextResponse.json({ success: false, message: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
