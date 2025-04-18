'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  price: number;
  image: string;
  description: string;
}

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchBooks = async () => {
      if (query.length < 2) {
        setBooks([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchBooks, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목, 저자, 출판사를 검색하세요..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {loading && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {books.length > 0 && (
        <div className="mt-4 space-y-4">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-24 h-32 bg-gray-200 rounded">
                  {/* 이미지가 있는 경우 */}
                  {/* <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded" /> */}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-600">{book.author} | {book.publisher}</p>
                  <p className="text-primary font-bold mt-2">{book.price.toLocaleString()}원</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 