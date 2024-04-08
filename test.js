let date = new Date();

// const renderCalendar = () => {
  // 오늘 기준 연도, 월 구하기
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth() + 2;

  // 캘린더 헤더 제목 오늘 기준으로 변경
  // document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

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
  // const prevDates = Array.from({ length: prevLastDay + 1 }, (_, index) => prevLastDate - prevLastDay + index);
  // const currDates = Array.from({ length: currLastDate }, (_, index) => index + 1);
  // const nextDates = Array.from({ length: 42 - prevDates.length - currDates.length }, (_, index) => index + 1);

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

  const dates = [...prevDates, ...currDates, ...nextDates];

  console.log(prevLast);
  console.log(currLast);
  console.log(prevLastDate);
  console.log(prevLastDay);
  console.log(currLastDate);
  console.log(currLastDay);
  console.log(prevDates);
  console.log(currDates);
  console.log(nextDates);
  console.log(dates);
  // console.log(Array(currLastDate + 1).keys());