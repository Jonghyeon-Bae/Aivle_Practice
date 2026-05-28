const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'curriculum');

// 출력 폴더가 존재하지 않는다면 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 공통 컬러 팔레트 (Hex Code)
const COLORS = {
  bg: '020617',      // 다크 블루 배경 (slate-950)
  cardBg: '0F172A',  // 카드 배경 (slate-900)
  textLight: 'F8FAFC',// 밝은 텍스트 (slate-50)
  textMuted: '94A3B8',// 어두운 텍스트 (slate-400)
  teal: '14B8A6',     // 메인 포인트 컬로 (teal-500)
  emerald: '10B981',  // 포인트 컬러 2 (emerald-500)
  amber: 'F59E0B'     // 경고/강사 팁 포인트 (amber-500)
};

// 슬라이드 마스터 마스터 레이아웃 헬퍼 함수
function applyCommonSlideTheme(pptx, slide, titleText, dayNum) {
  // 1. 배경 설정 (다크 블루)
  slide.background = { color: COLORS.bg };

  // 2. 상단 헤더 텍스트
  slide.addText(`DAY 0${dayNum} LECTURE`, {
    x: 0.6,
    y: 0.4,
    w: 4.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Malgun Gothic',
    color: COLORS.teal,
    bold: true,
    charSpacing: 2
  });

  slide.addText(titleText, {
    x: 0.6,
    y: 0.7,
    w: 10.0,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Malgun Gothic',
    color: COLORS.textLight,
    bold: true
  });

  // 3. 상단 구분선 (Teal)
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6,
    y: 1.35,
    w: 12.1,
    h: 0.04,
    fill: { color: COLORS.teal }
  });

  // 4. 하단 저작권 표시
  slide.addText('© 2026 Next.js Lecture Service Portal | AI Powered Curriculum', {
    x: 0.6,
    y: 7.0,
    w: 8.0,
    h: 0.3,
    fontSize: 8,
    fontFace: 'Malgun Gothic',
    color: COLORS.textMuted
  });
}

// 1. 타이틀 슬라이드 생성 함수
function addTitleSlide(pptx, dayNum, title, subtitle) {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };

  // 데코레이션 탑 그라데이션 박스 효과
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.5,
    fill: { color: COLORS.teal }
  });

  // 장식용 큰 숫자
  slide.addText(`0${dayNum}`, {
    x: 8.5,
    y: 1.5,
    w: 4.5,
    h: 4.0,
    fontSize: 160,
    fontFace: 'Arial',
    color: '0F172A',
    bold: true,
    align: 'right'
  });

  // 배지
  slide.addText(`WEEK LECTURE COURSE - DAY 0${dayNum}`, {
    x: 1.0,
    y: 2.2,
    w: 7.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Malgun Gothic',
    color: COLORS.teal,
    bold: true,
    charSpacing: 3
  });

  // 메인 타이틀
  slide.addText(title, {
    x: 1.0,
    y: 2.7,
    w: 8.5,
    h: 1.8,
    fontSize: 36,
    fontFace: 'Malgun Gothic',
    color: COLORS.textLight,
    bold: true
  });

  // 서브타이틀
  slide.addText(subtitle, {
    x: 1.0,
    y: 4.6,
    w: 8.0,
    h: 0.6,
    fontSize: 16,
    fontFace: 'Malgun Gothic',
    color: COLORS.textMuted
  });

  // 하단 디테일 정보 데코
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 1.0,
    y: 5.4,
    w: 3.5,
    h: 0.05,
    fill: { color: COLORS.teal }
  });

  slide.addText('Target: 대학 1학년 및 취업훈련생 입문 과정', {
    x: 1.0,
    y: 5.6,
    w: 6.0,
    h: 0.4,
    fontSize: 10,
    fontFace: 'Malgun Gothic',
    color: COLORS.textMuted
  });
}

// 2. 기본 텍스트/목록 슬라이드 생성 함수
function addContentSlide(pptx, dayNum, sectionTitle, items) {
  const slide = pptx.addSlide();
  applyCommonSlideTheme(pptx, slide, sectionTitle, dayNum);

  let bulletPoints = [];
  items.forEach(item => {
    bulletPoints.push({
      text: item.title,
      options: { fontSize: 16, bold: true, color: COLORS.textLight, fontFace: 'Malgun Gothic', lineSpacing: 28, bullet: true }
    });
    if (item.desc) {
      bulletPoints.push({
        text: `   ${item.desc}\n`,
        options: { fontSize: 13, color: COLORS.textMuted, fontFace: 'Malgun Gothic', lineSpacing: 22 }
      });
    }
  });

  slide.addText(bulletPoints, {
    x: 0.8,
    y: 1.8,
    w: 11.7,
    h: 4.8
  });
}

// 3. 반반 분할 레이아웃 슬라이드 생성 함수 (좌 텍스트, 우 코드/비교 카드)
function addSplitSlide(pptx, dayNum, sectionTitle, leftItems, rightTitle, rightContent, isCode = false) {
  const slide = pptx.addSlide();
  applyCommonSlideTheme(pptx, slide, sectionTitle, dayNum);

  // 좌측 텍스트 내용 기술
  let bulletPoints = [];
  leftItems.forEach(item => {
    bulletPoints.push({
      text: item.title,
      options: { fontSize: 15, bold: true, color: COLORS.textLight, fontFace: 'Malgun Gothic', bullet: true }
    });
    if (item.desc) {
      bulletPoints.push({
        text: `   ${item.desc}\n`,
        options: { fontSize: 12, color: COLORS.textMuted, fontFace: 'Malgun Gothic' }
      });
    }
  });

  slide.addText(bulletPoints, {
    x: 0.8,
    y: 1.8,
    w: 5.6,
    h: 4.8
  });

  // 우측 카드 배경 설정
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8,
    y: 1.8,
    w: 5.8,
    h: 4.8,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.teal, width: 1.5 }
  });

  // 우측 카드 타이틀
  slide.addText(rightTitle, {
    x: 7.1,
    y: 2.1,
    w: 5.2,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Malgun Gothic',
    color: COLORS.teal,
    bold: true
  });

  // 우측 카드 내용 (코드 폰트 처리 포함)
  slide.addText(rightContent, {
    x: 7.1,
    y: 2.6,
    w: 5.2,
    h: 3.8,
    fontSize: isCode ? 10 : 12,
    fontFace: isCode ? 'Consolas' : 'Malgun Gothic',
    color: isCode ? COLORS.emerald : COLORS.textLight,
    align: 'left',
    valign: 'top',
    wrap: true
  });
}

// 4. 강사 가이드 전용 슬라이드 생성 함수 (오렌지/앰버 테마)
function addInstructorSlide(pptx, dayNum, notes) {
  const slide = pptx.addSlide();
  
  // 강사용은 배경색을 좀더 차분하고 대비되는 색상으로
  slide.background = { color: '0B0F19' };

  // 헤더
  slide.addText(`DAY 0${dayNum} INSTRUCTOR NOTES`, {
    x: 0.6,
    y: 0.4,
    w: 5.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Malgun Gothic',
    color: COLORS.amber,
    bold: true,
    charSpacing: 2
  });

  slide.addText('오늘 강의 진행을 위한 강사 첨언 가이드', {
    x: 0.6,
    y: 0.7,
    w: 10.0,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Malgun Gothic',
    color: COLORS.textLight,
    bold: true
  });

  // 구분선 (Amber)
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6,
    y: 1.35,
    w: 12.1,
    h: 0.04,
    fill: { color: COLORS.amber }
  });

  // 1. 시간 분배 카드
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.6,
    y: 1.8,
    w: 3.6,
    h: 4.8,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.amber, width: 1 }
  });

  slide.addText('⏰ 권장 시간 분배', {
    x: 0.8,
    y: 2.1,
    w: 3.2,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Malgun Gothic',
    color: COLORS.amber,
    bold: true
  });

  let timeText = [];
  notes.time.forEach(t => {
    timeText.push({ text: `• ${t}\n\n`, options: { fontSize: 11, color: COLORS.textLight, fontFace: 'Malgun Gothic' } });
  });

  slide.addText(timeText, {
    x: 0.8,
    y: 2.7,
    w: 3.2,
    h: 3.7
  });

  // 2. 자주 하는 질문 및 트러블슈팅 카드
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.5,
    y: 1.8,
    w: 8.2,
    h: 4.8,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.textMuted, width: 0.5 }
  });

  slide.addText('💡 트러블슈팅 및 지도 가이드', {
    x: 4.7,
    y: 2.1,
    w: 7.8,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Malgun Gothic',
    color: COLORS.textLight,
    bold: true
  });

  let faqText = [];
  notes.faqs.forEach(f => {
    faqText.push({ text: `Q. ${f.q}\n`, options: { fontSize: 12, bold: true, color: COLORS.teal, fontFace: 'Malgun Gothic' } });
    faqText.push({ text: `A. ${f.a}\n\n`, options: { fontSize: 11, color: COLORS.textMuted, fontFace: 'Malgun Gothic' } });
  });

  slide.addText(faqText, {
    x: 4.7,
    y: 2.7,
    w: 7.8,
    h: 3.7,
    wrap: true
  });
}

// ==========================================
// 1일차 PPT 빌드
// ==========================================
function buildDay1() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  addTitleSlide(pptx, 1, 'Next.js App Router 기초와\n개인 포트폴리오 제작', 'Next.js 등장 배경과 레이아웃 컨벤션 학습');
  
  addContentSlide(pptx, 1, '1. 오늘의 학습 목표 (Objectives)', [
    { title: 'React(CSR)와 Next.js(SSR) 차이 설명 가능', desc: '두 렌더링 방식의 장단점을 직관적인 비유로 구술할 수 있습니다.' },
    { title: 'App Router 디렉토리 기반 라우팅 규칙 마스터', desc: '폴더의 배치가 곧 인터넷 주소가 되는 개념을 배웁니다.' },
    { title: 'page.tsx와 layout.tsx 관계 확립', desc: '공통 껍데기 레이아웃과 내부 컨텐츠 페이지의 결합을 학습합니다.' },
    { title: 'Tailwind CSS 핵심 유틸리티 속성 활용', desc: '반응형 웹 UI를 클래스 주입만으로 신속히 퍼블리싱해 봅니다.' }
  ]);

  addSplitSlide(pptx, 1, '2. 핵심 개념: CSR vs SSR', [
    { title: 'React CSR - "맛집 셀프 바"', desc: '손님이 식당에 가면 빈 그릇만 받고 손님이 직접 음식을 담아 식사합니다. 초기 로딩이 있고 SEO 검색 노출이 약합니다.' },
    { title: 'Next.js SSR - "예약제 오마카세"', desc: '주방장이 요리를 완전히 조리해서 접시에 담아 내어줍니다. 첫 로딩이 압도적으로 빠르고 검색봇에 노출되기 쉽습니다.' },
    { title: '하이브리드 렌더링', desc: 'Next.js는 첫 로딩은 SSR로 빠르게, 그 후 화면 전환은 CSR로 부드럽게 처리하는 장점을 융합했습니다.' }
  ], '💡 렌더링 비교 핵심 키워드', 
  '- CSR (Client Side Rendering):\n  * 브라우저에서 HTML을 직접 그림\n  * 부드러운 SPA 화면 전환\n  * 초기 로딩 지연 가능성\n\n- SSR (Server Side Rendering):\n  * 서버에서 HTML을 완성하여 전송\n  * 우수한 검색엔진 최적화(SEO)\n  * 서버 트래픽 부담 존재');

  const day1Code = `// app/portfolio/page.tsx
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 p-4">
        <h1>Developer.Kim</h1>
        <Link href="/">홈으로</Link>
      </header>
      <main className="max-w-5xl mx-auto py-12">
        <h2 className="text-4xl font-extrabold text-teal-400">
          안녕하세요, 김개발입니다.
        </h2>
      </main>
    </div>
  );
}`;

  addSplitSlide(pptx, 1, '3. 실습: 포트폴리오 메인 코드', [
    { title: '전체 Layout 구성 요소', desc: 'Header(네비게이션), Hero Section(자기소개), Skill List(기술 카드), Projects(포털 링크) 및 Footer를 포괄합니다.' },
    { title: '반응형 Tailwind CSS 적용', desc: 'flex와 grid 속성을 적절히 혼합하여 모바일과 데스크톱 화면에 맞춰 카드가 1열에서 4열로 유동적으로 늘어납니다.' }
  ], '💻 portfolio/page.tsx 기본 뼈대', day1Code, true);

  addInstructorSlide(pptx, 1, {
    time: [
      '00m ~ 30m: 라면과 급식 비유로 CSR/SSR 설명',
      '30m ~ 50m: 프로젝트 구동 실습 및 폴더 구조 설명',
      '50m ~ 90m: 포트폴리오 실습 및 코드 작성 지도',
      '90m ~ 120m: 완성 프로젝트 화면 확인 및 피드백'
    ],
    faqs: [
      { q: '페이지가 404를 띄우는데 왜 그런가요?', a: 'page.tsx 파일 이름을 page.ts로 썼거나 portfolio 폴더의 철자를 틀렸는지 확인하세요. Next.js App Router는 엄격한 파일 이름 매핑 컨벤션을 따릅니다.' },
      { q: 'Tailwind CSS 스타일이 적용되지 않습니다.', a: 'globals.css의 최상단에 @import "tailwindcss" 선언이 누락되었거나 프로젝트 최상단의 tailwind.config.ts 설정 경로가 정확한지 확인하세요.' }
    ]
  });

  pptx.writeFile({ fileName: path.join(OUTPUT_DIR, 'day1_routing.pptx') });
}

// ==========================================
// 2일차 PPT 빌드
// ==========================================
function buildDay2() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  addTitleSlide(pptx, 2, '클라이언트 컴포넌트와\nLocalStorage 연동 Todo 앱', 'React Client Interaction 및 Hydration 에러 해결');

  addContentSlide(pptx, 2, '1. 오늘의 학습 목표 (Objectives)', [
    { title: '서버 컴포넌트와 클라이언트 컴포넌트 경계 파악', desc: 'Next.js의 기본 설정인 서버 컴포넌트에서 RCC로 전환하는 트리거를 익힙니다.' },
    { title: 'useState, useEffect 훅을 이용한 상태 제어', desc: '컴포넌트의 상태를 만들고 브라우저 렌더링 라이프사이클에 관여합니다.' },
    { title: 'LocalStorage 데이터 백업 및 보존', desc: '브라우저를 끄거나 새로고침해도 데이터가 날아가지 않는 저장 시스템을 연동합니다.' },
    { title: 'Hydration Mismatch 에러 완벽 해결', desc: '서버와 클라이언트의 초기 렌더링 불일치 원인을 진단하고 완화하는 기법을 학습합니다.' }
  ]);

  addSplitSlide(pptx, 2, '2. 개념: 서버 컴포넌트 vs 클라이언트 컴포넌트', [
    { title: '서버 컴포넌트 (RSC) - "완제품 배달 음식"', desc: '주방(서버)에서 완전히 다 끓여서 포장 배달합니다. 브라우저에서 계산(칼질)할 필요가 전혀 없어 연산 속도가 최상입니다.' },
    { title: '클라이언트 컴포넌트 (RCC) - "밀키트 요리"', desc: '가스레인지 불을 켜고(이벤트 처리), 고기 익는 상태(State)를 보며 직접 뒤집어 굽습니다. "use client" 지시어가 선언되어야 브라우저 인터랙션이 구동됩니다.' }
  ], '💡 수분 공급(Hydration)이란?',
  'Next.js 서버가 정적 뼈대(HTML)를 빠르게 먼저 띄우고, 브라우저가 자바스크립트 코드(물)를 내려받아 이벤트 리스너를 결합하여 동작 가능한 웹으로 전환하는 과정을 Hydration(수분 공급)이라고 부릅니다.');

  const day2Code = `// app/todo/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [mounted, setMounted] = useState(false);

  // 마운트 완료 확인을 거쳐 Hydration Mismatch 회피
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  if (!mounted) return <p>로딩 중...</p>;
  return <div>Todo UI...</div>;
}`;

  addSplitSlide(pptx, 2, '3. 실습: LocalStorage 마운트 가드 코드', [
    { title: 'Hydration Mismatch 회피', desc: '서버 측에서 localStorage는 존재하지 않으므로, 브라우저가 화면에 완전히 나타난 후(isMounted)에만 로컬스토리지를 읽어오게 설정합니다.' },
    { title: 'try-catch 예외 처리의 가치', desc: '로컬스토리지 데이터의 무결성이 오염되었을 때 파싱 오류로 인한 어플리케이션 크래시를 방지하기 위해 예외 처리를 강조합니다.' }
  ], '💻 Todo 마운트 가드 및 Hook 연동', day2Code, true);

  addInstructorSlide(pptx, 2, {
    time: [
      '00m ~ 30m: 서버/클라이언트 차이 설명 및 마운트 원리 판서',
      '30m ~ 50m: LocalStorage 에러 재현 및 에러 로그 분석',
      '50m ~ 100m: Todos UI 컴포넌트 상태 조작 실습',
      '100m ~ 120m: 완성도 높은 try-catch 및 엣지 케이스 실습 지도'
    ],
    faqs: [
      { q: 'ReferenceError: window is not defined 에러 발생', a: 'Next.js 서버 렌더링 단계에서 브라우저 전용 객체인 window에 직접 접근했기 때문입니다. window 관련 API(localStorage 등)는 반드시 useEffect 내에서 실행되게 격리해야 합니다.' },
      { q: '화면을 새로고침하면 잠깐 동안 예전 화면이 깜빡입니다.', a: '로컬스토리지를 읽어오기 전 초기 UI(예: 빈 리스트)가 렌더링된 후 데이터를 주입받아 생기는 정상적인 과정입니다. 스켈레톤 로더나 로딩 처리를 통해 시각적 안정감을 줄 수 있습니다.' }
    ]
  });

  pptx.writeFile({ fileName: path.join(OUTPUT_DIR, 'day2_state.pptx') });
}

// ==========================================
// 3일차 PPT 빌드
// ==========================================
function buildDay3() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  addTitleSlide(pptx, 3, '서버 페칭 & Route Handler API\n그리고 영화 검색 서비스', '비비동기 서버 데이터 수급과 Proxy API 아키텍처');

  addContentSlide(pptx, 3, '1. 오늘의 학습 목표 (Objectives)', [
    { title: '서버 컴포넌트의 다이렉트 데이터 페칭 마스터', desc: 'useEffect 없이 서버 단에서 직접 API 데이터를 긁어와 렌더링하는 기법을 배웁니다.' },
    { title: 'Route Handler를 통한 백엔드 API 설계', desc: 'app/api/ 경로 아래에 파일 기반으로 REST API를 쉽게 개발해 봅니다.' },
    { title: '보안 데이터 숨김을 위한 환경 변수 활용', desc: '.env 파일을 사용하여 노출되면 안 되는 API Key 등을 안전하게 수용합니다.' },
    { title: 'CORS 에러 예방 및 Proxy 구조 이해', desc: '클라이언트가 직접 외부 API 서버와 통신할 때 발생하는 규제 정책을 서버 단 대리인(Proxy)을 통해 해결합니다.' }
  ]);

  addSplitSlide(pptx, 3, '2. 개념: API Route Handler의 구조', [
    { title: 'Route Handler - "식당 배달 전용 창구"', desc: '클라이언트가 외부와 직접 거래하지 않고 내부 직원(Next.js API 엔드포인트)에게 필요한 내용을 접수하면, 직원이 보안 키를 조용히 얹어 외부 서버에 다녀와 정보를 돌려줍니다.' },
    { title: 'REST API 매핑 컨벤션', desc: 'GET, POST, PUT, DELETE 함수명을 익히고 NextResponse 객체를 리턴하여 JSON 데이터를 반환하는 원리를 습득합니다.' }
  ], '🔐 API Key 보안과 NEXT_PUBLIC_ 규칙',
  'Next.js에서는 NEXT_PUBLIC_ 접두사가 붙지 않은 환경 변수는 오직 서버 환경(Server Component, Route Handler)에서만 접근할 수 있고, 브라우저가 내려받는 JS 소스코드에는 유출되지 않아 안전합니다.');

  const day3Code = `// app/api/movies/route.ts
import { NextResponse } from 'next/server';
import { mockMovies } from '@/lib/movies';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  // 1초 가상 지연 시간 부여
  await new Promise(r => setTimeout(r, 800));

  if (!query) return NextResponse.json(mockMovies);
  
  const filtered = mockMovies.filter(m => 
    m.title.toLowerCase().includes(query)
  );
  return NextResponse.json(filtered);
}`;

  addSplitSlide(pptx, 3, '3. 실습: 가상 영화 탐색 API 소스코드', [
    { title: 'GET 함수 기반 파라미터 제어', desc: 'URL 객체의 searchParams를 통해 클라이언트가 넘긴 검색 필터를 꺼내와 로컬 데이터베이스 배열을 가공합니다.' },
    { title: '가상 네트워크 딜레이', desc: 'setTimeout을 모방한 프로미스 딜레이 코드로, 실무에서 로딩 스피너와 스켈레톤 UI를 왜 보여주어야 하는지 체감할 수 있는 훌륭한 교구 코드입니다.' }
  ], '💻 app/api/movies/route.ts', day3Code, true);

  addInstructorSlide(pptx, 3, {
    time: [
      '00m ~ 30m: 서버 데이터 페칭의 원리 및 Proxy 이론 판서',
      '30m ~ 50m: .env 설정 및 보안의 원리 실습',
      '50m ~ 100m: Route Handler 및 Client Fetch 영화 검색기 작성',
      '100m ~ 120m: 스켈레톤 로더 효과 체감 및 비동기 처리 Q&A'
    ],
    faqs: [
      { q: '서버 컴포넌트 내에서 fetch() 상대 경로 요청 시 에러가 납니다.', a: '서버 컴포넌트는 서버 단에서 실행되기 때문에 자신의 도메인을 모릅니다. 따라서 절대 경로를 써야 하지만, 가장 권장되는 패턴은 서버 컴포넌트가 직접 로컬 DB 모듈을 import하여 조회하는 것입니다.' },
      { q: 'CORS 에러가 무엇이며 어떻게 해결하나요?', a: '브라우저에서 출처(Domain)가 다른 리소스에 접근하려 할 때 규제하는 보안 정책입니다. Next.js 서버(Route Handler)는 브라우저가 아니므로 CORS 규제를 받지 않아, 우회 프록시로서 동작하며 에러를 해결합니다.' }
    ]
  });

  pptx.writeFile({ fileName: path.join(OUTPUT_DIR, 'day3_data_fetching.pptx') });
}

// ==========================================
// 4일차 PPT 빌드
// ==========================================
function buildDay4() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  addTitleSlide(pptx, 4, 'SSG 정적 빌드 & 파일 시스템 파서\n그리고 마크다운 기술 블로그', 'HTML 사전 컴파일과 파일 파싱 아키텍처 학습');

  addContentSlide(pptx, 4, '1. 오늘의 학습 목표 (Objectives)', [
    { title: 'SSG(정적 사이트 생성)의 장점 및 가치 규명', desc: '빌드 시점에 페이지를 HTML 파일로 구워내어 로딩 속도 0초대를 지향합니다.' },
    { title: 'Node.js 파일 시스템 (fs 모듈) 서버 접근', desc: '서버 사이드에서 로컬 하드디스크의 파일들을 탐색하고 읽는 Node 모듈을 배웁니다.' },
    { title: 'Frontmatter 메타데이터 파싱 구현', desc: '마크다운 머리말에서 제목, 날짜 등 유용한 객체를 문자열 제어로 분리해 봅니다.' },
    { title: 'generateStaticParams 정적 주소 지정', desc: '동적 라우팅 페이지를 SSG 정적 빌드로 고정하기 위한 헬퍼 함수를 적용합니다.' }
  ]);

  addSplitSlide(pptx, 4, '2. 개념: 뷔페식 배식(SSG) vs 주문 요리(SSR)', [
    { title: '정적 사이트 생성 (SSG) - "대량 배식 급식"', desc: '손님이 몰려오기 전에 밥과 국을 미리 다 퍼놓습니다(빌드 타임에 HTML 사전 제작). 로딩 속도가 0에 가깝고 데이터베이스 서버 비용이 전혀 들지 않습니다.' },
    { title: '보안 및 유지보수 비용 극대화', desc: '정적 HTML 파일은 공격받을 데이터베이스가 없으므로 보안에 대단히 강합니다. Vercel이나 AWS S3 등을 통해 무료 혹은 초저가로 수억 트래픽을 처리합니다.' }
  ], '💡 Frontmatter YAML 포맷 규격',
  '마크다운 파일의 최상단에 ---\nkey: value\n--- 형식으로 적힌 문서의 머리말 정보를 뜻합니다. 블로그 포스트의 제목, 날짜, 태그 등을 데이터베이스 없이 구조화하기에 제격인 포맷입니다.');

  const day4Code = `// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

// 1. 빌드 타임에 생성할 정적 슬러그 리스트를 정의
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetailPage({ params }) {
  const resolved = 'then' in params ? await params : params;
  const post = getPostBySlug(resolved.slug);

  if (!post) notFound();
  return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
}`;

  addSplitSlide(pptx, 4, '3. 실습: 동적 정적 라우팅 상세 소스코드', [
    { title: 'generateStaticParams 기능 구현', desc: '서버에 마크다운이 추가될 때마다 해당 파일명을 읽어 정적 URL 리스트로 미리 선언해 주는 코드입니다.' },
    { title: 'Next.js 14/15 듀얼 버전 호환 래핑', desc: '14 버전의 동기 params 객체와 15 버전의 비동기 params 프로미스에 모두 안전하게 대응할 수 있는 고품질 아키텍처 방어 코드입니다.' }
  ], '💻 app/blog/[slug]/page.tsx', day4Code, true);

  addInstructorSlide(pptx, 4, {
    time: [
      '00m ~ 30m: SSG 뷔페 비유 및 빌드 최적화 개념 판서',
      '30m ~ 50m: Node.js 파일 시스템 및 정규식을 활용한 파싱 이론',
      '50m ~ 100m: 블로그 목록 및 상세 페이지 구현 실습',
      '100m ~ 120m: npm run build를 직접 돌려 정적 HTML 파일 생성 로그 확인'
    ],
    faqs: [
      { q: 'dangerouslySetInnerHTML을 꼭 써야 하나요?', a: '리액트에서 파싱된 마크다운 HTML 문자열을 화면에 직접 바인딩할 때 쓰는 속성입니다. 외부 유저의 정제되지 않은 문자열 주입 시 해킹(XSS) 위협이 크므로, 내가 직접 작성한 검증된 로컬 마크다운 파일에만 엄격히 격리해 써야 함을 학생들에게 강력하게 짚어 주셔야 합니다.' },
      { q: '마크다운 포스트를 추가했는데 화면에 바로 안 보입니다.', a: 'SSG는 빌드 시점(Build Time)에 파일을 굽는 방식입니다. 글을 추가한 뒤에는 반드시 npm run build를 새로 실행해 주어야 새로운 정적 페이지가 디스크에 생성됩니다.' }
    ]
  });

  pptx.writeFile({ fileName: path.join(OUTPUT_DIR, 'day4_ssg_blog.pptx') });
}

// ==========================================
// 5일차 PPT 빌드
// ==========================================
function buildDay5() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  addTitleSlide(pptx, 5, '미들웨어 보안 필터 & 쿠키 세션\n그리고 날씨 대시보드', '서버 통신 최전선 권한 필터 및 SVG 차트 시각화');

  addContentSlide(pptx, 5, '1. 오늘의 학습 목표 (Objectives)', [
    { title: 'Next.js Middleware 동작 위치 및 매칭 제어', desc: '사용자의 모든 요청이 최종 페이지에 닿기 전에 가로채서 보안 검사하는 문지기 역할을 배웁니다.' },
    { title: 'HttpOnly 쿠키를 이용한 보안 로그인 흐름', desc: '자바스크립트 해킹 공격을 방어하는 보안 등급 쿠키 세션을 생성 및 소멸시킵니다.' },
    { title: 'Route Protection (접근 제어) 구현', desc: '로그인하지 않은 유저가 대시보드로 접속을 시도하면 로그인 페이지로 물리적 리다이렉트시킵니다.' },
    { title: '순수 SVG 기반의 꺾은선 차트 드로잉', desc: '외부 라이브러리 설치 없이 HTML 표준 SVG 태그와 Tailwind CSS 효과만으로 고품질 대시보드 차트를 구현합니다.' }
  ]);

  addSplitSlide(pptx, 5, '2. 개념: 문지기(Middleware)와 출입증(Cookie)', [
    { title: '쿠키 (Cookie) - "야광 손목 도장"', desc: '아이디/비밀번호 확인이 통과되면 손목에 지워지지 않는 도장을 꾹 찍어 줍니다. 브라우저는 매번 서버로 가는 모든 경로에 이 도장을 자동으로 주머니에 넣어 같이 전송합니다.' },
    { title: '미들웨어 (Middleware) - "문앞의 가드 요원"', desc: 'VIP 룸 대시보드 문고리를 잡으려 할 때 도장(Cookie)이 찍혀 있는지 미리 확인합니다. 도장이 없다면 입구 컷을 날려 매표소(로그인 페이지)로 돌려보냅니다.' }
  ], '💡 HttpOnly 옵션 보안의 중요성',
  '쿠키 발급 시 httpOnly: true 옵션을 적용해 두면 브라우저의 Javascript 코드(document.cookie)가 쿠키 정보에 직접 접근할 수 없습니다. 이는 악성 스크립트를 심어 쿠키를 탈취해 가는 대표적인 해킹 기법(XSS)을 원천 차단해 줍니다.');

  const day5Code = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('antigravity_session');
  const { pathname } = request.nextUrl;

  // 대시보드 접근 중 쿠키가 없다면 로그인으로 차단 리다이렉트
  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};`;

  addSplitSlide(pptx, 5, '3. 실습: 가드 요원 Middleware 소스코드', [
    { title: '미들웨어 차단 조건 분기', desc: '요청 경로를 추적하여 인증 정보인 session의 보유 여부를 확인하고, 상황에 맞춰 redirect 또는 next() 함수를 날려 가던 길을 가게 제어합니다.' },
    { title: 'config.matcher를 통한 경로 최적화', desc: '모든 리소스 파일(이미지, CSS 등)까지 미들웨어를 거치면 서버 속도가 느려지므로, 차단이 필요한 특정 디렉토리로 범위를 좁히는 설정을 배웁니다.' }
  ], '💻 middleware.ts 루트 파일', day5Code, true);

  addInstructorSlide(pptx, 5, {
    time: [
      '00m ~ 30m: 쿠키 세션 아키텍처 및 미들웨어 문지기 비유 판서 설명',
      '30m ~ 50m: 개발자 도구 Application 탭을 켜서 발급 쿠키 확인 실습',
      '50m ~ 100m: 로그인 쿠키 API 및 대시보드 SVG 차트 실습',
      '100m ~ 120m: 시크릿 모드를 켜서 비인증 리다이렉트 철저한 동작 테스트'
    ],
    faqs: [
      { q: '대시보드와 로그인 페이지 간에 무한 루프 에러가 납니다.', a: '미들웨어 내부에서 조건 분기 처리가 잘못되어, 로그인 페이지(/login)로 접근할 때조차 다시 로그인 페이지로 리다이렉트하고 있지는 않은지 matcher 설정과 조건 분기식을 세밀하게 디버깅 지도하세요.' },
      { q: '로그인 후 대시보드로 넘어갔는데 데이터가 예전 상태입니다.', a: '브라우저에 쿠키가 주입된 직후의 갱신 딜레이 현상입니다. 로그인 성공 피드백 후 클라이언트에서 router.refresh()를 호출하여 브라우저의 컴포넌트 세션 상태를 완전히 동기화해주어야 합니다.' }
    ]
  });

  pptx.writeFile({ fileName: path.join(OUTPUT_DIR, 'day5_auth_dashboard.pptx') });
}

// 전체 빌드 오케스트레이션
console.log('5일간의 교육 PPT 슬라이드 파일 생성 프로세스를 개시합니다...');
try {
  buildDay1();
  console.log('Day 1 PPT 생성 완료 ➡️ public/curriculum/day1_routing.pptx');
  buildDay2();
  console.log('Day 2 PPT 생성 완료 ➡️ public/curriculum/day2_state.pptx');
  buildDay3();
  console.log('Day 3 PPT 생성 완료 ➡️ public/curriculum/day3_data_fetching.pptx');
  buildDay4();
  console.log('Day 4 PPT 생성 완료 ➡️ public/curriculum/day4_ssg_blog.pptx');
  buildDay5();
  console.log('Day 5 PPT 생성 완료 ➡️ public/curriculum/day5_auth_dashboard.pptx');
  console.log('🎉 모든 PPTX 슬라이드가 성공적으로 구축되었습니다!');
} catch (e) {
  console.error('PPTX 생성 중 에러가 발생했습니다:', e);
  process.exit(1);
}
