'use client';

import { useState, useEffect } from 'react';
import { FaBook, FaSearch, FaFilter, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  // 페이지 로드 시 도서 목록을 가져오는 함수
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

  // 초기 로딩 시 도서 목록 가져오기
  useEffect(() => {
    fetchBooks();
  }, []);

  // 검색어나 카테고리 변경 시 도서 목록 업데이트
  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedCategory]);

  // 로컬 스토리지에서 장바구니 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        setCartCount(parsedCart.length);
      }
    }
  }, []);

  const categories = ['전체', '컴퓨터공학', '전기전자', '통계', '의료정보', '프로그래밍'];

  const addToCart = (book: Book) => {
    // 장바구니에 이미 있는지 확인
    const isItemInCart = cartItems.some(item => item.id === book.id);
    
    if (isItemInCart) {
      setCartMessage('이미 장바구니에 있는 도서입니다.');
      setShowCartAlert(true);
      setTimeout(() => setShowCartAlert(false), 3000);
      return;
    }
    
    // 장바구니 최대 개수 체크
    if (cartItems.length >= 3) {
      setCartMessage('장바구니에는 최대 3권의 도서만 담을 수 있습니다.');
      setShowCartAlert(true);
      setTimeout(() => setShowCartAlert(false), 3000);
      return;
    }
    
    const newCartItems = [...cartItems, book];
    setCartItems(newCartItems);
    setCartCount(newCartItems.length);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    
    setCartMessage('도서가 장바구니에 추가되었습니다.');
    setShowCartAlert(true);
    setTimeout(() => setShowCartAlert(false), 3000);
  };

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
              <div className="relative">
                <Link href="/cart" className="text-gray-600 hover:text-primary p-2">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
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

      {/* Cart Alert */}
      {showCartAlert && (
        <div className="fixed top-20 right-4 bg-white shadow-lg rounded-lg p-4 max-w-xs z-50 transform transition-all">
          <p className={cartMessage.includes('최대') || cartMessage.includes('이미') ? 'text-red-600' : 'text-green-600'}>
            {cartMessage}
          </p>
        </div>
      )}

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
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(book)}
                          className="btn-secondary text-sm px-3 py-2 flex items-center"
                        >
                          <FaShoppingCart className="mr-1" /> 담기
                        </button>
                        <Link
                          href={`/books/${book.id}`}
                          className="btn-primary text-sm px-3 py-2"
                        >
                          상세보기
                        </Link>
                      </div>
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