const body = document.querySelector("body");

const IMG_NUM = 3;

function handleImgLoad(image){ // load 이벤트 수행
    console.log("image load complete");
    image.classList.add("bgImg");
    body.prepend(image);
    // prepend()는 appendChild()와 거의 동일하게 동작하지만,
    // 부모의 자식 요소로 추가되는 위치가 맨 뒤가 아닌 맨 앞에 추가되는 것이 다르다.
}

function paintImg(imgNum){
    const image = new Image(); // = document.createElement("img")
    image.src = `img/${imgNum + 1}.jpg`; // +1 = Math.random() 함수가 0 을 줄 수도 있기 때문에
    image.addEventListener("load", handleImgLoad(image));
}

function genRanNum(){
    const Num = Math.floor(Math.random() * IMG_NUM);
    return Num;
}

function init(){
    const ranNum = genRanNum();
    paintImg(ranNum);
}

init();