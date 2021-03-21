const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  Pending = document.querySelector(".js-pending"),
  Finished = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDoPenArray = [];
let toDoFinArray = [];

function checkFinToDo(event) {
    const li = event.target.parentNode;
    Finished.removeChild(li);

    // 옮길 대상을 pending 부분에 넣어줌
    const moveChangeToDo = toDoFinArray.filter(function(toDo) {
        return toDo.id === parseInt(li.id);
    });

    const undoChangeToDo = toDoFinArray.filter(function(toDo) {
    // console.log("checkToDo/toDo.id, li.id = ", toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDoFinArray = undoChangeToDo;
    
    const moveChangeValue = moveChangeToDo[0].value;
    printPenToDo(moveChangeValue);

    saveFinToDo();
}

function checkToDo(event) {
    const li = event.target.parentNode;
    Pending.removeChild(li);

    // 옮길 대상을 Finish 부분에 넣어줌
    const moveChangeToDo = toDoPenArray.filter(function(toDo) {
        return toDo.id === parseInt(li.id);
    });
    
    const reChangeToDo = toDoPenArray.filter(function(toDo) {
    // console.log("checkToDo/toDo.id, li.id = ", toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDoPenArray = reChangeToDo;

    const moveChangeId = moveChangeToDo[0].id;
    const moveChangeValue = moveChangeToDo[0].value;
    printFinToDo(moveChangeId, moveChangeValue);

    savePenToDo();
}

// deleteFinToDo
function deleteFinToDo(event) {
    if (confirm("정말 삭제하시겠습니까?") == true){
        const li = event.target.parentNode;  
        Finished.removeChild(li);

        const cleanFinToDo = toDoFinArray.filter(function (toDo) {
        // click // error
        return toDo.id !== parseInt(li.id); // 필터를 통해 새로운 array 생성
        });

        console.log(toDoFinArray);
        console.log(cleanFinToDo);

        toDoFinArray = cleanFinToDo; // swap
        console.log(toDoFinArray);

        saveFinToDo();
    } else {
        return false;
    }
}

// deletePenToDo
function deletePenToDo(event) {
    if (confirm("정말 삭제하시겠습니까?") == true){
        const li = event.target.parentNode;
        Pending.removeChild(li);

        const cleanPenToDo = toDoPenArray.filter(function (toDo) {
        // click
        return toDo.id !== parseInt(li.id); // 필터를 통해 새로운 array 생성
        });

        toDoPenArray = cleanPenToDo; // swap
        savePenToDo();
    } else {
        return false;
    }    
}

function saveFinToDo() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(toDoFinArray));
} // object → string

function savePenToDo() {
  localStorage.setItem(PENDING_LS, JSON.stringify(toDoPenArray));
} // object → string

// printFinToDo
function printFinToDo(id, value) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const UnChkBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    span.innerText = value;
    UnChkBtn.innerText = "↩️";
    delBtn.innerText = "❌";
    
    UnChkBtn.addEventListener("click", checkFinToDo);
    delBtn.addEventListener("click", deleteFinToDo);
    
    li.appendChild(span);
    li.appendChild(UnChkBtn);
    li.appendChild(delBtn);
    li.id = id;
    Finished.appendChild(li);

    const toDoFinObj = {
        id : id,
        value : value
    };
    toDoFinArray.push(toDoFinObj);
    saveFinToDo();
}

// printPenToDo
function printPenToDo(value) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const chkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = Date.now();

    span.innerText = value;
    chkBtn.innerText = "✅";
    delBtn.innerText = "❌";
    
    chkBtn.addEventListener("click", checkToDo);
    delBtn.addEventListener("click", deletePenToDo);
    
    li.appendChild(span);
    li.appendChild(chkBtn);
    li.appendChild(delBtn);
    li.id = newId;

    Pending.appendChild(li);
    const toDoPendingObj = {
        id: newId,
        value: value
    };
    toDoPenArray.push(toDoPendingObj);
    savePenToDo();   
}

function toDoFormSubmit(event) {
    event.preventDefault();
    const toDoValue = toDoInput.value;
    printPenToDo(toDoValue);
    toDoInput.value = "";
}

function loadFinToDos(){
    const loadSucFinToDos = localStorage.getItem(FINISHED_LS);
    console.log(loadSucFinToDos);
    if (loadSucFinToDos !== null) {
        const parseFinToDos = JSON.parse(loadSucFinToDos); // object
        console.log(parseFinToDos);
        parseFinToDos.forEach(function(todo) {
            printFinToDo(todo.id, todo.value);
            console.log(todo.id, todo.value);
        });
    } else {
        localStorage.removeItem(FINISHED_LS);
    }
}

function loadPenToDos(){
    const loadSucPenToDos = localStorage.getItem(PENDING_LS);
    if (loadSucPenToDos !== null) {
        const parsePenToDos = JSON.parse(loadSucPenToDos); // object
        parsePenToDos.forEach(function(todo) {
            printPenToDo(todo.value);
            console.log(todo.value);
        });
    } else {
        localStorage.removeItem(PENDING_LS);
    }
}

function init() {
  loadPenToDos(); // load
  loadFinToDos();
  toDoForm.addEventListener("submit", toDoFormSubmit);
}

init();