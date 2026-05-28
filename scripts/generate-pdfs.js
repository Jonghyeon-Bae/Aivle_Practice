const puppeteer = require('puppeteer-core');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const CURRICULUM_DIR = path.join(__dirname, '..', 'public', 'curriculum');

const CURRICULUM_DATA = [
  {
    dayNum: 1,
    mdFile: 'day1_routing.md',
    pdfFile: 'day1_routing.pdf',
    title: 'Next.js App Router 기초와<br>개인 포트폴리오 제작',
    subtitle: 'Next.js 등장 배경과 레이아웃 컨벤션 학습'
  },
  {
    dayNum: 2,
    mdFile: 'day2_state.md',
    pdfFile: 'day2_state.pdf',
    title: '클라이언트 컴포넌트와<br>LocalStorage 연동 Todo 앱',
    subtitle: 'React Client Interaction 및 Hydration 에러 해결'
  },
  {
    dayNum: 3,
    mdFile: 'day3_data_fetching.md',
    pdfFile: 'day3_data_fetching.pdf',
    title: '서버 페칭 & Route Handler API<br>그리고 영화 검색 서비스',
    subtitle: '비동기 서버 데이터 수급과 Proxy API 아키텍처'
  },
  {
    dayNum: 4,
    mdFile: 'day4_ssg_blog.md',
    pdfFile: 'day4_ssg_blog.pdf',
    title: 'SSG 정적 빌드 & 파일 시스템 파서<br>그리고 마크다운 기술 블로그',
    subtitle: 'HTML 사전 컴파일과 파일 파싱 아키텍처 학습'
  },
  {
    dayNum: 5,
    mdFile: 'day5_auth_dashboard.md',
    pdfFile: 'day5_auth_dashboard.pdf',
    title: '미들웨어 보안 필터 & 쿠키 세션<br>그리고 날씨 대시보드',
    subtitle: '서버 통신 최전선 권한 필터 및 SVG 차트 시각화'
  }
];

// Custom blockquote renderer for alert boxes (GitHub-style callouts)
const renderer = {
  blockquote(token) {
    const quote = this.parser.parse(token.tokens);
    if (quote.includes('[!TIP]')) {
      const clean = quote
        .replace(/\[!TIP\]\s*<br\s*\/?>?/gi, '')
        .replace(/<p>\s*\[!TIP\]\s*<\/p>/gi, '')
        .replace(/\[!TIP\]/gi, '')
        .trim();
      return `<div class="alert alert-tip"><div class="alert-title">💡 TIP</div><div class="alert-content">${clean}</div></div>`;
    }
    if (quote.includes('[!WARNING]')) {
      const clean = quote
        .replace(/\[!WARNING\]\s*<br\s*\/?>?/gi, '')
        .replace(/<p>\s*\[!WARNING\]\s*<\/p>/gi, '')
        .replace(/\[!WARNING\]/gi, '')
        .trim();
      return `<div class="alert alert-warning"><div class="alert-title">⚠️ WARNING</div><div class="alert-content">${clean}</div></div>`;
    }
    if (quote.includes('[!CAUTION]')) {
      const clean = quote
        .replace(/\[!CAUTION\]\s*<br\s*\/?>?/gi, '')
        .replace(/<p>\s*\[!CAUTION\]\s*<\/p>/gi, '')
        .replace(/\[!CAUTION\]/gi, '')
        .trim();
      return `<div class="alert alert-caution"><div class="alert-title">🔥 CAUTION</div><div class="alert-content">${clean}</div></div>`;
    }
    return `<blockquote>${quote}</blockquote>`;
  }
};

marked.use({ renderer });

// Locate Google Chrome or Microsoft Edge executable path on Windows
function findChromePath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

// Generate the HTML wrapping structure with styles
function buildHtmlPage(title, subtitle, dayNum, bodyHtml) {
  const cleanTitleForMeta = title.replace(/<br\s*\/?>/gi, ' ');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>${cleanTitleForMeta}</title>
  <!-- Plus Jakarta Sans & Noto Sans KR -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  
  <!-- Prism.js Tomorrow Night theme -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" />
  
  <style>
    @page {
      size: A4;
      margin: 25mm 20mm 25mm 20mm;
    }
    
    body {
      font-family: 'Noto Sans KR', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.65;
      color: #1e293b; /* slate-800 */
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    
    /* Cover Page Styles */
    .cover-page {
      page-break-after: always;
      height: 230mm; /* Fit within a single A4 page inside margins */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 40px;
      box-sizing: border-box;
      border-left: 10px solid #14b8a6; /* teal-500 */
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      position: relative;
      margin-top: -10mm; /* Account for top margin to look centered */
    }
    
    .cover-day {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 72px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1;
      margin: 0 0 10px 0;
      opacity: 0.15;
    }
    
    .cover-badge {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #14b8a6; /* teal-500 */
      font-weight: 700;
      background-color: #f0fdfa;
      border: 1px solid rgba(20, 184, 166, 0.2);
      padding: 6px 16px;
      border-radius: 9999px;
      margin-bottom: 24px;
      display: inline-block;
    }
    
    .cover-title {
      font-size: 28pt;
      font-weight: 800;
      color: #0f172a; /* slate-900 */
      line-height: 1.3;
      margin: 0 0 20px 0;
      word-break: keep-all;
    }
    
    .cover-subtitle {
      font-size: 14pt;
      color: #64748b; /* slate-500 */
      margin: 0 0 50px 0;
      font-weight: 500;
      line-height: 1.4;
    }
    
    .cover-divider {
      width: 80px;
      height: 4px;
      background-color: #14b8a6;
      margin-bottom: 30px;
    }
    
    .cover-meta {
      font-size: 11px;
      color: #94a3b8; /* slate-400 */
      line-height: 1.6;
    }
    
    .cover-meta strong {
      color: #64748b;
    }
    
    /* Content Styles */
    .content {
      padding: 0;
    }
    
    h1, h2, h3, h4, h5, h6 {
      color: #0f172a; /* slate-900 */
      font-family: 'Noto Sans KR', 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      margin-top: 1.8em;
      margin-bottom: 0.6em;
      page-break-after: avoid;
    }
    
    h1 {
      font-size: 18pt;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 0;
    }
    
    h2 {
      font-size: 14pt;
      border-left: 4px solid #14b8a6;
      padding-left: 12px;
      margin-top: 2em;
    }
    
    h3 {
      font-size: 11.5pt;
      margin-top: 1.6em;
    }
    
    p {
      margin-top: 0;
      margin-bottom: 1.2em;
      text-align: justify;
      word-break: keep-all;
    }
    
    a {
      color: #14b8a6;
      text-decoration: none;
      font-weight: 500;
    }
    
    /* List styling */
    ul, ol {
      margin-top: 0;
      margin-bottom: 1.2em;
      padding-left: 20px;
    }
    
    li {
      margin-bottom: 0.4em;
    }
    
    li > p {
      margin-bottom: 0.2em;
    }
    
    /* Code styling */
    code {
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      font-size: 8.5pt;
      background-color: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
    }
    
    pre {
      page-break-inside: avoid;
      background-color: #0f172a !important; /* Force slate-950 background */
      border-radius: 8px;
      padding: 16px;
      margin-top: 0;
      margin-bottom: 1.4em;
      overflow-x: auto;
      border: 1px solid #1e293b;
    }
    
    pre code {
      background-color: transparent;
      color: #f8fafc;
      padding: 0;
      border-radius: 0;
      font-size: 8.5pt;
    }
    
    /* Alert / Blockquote styling */
    blockquote {
      margin: 1.5em 0;
      padding: 12px 20px;
      background-color: #f8fafc;
      border-left: 4px solid #cbd5e1;
      border-radius: 0 8px 8px 0;
      color: #475569;
    }
    
    blockquote p {
      margin: 0;
    }
    
    .alert {
      margin: 1.5em 0;
      padding: 16px 20px;
      border-radius: 8px;
      border-left-width: 4px;
      border-left-style: solid;
      page-break-inside: avoid;
    }
    
    .alert-tip {
      background-color: #f0fdfa; /* teal-50 */
      border-left-color: #14b8a6; /* teal-500 */
      color: #0f766e;
    }
    
    .alert-warning {
      background-color: #fffbeb; /* amber-50 */
      border-left-color: #f59e0b; /* amber-500 */
      color: #b45309;
    }
    
    .alert-caution {
      background-color: #fef2f2; /* red-50 */
      border-left-color: #ef4444; /* red-500 */
      color: #b91c1c;
    }
    
    .alert-title {
      font-weight: 700;
      font-size: 9.5pt;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .alert-content {
      font-size: 9.5pt;
      line-height: 1.6;
    }
    
    /* Divider */
    hr {
      border: 0;
      height: 1px;
      background: #e2e8f0;
      margin: 2.5em 0;
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-day">DAY 0${dayNum}</div>
    <div class="cover-badge">WEEK LECTURE COURSE - DAY 0${dayNum}</div>
    <div class="cover-title">${title}</div>
    <div class="cover-subtitle">${subtitle}</div>
    <div class="cover-divider"></div>
    <div class="cover-meta">
      <strong>Target:</strong> 대학 1학년 및 취업훈련생 입문 과정<br>
      <strong>Framework:</strong> Next.js 14/15 + Tailwind CSS<br>
      <strong>Date:</strong> 2026 Curriculum Edition
    </div>
  </div>

  <!-- Main Content -->
  <div class="content">
    ${bodyHtml}
  </div>

  <!-- Prism.js Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
  <script>
    // Force highlight on load
    window.onload = function() {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    };
  </script>
</body>
</html>`;
}

async function generatePdfs() {
  const chromePath = findChromePath();
  if (!chromePath) {
    console.error('에러: 시스템에서 Google Chrome 또는 Microsoft Edge를 찾을 수 없습니다.');
    console.error('크롬이나 엣지 브라우저가 표준 경로에 설치되어 있는지 확인하세요.');
    process.exit(1);
  }

  console.log(`로컬 크롬 실행 경로 감지 완료: ${chromePath}`);
  console.log('PDF 생성 프로세스를 시작합니다...');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  } catch (err) {
    console.error('Puppeteer 브라우저 실행 실패:', err);
    process.exit(1);
  }

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(15000);

  for (const data of CURRICULUM_DATA) {
    const mdPath = path.join(CURRICULUM_DIR, data.mdFile);
    const pdfPath = path.join(CURRICULUM_DIR, data.pdfFile);

    if (!fs.existsSync(mdPath)) {
      console.warn(`경고: Markdown 파일을 찾을 수 없습니다: ${mdPath}`);
      continue;
    }

    console.log(`[Day ${data.dayNum}] MD 읽는 중: ${data.mdFile}`);
    let mdContent = fs.readFileSync(mdPath, 'utf-8').trim();

    // Remove the first level-1 heading line as it's represented by the cover page
    const lines = mdContent.split('\n');
    if (lines[0] && lines[0].trim().startsWith('#')) {
      lines.shift();
    }
    mdContent = lines.join('\n').trim();

    // Parse Markdown to HTML
    const bodyHtml = marked(mdContent);

    // Build the full HTML structure
    const htmlContent = buildHtmlPage(data.title, data.subtitle, data.dayNum, bodyHtml);

    console.log(`[Day ${data.dayNum}] HTML 렌더링 중...`);
    await page.setContent(htmlContent, { waitUntil: 'load' });

    // Extra sleep to ensure Prism code highlight finishes and fonts render
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`[Day ${data.dayNum}] PDF 출력 중: ${data.pdfFile}`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 8px; font-family: 'Noto Sans KR', sans-serif; text-align: right; width: 100%; padding-right: 20mm; color: #94a3b8; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;">
          Next.js 1-Week Lecture Notes - Day 0${data.dayNum}
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 8px; font-family: 'Noto Sans KR', sans-serif; text-align: center; width: 100%; color: #94a3b8; padding-top: 3px;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
      margin: {
        top: '25mm',
        bottom: '25mm',
        left: '20mm',
        right: '20mm'
      }
    });
    console.log(`[Day ${data.dayNum}] PDF 생성 완료!`);
  }

  await browser.close();
  console.log('🎉 모든 PDF 파일이 성공적으로 구축되었습니다!');
}

generatePdfs();
