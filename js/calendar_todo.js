import { goToMonth } from "./calendar.js";

const todoList = [
  {
    title: "할일 1",
    date: {year: 2024, month: 4, date: 21, day: 0},
    repeat: 1
  },
  {
    title: "할일 2",
    date: {year: 2024, month: 4, date: 22, day: 1},
    repeat: 0
  },
]
let todo = {title: "할일 3", date: {year: 2024, month: 4, date: 21, day: 0}, repeat: 0};

// 할 일 만들기로 추가 기능
// 만들기 버튼 누르면 모달 나타남
// 1. 할일 입력 textarea.txt-field
// 2. 기한 입력 button + div#drop-content.content-calendar

// 2-2. 요일 숫자를 받으면 "ㅇ요일" 텍스트 반환 함수
const getDayText = (dayNum) => {
  let dayKorText = '';

  switch(dayNum) {
    case 0: 
      dayKorText = "일요일";
      break;
    case 1: 
      dayKorText = "월요일";
      break;
    case 2: 
      dayKorText = "화요일";
      break;
    case 3:
      dayKorText = "수요일";
      break;
    case 4:
      dayKorText = "목요일";
      break;
    case 5:
      dayKorText = "금요일";
      break;
    case 6:
      dayKorText = "토요일";
      break;
  }
  return dayKorText;
};

// 2-1. 달력에서 날짜 선택 시 버튼 textContent가 날짜로 변경하고 객체 리턴 함수
const getSelectedDate = (e) => {
  
  // e.target이 span이면 그대로, span 상위요소면 qS로 span 선택 
  const $selectedDateBox =  (e.target.matches('.date-text') && e.target) || e.target.querySelector('.date-text');
  
  // 달력 헤더 year-month에서 연월 가져옴
  const yearMonthText = $selectedDateBox.closest('.monthly').querySelector('.year-month').textContent;
  const selectedYear = yearMonthText.slice(0, 4);
  const selectedMonth = yearMonthText.slice(-2, -1);
  
  // 선택한 요소의 날짜, 요일 구하기
  const selectedDate = $selectedDateBox.textContent;
  const selectedDay = $selectedDateBox.dataset.dateIdx % 7;

  console.log(selectedDate);
  console.log(selectedDay);

  // button.time-btn 기한 없음을 선택한 날짜로 변경
  // 2-2. getDayText(number)로 요일 텍스트로 표시
  const $btnDate = e.target.closest('.select-time').firstElementChild;
  $btnDate.textContent 
  = `${selectedYear}. ${selectedMonth}. ${selectedDate}. ${getDayText(selectedDay)}`;

  // 추후 할일 객체에 날짜 추가하기 위해 객체 리턴
  return {year: selectedYear, month: selectedMonth, date: selectedDate, day: selectedDay};
}

// 3. 반복 안함 button + div#drop-content.content-repeat
// 3-1. 버튼에 선택한 반복 옵션 표시,
//      todo 객체에 repeat 옵션값 저장
// 0: 반복 안함, 1: 매일, 2: 매주, 3: 매월
const getReccurrenceOption = (target) => {
  const optionText = target.textContent;
  let $btnRepeat = target.closest('.repeat-btn');
  let repeatOptionNum = 0;

  if(optionText === '매일') {
    repeatOptionNum = 1;
    $btnRepeat.textContent = '매일';
  } else if (optionText === '매주') {
    repeatOptionNum = 2;
    // 가능하면 위 기한 함수 리턴되는 객체에서 day 가져오기
    // $btnRepeat.textContent = `매주 ${dayKorText(day)}`;
    $btnRepeat.textContent = `매주`;
  } else if (optionText = '매월') {
    repeatOptionNum;
    $btnRepeat.textContent = `매월`;
    // $btnRepeat.textContent = `매월 ${date}일`;
  }
  todo.repeat = repeatOptionNum;
  console.log(todo.repeat);

  // return repeatOptionNum;
};
// 3-2. 반복옵션에 따라 캘린더에 렌더하는 함수
const renderRepeatToCalendarView = ({title, date, repeat}) => {
  // 메인 캘린더의 date-container 선택
  $dateContainer = document.querySelector('#main-content .date-container');
  
  const $repeatlist = document.createElement('li');
  $repeatlist.textContent = title;
  $repeatlist.classList.add('calendar-list');

  // date-container 전체반복해서 설정한 기간보다 뒤면 리스트태그 추가
  // new Date(date.year, date.month, date.date) 로 크기 비교
  // ul.date-todo appendChild li태그
  //     <li></li>


};

// 모달 저장 버튼 클릭 시 추가 완료



//===== 함수 실행 영역 =====//


// 드롭다운 이전 달 버튼 클릭 이벤트 핸들러
document.querySelector('.dropdown .go-prev').parentElement.addEventListener('click', () => {
  console.log("이전버튼");
  goToMonth(-1); // 방향을 -1로 설정하여 이전 달로 이동
});

// 드롭다운 다음 달 버튼 클릭 이벤트 핸들러
document.querySelector('.dropdown .go-next').parentElement.addEventListener('click', () => {
  console.log("다음버튼");
  goToMonth(1); // 방향을 1로 설정하여 다음 달로 이동
});

document.querySelector('.dropdown .date-container').addEventListener('click', e => {
  console.log("드롭다운 날짜 선택");
  getSelectedDate(e);
});

// 테스트를 위해 html script에서 가져왔습니다. 병합 시 주의!
const $selectRepeat = document.querySelector(".select-repeat");
const $contentRepeat = document.querySelector(".content-repeat");
$selectRepeat.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  $contentRepeat.classList.add("show");

  // e.target 드롭다운 특정 메뉴일 때 mathces(selector)로 조건 판단
  getReccurrenceOption(e.target);
  console.log(e.target.textContent);
  renderRepeatToCalendarView(todo);
});