'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import Image from 'next/image';
import { FaTrash, FaShoppingCart, FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    department: ''
  });

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleRemove = (bookId: string) => {
    removeItem(bookId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // 이메일 필드가 변경되면 인증 상태 초기화
    if (name === 'email') {
      setEmailVerified(null);
    }
  };

  const verifyEmail = async () => {
    if (!formData.email) {
      setRequestError('이메일을 입력해주세요.');
      return;
    }

    setIsVerifying(true);
    setRequestError('');

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
        setRequestError('등록된 교강사 이메일이 아닙니다.');
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
      setRequestError('이메일 확인 중 오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.institution) {
      setRequestError('모든 필수 필드를 입력해주세요.');
      return;
    }

    if (!emailVerified) {
      setRequestError('이메일 인증이 필요합니다.');
      return;
    }

    if (items.length === 0) {
      setRequestError('장바구니에 도서가 없습니다.');
      return;
    }

    if (items.length > 3) {
      setRequestError('최대 3권까지만 신청 가능합니다.');
      return;
    }

    setIsRequesting(true);
    setRequestError('');

    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          institution: formData.institution,
          department: formData.department,
          books: items
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setRequestSuccess(true);
        clearCart();
        setFormData({
          name: '',
          email: '',
          institution: '',
          department: ''
        });
        setEmailVerified(null);
      } else {
        setRequestError(data.error || '신청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setRequestError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="relative">
      {/* 장바구니 버튼 */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-secondary transition-colors"
        aria-label="장바구니 열기"
      >
        <FaShoppingCart className="text-xl" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* 장바구니 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleCart}></div>
      )}

      {/* 장바구니 창 */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-auto`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">장바구니</h2>
            <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
              닫기
            </button>
          </div>

          {requestSuccess ? (
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              <p>도서 견본 신청이 완료되었습니다. 감사합니다!</p>
              <button
                onClick={() => {
                  setRequestSuccess(false);
                  toggleCart();
                }}
                className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
              >
                확인
              </button>
            </div>
          ) : (
            <>
              {items.length === 0 ? (
                <p className="text-gray-500 py-4">장바구니가 비어있습니다.</p>
              ) : (
                <div>
                  <ul className="divide-y divide-gray-200">
                    {items.map((book) => (
                      <li key={book.id} className="py-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-16 h-20 relative">
                            <Image
                              src={book.image || '/placeholder-book.png'}
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                            <p className="text-xs text-gray-500">{book.author}</p>
                            <p className="text-xs text-gray-500">{book.publisher}</p>
                          </div>
                          <button
                            onClick={() => handleRemove(book.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="제거"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {items.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">
                        {items.length}권의 도서가 장바구니에 있습니다. 최대 3권까지 신청 가능합니다.
                      </p>
                      <button
                        onClick={clearCart}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        장바구니 비우기
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-6">
                    <h3 className="text-lg font-medium mb-3">견본 도서 신청</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          이메일 *
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                          />
                          <button
                            type="button"
                            onClick={verifyEmail}
                            disabled={isVerifying || !formData.email}
                            className="ml-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            {isVerifying ? '확인 중...' : '인증'}
                          </button>
                        </div>
                        {emailVerified === true && (
                          <p className="mt-1 text-sm text-green-600 flex items-center">
                            <FaCheck className="mr-1" /> 인증됨
                          </p>
                        )}
                        {emailVerified === false && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <FaTimes className="mr-1" /> 인증 실패
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          이름 *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                          소속 기관/학교 *
                        </label>
                        <input
                          type="text"
                          id="institution"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          required
                          readOnly={emailVerified === true}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                          학과/부서
                        </label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          readOnly={emailVerified === true}
                        />
                      </div>
                    </div>

                    {requestError && (
                      <div className="mt-3 text-red-500 text-sm">{requestError}</div>
                    )}

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isRequesting || !emailVerified}
                        className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRequesting ? '신청 처리 중...' : '견본 도서 신청하기'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 