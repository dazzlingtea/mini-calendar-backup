
import { saveTodoList, loadTodoList } from "./localStorage.js";
import { toDoList } from "./data.js";
import { days } from "./date_utils.js";

// 현재 기준 날짜 및 시간
let dateNow = new Date();

const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();

saveTodoList(toDoList);

//=========모달 기한 입력=========//

// span에서 날짜 구하고 객체 리턴하는 함수
const getDateInfoFromSpan = ($span) => {
  const yearMonthText = $span.dataset.date; // "2024-4"
  const selectedYear = +yearMonthText.split("-")[0]; // 2024
  const selectedMonth = +yearMonthText.split("-")[1]; // 4
  const selectedDate = $span.textContent;
  const selectedDay = $span.parentElement.dataset.dateIdx % 7;

  return {
    year: selectedYear,
    month: selectedMonth,
    date: selectedDate,
    day: selectedDay,
  };
};

// 2-1. 달력에서 날짜 선택 시 버튼 textContent가 날짜로 변경하고 객체 리턴 함수
const getSelectedDate = (e) => {
  // e.target이 span이면 그대로, span 상위요소면 qS로 span 선택
  const $selectedDateSpan =
    (e.target.matches(".date-text") && e.target) ||
    e.target.querySelector(".date-text");

  const {year, month, date, day} = getDateInfoFromSpan($selectedDateSpan);

  // 2-2. button.time-btn 기한 없음을 선택한 날짜로 변경
  // 2-2-1. getDayText(number) 요일 텍스트로 표시
  const $btnTime = e.target.closest(".select-time").firstElementChild;
  $btnTime.textContent = `${year}. ${month}. ${date}. ${days[day]}`;

};

// 3. 반복 안함 button + div#drop-content.content-repeat
// 3-1. 버튼에 선택한 반복 옵션 표시,
//      repeat 옵션값 리턴
// 0: 반복 안함, 1: 매일, 2: 매주, 3: 매월
const setReccurrenceOption = (target) => {
  // e.target이 a이면 그대로, a 상위요소면 qS로 a 선택
  const $selectedOption =
  (target.matches(".repeat-option") && target) ||
  target.querySelector(".repeat-option");

  // optionText와 반복 버튼의 텍스트요소 가져오기
  let optionText = $selectedOption.textContent;
  let $btnRepeat = document.querySelector("button.repeat-btn");
  let repeatOptionNum = 0;

  // 옵션에 따라 버튼 텍스트 변경 및 
  //           todo객체에 repeat키 값 저장
  if (optionText === "매일") {
    repeatOptionNum = 1;
    $btnRepeat.textContent = optionText;
  } else if (optionText === "매주") {
    repeatOptionNum = 2;
    $btnRepeat.textContent = optionText;
  } else if ((optionText = "매월")) {
    repeatOptionNum = 3;
    $btnRepeat.textContent = optionText;
  }
  
  // todo.repeat = repeatOptionNum;

};

// 3-2. 반복옵션에 따라 캘린더 뷰에 렌더하는 함수
//      매개변수로 todoList 가져오기
const renderRepeatToCalendarView = (todoList) => {
  // 메인 캘린더의 date-container 선택해서 date-box 배열로 저장
  const dateBoxArr = Array.from(document.querySelector("#main-content .date-container").children);
  
 
  const viewTimeArr = generateViewTimeArray(dateBoxArr);

  // 할일 리스트의 할일 마다 해당하는 날짜에 렌더
  todoList.forEach((todo) => {
    // todo의 repeat 값 따라 리스트 추가할 날짜만 필터
    const filteredViewTimeArr = filterViewTimeArray(viewTimeArr, todo);
    
    // 필터된 날짜에 할일 리스트 추가
    renderTodoItems(filteredViewTimeArr, dateBoxArr, todo);
  });
  
};
// 캘린더뷰 기준 date-box를 각각 인덱스와 Date객체로 변환한 배열 생성
const generateViewTimeArray = (dateBoxArr) => {
  return dateBoxArr.map(dateBox => {
    const { year, month, date } = getDateInfoFromSpan(dateBox.firstElementChild);
    const dateBoxIdx = +dateBox.dataset.dateIdx;
    return { dateObj: new Date(`${year}-${month}-${date}`), dateBoxId: dateBoxIdx };
  });
};

// 반복 옵션에 따라 캘린더뷰에서 조건에 맞는 날짜만 필터링
const filterViewTimeArray = (viewTimeArr, todo) => {
  // todo의 날짜 구하기
  const month = (todo.time.month > 1) ? todo.time.month - 1 : 0;
  const todoTime = new Date(todo.time.year, month, todo.time.date, 0, 0, 0, 0);

  return viewTimeArr.filter(({ dateObj: viewTime }, dateBoxId) => {
    let option = todo.repeat;
    // 매일 반복은 todoTime 이상의 viewTime만 필터링
    if (option === 1) return viewTime.getTime() >= todoTime.getTime();
    // 매주 반복은 todoTime 이상의 viewTime이면서 요일이 같을 때만 필터링
    else if (option === 2) return viewTime.getTime() >= todoTime.getTime() && todo.time.day === dateBoxId % 7;
    // 매월 반복은 todoTime 이상의 viewTime이면서 날짜가 같을 때만 필터링
    else if (option === 3) return viewTime.getTime() >= todoTime && todo.time.date === viewTime.getDate();
    // 반복 안함은 todo 날짜만 필터링
    else if (option === 0) return viewTime.getTime() === todoTime.getTime();
    else return false;
  });
};
// 필터링된 날짜에 해당 할일을 캘린더뷰에 태그 추가하는 함수
const renderTodoItems = (filteredViewTimeArr, dateBoxArr, todo) => {
  filteredViewTimeArr.forEach(({ dateBoxId }) => {
    // li 태그를 생성해 todo 정보를 담기
    const $repeatLi = document.createElement("li");
    $repeatLi.textContent = todo.title;
    $repeatLi.classList.add("cal-list");
    $repeatLi.style.backgroundColor = todo.color;
    $repeatLi.setAttribute("data-list-idx", todo.id);

    // 날짜에 맞는 date-box ul에 li태그 추가
    const $ul = dateBoxArr[0].parentElement.querySelector(`div[data-date-Idx="${dateBoxId}"] ul`);
    $ul.appendChild($repeatLi);
    // 해당 날짜가 캘린더뷰에서 비활성화됐다면 할일도 비활성화 처리
    if ($ul.previousElementSibling.classList.contains('inactive')) {
      $ul.classList.add('inactive');
    }
  });
};

// 모달 저장 버튼 클릭 시 추가 완료
const insertCal = (obj) => {
	console.log(obj);
	const time = obj.time !== "기한 없음" ? util.getDateInfoFromText(obj.time) : {
		year: todayYear,
		month: todayMonth,
		date: todayDate,
		day: todayDay,
	};
  let toDoList = loadTodoList();
	toDoList.push({
		id: toDoList.length + 1,
		title: obj.title,
		time,
		repeat : REPEAT.NO,
		done: false,
	});
  saveTodoList(toDoList);
	renderRepeatToCalendarView(toDoList);
}




export { insertCal, getSelectedDate, setReccurrenceOption, renderRepeatToCalendarView };