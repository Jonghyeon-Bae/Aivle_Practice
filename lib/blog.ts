import fs from 'fs';
import path from 'path';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

// 간단한 커스텀 Frontmatter 및 마크다운 파서 함수
function parseMarkdown(fileContent: string, slug: string): Post {
  const lines = fileContent.split('\n');
  const metadata: Record<string, string> = {};
  let contentStartIndex = 0;
  let isFrontmatter = false;
  let frontmatterLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '---') {
      if (!isFrontmatter) {
        isFrontmatter = true;
      } else {
        isFrontmatter = false;
        contentStartIndex = i + 1;
        break;
      }
    } else if (isFrontmatter) {
      frontmatterLines.push(line);
    }
  }

  // frontmatter 분석 (key: value)
  frontmatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // 양끝 따옴표 제거
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      metadata[key] = value;
    }
  });

  const rawBody = lines.slice(contentStartIndex).join('\n');
  
  // 초급 교안용 단순 마크다운 ➡️ HTML 변환기 구현 (H1, H2, Bold, List)
  let parsedContent = rawBody
    .replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-extrabold text-slate-100 mt-6 mb-4">$1</h1>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-slate-200 mt-6 mb-3">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-teal-400">$1</strong>')
    .replace(/^-\s+(.+)$/gm, '<li class="list-disc list-inside text-slate-300 ml-4 mb-2">$1</li>')
    .replace(/\r\n/g, '\n')
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      // HTML 태그로 이미 감싸져 있는 헤더나 리스트는 p 태그로 다시 감싸지 않음
      if (trimmed.startsWith('<h1') || trimmed.startsWith('<h2') || trimmed.startsWith('<li')) {
        return trimmed;
      }
      return `<p class="text-slate-300 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return {
    slug,
    title: metadata.title || 'Untitled',
    date: metadata.date || '',
    description: metadata.description || '',
    content: parsedContent
  };
}

// 모든 포스팅 목록 가져오기 (날짜 최신순)
export function getAllPosts(): Post[] {
  // 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return parseMarkdown(fileContents, slug);
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 특정 포스팅 내용 가져오기
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return parseMarkdown(fileContents, slug);
  } catch (e) {
    return null;
  }
}
