import { NextResponse } from 'next/server';

interface EmailRecord {
  email: string;
  institution?: string;
  department?: string;
  name?: string;
}

// 구글 스프레드시트에서 이메일 목록 가져오기
async function fetchEmailList(): Promise<EmailRecord[]> {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzcg_fKXdPkSYS6ldRjQk6D3mAGQaBfIt2VwBavtb1Cp3JWXpHM0MAIAA1ZVXdLk88/exec?sheet=Sheet3'
    );

    if (!response.ok) {
      throw new Error('스프레드시트 데이터를 불러오는데 실패했습니다');
    }

    const data = await response.json();
    
    // 스프레드시트 데이터를 EmailRecord 형식으로 변환
    const emailRecords: EmailRecord[] = data.map((row: any) => ({
      email: row.email?.toLowerCase() || '',
      institution: row.institution || '',
      department: row.department || '',
      name: row.name || ''
    }));

    return emailRecords;
  } catch (error) {
    console.error('구글 스프레드시트에서 이메일 목록을 가져오는 중 오류 발생:', error);
    return getDefaultEmails(); // 오류 발생 시 기본 이메일 목록 반환
  }
}

// 백업용 기본 이메일 목록
function getDefaultEmails(): EmailRecord[] {
  return [
    { email: 'professor@university.ac.kr' },
    { email: 'teacher@edu.com' },
    { email: 'instructor@school.edu' },
    { email: 'test@example.com' }
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.toLowerCase();

  if (!email) {
    return NextResponse.json(
      { error: '이메일이 제공되지 않았습니다' },
      { status: 400 }
    );
  }

  try {
    // 구글 스프레드시트에서 이메일 목록 가져오기
    const emailList = await fetchEmailList();
    
    // 해당 이메일이 있는지 확인
    const verified = emailList.some(record => record.email === email);
    
    return NextResponse.json({ verified });
  } catch (error: any) {
    console.error('이메일 확인 중 오류 발생:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 