'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaShoppingCart, FaExternalLinkAlt } from 'react-icons/fa';

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
  detailUrl?: string;
}

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    department: '',
    address: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${params.id}`);
        if (!response.ok) {
          throw new Error('도서를 찾을 수 없습니다');
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('도서 정보를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 이메일이 변경되면 확인 상태 초기화
    if (name === 'email') {
      setEmailVerified(null);
    }
  };

  const verifyEmail = async () => {
    if (!formData.email) {
      setSubmitError('이메일을 입력해주세요.');
      return;
    }

    setIsVerifying(true);
    setSubmitError('');

    try {
      const response = await fetch(`/api/verify-email?email=${encodeURIComponent(formData.email)}`);
      const data = await response.json();
      
      setEmailVerified(data.verified);
      
      if (data.verified) {
        // 이메일 인증 성공 시 기관 및 부서 정보 자동 입력
        setFormData(prev => ({
          ...prev,
          institution: data.institution || prev.institution,
          department: data.department || prev.department,
          name: data.name || prev.name
        }));
      } else {
        setSubmitError('등록된 교강사 이메일이 아닙니다.');
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
      setEmailVerified(false);
      setSubmitError('이메일 확인 중 오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    if (!emailVerified) {
      setSubmitError('이메일 인증이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const requestData = {
        ...formData,
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookIsbn: book.isbn,
        requestDate: new Date().toISOString(),
      };

      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('신청 제출 중 오류가 발생했습니다');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        institution: '',
        department: '',
        address: '',
        reason: '',
      });
    } catch (error) {
      console.error('견본 신청 제출 중 오류가 발생했습니다:', error);
      setSubmitError('견본 신청 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToCart = () => {
    if (!book) return;

    // 로컬 스토리지에서 장바구니 가져오기
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // 이미 장바구니에 있는지 확인
    const existingItem = cartItems.find((item: any) => item.id === book.id);
    
    if (existingItem) {
      alert('이미 장바구니에 추가된 도서입니다.');
      return;
    }
    
    // 장바구니 최대 개수(3개) 체크
    if (cartItems.length >= 3) {
      alert('장바구니에는 최대 3권의 도서만 담을 수 있습니다.');
      return;
    }
    
    // 장바구니에 추가
    cartItems.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
    });
    
    // 로컬 스토리지에 저장
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('장바구니에 추가되었습니다.');
  };
  
  const goToExternalLink = () => {
    if (book?.detailUrl) {
      window.open(book.detailUrl, '_blank');
    } else {
      window.open(`https://www.hanbit.co.kr/search/search_result.html?keyword=${book?.title}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">도서를 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 btn-primary"
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-primary hover:underline"
        >
          <FaArrowLeft className="mr-2" /> 도서 목록으로 돌아가기
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="aspect-[4/5] relative bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={addToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90"
              >
                <FaShoppingCart />
                <span>장바구니 담기</span>
              </button>
              <button
                onClick={goToExternalLink}
                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                <FaExternalLinkAlt />
              </button>
            </div>
          </div>

          <div className="md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">저자:</span> {book.author}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">출판사:</span> {book.publisher}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">카테고리:</span> {book.category}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
              <p className="text-primary font-bold text-xl">
                {book.price.toLocaleString()}원
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h2 className="text-xl font-bold mb-2">도서 소개</h2>
              <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={goToExternalLink}
                className="text-primary flex items-center hover:underline"
              >
                <span>도서 상세히 확인하기</span>
                <FaExternalLinkAlt className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">견본 도서 신청</h2>
        
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">신청이 완료되었습니다!</p>
            <p>신청하신 도서는 검토 후 배송됩니다. 감사합니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  이메일 *
                </label>
                <div className="flex">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={verifyEmail}
                    disabled={isVerifying || !formData.email}
                    className="ml-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 whitespace-nowrap"
                  >
                    {isVerifying ? '확인 중...' : '이메일 확인'}
                  </button>
                </div>
                {emailVerified === true && (
                  <p className="mt-1 text-sm text-green-600">인증되었습니다.</p>
                )}
                {emailVerified === false && (
                  <p className="mt-1 text-sm text-red-600">등록된 교강사 이메일이 아닙니다.</p>
                )}
              </div>
              <div>
                <label htmlFor="institution" className="block text-gray-700 font-medium mb-2">
                  소속 기관/학교 *
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly={emailVerified === true}
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-gray-700 font-medium mb-2">
                  학과/부서
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly={emailVerified === true}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                배송 주소 *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
                신청 사유 *
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="견본 도서가 필요한 이유를 간략히 작성해주세요. (예: 강의 교재 선정, 연구 참고 자료 등)"
              ></textarea>
            </div>
            
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{submitError}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !emailVerified}
                className="btn-primary px-6 py-3 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2"></span>
                    처리 중...
                  </>
                ) : (
                  '견본 신청하기'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 