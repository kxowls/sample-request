import { NextRequest, NextResponse } from 'next/server';

type BookRequest = {
  name: string;
  email: string;
  institution: string;
  books: Array<{
    id: string;
    title: string;
    author: string;
    publisher: string;
  }>;
};

export async function POST(request: Request) {
  try {
    const body: BookRequest = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.email || !body.institution) {
      return NextResponse.json(
        { error: '모든 필수 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 도서 수량 검증
    if (!body.books || body.books.length === 0) {
      return NextResponse.json(
        { error: '최소 1권 이상의 도서를 선택해주세요.' },
        { status: 400 }
      );
    }

    if (body.books.length > 3) {
      return NextResponse.json(
        { error: '최대 3권까지만 신청 가능합니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: '유효하지 않은 이메일 형식입니다.' },
        { status: 400 }
      );
    }

    // 실제 서비스에서는 데이터베이스에 저장하거나 이메일 발송 등의 로직이 여기에 추가됩니다.
    // 여기서는 목업으로 성공 응답만 반환합니다.
    
    console.log('견본 도서 신청 접수:', body);

    return NextResponse.json(
      { 
        success: true, 
        message: '견본 도서 신청이 접수되었습니다.',
        requestId: `REQ-${Date.now()}`,
        requestDate: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('견본 도서 신청 처리 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 