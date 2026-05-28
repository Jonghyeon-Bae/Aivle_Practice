import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-slate-950">
      
      {/* 상단 네비게이션 헤더 */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Developer.Kim
          </h1>
          <nav className="flex space-x-6 text-sm font-medium">
            <a href="#about" className="hover:text-teal-400 transition-colors">소개</a>
            <a href="#skills" className="hover:text-teal-400 transition-colors">기술 스택</a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">프로젝트</a>
            <Link href="/" className="px-3 py-1 bg-teal-500 text-slate-950 rounded-full text-xs font-semibold hover:bg-teal-400 transition-all">
              홈으로
            </Link>
          </nav>
        </div>
      </header>

      {/* 메인 프로필 섹션 */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24 flex-grow">
        
        {/* Intro Hero Section */}
        <section id="about" className="py-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold bg-teal-950/50 px-3 py-1 rounded-full border border-teal-800/30">
              Junior Web Developer
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              안녕하세요, <br />
              사용자 중심의 가치를 만드는 <br />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">김개발</span>입니다.
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Next.js와 React, 그리고 Tailwind CSS를 활용해 빠르고 아름다운 웹 서비스를 만듭니다. 
              기술적인 복잡함을 걷어내고 사용자에게 가장 직관적인 경험을 주는 인터페이스를 설계하는 것에 열정이 있습니다.
            </p>
          </div>
          {/* 아바타 플레이스홀더 (그라데이션 효과) */}
          <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-teal-500 via-emerald-500 to-indigo-600 p-[3px] shadow-2xl shadow-teal-500/10">
            <div className="w-full h-full bg-slate-900 rounded-[13px] flex flex-col items-center justify-center text-center p-6">
              <span className="text-4xl">🚀</span>
              <h3 className="mt-4 font-bold text-lg">김개발 (Kim Dev)</h3>
              <p className="text-xs text-slate-500 mt-2">React & Next.js specialist</p>
            </div>
          </div>
        </section>

        {/* 기술 스택 섹션 */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <h3 className="text-2xl font-bold border-l-4 border-teal-500 pl-3">My Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Next.js (App Router)', desc: 'SSR / Routing' },
              { name: 'React.js', desc: 'Component Architecture' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Tailwind CSS', desc: 'Premium Responsive UI' }
            ].map((skill, idx) => (
              <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-teal-500/50 hover:bg-slate-900/80 transition-all group">
                <h4 className="font-semibold text-slate-100 group-hover:text-teal-400 transition-colors">{skill.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 프로젝트 소개 */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <h3 className="text-2xl font-bold border-l-4 border-teal-500 pl-3">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.01] transition-all flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="text-xs font-bold text-teal-400 uppercase">React Web App</span>
                <h4 className="text-xl font-bold">인터랙티브 Todo 관리 시스템</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  LocalStorage를 활용하여 브라우저 재접속 시에도 데이터가 유지되는 할 일 관리 앱입니다. 
                  깔끔한 마이크로 애니메이션과 필터링 기능이 적용되어 있습니다.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link href="/todo" className="text-xs text-teal-400 font-semibold hover:underline flex items-center gap-1">
                  실행해보기 &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.01] transition-all flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="text-xs font-bold text-teal-400 uppercase">Next.js API Fetching</span>
                <h4 className="text-xl font-bold">실시간 날씨 및 사용자 대시보드</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  쿠키 기반의 가상 사용자 로그인 시스템과 미들웨어 라우트 보호 기능이 결합된 대시보드입니다. 
                  외부 오픈 API로부터 실시간 날씨 정보를 받아와 차트 형태로 시각화합니다.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link href="/dashboard" className="text-xs text-teal-400 font-semibold hover:underline flex items-center gap-1">
                  실행해보기 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 하단 푸터 */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950 px-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto">
          <p>&copy; 2026 Developer Kim. Powered by Next.js & Tailwind CSS.</p>
        </div>
      </footer>

    </div>
  );
}
