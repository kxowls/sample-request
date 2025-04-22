/**
 * 구글 스프레드시트 연동을 위한 Apps Script 코드입니다.
 * 구글 스프레드시트에서 확장 프로그램 > Apps Script를 선택하고 이 코드를 복사하여 붙여넣은 다음 배포합니다.
 */

function doGet(e) {
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
        error: `시트 "${sheetName}"를 찾을 수 없습니다`
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (headers.length === 0) {
      // 새 시트면 헤더를 추가
      let defaultHeaders;
      
      if (sheetName === 'Sheet2') {
        defaultHeaders = [
          'requestDate', 'name', 'email', 'institution', 'department',
          'address', 'reason', 'bookId', 'bookTitle', 'bookAuthor',
          'bookIsbn', 'status'
        ];
      } else if (sheetName === 'Sheet3') {
        defaultHeaders = [
          'email', 'name', 'institution', 'department', 'registrationDate'
        ];
      } else {
        defaultHeaders = Object.keys(postData.data);
      }
      
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
}

/**
 * 시트1 - 도서 목록
 * 열: title, author, publisher, price, image, description, category, isbn, detailUrl
 * 
 * 시트2 - 신청 정보
 * 열: requestDate, name, email, institution, department, address, reason, bookId, bookTitle, bookAuthor, bookIsbn, status
 * 
 * 시트3 - 이메일 인증
 * 열: email, name, institution, department, registrationDate
 */ 