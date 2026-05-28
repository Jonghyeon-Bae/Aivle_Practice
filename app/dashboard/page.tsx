'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // 시뮬레이션용 주간 날씨 기온 추이 데이터
  const weeklyTemps = [21, 23, 22, 26, 28, 25, 24];
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.refresh(); // 미들웨어 쿠키 인식 해제 유도
        router.push('/login');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 상단 네비게이션 헤더 */}
        <div className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold bg-teal-950/40 px-3 py-1 rounded-full border border-teal-800/30">
              Authorized Session
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mt-2">
              Weather & Operations Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-4 py-2 bg-red-950 text-red-400 border border-red-800/30 rounded-xl text-xs font-bold hover:bg-red-950 hover:text-slate-100 transition-all disabled:opacity-50"
          >
            {loggingOut ? '종료 중...' : '로그아웃'}
          </button>
        </div>

        {/* 3열 데이터 카드 레이아웃 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-slate-500 font-medium">현재 기온 (서울)</span>
            <h3 className="text-4xl font-extrabold text-teal-400">24.5 °C</h3>
            <p className="text-xs text-slate-400 pt-2">어제 평균 대비 +1.2 °C 상승</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-slate-500 font-medium">대기 습도</span>
            <h3 className="text-4xl font-extrabold text-emerald-400">62 %</h3>
            <p className="text-xs text-slate-400 pt-2">야외 쾌적 수준 유지 중</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-slate-500 font-medium">평균 풍속</span>
            <h3 className="text-4xl font-extrabold text-sky-400">3.4 m/s</h3>
            <p className="text-xs text-slate-400 pt-2">남남서풍 불어오는 상태</p>
          </div>
        </div>

        {/* 주간 기온 변화 차트 영역 (SVG 수동 매핑 꺾은선 차트) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg">주간 기온 변화 추이 (Weekly Temp Curve)</h4>
            <span className="text-xs text-slate-500">단위: °C</span>
          </div>

          {/* SVG 선 차트 */}
          <div className="relative h-64 bg-slate-950 rounded-2xl border border-slate-900/60 overflow-hidden flex flex-col justify-between p-6">
            <div className="w-full h-40 flex items-end justify-between relative mt-4">
              
              {/* 뒷배경 가로 점선 가이드라인 */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-slate-900 w-full" />
                <div className="border-b border-slate-900 w-full" />
                <div className="border-b border-slate-900 w-full" />
              </div>

              {/* SVG 폴리라인 차트 */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 160">
                {/* 꺾은선 (Polyline) */}
                <polyline
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="50,110 150,90 250,100 350,60 450,40 550,70 650,80"
                  className="drop-shadow-[0_4px_12px_rgba(20,184,166,0.3)]"
                />
                
                {/* 꼭짓점 동그라미 매핑 */}
                {[
                  {x: 50, y: 110, temp: 21},
                  {x: 150, y: 90, temp: 23},
                  {x: 250, y: 100, temp: 22},
                  {x: 350, y: 60, temp: 26},
                  {x: 450, y: 40, temp: 28},
                  {x: 550, y: 70, temp: 25},
                  {x: 650, y: 80, temp: 24}
                ].map((pt, idx) => (
                  <g key={idx} className="group/dot">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="#14b8a6"
                      stroke="#020617"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                      className="font-bold"
                    >
                      {pt.temp}°
                    </text>
                  </g>
                ))}
              </svg>

            </div>

            {/* X축 요일 표시 */}
            <div className="flex justify-between text-xs text-slate-500 font-semibold px-4 pt-4 border-t border-slate-900/60">
              {days.map((day, idx) => (
                <span key={idx} className="w-12 text-center">{day}요일</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
