import { FaBook, FaGraduationCap, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import BookSearch from './components/BookSearch';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            교강사 견본 도서 신청
          </h1>
          <p className="text-xl mb-8">
            한빛아카데미 교재를 강의에 활용하세요. 교강사님을 위한 무료 견본 도서를 간편하게 신청할 수 있습니다.
          </p>
          <div className="flex justify-center">
            <Link href="/books" className="btn-primary text-lg px-8 py-3 font-semibold mr-4">
              도서 검색하기
            </Link>
            <Link href="/apply" className="btn-secondary text-lg px-8 py-3 font-semibold">
              견본 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">신청 방법</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">도서 검색</h3>
              <p className="text-gray-600">강의에 필요한 교재를 검색하고 선택하세요</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">신청서 작성</h3>
              <p className="text-gray-600">기본 정보와 배송지를 입력하세요</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">이메일 인증</h3>
              <p className="text-gray-600">학교 이메일을 통해 교강사 인증을 완료하세요</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-2">도서 수령</h3>
              <p className="text-gray-600">배송 정보 확인 후 견본 도서를 받아보세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">교재 검색</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            한빛아카데미의 다양한 교재 중 강의에 필요한 도서를 검색해보세요.
            IT, 컴퓨터 공학, 수학 등 다양한 분야의 교재를 제공합니다.
          </p>
          <div className="max-w-2xl mx-auto">
            <BookSearch />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">교강사 혜택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaBook className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">무료 견본 제공</h3>
              <p className="text-gray-600">강의용 교재를 무료로 받아보고 검토할 수 있습니다</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaGraduationCap className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">교안 자료</h3>
              <p className="text-gray-600">강의에 활용할 수 있는 PPT, PDF 자료를 제공합니다</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaBoxOpen className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">신속한 배송</h3>
              <p className="text-gray-600">신청 후 빠른 시간 내에 도서를 받아보실 수 있습니다</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaCheckCircle className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">추가 지원</h3>
              <p className="text-gray-600">도서 채택 시 학생 할인 및 부가 자료를 제공합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">누가 견본 도서를 신청할 수 있나요?</h3>
              <p className="text-gray-600">대학교 및 전문교육기관의 교수, 강사 등 교강사 분들께서 신청하실 수 있습니다. 학교 이메일(@ac.kr, @edu 등)을 통해 인증이 필요합니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">한 사람당 몇 권까지 신청 가능한가요?</h3>
              <p className="text-gray-600">교강사 1인당 1회에 1권의 견본 도서를 신청하실 수 있습니다. 다른 도서가 필요하신 경우 별도로 신청해 주세요.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">도서 배송은 얼마나 걸리나요?</h3>
              <p className="text-gray-600">신청 확인 후 영업일 기준 3~5일 내에 배송이 이루어집니다. 재고 상황에 따라 배송이 지연될 수 있습니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">견본 도서 비용은 얼마인가요?</h3>
              <p className="text-gray-600">교강사 대상 견본 도서는 무료로 제공됩니다. 배송비도 한빛아카데미에서 부담합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">지금 바로 견본 도서를 신청하세요</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            강의에 적합한 교재를 찾고 계신가요? 한빛아카데미의 견본 도서를 무료로 받아보고 확인하세요.
          </p>
          <Link href="/apply" className="btn-secondary text-lg px-8 py-3 font-semibold">
            견본 신청하기
          </Link>
        </div>
      </section>
    </main>
  );
} 