import modalEvent from "./modal.js";
import { goToMonth, renderWeeklyView, renderCalendarView } from "./calendar.js";
import {
  insertCal,
  getSelectedDate,
  setReccurrenceOption,
  renderRepeatToCalendarView,
} from "./calendar_todo.js";
import { saveTodoList, loadTodoList } from "./localStorage.js";

// 현재 기준 날짜 및 시간
let dateNow = new Date();

const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();

//===== 함수 실행 영역 =====//

let todoList = loadTodoList();
// 초기화면: 오늘 기준 calendar 렌더
console.log(document.querySelector('#main-content section.calendar'));
renderCalendarView(todayYear,todayMonth, document.querySelector('#main-content .calendar'));
// 초기화면: 이벤트 없이 weekly 렌더
renderWeeklyView();
renderRepeatToCalendarView(todoList);

// 이전 달 버튼 클릭 이벤트 핸들러
document
  .querySelector(".go-prev")
  .parentElement.addEventListener("click", () => {
    goToMonth(-1); // 방향을 -1로 설정하여 이전 달로 이동
    renderRepeatToCalendarView(todoList);
  });

// 다음 달 버튼 클릭 이벤트 핸들러
document
  .querySelector(".go-next")
  .parentElement.addEventListener("click", () => {
    goToMonth(1); // 방향을 1로 설정하여 다음 달로 이동
    renderRepeatToCalendarView(todoList);
  });
// 오늘 버튼 클릭 이벤트 핸들러
document
  .querySelector(".go-today")
  .parentElement.addEventListener("click", e => {
    renderCalendarView(todayYear, e.target.closest('.calendar'));
    renderRepeatToCalendarView(todoList);
  });

// 선택한 날짜에 따라 weekly 구현하는 함수
document.querySelector(".date-container").addEventListener("click", (e) => {
  renderWeeklyView(e);
});

//===== 모달, 드롭다운 =====//

// ++ todoList 업데이트
// todoList = loadTodoList();
// console.log(todoList);
modalEvent();

// 드롭다운 이전 달 버튼 클릭 이벤트 핸들러
document
  .querySelector(".dropdown .go-prev")
  .parentElement.addEventListener("click", () => {
    console.log("이전버튼");
    goToMonth(-1); // 방향을 -1로 설정하여 이전 달로 이동
  });

// 드롭다운 다음 달 버튼 클릭 이벤트 핸들러
document
  .querySelector(".dropdown .go-next")
  .parentElement.addEventListener("click", () => {
    console.log("다음버튼");
    goToMonth(1); // 방향을 1로 설정하여 다음 달로 이동
  });

document
  .querySelector(".dropdown .date-container")
  .addEventListener("click", (e) => {
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
});
$contentRepeat.addEventListener("click", (e) => {
  console.log("a 선택");
  console.log(e.target);
  // e.target 드롭다운 옵션 조건 판단
  setReccurrenceOption(e.target);
});
// 투두리스트 추가 수정 삭제 마다 render 해야 함
// renderRepeatToCalendarView(todoList);

/* save button */
const $saveBtn = document.querySelector(".wrapper-btn .save");
const $textArea = document.querySelector("textarea.txt-field");
$textArea.addEventListener("keyup", (e) => {
  if ($textArea.value) {
    $saveBtn.classList.add("on");
  } else {
    $saveBtn.classList.remove("on");
  }
});

$saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if ($saveBtn.classList.contains("on")) {
    insertCal({
      title: $textArea.value,
      time: $selectTime.firstElementChild.textContent,
      repeat: $selectRepeat.firstElementChild.textContent,
    });
    $modalOverlay.classList.add("hidden");
  }
});
