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
  },
  {
    id: 2,
    title: 'Node.js 교과서',
    author: '이지훈',
    publisher: '한빛미디어',
    price: 32000,
    image: '/images/nodejs.jpg',
    description: 'Node.js를 처음부터 배우는 책입니다.',
  },
  // 더 많은 책 데이터 추가 가능
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query) ||
    book.publisher.toLowerCase().includes(query)
  );

  return NextResponse.json(filteredBooks);
} 