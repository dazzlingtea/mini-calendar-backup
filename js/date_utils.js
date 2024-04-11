const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const getDateInfoFromText = (input) => {
	const time = input.split(".");
	return {
		year: Number(time[0]),
		month: Number(time[1]),
		date: Number(time[2]),
		day: days.indexOf(time[3]),
	}
}

export { getDateInfoFromText, days };