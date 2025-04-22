'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaCopy } from 'react-icons/fa';

export default function SetupGuide() {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      title: '1. 구글 스프레드시트 준비하기',
      content: (
        <div>
          <p className="mb-4">
            먼저 <a href="https://docs.google.com/spreadsheets/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google 스프레드시트</a>를 열고 새 스프레드시트를 생성합니다.
          </p>
          <p className="mb-4">
            스프레드시트에는 두 개의 시트가 필요합니다:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>시트1 (Sheet1)</strong>: 도서 목록을 저장할 시트</li>
            <li><strong>시트2 (Sheet2)</strong>: 신청 정보를 저장할 시트</li>
          </ul>
          <p className="mb-4">
            시트1에는 다음과 같은 열을 포함해야 합니다:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">열 이름</th>
                  <th className="py-2 px-4 border">설명</th>
                  <th className="py-2 px-4 border">예시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border">title</td>
                  <td className="py-2 px-4 border">도서 제목</td>
                  <td className="py-2 px-4 border">인공지능 시대를 위한 운영체제</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">author</td>
                  <td className="py-2 px-4 border">저자</td>
                  <td className="py-2 px-4 border">유혁, 유시환</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">publisher</td>
                  <td className="py-2 px-4 border">출판사</td>
                  <td className="py-2 px-4 border">한빛아카데미</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">price</td>
                  <td className="py-2 px-4 border">가격</td>
                  <td className="py-2 px-4 border">35000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">image</td>
                  <td className="py-2 px-4 border">이미지 URL</td>
                  <td className="py-2 px-4 border">/images/os.jpg</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">description</td>
                  <td className="py-2 px-4 border">설명</td>
                  <td className="py-2 px-4 border">인공지능 시대의 운영체제에 대한 포괄적인 이해...</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">category</td>
                  <td className="py-2 px-4 border">카테고리</td>
                  <td className="py-2 px-4 border">컴퓨터공학</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">isbn</td>
                  <td className="py-2 px-4 border">ISBN</td>
                  <td className="py-2 px-4 border">9788000000001</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">detailUrl</td>
                  <td className="py-2 px-4 border">상세 페이지 URL</td>
                  <td className="py-2 px-4 border">https://www.hanbit.co.kr/store/books/look.php?p_code=B1099552243</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4">
            시트2에는 다음과 같은 열을 생성합니다:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">열 이름</th>
                  <th className="py-2 px-4 border">설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border">requestDate</td>
                  <td className="py-2 px-4 border">신청 날짜</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">name</td>
                  <td className="py-2 px-4 border">신청자 이름</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">email</td>
                  <td className="py-2 px-4 border">이메일</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">institution</td>
                  <td className="py-2 px-4 border">소속 기관</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">department</td>
                  <td className="py-2 px-4 border">학과/부서</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">address</td>
                  <td className="py-2 px-4 border">배송 주소</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">reason</td>
                  <td className="py-2 px-4 border">신청 사유</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">bookId</td>
                  <td className="py-2 px-4 border">도서 ID</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">bookTitle</td>
                  <td className="py-2 px-4 border">도서 제목</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">bookAuthor</td>
                  <td className="py-2 px-4 border">도서 저자</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">bookIsbn</td>
                  <td className="py-2 px-4 border">도서 ISBN</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border">status</td>
                  <td className="py-2 px-4 border">처리 상태</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '2. Apps Script 설정하기',
      content: (
        <div>
          <p className="mb-4">
            구글 스프레드시트에서 다음 단계에 따라 Apps Script를 설정합니다:
          </p>
          <ol className="list-decimal list-inside mb-6 space-y-4">
            <li>
              스프레드시트 메뉴에서 <strong>확장 프로그램 &gt; Apps Script</strong>를 클릭합니다.
            </li>
            <li>
              Apps Script 편집기에서 기본 코드를 다음 코드로 대체합니다:
              <div className="relative mt-2 mb-4">
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto text-sm">
                  {`function doGet(e) {
  const sheet = e.parameter.sheet || 'Sheet1';
  const data = getSheetData(sheet);
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const sheetName = postData.sheet || 'Sheet2';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: \`시트 "\${sheetName}"를 찾을 수 없습니다\`
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (headers.length === 0) {
      // 새 시트면 헤더를 추가
      const defaultHeaders = [
        'requestDate', 'name', 'email', 'institution', 'department',
        'address', 'reason', 'bookId', 'bookTitle', 'bookAuthor',
        'bookIsbn', 'status'
      ];
      sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]);
      headers = defaultHeaders;
    }
    
    const rowData = [];
    headers.forEach(header => {
      rowData.push(postData.data[header] || '');
    });
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '데이터가 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);
  } 
  catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (!sheet) {
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const result = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const obj = {};
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    
    result.push(obj);
  }
  
  return result;
}`}
                </pre>
                <button 
                  className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    navigator.clipboard.writeText(`function doGet(e) {
  const sheet = e.parameter.sheet || 'Sheet1';
  const data = getSheetData(sheet);
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const sheetName = postData.sheet || 'Sheet2';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: \`시트 "\${sheetName}"를 찾을 수 없습니다\`
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (headers.length === 0) {
      // 새 시트면 헤더를 추가
      const defaultHeaders = [
        'requestDate', 'name', 'email', 'institution', 'department',
        'address', 'reason', 'bookId', 'bookTitle', 'bookAuthor',
        'bookIsbn', 'status'
      ];
      sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]);
      headers = defaultHeaders;
    }
    
    const rowData = [];
    headers.forEach(header => {
      rowData.push(postData.data[header] || '');
    });
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '데이터가 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);
  } 
  catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (!sheet) {
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const result = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const obj = {};
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    
    result.push(obj);
  }
  
  return result;
}`);
                    alert('코드가 클립보드에 복사되었습니다.');
                  }}
                >
                  <FaCopy />
                </button>
              </div>
            </li>
            <li>
              <strong>저장</strong> 버튼을 클릭한 후, 프로젝트 이름을 지정합니다 (예: "도서신청API").
            </li>
            <li>
              메뉴에서 <strong>배포 &gt; 새 배포</strong>를 클릭합니다.
            </li>
            <li>
              <strong>배포 유형 선택</strong>에서 <strong>웹 앱</strong>을 선택합니다.
            </li>
            <li>
              설명을 입력하고 다음과 같이 설정합니다:
              <ul className="list-disc list-inside ml-6 mt-2 mb-2">
                <li><strong>실행 대상:</strong> '나'</li>
                <li><strong>액세스 권한:</strong> '모든 사용자'</li>
              </ul>
            </li>
            <li>
              <strong>배포</strong> 버튼을 클릭합니다.
            </li>
            <li>
              Google 계정으로 로그인하고 필요한 권한을 승인합니다.
            </li>
            <li>
              배포가 완료되면 웹 앱 URL이 생성됩니다. 이 URL을 복사해두세요.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: '3. 웹 앱과 연동하기',
      content: (
        <div>
          <p className="mb-4">
            이제 웹 앱에서 스프레드시트와 연동하기 위해 API URL을 설정합니다:
          </p>
          <ol className="list-decimal list-inside mb-6 space-y-4">
            <li>
              앞서 복사한 웹 앱 URL을 코드에 적용합니다.
            </li>
            <li>
              <code>app/api/books/route.ts</code>와 <code>app/api/books/[id]/route.ts</code> 파일에서 다음 URL을 방금 받은 URL로 교체합니다:
              <pre className="bg-gray-100 p-3 my-2 rounded-md overflow-auto">
                {'https://script.google.com/macros/s/AKfycbzQZEuPLaavfZZS39wbvjz6FxHuMNgM2UHfNWw4nY8lOuHVZp5Ixu2Q3-h5rUYO3nKH/exec'}
              </pre>
            </li>
            <li>
              마찬가지로 <code>app/api/request/route.ts</code> 파일에서도 동일한 URL을 찾아 교체합니다.
            </li>
          </ol>
          <p className="mb-4">
            이제 견본 도서 신청 시스템이 구글 스프레드시트와 연동되어 작동합니다!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-green-800 font-bold mb-2 flex items-center">
              <FaCheckCircle className="mr-2 text-green-600" /> 연동 확인하기
            </h3>
            <p className="text-green-700">
              연동을 테스트하려면 웹 앱에서 도서 목록을 조회하거나 견본 신청을 해보세요. 신청 정보는 스프레드시트의 시트2에 자동으로 기록됩니다.
            </p>
          </div>
          <p className="mb-4">
            연동이 완료되었으니 이제 다음과 같은 기능이 가능합니다:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>구글 스프레드시트 시트1에서 도서 정보를 관리하고 웹앱에 반영</li>
            <li>신청된 도서 정보를 구글 스프레드시트 시트2에서 확인</li>
            <li>스프레드시트에서 신청 정보의 처리 상태를 관리</li>
          </ul>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/" className="text-primary flex items-center hover:underline">
          <FaArrowLeft className="mr-2" /> 메인 페이지로 돌아가기
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-8 text-center">구글 스프레드시트 연동 가이드</h1>
        
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-grow">
                <button
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
                <div
                  className={`h-1 flex-grow ${
                    index < steps.length - 1
                      ? activeStep > index + 1
                        ? 'bg-primary'
                        : 'bg-gray-200'
                      : 'hidden'
                  }`}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            {steps.map((step, index) => (
              <div key={index} className={`${activeStep === index + 1 ? 'block' : 'hidden'}`}>
                <h2 className="text-xl font-bold">{step.title}</h2>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          {steps.map((step, index) => (
            <div key={index} className={`${activeStep === index + 1 ? 'block' : 'hidden'}`}>
              {step.content}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className={`flex items-center ${
              activeStep === 1 ? 'invisible' : ''
            }`}
          >
            <FaArrowLeft className="mr-2" /> 이전 단계
          </button>
          <button
            onClick={nextStep}
            className={`btn-primary px-4 py-2 flex items-center ${
              activeStep === steps.length ? 'invisible' : ''
            }`}
          >
            다음 단계 <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
} 