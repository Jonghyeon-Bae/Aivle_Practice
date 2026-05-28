# [1일차] Next.js App Router 기초와 개인 포트폴리오 제작

## 1. 목차 (Table of Contents)
- 학습 목표
- 도입: 왜 Next.js인가? (CSR vs SSR)
- 개념 개론: App Router의 구조와 규칙
- 핵심 기술: 레이아웃과 라우팅
- 실습: Mini-Project 1 - 자기소개 포트폴리오 (`/portfolio`)
- 실제 사례 연구: 랜딩 페이지와 정적 웹사이트
- 결론 및 활용
- 강사 첨언 가이드 (Instructor Notes)

---

## 2. 학습 목표 (Learning Objectives)
1. **React(CSR)와 Next.js(SSR)의 차이점**을 직관적으로 이해하고 설명할 수 있다.
2. Next.js App Router의 **디렉토리 기반 라우팅 규칙**을 이해하고 페이지를 생성할 수 있다.
3. `page.tsx`와 `layout.tsx` 파일의 역할 관계를 파악하고 공통 레이아웃을 설계할 수 있다.
4. **Tailwind CSS**의 핵심 유틸리티 클래스를 활용하여 반응형 웹 레이아웃을 빌드할 수 있다.

---

## 3. 도입 (Introduction): 왜 Next.js인가?
웹 어플리케이션을 개발할 때 React만으로도 충분히 동적인 웹을 만들 수 있습니다. 그런데 왜 현업에서는 Next.js라는 프레임워크를 추가로 배울까요?

### 💡 직관적인 비유로 이해하는 CSR과 SSR
* **CSR (Client-Side Rendering) - "맛집 셀프 바(Self-Bar)"**
  - 손님(브라우저)이 식당(서버)에 가면 빈 그릇(빈 HTML)만 받습니다. 손님이 직접 셀프 바에 가서 밥, 반찬, 국(자바스크립트 코드와 데이터)을 담아와서 식사를 완성해야 합니다.
  - **장점**: 한 번 셀프 바에서 반찬을 다 가져오면, 그 다음부터는 주방을 거치지 않고 내 자리에서 마음껏 조합해 먹을 수 있어 화면 전환이 매우 부드럽습니다.
  - **단점**: 처음에 빈 그릇만 가져오기 때문에 첫 렌더링 속도가 느릴 수 있고, 구글/네이버의 검색 로봇(SEO)이 빈 그릇만 보고 맛집인지 몰라 검색 노출이 잘 안 될 수 있습니다.
* **SSR (Server-Side Rendering) - "예약제 오마카세(Course)"**
  - 손님이 식당에 앉아 있으면 주방장(서버)이 요리를 완전히 조리해서 접시(완성된 HTML)에 담아 손님 앞에 즉시 내어줍니다.
  - **장점**: 손님은 즉시 완성된 요리를 먹을 수 있어 첫 로딩이 매우 빠르고, 검색 로봇도 완성된 음식을 분석하므로 검색 결과 상단에 노출되기 쉽습니다.
  - **단점**: 매번 새로운 메뉴를 주문할 때마다 주방에서 조리하는 과정을 기다려야 해서 서버 부담이 늘어날 수 있습니다.

Next.js는 이 두 가지 방식의 장점을 합쳐, **첫 페이지는 서버에서 완벽히 끓여서 보내주고(SSR), 그 이후의 화면 이동은 클라이언트에서 부드럽게 처리(CSR)**하는 하이브리드 솔루션을 제공합니다.

---

## 4. 개념 개론 (Concept Overview): App Router의 구조와 규칙
Next.js App Router는 **"폴더 구조가 곧 웹사이트의 주소(URL)가 된다"**는 매우 단순하고 강력한 규칙을 따릅니다.

### 📁 핵심 파일 컨벤션
* `layout.tsx`: 해당 폴더와 하위 폴더의 모든 페이지가 공유하는 **공통 껍데기(레이아웃)**입니다. 헤더, 푸터, 네비게이션 바 등을 여기에 작성합니다.
* `page.tsx`: 실제 URL로 접속했을 때 화면에 그려지는 **핵심 콘텐츠**입니다. 이 파일이 존재하지 않는 폴더는 웹 브라우저에서 주소로 접근할 수 없습니다.
* `globals.css`: 프로젝트 전체에 적용될 전역 스타일 파일입니다.

### 🔗 폴더 구조와 매핑 관계
Next.js에서는 폴더의 중첩 구조로 주소를 표현합니다.
- `app/page.tsx` ➡️ `http://localhost:3000/` (홈 화면)
- `app/portfolio/page.tsx` ➡️ `http://localhost:3000/portfolio` (포트폴리오 페이지)

---

## 5. 핵심 기술 (Core Technology): Tailwind CSS 기초
Tailwind CSS는 HTML 클래스 속성 안에 스타일을 직접 적는 **Utility-First** 프레임워크입니다. CSS 파일을 따로 열지 않고 스타일을 적용할 수 있어 생산성이 극대화됩니다.

### 📝 필수 클래스 속성 가이드
- **레이아웃**: `flex`, `grid`, `block`, `hidden`
- **간격(Spacing)**: `p-4` (padding 1rem), `m-2` (margin 0.5rem)
- **크기(Sizing)**: `w-full` (width 100%), `h-screen` (height 100vh)
- **색상**: `text-blue-500` (파란색 글자), `bg-slate-900` (다크 네이비 배경)
- **반응형 설계**: `md:flex-row` (중형 화면 이상에서는 가로 정렬, 기본은 세로 정렬)

---

## 6. 실습 (Practice) - Mini-Project 1: 자기소개 포트폴리오
학생들의 첫 프로젝트로, Next.js의 레이아웃 구조와 Tailwind CSS를 활용해 모던한 다크모드 포트폴리오 페이지를 제작합니다.

### 💻 소스코드: `app/portfolio/page.tsx`
이 코드를 복사하여 `app/portfolio/page.tsx` 파일을 새로 생성하고 구현합니다.

```tsx
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
```

---

## 7. 실제 사례 연구 (Real-world Case Study)
현업에서 정적 소개 사이트나 기업 브랜딩 페이지를 만들 때 Next.js를 표준으로 채택하는 경우가 아주 많습니다.
- **예시**: 토스(Toss), 마이리얼트립(MyRealTrip)의 랜딩 페이지
- **이유**: 단순 React(CSR)로 구축 시 첫 로딩 속도 지연과 검색엔진 수집 누락이 발생하지만, Next.js의 정적 빌드 기능을 활용하면 **블로그나 소개 웹사이트가 로딩 시간 0.2초 미만의 초고속 사이트로 전환**되며 검색엔진 노출 지수가 비약적으로 상승하기 때문입니다.

---

## 8. 결론 및 활용 (Conclusion & Application)
- **요약**: Next.js는 폴더의 배치 방식으로 웹의 주소 경로를 매핑하며, `layout.tsx`와 `page.tsx` 두 파일의 유기적인 조합을 통해 전체 페이지 디자인을 관리합니다.
- **숙제**: 자신의 자기소개글이나 배우고 싶은 기술 스택 리스트를 위의 코드 구조에 맞춰 추가하고 스타일을 수정해 봅니다.

---

## 9. 강사 첨언 가이드 (Instructor Notes)
> [!TIP]
> **수업 시간 분배 추천 (총 2시간)**
> - **00m ~ 30m**: 웹 기술의 변천사 및 CSR/SSR 설명 (비유법을 칠판에 그리며 강의할 것)
> - **30m ~ 50m**: Next.js 설치 구조 분석 및 로컬 서버 실행 실습
> - **50m ~ 90m**: `app/portfolio/page.tsx` 실습 파일 생성 및 Tailwind CSS 속성 매핑 설명
> - **90m ~ 120m**: 학생별 개별 수정 실습 및 코드 리뷰

> [!WARNING]
> **학생들이 자주 겪는 트러블슈팅(FAQ)**
> 1. **404 Not Found 에러**: `app/portfolio/page.tsx` 파일명을 `page.ts`로 적었거나, 폴더명을 `portfolo` 등으로 오타를 내면 라우팅이 작동하지 않습니다. Next.js의 대소문자 구분 및 `page.tsx` 파일 컨벤션을 반드시 강조하세요.
> 2. **Tailwind CSS 스타일 먹통**: 프로젝트 설치 중 Tailwind 설정 파일(`tailwind.config.ts`)이 제대로 세팅되었는지 확인하세요. 간혹 `globals.css` 상단에 `@tailwind base; @tailwind components; @tailwind utilities;` 지시어가 지워진 경우가 발생합니다.
