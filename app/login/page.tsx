'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // 성공 시 대시보드로 이동
        router.refresh(); // 미들웨어 쿠키 인식을 위해 페이지 정보 새로고침
        router.push('/dashboard');
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('로그인 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-6 py-12 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        
        {/* 상단 텍스트 */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-xs text-teal-400 hover:underline font-semibold block mb-2">
            &larr; 홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Service Login
          </h1>
          <p className="text-xs text-slate-500">
            대시보드 입장을 위한 관리자 계정을 입력해 주세요.
          </p>
        </div>

        {/* 안내 배너 */}
        <div className="bg-slate-950/80 border border-slate-800/40 p-4 rounded-xl text-xs space-y-1">
          <p className="font-bold text-teal-400">💡 학습용 데모 계정 정보</p>
          <p className="text-slate-400">아이디: <code className="text-slate-200 bg-slate-900 px-1 py-0.5 rounded font-mono">admin</code></p>
          <p className="text-slate-400">비밀번호: <code className="text-slate-200 bg-slate-900 px-1 py-0.5 rounded font-mono">admin123</code></p>
        </div>

        {/* 에러 피드백 */}
        {errorMsg && (
          <div className="bg-red-950/60 border border-red-800/30 text-red-400 px-4 py-3 rounded-xl text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-100 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-100 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/10 disabled:opacity-55"
          >
            {loading ? '로그인 확인 중...' : '대시보드 로그인'}
          </button>
        </form>

      </div>
    </div>
  );
}
