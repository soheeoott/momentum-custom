const clock = document.querySelector(".js-clock"),
    clockDate = clock.querySelector(".js-date"),
    clockTime = clock.querySelector(".js-time");

function getDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 요일
    let weekArray = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
    let week = weekArray[date.getDay()];

    clockDate.innerText = `${year}년 ${month}월 ${day}일 ${week}`;
}

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    if(hours > 12){
        clockTime.innerText =
        `PM ${hours < 10 ? `0${hours}` : `${hours%12}`} : ${ // 12hours 형식
            minutes < 10 ? `0${minutes}` : `${minutes}`} : ${
                seconds < 10 ? `0${seconds}` : `${seconds}`}`; // 00~09 처리
    } else {
        clockTime.innerText =
        `AM ${hours < 10 ? `0${hours}` : `${hours}`} : ${
            minutes < 10 ? `0${minutes}` : `${minutes}`} : ${
                seconds < 10 ? `0${seconds}` : `${seconds}`}`; // 00~09 처리
    }
}

function init(){
    getDate();
    getTime();
    setInterval(getTime, 1000);
}

init();