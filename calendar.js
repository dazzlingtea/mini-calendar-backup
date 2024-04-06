let date = new Date();

//=====함수 정의 =====//

// inactive 클래스 추가하는 함수 
// 캘린더에 표시된 이번달 = 지난달 말 + 이번달 + 다음달 초 (dates 배열)  
const addInactiveClass = (dates) => {
  // .date-container 요소 후손 중에서 찾기
  const $dateContainer = document.querySelector('.date-container');
  // iterate  date 요소)
  dates.forEach((date, index) => {
    // currentMonth: false인 span 태그에 inactive 클래스 추가
    if (!date.currentMonth) {
      const $spanDateText = $dateContainer.querySelector(`span[data-date-idx="${index}"]`);
      $spanDateText.classList.add('inactive');
    }
  });    
}

// 캘린더 뷰에서 표시될 날짜 구하는 함수 (6주 * 7요일 = 총 42칸)
const renderCalendarView = () => {
  // 캘린더 뷰 기본값은 현재시각 기준 연월
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();
  
  // 캘린더 헤더 제목은 뷰 기준으로 변경
  // 버튼 고려해서 수정할 예정
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;
  
  // 지난 달 마지막 날, 이번 달 마지막 날
  // new Date(year, monthIndex, day);
  // 세번째 인수 0은 이전 달의 마지막 날 의미
  const prevLast = new Date(viewYear, viewMonth, 0);
  const currLast = new Date(viewYear, viewMonth + 1, 0);
  
  // 지난 달 마지막 날짜와 요일,
  // 이번 달 마지막 날짜 구하기
  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();
  
  const currLastDate = currLast.getDate();
  // const currLastDay = currLast.getDay();
  
  // 지난 달 말 + 이번 달 전체 + 다음 달 초
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
        
  // 배열 합치기 : 지난 달 말 + 이번 달 전체 + 다음 달 초
  const dates = [...prevDates, ...currDates, ...nextDates];
        
  // Dates 태그 형태로 정리
  const tagDates = dates.map((date, i) => {
    date.id = i; // 원본 배열의 객체마다 id 추가
    return `<div class="date-box"><span class="date-text" data-date-idx="${i}">${date.date}</span></div>`;
  })

  // Dates 화면 렌더링
  document.querySelector('.date-container').innerHTML = tagDates.join('');
  
  // 이번 달이 아닌 날짜만 흐리게 스타일 변경하는 클래스 추가
  addInactiveClass(dates);

}


// 지난 달 이동 함수 (버튼)
// 다음 달 이동 함수 (버튼)
// 오늘 이동 함수 (버튼)


// 오늘 날짜 클래스 토글? 함수



//=== 함수 실행 영역

renderCalendarView();