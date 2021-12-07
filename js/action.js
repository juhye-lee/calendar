// 1. 변수확인 typeof 
// 2. getElementsByClassName('month'); getElementS s가 붙으면 오프젝트로 받으므로 배열처럼 써야함.


let date =  new Date();

//현재달셋팅
let year = date.getFullYear();
let month = date.getMonth();
let today = date.getDate()
let firstDay = new Date(date.getFullYear(),date.getMonth(),1);
let lastDay = new Date(date.getFullYear(),date.getMonth()+1,0);
let firstWeek = firstDay.getDay();
let lastWeek = lastDay.getDate();

let cell = document.querySelector('#calender');


function showcalender(_year , _month , _today , _firstWeek , _lastWeek) {
//  년 월  표시
let monthtext = document.getElementsByClassName('month');
monthtext[0].innerText = _month + 1;

let yeartext = document.getElementsByClassName('year');
yeartext[0].innerText = _year;

// 날짜 뿌리기
while ( cell.hasChildNodes() ) { cell.removeChild( cell.firstChild ); } // 자식태그 다 지우기

 let cont = 1;
    for(let i = 0 ; i < 8 ; i++){  
        let tr = document.createElement("tr"); 
        cell.append(tr);

        for(let j = 0 ; j < 7 ; j++){
            let td = document.createElement("td"); 
            let span = document.createElement("span"); 
            tr.append(td);
            
            if(i == 0 && j < _firstWeek || cont > _lastWeek ){
                td.innerHTML = "";
            }
            else{
                td.append(span);
                span.innerHTML = cont;
                cont++;
            } 
        }
        if(cont > _lastWeek ) break;
    }

    // 현재날짜 표시
    if(_year == year && month == _month){
        let cellcont =  cell.getElementsByTagName('td');
        let todaymark =  _today + (_firstWeek - 1);
        cellcont[todaymark].setAttribute('style','background : #ddd;') ;
        cellcont[todaymark].childNodes[0].setAttribute('style','background : blue; color : #fff;') ;
    }
   

 }

showcalender(year , month , today , firstWeek , lastWeek);

let controll = 0;
let last = 0;

window.onload = function(){

    let premove = document.querySelector(".preMonth");
    let nextMonth = document.querySelector(".nextMonth");
    

    premove.addEventListener('click', function(){ 
     
        controll --;
        
        let premonthFirst= new Date(year, month + controll  ,1);
        let premonthLast= new Date(year, month + (controll + 1), 0);
        console.log(premonthFirst);
        console.log(premonthLast);

        let premonthFirstday = premonthFirst.getDay();
        let premonthLastday = premonthLast.getDate();
        let preMonth = premonthFirst.getMonth();
        let preyear = premonthFirst.getFullYear();

        showcalender(preyear , preMonth , today , premonthFirstday , premonthLastday);
        
        
    });

    nextMonth.addEventListener('click', function(){ 
       
        controll ++;
        let nextmonthFirst= new Date(year, month + controll, 1);
        let nextmonthLast= new Date(year, month + (controll + 1), 0);
        console.log(nextmonthFirst);
    
        let nextmonthFirstday = nextmonthFirst.getDay();
        let nextmonthLastday = nextmonthLast.getDate();
        let nextMonth = nextmonthFirst.getMonth();
        let nextyear = nextmonthFirst.getFullYear();

        showcalender(nextyear , nextMonth , today , nextmonthFirstday , nextmonthLastday);

    });
  
 
    let btnSave = document.querySelector(".save");
    let todoText = document.querySelector(".textzone");
    let todoList = document.querySelector("#todolist");

    cell.addEventListener('click',function(event){

        todoText.value = "";
        while ( todoList.hasChildNodes() ) { todoList.removeChild( todoList.firstChild ); } 

        let celltd =  cell.getElementsByTagName('td');
       
        for( let i = 0 ; i < celltd.length; i++ ){
            let condition = celltd[i].classList.contains('on');
            console.log(condition);
            if(condition){
                celltd[i].classList.remove('on');
            }
            
        }
        var ele = event.target;
        ele.classList.toggle('on');
       let yeartext = document.getElementsByClassName('year');
       document.querySelector(".selyear").innerHTML =  yeartext[0].innerText;

       let monthtext = document.getElementsByClassName('month');
       document.querySelector(".selmonth").innerHTML = monthtext[0].innerText;
       document.querySelector(".selday").innerHTML = ele.childNodes[0].innerText;

  
   });

 

   btnSave.addEventListener('click',function(){

   let datesellect =  document.querySelector(".selmonth").innerHTML;
 

    if(isNaN(datesellect)){
        alert('달력에서 날짜를 선택하세요');
    }
    else if(todoText.value == ""){
        alert('메모를 입력하세요');
    }
    else{
       let li = document.createElement("li"); 
       todoList.append(li);  
       li.innerHTML = `할일 : ${todoText.value} <button type="button" class="delete">X</button>` ;
       todoText.value = "";
       let on = document.querySelector(".on");
       let Pspan = document.createElement("i"); 
       on.append(Pspan);
       Pspan.innerHTML = `추가됨`;
    } 


  });

};

