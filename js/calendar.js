// 현재 기준 날짜 및 시간
let dateNow = new Date();
const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();

let viewYear = todayYear;
let viewMonth = todayMonth;

//=====함수 정의 =====//

// inactive 클래스 추가하는 함수
// 캘린더에 표시된 이번달 = 지난달 말 + 이번달 + 다음달 초 (dates 배열)
const addInactiveClass = (dates, ele) => {
  // .date-container 요소 후손 중에서 찾기
  // const $dateContainer = document.querySelector(".date-container");
  // iterate  date 요소
  dates.forEach((date, index) => {
    // currentMonth: false인 span 태그에 inactive 클래스 추가
    if (!date.currentMonth) {
      const $spanDateText = ele.querySelector(
        `span[data-date-idx="${index}"]`
      );
      $spanDateText.classList.add("inactive");
    }
  });
};
// 오늘 날짜가 현재 뷰에 있다면 div.today-circle 추가하는 함수
const addTodayCircle = (dates, ele) => {
  // datesView에서 오늘 날짜 인덱스 구하기
  const todayIndex = dates.findIndex(
    ({ year, month, date }) =>
      year === todayYear && month === todayMonth + 1 && date === todayDate
  );

  // 현재 뷰에 오늘 날짜가 있다면 태그 추가, 없으면 변화 없음
  if (todayIndex > -1) {
    const $todaySpan = ele.querySelector(
      `span[data-date-idx="${todayIndex}"]`
    );

    // computed style에서 색상 값 가져오기
    const textColor = window.getComputedStyle($todaySpan).color;

    // div.today-circle 태그 생성
    const $todayCircle = document.createElement("div");
    $todayCircle.classList.add("today-circle");
    $todayCircle.textContent = $todaySpan.textContent;
    $todayCircle.style.backgroundColor = textColor;

    // 오늘 날짜 div.date-box에 div.today-circle 태그 추가
    $todaySpan.parentElement.appendChild($todayCircle);
  }
};
const generateDatesView = (year, month) => {
  // 지난 달 마지막 날, 이번 달 마지막 날
  // new Date(year, monthIndex, day);
  // 세번째 인수 0은 이전 달의 마지막 날 의미
  const prevLast = new Date(year, month, 0);
  const currLast = new Date(year, month + 1, 0);

  // 지난 달 마지막 날짜와 요일,
  // 이번 달 마지막 날짜 구하기
  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();

  const currLastDate = currLast.getDate();
  // const currLastDay = currLast.getDay();

  // 지난 달 말 + 이번 달 전체 + 다음 달 초
  // 이번 달 1월이 아니면 그대로, 1월이면 연도-1년 12월
  const prevDates = Array.from({ length: prevLastDay + 1 }, (_, index) => ({
    year: month !== 0 ? year : year - 1,
    month: month !== 0 ? month : month + 12,
    date: prevLastDate - prevLastDay + index,
    currentMonth: false,
  }));
  const currDates = Array.from({ length: currLastDate }, (_, index) => ({
    year: year,
    month: month + 1,
    date: index + 1,
    currentMonth: true,
  }));
  // 이번 달 12월이 아니면 그대로, 12월이면 연도+1년 1월
  const nextDates = Array.from(
    { length: 42 - prevDates.length - currDates.length },
    (_, index) => ({
      year: month + 1 !== 12 ? year : year + 1,
      month: month + 1 !== 12 ? month + 2 : month + 2 - 12,
      date: index + 1,
      currentMonth: false,
    })
  );

  // 배열 합치기 : 지난 달 말 + 이번 달 전체 + 다음 달 초
  return [...prevDates, ...currDates, ...nextDates];
};

// 캘린더뷰 날짜 렌더링 함수 (6주 * 7요일 = 총 42칸)
const renderCalendarView = (year = todayYear, month = todayMonth) => {
  // 캘린더뷰 초기값은 현재 기준 연월
  viewYear = year;
  viewMonth = month;

  // 캘린더 헤더 제목은 뷰 기준으로 변경
  // qsAll로 수정
  const calendarHeader = document.querySelectorAll(".year-month");
  calendarHeader.forEach(ele => {
  ele.textContent = `${viewYear}년 ${viewMonth + 1}월`;
  });

  // datesView 배열 생성
  const datesView = generateDatesView(viewYear, viewMonth);

  // Dates 태그 형태로 정리
  const tagDates = datesView.map((date, i) => {
    date.id = i; // 원본 배열의 객체마다 id 추가
    return  `<div class="date-box">
        <span class="date-text" data-date-idx="${i}">${date.date}</span>
        <ul class="date-todo"></ul>
      </div>`;
  });

  // Dates 화면 렌더링
  // document.querySelector(".date-container").innerHTML = tagDates.join("");
  const arr = document.querySelectorAll(".date-container");
  arr.forEach(ele => {
   // if (ele.classList.contains("weekly"))//weekly 예외처리(수정)
     //   return ;
    ele.innerHTML = tagDates.join("");
    // viewMonth 아닌 날짜만 흐리게 스타일 변경하는 클래스 추가
    addInactiveClass(datesView, ele);
  
    // 현재 달과 viewMonth가 일치할 때만 함수 실행
    if (todayMonth === viewMonth) {
      // 오늘 날짜 div.today-circle 추가 함수
      addTodayCircle(datesView, ele);
    }
  })

  // // viewMonth 아닌 날짜만 흐리게 스타일 변경하는 클래스 추가
  // addInactiveClass(datesView);

  // // 현재 달과 viewMonth가 일치할 때만 함수 실행
  // if (todayMonth === viewMonth) {
  //   // 오늘 날짜 div.today-circle 추가 함수
  //   addTodayCircle(datesView);
  // }
};

// 이전 달 또는 다음 달로 이동하는 함수
const goToMonth = (direction) => {
  // 현재 월에 방향을 더하고, 12로 나눈 나머지를 새로운 월로 설정
  viewMonth = (viewMonth + direction + 12) % 12;

  // 이전 달로 이동할 때 연도 조정
  if (viewMonth === 11 && direction === -1) {
    viewYear--;
  }
  // 다음 달로 이동할 때 연도 조정
  if (viewMonth === 0 && direction === 1) {
    viewYear++;
  }
  
  renderCalendarView(viewYear, viewMonth); // 달력 다시 렌더링
};

// 선택한 날짜에 맞게 Weekly 구현
const renderWeeklyView = (e) => {
  // 선택한 요소(달력)에서 태그를 가져와 weekly의 date-container에 추가

  // 1. 선택한 요소는 달력에서 클릭했으므로 date-container가 존재
  // 1-1. 초기값으로 today 기준 weekly 렌더 
  //      이벤트 발생 시 e.target을 기준으로 weekly 렌더
  const $selectedDateBox = e ? e.target : document.querySelector(".today-circle").parentElement;
  const $selectedCalendar = $selectedDateBox.closest('.date-container');

  // 1-1. data-date-idx 는 언제나 달력에서 0 ~ 41까지 고정됨
  // 1-2. data-date-idx 를 7로 나눈 나머지가 해당 날짜의 요일
  const selectedDateIdx = $selectedDateBox.firstElementChild.dataset.dateIdx;
  const selectedDay = selectedDateIdx % 7;

  // 2. 선택한 날짜가 있는 주의 첫번째 날짜(일요일)의 data-date-idx 추출
  const startDateIdx = selectedDateIdx - selectedDay;

  // 3. weekly의 date-container에 추가
  const tagDatesWeek = [];

  for (let i = startDateIdx; i < 7 + startDateIdx; i++) {
    // 3-1. weekly의 시작날짜 태그부터 마지막(토요일) 태그를 배열에 추가
    tagDatesWeek.push($selectedCalendar.children[i].outerHTML);
  }

  // 3-2. 배열을 weeklyDateContainer의 자식으로 추가

  // const $weekly = document.querySelector('.weekly');
  // const $weeklyDateContainer = $weekly.querySelector('.date-container');
  // $weeklyDateContainer.innerHTML = tagDatesWeek.join("");
};

//===== 함수 실행 영역 =====//

// 초기화면: 오늘 기준 calendar 렌더
renderCalendarView();
// 초기화면: 이벤트 없이 weekly 렌더
renderWeeklyView();

// 이전 달 버튼 클릭 이벤트 핸들러
document.querySelector('.go-prev').parentElement.addEventListener('click', () => {
  goToMonth(-1); // 방향을 -1로 설정하여 이전 달로 이동
});

// 다음 달 버튼 클릭 이벤트 핸들러
document.querySelector('.go-next').parentElement.addEventListener('click', () => {
  goToMonth(1); // 방향을 1로 설정하여 다음 달로 이동
});
// 오늘 버튼 클릭 이벤트 핸들러
document.querySelector('.go-today').parentElement.addEventListener('click', () => {
  renderCalendarView(todayYear, todayMonth);
});


// 선택한 날짜에 따라 weekly 구현하는 함수
document.querySelector('.date-container').addEventListener('click', e => {
  renderWeeklyView(e);
});

export { goToMonth, renderWeeklyView };
