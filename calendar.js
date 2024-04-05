const date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const currLast = new Date(viewYear, viewMonth + 1, 0);


  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();

  const currLastDate = currLast.getDate();
  const currLastDay = currLast.getDay();

  const prevDates = [];
  // const currDates = [...]
  const nextDates = [];

  // 달력 합치기
  if(prevLastDay !== 6) { 
    // 지난달 마지막 요일이 토요일이 아니면 지난달 날짜 추가
    
  }
}