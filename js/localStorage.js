
// 데이터를 로컬 스토리지에 저장하는 함수
function saveTodoList(todoList) {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// 로컬 스토리지에서 데이터를 불러오는 함수
function loadTodoList() {
  const todoListJSON = localStorage.getItem('todoList');
  return todoListJSON ? JSON.parse(todoListJSON) : [];
}


export { saveTodoList, loadTodoList };



/*
// 예시
let todoList = loadTodoList();

// 새로운 객체를 todoList에 추가하는 함수
function addTodoItem(newItem) {
  todoList.push(newItem);
  saveTodoList(todoList); // 변경된 todoList를 다시 저장
}

// 새로운 객체 추가
addTodoItem({title: "할 일 "});

// 다른 페이지에서 todoList 사용 시
let loadedTodoList = loadTodoList();
console.log(loadedTodoList); // 로컬 스토리지에서 불러온 todoList 배열 출력

// 특정 항목을 수정하는 함수에서의 사용
function updateTodoItem(index, updatedItem) {
  if (index < 0 || index >= todoList.length) {
    console.error("인덱스 에러");
    return;
  }
  todoList[index] = updatedItem;
  saveTodoList(todoList); // 변경된 todoList를 다시 저장
}

// 할일 특정 항목 수정 예시
updateTodoItem(5, {title: "자바 복습", time: {year: 2024, month: 4, date: 11, day: 4}, repeat: 0});
// 수정 이후에 다시 loadTodoList 불러와서 렌더

*/

