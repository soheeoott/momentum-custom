const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoPenList = document.querySelector(".js-pending"),
    toDoFinList = document.querySelector(".js-finished");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let penToDos, finToDos;

function getToDoObject(todo){
    return {
        id : String(Date.now()),
        todo
    };
}

function deleteToDo(e){
    if (confirm("정말 삭제하시겠습니까?") == true){
        const li = e.target.parentNode; // parentNode = Document node return
        li.parentNode.removeChild(li);
        
        finToDos = finToDos.filter((todo) => {
            return todo.id !== li.id;
        });

        penToDos = penToDos.filter((todo) => {
            return todo.id !== li.id;
        });

        saveToDos();
    } else {
        return false;
    }
}

// finish
function removePen(todoId){
    penToDos = penToDos.filter((todo) => {
        return todo.id !== todoId;  
    });
}

function finishFind(todoId){
    return penToDos.find((todo) => {
        return todo.id === todoId;
    });
}

function finBtnClick(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const todo = finishFind(li.id);
    removePen(li.id);

    finToDos.push(todo);
    paintFinToDo(todo);
    saveToDos();
}
// <-- finish -->

// undo
function removeFin(todoId){
    finToDos = finToDos.filter((todo) => {
      return todo.id !== todoId;  
    });
}

function undoFind(todoId){
    return finToDos.find((todo) => {
        return todo.id === todoId;
    });
}

function undoBtnClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const todo = undoFind(li.id);
    removeFin(li.id);

    penToDos.push(todo);
    paintPenToDo(todo);
    saveToDos();
}
// <-- undo -->

function genericLi(todo){
    const li = document.createElement("li"); // li 생성
    const span = document.createElement("span");

    span.innerText = todo.todo;
    li.append(span); // span → il, delBtn → il 
    li.id = todo.id; // id 생성
    return li;
}

function paintPenToDo(todo){ // 화면(HTML)에 출력
    const createLi = genericLi(todo);
    const finBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    finBtn.innerText = "✅";
    finBtn.addEventListener("click", finBtnClick);
    
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    createLi.append(finBtn, delBtn);
    toDoPenList.append(createLi);
}

function paintFinToDo(todo){
    const createLi = genericLi(todo);
    const undoBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    undoBtn.innerText = "↩️";
    undoBtn.addEventListener("click", undoBtnClick);

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    createLi.append(undoBtn, delBtn);
    toDoFinList.append(createLi);
}

function saveToDos(){ // localStorage 에 목록 저장
    // localStorage 에는 자바스크립트의 data 를 저장할 수 없음 → 오직 문자열만 저장
    localStorage.setItem(PENDING, JSON.stringify(penToDos)); // JSON.stringify() : 객체 → 문자열로 변환
    localStorage.setItem(FINISHED, JSON.stringify(finToDos));
}

function loadToDos(){ // 저장되어 있는 목록의 값 불러오기
    penToDos = JSON.parse(localStorage.getItem(PENDING)) || []; // string → object
    finToDos = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function undoToDos(){
    penToDos.forEach((todo) => {
        paintPenToDo(todo);
    });
    finToDos.forEach((todo) => {
        paintFinToDo(todo);
    });
}

function savePenToDo(todo) {
    penToDos.push(todo);
}

function handleToDoSubmit(e){ 
    e.preventDefault();
    const toDoObj = getToDoObject(toDoInput.value);
    
    if(toDoInput.value !== "") {
        paintPenToDo(toDoObj);
        savePenToDo(toDoObj);
        saveToDos();
        toDoInput.value = "";
    } else {
        alert("내용을 입력해주세요.");
    }
}

function init(){
    loadToDos();
    undoToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();