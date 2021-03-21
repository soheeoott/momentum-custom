const form = document.querySelector(".js-greetingsForm"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "userName",
    SHOWING_CN = "showing";

function saveName(user){ // 사용자 이름을 localStorage에 저장
    localStorage.setItem(USER_LS, user);
}

function handleSubmit(event){ // submit 이벤트 처리
    event.preventDefault();
    const userValue = input.value;
    paintGreeting(userValue);
    saveName(userValue);
}

function askForName(){ // 사용자 이름 설정
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}    

function paintGreeting(user){ // 화면(HTML)에 출력
    form.classList.remove(SHOWING_CN);
    toDoForm.classList.add(SHOWING_CN); // toDoForm 
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `안녕하세요! ${user}님`;
}

function loadName(){ // 사용자 이름 값의 존재여부 체크
    const userName = localStorage.getItem(USER_LS);
    if (userName === null) {
        askForName();
        localStorage.clear();
    } else {
        paintGreeting(userName);
    }
}

function init(){
    loadName();
}

init();