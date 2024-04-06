let date = new Date();

//=====함수 정의 =====//

const isNotCurrMonth = (dates) => {
  const $dateContainer = document.querySelector('.date-container');
  dates.forEach((date, index) => {
    console.log(`${date}`);
    if( !date.currentMonth ) {
      $dateContainer.querySelector(`span[data-date-idx="${index}"]`).classList.add('inactive');
    }
  });    
}

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
  
  // 이전 달 마지막 날짜와 요일,
  // 이번 달 마지막 날짜 구하기
  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();
  
  const currLastDate = currLast.getDate();
  // const currLastDay = currLast.getDay();
  
  // 이번 달 달력에서 표시될 날짜 구하기 6주 * 7요일
  // 지난 달 마지막 주 + 이번 달 전체 + 다음 달 첫 주
  // 이번 달 1월이 아니면 그대로, 1월이면 연도-1년 12월
  const prevDates = Array
  .from({ length: prevLastDay + 1 }, 
    (_, index) => ({ 
      year: viewMonth !== 0 ? viewYear : viewYear - 1,
      month: viewMonth !== 0 ? viewMonth : viewMonth + 12,
      date: prevLastDate - prevLastDay + index,
      currentMonth: false,
    }));
    const currDates = Array
    .from({ length: currLastDate }, 
      (_, index) => ({
        year: viewYear,
        month: viewMonth + 1,
        date: index + 1,
        currentMonth: true,
      }));
      // 이번 달 12월이 아니면 그대로, 12월이면 연도+1년 1월
      const nextDates = Array
      .from({ length: 42 - prevDates.length - currDates.length }, 
        (_, index) => ({
          year: viewMonth + 1 !== 12 ? viewYear : viewYear + 1,
          month: viewMonth + 1 !== 12 ? viewMonth + 2 : viewMonth + 2 - 12,
          date: index + 1,
          currentMonth: false,
        }));
        
        // 배열 합치기 : 지난 달 마지막 주 + 이번 달 전체 + 다음 달 첫 주
        const dates = [...prevDates, ...currDates, ...nextDates];
        
  // Dates 태그 형태로 정리
  dates.forEach((date, i) => {
    dates[i] = `<div class="date-box"><span class="date-text" data-date-idx="${i}">${date.date}</span></div>`;
    date.id = i;
    console.log(date);
  })

  // Dates 화면 렌더링
  document.querySelector('.date-container').innerHTML = dates.join('');
  
  isNotCurrMonth(dates, viewMonth);
  // 이번 달이 아닌 날짜 흐리게 변경 클래스 추가

}


// 지난 달 이동 함수 (버튼)
// 다음 달 이동 함수 (버튼)
// 오늘 이동 함수 (버튼)


// 오늘 날짜 클래스 토글? 함수



//=== 함수 실행 영역

renderCalendar();