// 1. 변수확인 typeof 

let date =  new Date();
let year = date.getFullYear();
let month = date.getMonth();
let today = date.getDate()

 console.log(date);
 console.log(today);
// console.log(month + 1);

let firstDay = new Date(date.getFullYear(),date.getMonth(),1);
let lastDay = new Date(date.getFullYear(),date.getMonth()+1,0);
let firstWeek = firstDay.getDay();
let lastWeek = lastDay.getDate();
let cell = document.querySelector('#calender')


function showcalender() {
 let cont = 1;
    for(let i = 0 ; i < 8 ; i++){  
        let tr = document.createElement("tr"); 
        cell.append(tr);

        for(let j = 0 ; j < 7 ; j++){
            let td = document.createElement("td"); 
            tr.append(td);
            if(i == 0 && j < firstWeek || cont > lastWeek + 1){
                td.innerHTML = "";
            }
            else{
                td.innerHTML = cont;
                cont++;
            } 
        }
        if(cont > lastWeek + 1) break;
    }

    let cellcont =  cell.getElementsByTagName('td');
    let todaymark =  today + (firstWeek - 1);
    cellcont[todaymark].style.color= "red"
 }



showcalender();