let date = new Date();

const renderCalendar = () => {
  // 오늘 기준 연도, 월 구하기
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // 캘린더 헤더 제목 오늘 기준으로 변경
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  // 지난 달 마지막 날, 이번 달 마지막 날
  // new Date(year, monthIndex, day);
  // 세번째 인수 0은 이전 달의 마지막 날 의미
  const prevLast = new Date(viewYear, viewMonth, 0);
  const currLast = new Date(viewYear, viewMonth + 1, 0);

  // 지난 달 마지막 날짜와 요일,
  // 이번 달 마지막 날짜와 요일 구하기
  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();

  const currLastDate = currLast.getDate();
  const currLastDay = currLast.getDay();

  // 날짜 기본 배열
  const prevDates = [];
  const currDates = [...Array(currLastDate + 1).keys()].slice(1);
  const nextDates = [];

  // 달력 합치기
  // 지난달 마지막 요일이 토요일이 아니면 지난달 날짜 추가
  if(prevLastDay !== 6) { 
    for(let i = 0; i < prevLastDay + 1; i++) {
      prevLastDate.unshift(prevLastDate - i);
    }
  }

  // nextDates 계산
  for(let i = 1; i < 7 - currLastDay; i++) {
    nextDates.push(i);
  }

  // Dates 합치기
  const dates = [...prevDates, ...currDates, ...nextDates];

  // Dates 태그 형태로 정리
  dates.forEach((date, i) => {
    dates[i] = `<div class="date-box"><span class="date-text">${date}</span></div>`;
  })

  // Dates 화면 렌더링
  document.querySelector('.date-container').innerHTML = dates.join('');
}


// 지난 달 이동 함수 (버튼)
// 다음 달 이동 함수 (버튼)
// 오늘 이동 함수 (버튼)

// 이번 달이 아닌 날짜 흐리게 변경 클래스 추가

// 오늘 날짜 클래수 토글? 함수



//=== 함수 실행 영역

renderCalendar();