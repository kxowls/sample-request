import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    
    // 필수 필드 검증
    const requiredFields = ['name', 'email', 'institution', 'address', 'reason', 'bookId', 'bookTitle'];
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return NextResponse.json(
          { error: `${field} 필드가 필요합니다` },
          { status: 400 }
        );
      }
    }

    // 구글 스프레드시트에 데이터 저장
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzcg_fKXdPkSYS6ldRjQk6D3mAGQaBfIt2VwBavtb1Cp3JWXpHM0MAIAA1ZVXdLk88/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheet: 'Sheet2', // 시트2에 데이터 저장
          data: {
            requestDate: new Date().toISOString(),
            name: requestData.name,
            email: requestData.email,
            institution: requestData.institution,
            department: requestData.department || '',
            address: requestData.address,
            reason: requestData.reason,
            bookId: requestData.bookId,
            bookTitle: requestData.bookTitle,
            bookAuthor: requestData.bookAuthor || '',
            bookIsbn: requestData.bookIsbn || '',
            status: '신청접수', // 기본 상태
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '스프레드시트 저장 중 오류가 발생했습니다');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('견본 도서 신청 처리 중 오류:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 