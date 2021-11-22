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
console.log(`달의 첫번째 날 ${firstDay}`);
console.log(lastDay);


function showcalender(_year , _month , _today , _firstWeek , _lastWeek) {

//  년 월  표시
let monthtext = document.getElementsByClassName('month');
monthtext[0].innerText = _month + 1;

let yeartext = document.getElementsByClassName('year');
yeartext[0].innerText = _year;

// 날짜 뿌리기

while ( cell.hasChildNodes() ) { cell.removeChild( cell.firstChild ); }


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

    //현재날짜 표시
    // let cellcont =  cell.getElementsByTagName('td');
    // let todaymark =  _today + (_firstWeek - 1);
    // cellcont[todaymark].setAttribute('style','background : #ddd;') ;
    // cellcont[todaymark].childNodes[0].setAttribute('style','background : blue; color : #fff;') ;

    
 }

showcalender(year , month , today , firstWeek , lastWeek);

let prefirst = 1;
let prelast = 0;

window.onload = function(){

    let premove = document.querySelector(".preMonth");

    premove.addEventListener('click', function(){ 
        let premonthFirst= new Date(year, month - prefirst ,1);
        let premonthLast= new Date(year, month , prelast);
    
        let premonthFirstday = premonthFirst.getDay();
        let premonthLastday = premonthLast.getDate();
        let preMonth = premonthFirst.getMonth();
        let preyear = premonthFirst.getFullYear();

        showcalender(preyear , preMonth , today , premonthFirstday , premonthLastday);
        prefirst ++;

    });

};




// var date = new Date();
// var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
// var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
// alert(lastMonth.getFullYear() + "-" + lastMonth.getMonth());