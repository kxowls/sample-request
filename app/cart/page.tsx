'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
}

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 장바구니 데이터 가져오기
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

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
    if (!formData.email) return;

    setIsVerifying(true);
    
    try {
      const response = await fetch(`/api/verify-email?email=${encodeURIComponent(formData.email)}`);
      const data = await response.json();
      setEmailVerified(data.verified);
      
      if (!data.verified) {
        setSubmitError('교강사 이메일 인증에 실패했습니다. 등록된 이메일이 아닙니다.');
      } else {
        setSubmitError('');
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
      setEmailVerified(false);
      setSubmitError('이메일 확인 중 오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const removeItemFromCart = (id: number) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setSubmitError('장바구니에 도서를 추가해주세요.');
      return;
    }

    if (!emailVerified) {
      setSubmitError('이메일 인증이 필요합니다. 이메일 확인 버튼을 클릭해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 각 도서별로 신청 정보 서버에 전송
      const requests = cartItems.map(async (item) => {
        const requestData = {
          ...formData,
          bookId: item.id,
          bookTitle: item.title,
          bookAuthor: item.author,
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
          throw new Error(`도서 "${item.title}" 신청 중 오류가 발생했습니다`);
        }

        return response.json();
      });

      await Promise.all(requests);

      // 성공 시 장바구니 비우기
      localStorage.removeItem('cart');
      setCartItems([]);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-primary flex items-center hover:underline">
          <FaArrowLeft className="mr-2" /> 도서 목록으로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">장바구니</h1>

      {submitSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-6">
          <p className="font-bold text-lg mb-2">견본 도서 신청이 완료되었습니다!</p>
          <p className="mb-4">신청하신 도서는 검토 후 배송됩니다. 감사합니다.</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            메인 페이지로 이동
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">선택한 도서 ({cartItems.length}/3)</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">장바구니에 담긴 도서가 없습니다.</p>
                  <Link href="/" className="btn-primary">
                    도서 담으러 가기
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-0">
                      <div className="w-20 h-28 relative bg-gray-100 mr-4">
                        <Image
                          src={item.image || '/images/book-placeholder.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.author}</p>
                        <p className="text-primary font-bold mt-1">{item.price.toLocaleString()}원</p>
                      </div>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        aria-label="삭제"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">견본 신청 정보</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
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
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    이메일 *
                  </label>
                  <div className="flex gap-2 mb-1">
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
                      className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 whitespace-nowrap"
                    >
                      {isVerifying ? '확인 중...' : '이메일 확인'}
                    </button>
                  </div>
                  {emailVerified === true && (
                    <p className="text-green-600 text-sm">인증되었습니다.</p>
                  )}
                  {emailVerified === false && (
                    <p className="text-red-600 text-sm">등록된 교강사 이메일이 아닙니다.</p>
                  )}
                  <p className="text-gray-500 text-xs">학교 또는 기관 이메일 주소를 입력해주세요.</p>
                </div>
                
                <div className="mb-4">
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
                  />
                </div>
                
                <div className="mb-4">
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
                  />
                </div>
                
                <div className="mb-4">
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
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="견본 도서가 필요한 이유를 작성해주세요."
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0 || !emailVerified}
                  className={`w-full py-3 rounded-md font-bold ${
                    cartItems.length === 0 || !emailVerified
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-opacity-90'
                  }`}
                >
                  {isSubmitting ? '처리 중...' : '견본 신청하기'}
                </button>
                
                {cartItems.length === 0 && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    장바구니에 도서를 먼저 추가해주세요.
                  </p>
                )}
                
                {!emailVerified && formData.email && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    이메일 확인이 필요합니다.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 