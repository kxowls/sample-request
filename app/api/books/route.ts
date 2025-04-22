import { NextResponse } from 'next/server';

// 임시 데이터 - 실제로는 데이터베이스에서 가져와야 합니다
const books = [
  {
    id: 1,
    title: '리액트를 다루는 기술',
    author: '김민준',
    publisher: '한빛미디어',
    price: 35000,
    image: '/images/react.jpg',
    description: '리액트 기초부터 고급까지 다루는 책입니다.',
    category: '프론트엔드',
    isbn: '9788966262758',
  },
  {
    id: 2,
    title: 'Node.js 교과서',
    author: '이지훈',
    publisher: '한빛미디어',
    price: 32000,
    image: '/images/nodejs.jpg',
    description: 'Node.js를 처음부터 배우는 책입니다.',
    category: '백엔드',
    isbn: '9788966262759',
  },
  {
    id: 3,
    title: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    publisher: '위키북스',
    price: 45000,
    image: '/images/javascript.jpg',
    description: '자바스크립트의 기본 개념과 핵심 원리를 깊이 있게 다룹니다.',
    category: '프론트엔드',
    isbn: '9788966262750',
  },
  {
    id: 4,
    title: '파이썬으로 배우는 데이터 과학',
    author: '김영우',
    publisher: '한빛미디어',
    price: 28000,
    image: '/images/python.jpg',
    description: '파이썬을 활용한 데이터 분석과 머신러닝 입문서입니다.',
    category: '데이터과학',
    isbn: '9788966262751',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  
  let filteredBooks = books;
  
  if (query) {
    filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query)
    );
  }
  
  if (category) {
    filteredBooks = filteredBooks.filter(book => 
      book.category === category
    );
  }

  return NextResponse.json(filteredBooks);
} 