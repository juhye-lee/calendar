// 1. 변수확인 typeof 
// 2. getElementsByClassName('month'); getElementS s가 붙으면 배열 받으므로 배열처럼 써야함.


let date = new Date();

//현재달셋팅
let year = date.getFullYear();
let month = date.getMonth();
let today = date.getDate()
let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
let firstWeek = firstDay.getDay();
let lastWeek = lastDay.getDate();

let cell = document.querySelector('#calender');

let memolist = {};
function memoSave(day, text) {
    memolist[day] = text;
    for( item in memolist){
        console.log("key: " + item + ", value: " + memolist[item]);
        
    }
  
}

function showcalender(_year, _month, _today, _firstWeek, _lastWeek) {
    //  년 월  표시
    let monthtext = document.getElementsByClassName('month');
    monthtext[0].value = _month + 1;
   yearformat = ("00" + monthtext[0].value.toString()).slice(-2);
    monthtext[0].innerText =  yearformat;
   
    let yeartext = document.getElementsByClassName('year');
    yeartext[0].innerText = _year;

    // 날짜 뿌리기
    while (cell.hasChildNodes()) { cell.removeChild(cell.firstChild); } // 자식태그 다 지우기

    let cont = 1;
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        cell.append(tr);

        for (let j = 0; j < 7; j++) {
            let td = document.createElement("td");
            let span = document.createElement("span");
            tr.append(td);

            if (i == 0 && j < _firstWeek || cont > _lastWeek) {
                td.innerHTML = "";
            }
            else {
                td.append(span);
                span.innerHTML = ("00" + cont.toString()).slice(-2);
                cont++;
            }
        }
        if (cont > _lastWeek) break;
    }
    // 현재날짜 표시
    if (_year == year && month == _month) {
        let cellcont = cell.getElementsByTagName('td');
        let todaymark = _today + (_firstWeek - 1);
        cellcont[todaymark].setAttribute('style', 'background : #ddd;');
        cellcont[todaymark].childNodes[0].setAttribute('style', 'background : blue; color : #fff;');
    }

    // 등록된 메모 날짜 표시
    let key = Object.keys(memolist);

    for( let j= 0; j < key.length; j++){
        let memoyear = key[j];
         memoyear = (memoyear.toString()).substring(0,4);
         memomonth = (memoyear.toString()).substring(5,2);

         if(memoyear = _year){
            if(memomonth = monthtext[0].value){
                
            }

         }
        console.log(memoyear);
    }
    // let key1 = Object.values(memolist);
    
  
    
};

    showcalender(year, month, today, firstWeek, lastWeek);

    let controll = 0;
    let last = 0;

    window.onload = function () {

        let premove = document.querySelector(".preMonth");
        let nextMonth = document.querySelector(".nextMonth");


        premove.addEventListener('click', function () {
            controll--;
            let premonthFirst = new Date(year, month + controll, 1);
            let premonthLast = new Date(year, month + (controll + 1), 0);

            let premonthFirstday = premonthFirst.getDay();
            let premonthLastday = premonthLast.getDate();
            let preMonth = premonthFirst.getMonth();
            let preyear = premonthFirst.getFullYear();

            showcalender(preyear, preMonth, today, premonthFirstday, premonthLastday);

        });

        nextMonth.addEventListener('click', function () {

            controll++;
            let nextmonthFirst = new Date(year, month + controll, 1);
            let nextmonthLast = new Date(year, month + (controll + 1), 0);

            let nextmonthFirstday = nextmonthFirst.getDay();
            let nextmonthLastday = nextmonthLast.getDate();
            let nextMonth = nextmonthFirst.getMonth();
            let nextyear = nextmonthFirst.getFullYear();

            showcalender(nextyear, nextMonth, today, nextmonthFirstday, nextmonthLastday);

        });


        let btnSave = document.querySelector(".save");
        let todoText = document.querySelector(".textzone");
        let todoList = document.querySelector("#todolist");

        let yeartext = document.getElementsByClassName('year');
        let monthtext = document.getElementsByClassName('month');

        // 달력클릭시
        cell.addEventListener('click', function (event) {

            todoText.value = "";
            while (todoList.hasChildNodes()) { todoList.removeChild(todoList.firstChild); }

            let celltd = cell.getElementsByTagName('td');

            for (let i = 0; i < celltd.length; i++) {
                let condition = celltd[i].classList.contains('on'); // 특정문자열찾기 true false 반환

                if (condition) {
                    celltd[i].classList.remove('on');
                }

            }
            var ele = event.target;
            ele.classList.toggle('on');
            document.querySelector(".selyear").innerHTML = yeartext[0].innerText;
            document.querySelector(".selmonth").innerHTML = monthtext[0].innerText;
            document.querySelector(".selday").innerHTML = ele.childNodes[0].innerText;

        });

        btnSave.addEventListener('click', function () {
            let datesellect = document.querySelector(".selmonth").innerHTML;
            if (isNaN(datesellect)) {
                alert('달력에서 날짜를 선택하세요');
            }
            else if (todoText.value == "") {
                alert('메모를 입력하세요');
            }
            else {
                let li = document.createElement("li");
                todoList.append(li);
                li.innerHTML = `메모 : ${todoText.value} <button type="button" class="delete">X</button>`;

                let on = document.querySelector(".on");
                let Pspan = document.createElement("i");
                on.append(Pspan);
                Pspan.innerHTML = `일정추가`;
            }
            let memocontent1 = `${yeartext[0].innerText}${monthtext[0].innerText}${document.querySelector(".selday").innerHTML}`;
            let memocontent2 = `${todoText.value}`;
            memoSave(memocontent1, memocontent2);
            todoText.value = "";

        });

    };

