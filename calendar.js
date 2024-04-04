const date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);


  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();

  const thisLastDate = thisLast.getDate();
  const thisLastDay = thisLast.getDay();

  const prevDates = [];
  // const thisDates = [...]
  const nextDates = [];

  // 달력 합치기
  if(prevLastDay !== 6) { 
    // 지난달 마지막 요일이 토요일이 아니면 지난달 날짜 추가
    
  }
}