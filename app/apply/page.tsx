'use client';

import { useState } from 'react';
import { FaBook, FaUser, FaEnvelope, FaBuilding, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    department: '',
    position: '',
    address: '',
    bookId: '',
    bookTitle: '',
    purpose: '',
    agreeTerms: false,
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const isAcademicEmail = (email: string) => {
    return email.endsWith('.ac.kr') || email.endsWith('.edu') || email.endsWith('.edu.kr');
  };

  const sendVerificationCode = () => {
    if (!isAcademicEmail(formData.email)) {
      alert('학교 이메일(.ac.kr, .edu 등)만 사용 가능합니다.');
      return;
    }
    
    // 실제로는 서버에서 이메일 전송 로직 구현
    alert(`${formData.email}로 인증 코드가 발송되었습니다. (데모 목적으로, 인증 코드는 '123456'입니다)`);
  };

  const verifyCode = () => {
    // 데모 목적으로 123456을 인증 코드로 사용
    if (verificationCode === '123456') {
      setEmailVerified(true);
      alert('이메일이 성공적으로 인증되었습니다.');
    } else {
      alert('인증 코드가 올바르지 않습니다.');
    }
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return '이름을 입력해주세요.';
    if (!formData.email.trim()) return '이메일을 입력해주세요.';
    if (!isAcademicEmail(formData.email)) return '학교 이메일(.ac.kr, .edu 등)만 사용 가능합니다.';
    if (!emailVerified) return '이메일 인증을 완료해주세요.';
    if (!formData.phone.trim()) return '연락처를 입력해주세요.';
    if (!formData.institution.trim()) return '소속 기관을 입력해주세요.';
    if (!formData.department.trim()) return '학과/부서를 입력해주세요.';
    if (!formData.position.trim()) return '직책을 선택해주세요.';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.address.trim()) return '배송지 주소를 입력해주세요.';
    if (!formData.bookTitle.trim()) return '신청할 도서를 선택해주세요.';
    if (!formData.purpose.trim()) return '신청 목적을 입력해주세요.';
    if (!formData.agreeTerms) return '이용약관에 동의해주세요.';
    return null;
  };

  const nextStep = () => {
    const error = validateStep1();
    if (error) {
      alert(error);
      return;
    }
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateStep2();
    if (error) {
      alert(error);
      return;
    }

    setSubmitting(true);
    
    // 실제로는 서버에 폼 데이터 전송 로직 구현
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBook className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold mb-4">신청이 완료되었습니다!</h1>
            <p className="text-gray-600 mb-8">
              견본 도서 신청이 성공적으로 접수되었습니다. 영업일 기준 3-5일 내에 배송이 시작될 예정입니다.
            </p>
            <Link href="/" className="btn-primary">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">견본 도서 신청</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className={`flex items-center ${step === 1 ? 'text-primary font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
            <span>기본 정보</span>
          </div>
          <div className="w-16 h-1 mx-4 bg-gray-200">
            <div className={`h-full bg-primary ${step === 2 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`flex items-center ${step === 2 ? 'text-primary font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
            <span>도서 & 배송정보</span>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">이름 *</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaUser className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="flex-1 outline-none"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">학교 이메일 * (.ac.kr, .edu 등)</label>
                  <div className="flex">
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 mr-2">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex-1 outline-none"
                        placeholder="professor@university.ac.kr"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={sendVerificationCode}
                      className={`px-4 py-2 rounded-md ${emailVerified ? 'bg-gray-300 text-gray-600' : 'bg-primary text-white'}`}
                      disabled={emailVerified}
                    >
                      인증코드 전송
                    </button>
                  </div>
                </div>
                
                {!emailVerified && (
                  <div>
                    <label htmlFor="verificationCode" className="block text-gray-700 font-semibold mb-2">인증코드 *</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 flex-1 mr-2 outline-none"
                        placeholder="123456"
                      />
                      <button
                        type="button"
                        onClick={verifyCode}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                      >
                        인증하기
                      </button>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">연락처 *</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaPhone className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 outline-none"
                      placeholder="01012345678"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="institution" className="block text-gray-700 font-semibold mb-2">소속 기관 *</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaBuilding className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="flex-1 outline-none"
                      placeholder="서울대학교"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">학과/부서 *</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
                    placeholder="컴퓨터공학과"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-gray-700 font-semibold mb-2">직책 *</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
                    required
                  >
                    <option value="">직책을 선택하세요</option>
                    <option value="교수">교수</option>
                    <option value="부교수">부교수</option>
                    <option value="조교수">조교수</option>
                    <option value="강사">강사</option>
                    <option value="연구원">연구원</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    다음 단계
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="bookTitle" className="block text-gray-700 font-semibold mb-2">신청 도서 *</label>
                  <select
                    id="bookTitle"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
                    required
                  >
                    <option value="">신청할 도서를 선택하세요</option>
                    <option value="리액트를 다루는 기술">리액트를 다루는 기술</option>
                    <option value="Node.js 교과서">Node.js 교과서</option>
                    <option value="파이썬 알고리즘 인터뷰">파이썬 알고리즘 인터뷰</option>
                    <option value="Do it! 자바 프로그래밍">Do it! 자바 프로그래밍</option>
                    <option value="모던 자바스크립트 Deep Dive">모던 자바스크립트 Deep Dive</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="purpose" className="block text-gray-700 font-semibold mb-2">신청 목적 *</label>
                  <textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
                    rows={3}
                    placeholder="강의/교육 활용 목적을 간략하게 기재해주세요."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">배송지 주소 *</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="flex-1 outline-none"
                      placeholder="서울시 관악구 관악로 1 서울대학교 공과대학 301호"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="agreeTerms" className="text-gray-700">
                    <span>개인정보 수집 및 이용에 동의합니다. </span>
                    <Link href="#" className="text-primary hover:underline">약관 보기</Link>
                  </label>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary"
                  >
                    이전 단계
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? '처리 중...' : '신청하기'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 