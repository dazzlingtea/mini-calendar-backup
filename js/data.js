/* 
	const toDoList = [
		{
			id: number,
			title: string,
			time: object,
			repeat: number,
			checked: boolean,
			timeStop: object,
		},
	];

	time = {
		year: number,
		month: number,
		date: number,
		day: number,
	}

	timeStop = {
			isRunning: boolean,
			isPause: boolean,
			startTime: object,
			currentTime: object,
		}

	(start/current)Time = {
		hour: number,
		minute: number,
		sec: number,
		ms: number,
	}

*/

const REPEAT = {
	NO: 0,
	EVERYDAY: 1,
	WEEK: 2,
	MONTH: 3,
}

const initTime = {
	hour: 0,
	minute: 0,
	sec: 0,
	ms: 0,
}

const initTimeStop = {
	isRunning: false,
	isPause: false,
	startTime: initTime,
	endTime: initTime
}

const toDoList = [
	{
		id: 1,
		title: "할일 1",
		time: {
			year: 2024,
			month: 4,
			date: 10,
			day: 3
		},
		repeat: REPEAT.NO,
		done: false,
		timeStop: initTimeStop,
	},
	{
		id: 2,
		title: "할일 2",
		time: {
			year: 2024,
			month: 4,
			date: 10,
			day: 3
		},
		repeat: REPEAT.NO,
		done: false,
		timeStop: initTimeStop,
	},
	{
		id: 3,
		title: "할일 3",
		time: {
			year: 2024,
			month: 4,
			date: 10,
			day: 3
		},
		repeat: REPEAT.EVERYDAY,
		done: false,
		timeStop: initTimeStop,
		color: '#FFF7DF',
	},
	{
		id: 4,
		title: "할일 4",
		time: {
			year: 2024,
			month: 4,
			date: 10,
			day: 3
		},
		repeat: REPEAT.NO,
		done: false,
		timeStop: initTimeStop,
	},
	{
		id: 5,
    title: "할일 1 매주",
    time: { year: 2024, month: 2, date: 1, day: 4 },
    repeat: 2,
		done: false,

  },
  {	
		id: 6,
    title: "할일 2 반복안함",
    time: { year: 2024, month: 4, date: 8, day: 1 },
    repeat: 0,
		done: false,
    color: '#DBF4FF', 
  },
  {
		id: 7,
    title: "할일 3 매주",
    time: { year: 2024, month: 4, date: 10, day: 2 },
    repeat: 2,
		done: false,
    color: '#A9FDE9',
  },
  {	
		id: 8,
    title: "할일 4 매월",
    time: { year: 2024, month: 3, date: 10, day: 3 },
    repeat: 3,
		done: false,
    color: '#FCFFC4',
  },
  {	
		id: 9,
    title: "할일 5 매일",
    time: { year: 2024, month: 4, date: 27, day: 6 },
    repeat: 1,
		done: false,
    color: '#FFE8F1',
  },
];

export { toDoList, REPEAT, initTimeStop };


