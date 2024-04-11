import { toDoList, initTimeStop, REPEAT } from "./data.js";
import { renderRepeatToCalendarView } from "./dashboard.js";
import * as util from "./date_utils.js"


let dateNow = new Date();
const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth() + 1;
const todayDate = dateNow.getDate();
const todayDay = dateNow.getDay();

const insert = (obj) => {
	console.log(obj);
	const time = obj.time !== "기한 없음" ? util.getDateInfoFromText(obj.time) : {
		year: todayYear,
		month: todayMonth,
		date: todayDate,
		day: todayDay,
	};
	toDoList.push({
		id: toDoList.length + 1,
		title: obj.title,
		time,
		repeat : REPEAT.NO,
		done: false,
		timeStop: initTimeStop,
	});
	renderRepeatToCalendarView(toDoList);
}

export { insert };