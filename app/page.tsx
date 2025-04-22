'use client';

import { useState, useEffect } from 'react';
import { FaBook, FaSearch, FaFilter, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

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

  const categories = ['전체', '컴퓨터공학', '전기전자', '통계', '의료정보', '프로그래밍'];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search and Filter Section */}
      <section className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              교강사 견본 도서 신청
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-full md:w-96">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="도서명, 저자로 검색하세요"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <FaSearch className="absolute right-4 top-3 text-gray-400" />
                </div>
              </div>
              <Link href="/setup-guide" className="text-gray-600 hover:text-primary">
                <FaCog className="text-xl" title="스프레드시트 연동 설정" />
              </Link>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/5] relative bg-gray-100">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{book.author}</p>
                    <p className="text-gray-600 text-sm mb-3">{book.publisher}</p>
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