import { NextResponse } from 'next/server';

// 도서 타입 정의
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

// 구글 스프레드시트에서 도서 데이터 가져오기
async function fetchBooksFromGoogleSheet(): Promise<Book[]> {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzQZEuPLaavfZZS39wbvjz6FxHuMNgM2UHfNWw4nY8lOuHVZp5Ixu2Q3-h5rUYO3nKH/exec?sheet=Sheet1'
    );

    if (!response.ok) {
      throw new Error('스프레드시트 데이터를 불러오는데 실패했습니다');
    }

    const data = await response.json();
    
    // 스프레드시트 데이터를 Book 형식으로 변환
    const books: Book[] = data.map((row: any, index: number) => ({
      id: index + 1,
      title: row.title || '',
      author: row.author || '',
      publisher: row.publisher || '',
      price: parseInt(row.price) || 0,
      image: row.image || '/images/book-placeholder.jpg',
      description: row.description || '',
      category: row.category || '',
      isbn: row.isbn || '',
      detailUrl: row.detailUrl || '',
    }));

    return books;
  } catch (error) {
    console.error('구글 스프레드시트에서 데이터를 가져오는 중 오류 발생:', error);
    return getDefaultBooks(); // 오류 발생 시 기본 도서 데이터 반환
  }
}

// 백업용 기본 도서 데이터 (스프레드시트 연결 실패 시 사용)
function getDefaultBooks(): Book[] {
  return [
    {
      id: 1,
      title: '인공지능 시대를 위한 운영체제',
      author: '유혁, 유시환',
      publisher: '한빛아카데미',
      price: 35000,
      image: '/images/os.jpg',
      description: '인공지능 시대의 운영체제에 대한 포괄적인 이해를 제공하는 교재입니다.',
      category: '컴퓨터공학',
      isbn: '9788000000001',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B1099552243',
    },
    {
      id: 2,
      title: 'IT CookBook, 전력전자(2판)',
      author: 'Ned Mohan, Siddharth Raju',
      publisher: '한빛아카데미',
      price: 32000,
      image: '/images/power-electronics.jpg',
      description: '전력전자의 기초부터 응용까지 다루는 실용적인 교재입니다.',
      category: '전기전자',
      isbn: '9788000000002',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B4026073999',
    },
    {
      id: 3,
      title: '(수학을 잊은 사람들을 위한) 첫 번째 논문 통계',
      author: '조명근',
      publisher: '한빛아카데미',
      price: 28000,
      image: '/images/statistics.jpg',
      description: '통계를 쉽게 이해하고 논문 작성에 활용할 수 있도록 돕는 책입니다.',
      category: '통계',
      isbn: '9788000000003',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B9054695559',
    },
    {
      id: 4,
      title: 'STEM CookBook, 일반통계학(3판)',
      author: '서울대학교 자연과학대학 통계학과',
      publisher: '한빛아카데미',
      price: 30000,
      image: '/images/general-statistics.jpg',
      description: '통계학의 기본 개념과 응용을 다루는 표준 교재입니다.',
      category: '통계',
      isbn: '9788000000004',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B9639576646',
    },
    {
      id: 5,
      title: 'IT CookBook, 재대로 배우는 전자기학(2판)',
      author: '이연호',
      publisher: '한빛아카데미',
      price: 33000,
      image: '/images/electromagnetics.jpg',
      description: '전자기학의 핵심 개념을 체계적으로 학습할 수 있는 교재입니다.',
      category: '전기전자',
      isbn: '9788000000005',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B3783190747',
    },
    {
      id: 6,
      title: 'AI 시대의 컴퓨터구조',
      author: '임형준',
      publisher: '한빛아카데미',
      price: 35000,
      image: '/images/computer-architecture.jpg',
      description: 'AI 시대에 맞춘 현대적인 컴퓨터구조 교재입니다.',
      category: '컴퓨터공학',
      isbn: '9788000000006',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B1881656343',
    },
    {
      id: 7,
      title: '디지털 헬스케어 개론',
      author: '이기영',
      publisher: '한빛아카데미',
      price: 28000,
      image: '/images/digital-healthcare.jpg',
      description: '디지털 헬스케어의 기초부터 최신 트렌드까지 다루는 입문서입니다.',
      category: '의료정보',
      isbn: '9788000000007',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B1196493189',
    },
    {
      id: 8,
      title: '파이썬 마스터',
      author: '김철수',
      publisher: '한빛아카데미',
      price: 32000,
      image: '/images/python-master.jpg',
      description: '파이썬 프로그래밍의 고급 기술을 마스터하기 위한 교재입니다.',
      category: '프로그래밍',
      isbn: '9788000000008',
      detailUrl: 'https://www.hanbit.co.kr/store/books/look.php?p_code=B2587450326',
    }
  ];
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  
  // 구글 스프레드시트에서 도서 데이터 가져오기
  const books = await fetchBooksFromGoogleSheet();
  const book = books.find(book => book.id === id);

  if (!book) {
    return new NextResponse(JSON.stringify({ error: '도서를 찾을 수 없습니다' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.json(book);
} 