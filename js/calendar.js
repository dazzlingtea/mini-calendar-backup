
import { loadTodoList } from "./localStorage.js";


// 현재 기준 날짜 및 시간
let dateNow = new Date();

const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();

let viewYear = todayYear;
let viewMonth = todayMonth;



//=====함수 정의 =====//

// inactive 클래스 추가하는 함수
const addInactiveClass = (dates, ele) => {
  dates.forEach((date, index) => {
    // currentMonth: false인 span 태그에 inactive 클래스 추가
    if (!date.currentMonth) {
      const $spanDateText = ele.querySelector(
        `div[data-date-idx="${index}"]`
      ).firstElementChild;
      $spanDateText.classList.add("inactive");
    }
  });
};
//  div.today-circle 추가하는 함수
const addTodayCircle = (dates, ele) => {
  // datesView에서 오늘 날짜 인덱스 구하기
  const todayIndex = dates.findIndex(
    ({ year, month, date }) =>
      year === todayYear && month === todayMonth + 1 && date === todayDate
  );

  // 현재 뷰에 오늘 날짜가 있다면 태그 추가, 없으면 변화 없음
  if (todayIndex > -1) {
    const $todaySpan = ele.querySelector(
      `div[data-date-idx="${todayIndex}"]`
    ).firstElementChild;

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

  const prevLast = new Date(year, month, 0);
  const currLast = new Date(year, month + 1, 0);

  const prevLastDate = prevLast.getDate();
  const prevLastDay = prevLast.getDay();
  const currLastDate = currLast.getDate();

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
  return [...prevDates, ...currDates, ...nextDates];
};


const renderCalendarView = (year = todayYear, month = todayMonth, parent) => {
  viewYear = year;
  viewMonth = month;

  parent.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const datesView = generateDatesView(viewYear, viewMonth);

  const tagDates = datesView.map((date, i) => {
    date.id = i; // 원본 배열의 객체마다 id 추가
    return `<div class="date-box" data-date-idx="${i}">
        <span class="date-text" data-date="${date.year}-${date.month}">${date.date}</span>
        <ul class="date-todo"></ul>
      </div>`;
  });

  // 태그 HTML에 추가
  const $dateContainer = parent.querySelectorAll(".date-container");
  $dateContainer.innerHTML = tagDates.join("");

  addInactiveClass(datesView, $dateContainer);
  if (todayMonth === viewMonth) {
    addTodayCircle(datesView, $dateContainer);
  }
};


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

const renderWeeklyView = (e) => {
  // 선택한 요소(달력)에서 태그를 가져와 weekly의 date-container에 추가
  const $selectedDateBox = e
    ? e.target
    : document.querySelector(".today-circle").parentElement;
  const $selectedCalendar = $selectedDateBox.closest(".date-container");

  const selectedDateIdx = $selectedDateBox.dataset.dateIdx;
  const selectedDay = selectedDateIdx % 7;

  const startDateIdx = selectedDateIdx - selectedDay;

  const tagDatesWeek = [];

  for (let i = startDateIdx; i < 7 + startDateIdx; i++) {
    tagDatesWeek.push($selectedCalendar.children[i].outerHTML);
  }

  const $weekly = document.querySelector('.weekly');
  if ($weekly) {
    const $weeklyDateContainer = $weekly.querySelector('.date-container');
    $weeklyDateContainer.innerHTML = tagDatesWeek.join("");
  }
};

export { goToMonth, renderWeeklyView, renderCalendarView };
