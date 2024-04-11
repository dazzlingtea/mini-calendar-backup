import { toDoList } from "./data.js";
import { days } from "./date_utils.js";

let dateNow = new Date();
const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();

let viewYear = todayYear;
let viewMonth = todayMonth;

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

const getSelectedDate = (e) => {
	// e.target이 span이면 그대로, span 상위요소면 qS로 span 선택
	const $selectedDateSpan =
		(e.target.matches(".date-text") && e.target) ||
		e.target.querySelector(".date-text");

	const { year, month, date, day } = getDateInfoFromSpan($selectedDateSpan);

	const $btnTime = e.target.closest(".select-time").firstElementChild;
	$btnTime.textContent = `${year}. ${month}. ${date}. ${days[day]}`;
};

// 3-2. 반복옵션에 따라 캘린더 뷰에 렌더하는 함수
//      매개변수로 todoList 가져오기
const renderRepeatToCalendarView = (todoList) => {
	let $weeklyContainer = document.querySelector("#main-content .container-2 .weekly .date-container");
	$weeklyContainer = $weeklyContainer ? $weeklyContainer : document.querySelector("#main-content .date-container");
	if (!$weeklyContainer) return;
	const dateBoxArr = [...$weeklyContainer.children];
	const viewTimeArr = generateViewTimeArray(dateBoxArr);
	dateBoxArr.forEach(ele => {
		ele.querySelector(".date-todo").innerHTML = "";
	});
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
// 필터링된 날짜에 해당 할일을 캘린더뷰에 렌더하는 함수
const renderTodoItems = (filteredViewTimeArr, dateBoxArr, todo) => {
	filteredViewTimeArr.forEach(({ dateBoxId }) => {

		// li 태그를 생성해 todo 정보를 담기
		const $repeatLi = document.createElement("li");
		$repeatLi.textContent = todo.title;
		$repeatLi.classList.add("cal-list");
		$repeatLi.style.backgroundColor = todo.color;

		// 날짜에 맞는 date-box ul에 li태그 추가
		const $ul = dateBoxArr[0].parentElement.querySelector(`div[data-date-Idx="${dateBoxId}"] ul`);
		$ul.appendChild($repeatLi);
		// 해당 날짜가 캘린더뷰에서 비활성화됐다면 할일도 비활성화 처리
		if ($ul.previousElementSibling.classList.contains('inactive')) {
			$ul.classList.add('inactive');
		}
	});
};

const addInactiveClass = (dates, ele) => {
	dates.forEach((date, index) => {
		if (!date.currentMonth) {
			const $spanDateText = ele.querySelector(
				`div[data-date-idx="${index}"]`
			).firstElementChild;
			$spanDateText.classList.add("inactive");
		}
	});
};

const addTodayCircle = (dates, ele) => {
	const todayIndex = dates.findIndex(
		({ year, month, date }) =>
			year === todayYear && month === todayMonth + 1 && date === todayDate
	);

	if (todayIndex > -1) {
		const $todaySpan = ele.querySelector(
			`div[data-date-idx="${todayIndex}"]`
		).firstElementChild;

		const textColor = window.getComputedStyle($todaySpan).color;

		const $todayCircle = document.createElement("div");
		$todayCircle.classList.add("today-circle");
		$todayCircle.textContent = $todaySpan.textContent;
		$todayCircle.style.backgroundColor = textColor;

		$todaySpan.parentElement.appendChild($todayCircle);
	}
};

const generateDatesView = (year, month) => {
	const prevLast = new Date(year, month, 0);
	const currLast = new Date(year, month + 1, 0);

	const prevLastDate = prevLast.getDate();
	const prevLastDay = prevLast.getDay();

	const currLastDate = currLast.getDate();

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
	parent.querySelector(".year-month").textContent = `${viewYear}년 ${viewMonth + 1}월`;
	const datesView = generateDatesView(viewYear, viewMonth);
	const tagDates = datesView.map((date, i) => {
		date.id = i; // 원본 배열의 객체마다 id 추가
		return `<div class="date-box" data-date-idx="${i}">
        <span class="date-text" data-date="${date.year}-${date.month}">${date.date}</span>
        <ul class="date-todo"></ul>
      </div>`;
	});

	const $dateContainer = parent.querySelector(".date-container");
	$dateContainer.innerHTML = tagDates.join("");
	addInactiveClass(datesView, $dateContainer);
	if (todayMonth === viewMonth) {
		addTodayCircle(datesView, $dateContainer);
	}
};

const goToMonth = (direction, parent) => {
	viewMonth = (viewMonth + direction + 12) % 12;

	if (viewMonth === 11 && direction === -1) {
		viewYear--;
	}
	if (viewMonth === 0 && direction === 1) {
		viewYear++;
	}
	renderCalendarView(viewYear, viewMonth, parent); // 달력 다시 렌더링
};

const renderWeeklyView = (e) => {
	const $selectedDateBox = e ? e.target.closest(".date-box") : document.querySelector(".today-circle").parentElement;
	const $selectedCalendar = $selectedDateBox.closest('.date-container');

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

const dashboardEvent = () => {
	renderCalendarView(todayYear, todayMonth, document.querySelector(".container-1 .calendar"));
	renderWeeklyView();
	renderRepeatToCalendarView(toDoList);
	document.querySelector('.date-container').addEventListener('click', e => {
		renderWeeklyView(e);
		renderRepeatToCalendarView(toDoList);
	});
	document.querySelector('.go-prev').parentElement.addEventListener('click', (e) => {
		goToMonth(-1, e.target.closest(".monthly"));
		renderRepeatToCalendarView(toDoList);
	});
	document.querySelector('.go-next').parentElement.addEventListener('click', (e) => {
		goToMonth(1, e.target.closest(".monthly"));
		renderRepeatToCalendarView(toDoList);
	});
	document.querySelector('.go-today').parentElement.addEventListener('click', (e) => {
		renderCalendarView(todayYear, todayMonth, e.target.closest(".monthly"));
		renderRepeatToCalendarView(toDoList);
	});	
	document.querySelector(".dropdown .date-container").addEventListener("click", (e) => {
		getSelectedDate(e);
	});
}

export { dashboardEvent, renderRepeatToCalendarView, renderCalendarView, todayYear, todayMonth, goToMonth };