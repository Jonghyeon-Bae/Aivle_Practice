'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: 'work' | 'personal' | 'study';
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'study'>('personal');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isMounted, setIsMounted] = useState(false); // Hydration mismatch 해결용

  // 1. 브라우저 마운트 완료 확인 및 LocalStorage 로드
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('antigravity_todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('로컬스토리지 데이터를 파싱하는 데 실패했습니다.', e);
      }
    }
  }, []);

  // 2. Todos 상태 변화 시 LocalStorage 자동 백업
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('antigravity_todos', JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  // Todo 추가 핸들러
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
      category: category,
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
  };

  // 완료 상태 토글
  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Todo 삭제
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 필터링 적용된 목록 반환
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 카테고리 엠블럼 매핑 함수
  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'work': return 'bg-blue-950 text-blue-400 border border-blue-800/30';
      case 'study': return 'bg-purple-950 text-purple-400 border border-purple-800/30';
      default: return 'bg-amber-950 text-amber-400 border border-amber-800/30';
    }
  };

  // Hydration 오류 방지를 위한 마운트 전 예외 렌더링
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* 상단 헤더 영역 */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Link href="/" className="text-xs text-teal-400 hover:underline font-semibold">
              &larr; 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Interactive To-Do
            </h1>
          </div>
          <div className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
            남은 할 일: <span className="text-teal-400 font-bold">{todos.filter(t => !t.completed).length}</span>개
          </div>
        </div>

        {/* 할 일 입력 폼 */}
        <form onSubmit={handleAddTodo} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="오늘 해야 할 일을 기록해 보세요..."
              className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-100 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-teal-400 transition-all shrink-0 shadow-lg shadow-teal-500/10"
            >
              할 일 추가
            </button>
          </div>

          {/* 카테고리 태그 선택기 */}
          <div className="flex items-center space-x-3 pt-2">
            <span className="text-xs font-semibold text-slate-500">카테고리:</span>
            {(['personal', 'work', 'study'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full font-medium border transition-all ${
                  category === cat
                    ? 'bg-teal-500 text-slate-950 border-teal-400 font-semibold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat === 'personal' ? '개인' : cat === 'work' ? '업무' : '학업'}
              </button>
            ))}
          </div>
        </form>

        {/* 필터링 탭 */}
        <div className="flex border-b border-slate-800 text-sm">
          {(['all', 'active', 'completed'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`pb-3 px-4 font-semibold transition-all relative ${
                filter === t ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t === 'all' ? '전체 보기' : t === 'active' ? '진행 중' : '완료됨'}
              {filter === t && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* 할 일 목록 */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 border border-slate-900 border-dashed rounded-2xl">
              <span className="text-3xl">☕</span>
              <p className="text-slate-500 text-sm mt-3">등록된 할 일이 없습니다.</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex justify-between items-center p-4 bg-slate-900 border rounded-xl hover:bg-slate-900/80 transition-all group ${
                  todo.completed ? 'border-slate-900/60 opacity-60' : 'border-slate-800 hover:border-slate-700/60'
                }`}
              >
                <div className="flex items-center space-x-4 flex-grow min-w-0">
                  {/* 체크박스 커스텀 UI */}
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                      todo.completed 
                        ? 'bg-teal-500 border-teal-500 text-slate-950' 
                        : 'border-slate-700 hover:border-teal-500'
                    }`}
                  >
                    {todo.completed && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>

                  {/* 텍스트 내용 */}
                  <span className={`text-sm select-none truncate pr-2 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {todo.text}
                  </span>

                  {/* 카테고리 태그 */}
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold shrink-0 ${getCategoryStyles(todo.category)}`}>
                    {todo.category}
                  </span>
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="할 일 삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
