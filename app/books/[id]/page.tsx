import { notFound } from 'next/navigation';

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
    details: '이 책은 리액트의 기본 개념부터 고급 기능까지 단계별로 학습할 수 있도록 구성되어 있습니다...',
  },
  {
    id: 2,
    title: 'Node.js 교과서',
    author: '이지훈',
    publisher: '한빛미디어',
    price: 32000,
    image: '/images/nodejs.jpg',
    description: 'Node.js를 처음부터 배우는 책입니다.',
    details: 'Node.js의 기본 개념부터 실무에서 사용되는 고급 기능까지 학습할 수 있습니다...',
  },
];

export default function BookDetail({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === parseInt(params.id));

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg h-96">
            {/* 이미지가 있는 경우 */}
            {/* <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" /> */}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-gray-600 mb-2">{book.author} | {book.publisher}</p>
            <p className="text-2xl font-bold text-primary mb-6">{book.price.toLocaleString()}원</p>
            
            <div className="space-y-4">
              <button className="btn-primary w-full">장바구니에 담기</button>
              <button className="btn-secondary w-full">바로 구매하기</button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">책 소개</h2>
          <p className="text-gray-700 leading-relaxed">{book.details}</p>
        </div>
      </div>
    </div>
  );
} 