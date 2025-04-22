'use client';

import { useState, useEffect } from 'react';
import { FaBook, FaSearch, FaFilter } from 'react-icons/fa';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isbn: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/books?q=${searchQuery}&category=${selectedCategory}`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('도서 목록을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, selectedCategory]);

  const categories = ['전체', '프론트엔드', '백엔드', '데이터과학'];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            교강사 견본 도서 신청
          </h1>
          <p className="text-lg mb-6">
            강의에 필요한 IT 전문서적을 무료로 신청하세요
          </p>
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="도서명, 저자, 출판사로 검색하세요"
                className="w-full px-4 py-3 rounded-lg text-gray-900"
              />
              <FaSearch className="absolute right-4 top-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === '전체' ? '' : category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  (category === '전체' && !selectedCategory) || selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book List */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[3/4] bg-gray-200">
                    {/* 이미지가 있는 경우 */}
                    {/* <img src={book.image} alt={book.title} className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                    <p className="text-gray-600 text-sm mb-4">{book.publisher}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">
                        {book.price.toLocaleString()}원
                      </span>
                      <Link
                        href={`/books/${book.id}`}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        견본 신청
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 