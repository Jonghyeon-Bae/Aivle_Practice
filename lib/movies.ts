export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  releaseYear: number;
  overview: string;
  image: string; // gradient placeholder
}

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "인셉션 (Inception)",
    genre: "SF / 스릴러",
    rating: 9.3,
    releaseYear: 2010,
    overview: "타인의 꿈에 침입해 무의식에 새로운 정보를 심는 작전을 수행하는 요원들의 이야기.",
    image: "from-indigo-600 to-purple-800"
  },
  {
    id: 2,
    title: "인터스텔라 (Interstellar)",
    genre: "SF / 드라마",
    rating: 9.1,
    releaseYear: 2014,
    overview: "세계 식량 위기 속에서 인류의 새로운 터전을 찾아 웜홀을 통해 우주로 나아가는 탐사대 이야기.",
    image: "from-blue-900 to-slate-950"
  },
  {
    id: 3,
    title: "다크 나이트 (The Dark Knight)",
    genre: "액션 / 느와르",
    rating: 9.5,
    releaseYear: 2008,
    overview: "고담시를 위협하는 혼돈의 지배자 조커에 맞서 도덕적 딜레마에 빠진 배트맨의 대결.",
    image: "from-slate-800 to-zinc-950"
  },
  {
    id: 4,
    title: "라라랜드 (La La Land)",
    genre: "로맨스 / 뮤지컬",
    rating: 8.9,
    releaseYear: 2016,
    overview: "재즈 피아니스트와 배우 지망생의 꿈과 사랑을 그린 아름답고 애틋한 음악 영화.",
    image: "from-pink-600 to-rose-900"
  },
  {
    id: 5,
    title: "기생충 (Parasite)",
    genre: "스릴러 / 블랙코미디",
    rating: 9.2,
    releaseYear: 2019,
    overview: "전원 백수인 기택네 장남이 박사장네 과외 면접을 보러 가며 시작되는 두 가족의 기묘한 만남.",
    image: "from-emerald-700 to-teal-950"
  },
  {
    id: 6,
    title: "어바웃 타임 (About Time)",
    genre: "로맨스 / SF",
    rating: 8.8,
    releaseYear: 2013,
    overview: "가문의 비밀인 시간 여행 능력을 깨닫게 된 주인공이 첫눈에 반한 여인과의 사랑을 이루기 위해 시간 여행을 하며 겪는 이야기.",
    image: "from-orange-500 to-red-700"
  }
];
