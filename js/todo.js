//========================체크 여부에 따라 수정, 삭제 이벤트======================
function checkCheckbox() {
  // 모든 체크박스 요소 가져옴
  const checkboxes = document.querySelectorAll(".inputEl");

  // 체크박스가 하나라도 체크됐는지 확인
  let isChecked = false;
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  // 위 조건이 해당할 경우.
  // 수정 및 삭제 버튼에 클래스를 추가해서 스타일 변경
  const fixBtns = document.querySelectorAll(".btn_box");
  fixBtns.forEach(function (fixBtn) {
    if (isChecked) {
      fixBtn.classList.remove("color");
      // 수정 및 삭제 버튼 클릭 이벤트 핸들러 추가
      if (fixBtn.textContent === "삭제") {
        fixBtn.addEventListener("click", handleDeleteButtonClick);
      } else if (fixBtn.textContent === "수정") {
        fixBtn.addEventListener("click", handleFixButtonClick);
      }
    } else {
      fixBtn.classList.add("color");
      // 수정 및 삭제 버튼 클릭 이벤트 핸들러 삭제
      fixBtn.removeEventListener("click", handleDeleteButtonClick);
      fixBtn.removeEventListener("click", handleFixButtonClick);
    }
  });
}
// 이벤트 핸들러
window.onload = function () {
  // 페이지가 로드될 때마다 체크박스 상태 확인
  checkCheckbox();

  const checkboxes = document.querySelectorAll(".inputEl");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", checkCheckbox);
  });
};

// =================================수정 기능
function handleFixButtonClick(event) {
  // 수정 버튼 클릭시에 이벤트 작성
  console.log("수정버튼클릭");
}

// ==================================삭제 기능
function handleDeleteButtonClick(event) {
  // 삭제 버튼 클릭시에 이벤트 작성
  console.log("삭제버튼클릭");
}
