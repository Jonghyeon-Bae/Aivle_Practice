import Link from 'next/link';

export default function Home() {
  const steps = [
    {
      day: 1,
      title: "Next.js App Router 기초 & 레이아웃",
      desc: "React CSR의 한계를 극복하는 SSR의 개념을 배우고, 폴더 기반 라우팅과 Tailwind CSS 디자인을 활용해 반응형 포트폴리오 사이트를 구축합니다.",
      route: "/portfolio",
      projectTitle: "자기소개 포트폴리오",
      badge: "App Router / Tailwind",
      color: "from-teal-500 to-emerald-500",
      curriculum: "day1_routing.md"
    },
    {
      day: 2,
      title: "클라이언트 컴포넌트 & 로컬 상태",
      desc: "서버/클라이언트 컴포넌트 경계를 나누는 use client 지시어와 useState, useEffect 훅을 학습하고 LocalStorage 연동 기법 및 Hydration 에러 우회법을 실습합니다.",
      route: "/todo",
      projectTitle: "인터랙티브 To-Do 앱",
      badge: "useState / LocalStorage",
      color: "from-blue-500 to-cyan-500",
      curriculum: "day2_state.md"
    },
    {
      day: 3,
      title: "서버 페칭 & Route Handler API",
      desc: "서버 컴포넌트 내에서의 비동기 데이터 패칭과 프록시 서버 역할을 수행하는 API Route Handler 설계법을 익히고 영화 검색 시스템을 제작합니다.",
      route: "/movies",
      projectTitle: "영화 검색 익스플로러",
      badge: "Server Fetch / API Route",
      color: "from-indigo-500 to-violet-500",
      curriculum: "day3_data_fetching.md"
    },
    {
      day: 4,
      title: "SSG 정적 빌드 & 파일 시스템 파서",
      desc: "정적 사이트 생성(SSG)의 경제적/성능적 이점을 파악하고 Node.js fs 모듈을 활용하여 로컬 마크다운 문서를 읽고 정적 블로그 포스팅을 빌드합니다.",
      route: "/blog",
      projectTitle: "마크다운 기술 블로그",
      badge: "SSG / Node.js fs / [slug]",
      color: "from-pink-500 to-rose-500",
      curriculum: "day4_ssg_blog.md"
    },
    {
      day: 5,
      title: "미들웨어 보안 필터 & 쿠키 세션",
      desc: "Next.js 문지기 역할인 Middleware의 라이프사이클을 이해하고, 쿠키 기반 세션 인증 시스템 및 SVG 데이터 시각화가 가미된 관리자 대시보드를 구축합니다.",
      route: "/dashboard",
      projectTitle: "로그인 & 날씨 대시보드",
      badge: "Middleware / Cookie / SVG Chart",
      color: "from-amber-500 to-orange-500",
      curriculum: "day5_auth_dashboard.md"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* 상단 히어로 헤더 */}
      <header className="relative overflow-hidden py-16 px-6 border-b border-slate-900 bg-slate-900/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[20%] w-72 h-72 rounded-full bg-teal-500/30 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[20%] w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest text-teal-400 font-bold bg-teal-950/50 px-4 py-1.5 rounded-full border border-teal-800/30">
            Next.js 14/15 + Tailwind CSS 1-Week Curriculum
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Next.js 기반 서비스 개발 <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              1주일 속성 강의 실습 포털
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            대학 1학년 및 취업훈련생을 위해 설계된 체계적인 실습 코드 허브입니다. 
            하루에 하나씩 점진적으로 난이도를 빌드업하며 실제 동작하는 5개의 미니 프로젝트를 한곳에서 테스트할 수 있습니다.
          </p>
        </div>
      </header>

      {/* 강의 과정 타임라인 로드맵 */}
      <main className="max-w-5xl w-full mx-auto px-6 py-16 flex-grow space-y-12">
        <h2 className="text-2xl font-bold border-l-4 border-teal-500 pl-3">
          교육과정 & 미니 프로젝트 로드맵 (Course Roadmap)
        </h2>

        <div className="relative border-l border-slate-800 pl-6 ml-4 space-y-12">
          {steps.map((step) => (
            <div key={step.day} className="relative group">
              {/* 타임라인 숫자 노드 */}
              <span className={`absolute left-[-37px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:border-teal-500 group-hover:text-teal-400 transition-colors z-10 bg-slate-950`}>
                {step.day}
              </span>

              {/* 하루 카드 콘텐츠 */}
              <div className="bg-slate-900/60 border border-slate-900 rounded-3xl p-6 md:p-8 hover:border-slate-800/80 transition-all shadow-xl hover:scale-[1.005] flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Day {step.day}</span>
                    <span className="text-slate-700">|</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/50">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-teal-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                  
                  {/* 교안 및 슬라이드 링크 */}
                  <div className="pt-2 text-xs flex flex-wrap gap-4 items-center">
                    <a 
                      href={`/curriculum/${step.curriculum}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-teal-400 underline transition-colors"
                    >
                      📄 {step.day}일차 강의교안 (Markdown)
                    </a>
                    <span className="text-slate-800">|</span>
                    <a 
                      href={`/curriculum/${step.curriculum.replace('.md', '.pdf')}`} 
                      download
                      className="text-slate-500 hover:text-teal-400 underline transition-colors flex items-center gap-1"
                    >
                      📕 {step.day}일차 교안 (PDF 다운로드)
                    </a>
                    <span className="text-slate-800">|</span>
                    <a 
                      href={`/curriculum/${step.curriculum.replace('.md', '.pptx')}`} 
                      download
                      className="text-slate-500 hover:text-teal-400 underline transition-colors flex items-center gap-1"
                    >
                      📊 {step.day}일차 슬라이드 (PPTX 다운로드)
                    </a>
                  </div>
                </div>

                {/* 프로젝트 이동 링크 버튼 */}
                <div className="shrink-0 w-full md:w-auto">
                  <Link 
                    href={step.route}
                    className={`w-full md:w-auto block text-center px-5 py-3.5 bg-gradient-to-r ${step.color} text-slate-950 font-bold rounded-2xl text-xs hover:opacity-90 transition-opacity shadow-lg`}
                  >
                    <span>{step.projectTitle} 실행 &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="border-t border-slate-900 py-10 bg-slate-950 px-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto space-y-2">
          <p>Next.js 1-Week Lecture Portal - Designed & Developed by AI Tutor</p>
          <p className="text-slate-600">실습 디렉토리: C:/Users/User/.gemini/antigravity/scratch/nextjs-lecture-portal</p>
        </div>
      </footer>

    </div>
  );
}
