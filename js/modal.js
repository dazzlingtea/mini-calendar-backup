import { insert } from "./insert.js";
import { renderCalendarView, todayYear, todayMonth, goToMonth } from "./dashboard.js";

const modalEvent = () => {
	/* modal event */
	const openModalButton = document.querySelector('.add-btn-wrapper .add');
	const $modalOverlay = document.querySelector('.modal-overlay');
	const $modalContent = document.querySelector(".modal-content");
	const closeModalButton = $modalContent.querySelector('.modal-close');

	openModalButton.addEventListener('click', () => {
		$modalOverlay.classList.remove('hidden');
		$textArea.value = "";
		$saveBtn.classList.remove("on");
		renderCalendarView(todayYear, todayMonth, document.querySelector(".dropdown .content-calendar"));
	});

	closeModalButton.addEventListener('click', () => {
		$modalOverlay.classList.add('hidden');
	});

	/* dropdown calendar event */
	const $selectTime = document.querySelector(".select-time");
	const $contentCalendar = document.querySelector(".content-calendar");
	const outerContent = $modalOverlay;

	$selectTime.addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		$contentRepeat.classList.remove("show");
		$contentCalendar.classList.add("show");
	});

	/* dropdown repeat event */
	const $selectRepeat = document.querySelector(".select-repeat");
	const $contentRepeat = document.querySelector(".content-repeat");
	$selectRepeat.addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		$contentCalendar.classList.remove("show");
		$contentRepeat.classList.add("show");
	});

	document.querySelector(".modal-content .go-prev").addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		goToMonth(-1, e.target.closest(".monthly"));
	});

	document.querySelector(".modal-content .go-next").addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		goToMonth(1, e.target.closest(".monthly"));
	});

	outerContent.addEventListener("click", (e) => {
		$contentCalendar.classList.remove("show");
		$contentRepeat.classList.remove("show");
	});

	/* save button */
	const $saveBtn = document.querySelector(".wrapper-btn .save");
	const $textArea = document.querySelector("textarea.txt-field");
	$textArea.addEventListener("keyup", e => {
		if ($textArea.value) {
			$saveBtn.classList.add("on");
		} else {
			$saveBtn.classList.remove("on");
		}
	});

	$saveBtn.addEventListener("click", (e) => {
		e.preventDefault();
		if ($saveBtn.classList.contains("on")) {
			insert({
				title: $textArea.value,
				time: $selectTime.firstElementChild.textContent,
				repeat: $selectRepeat.firstElementChild.textContent
			});
			$modalOverlay.classList.add("hidden");
		}
	});
};

export default modalEvent;