import { FaBook, FaShoppingCart, FaTruck, FaUserGraduate } from 'react-icons/fa';
import BookSearch from './components/BookSearch';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            한빛아카데미 도서몰
          </h1>
          <p className="text-xl mb-8">
            최고의 IT 전문서적을 만나보세요
          </p>
          <div className="max-w-2xl mx-auto">
            <BookSearch />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <FaBook className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">다양한 도서 선택</h3>
              <p className="text-gray-600">IT 전문서적부터 교재까지 다양한 도서를 만나보세요</p>
            </div>
            <div className="text-center p-6">
              <FaUserGraduate className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">교육자 특별 혜택</h3>
              <p className="text-gray-600">교육자 인증 시 추가 할인 혜택을 제공합니다</p>
            </div>
            <div className="text-center p-6">
              <FaTruck className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">무료 배송</h3>
              <p className="text-gray-600">5만원 이상 구매 시 무료 배송 서비스를 제공합니다</p>
            </div>
            <div className="text-center p-6">
              <FaShoppingCart className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">간편한 구매</h3>
              <p className="text-gray-600">안전하고 편리한 결제 시스템을 제공합니다</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 