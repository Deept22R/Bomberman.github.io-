const random = [];
let points = 0;
let flag = 10;
randomNum();
function createGrid() {
    for(let i=0;i<=99;i++){
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", i);
        newDiv.classList.add("valid");
        newDiv.addEventListener("click", leftClick);
        newDiv.addEventListener("contextmenu", rightClick);
        document.getElementsByClassName("grid")[0].appendChild(newDiv);  
    }
    for(let i = 0 ; i < random.length ; i++){
        document.getElementById(random[i]).classList.remove("valid");
        document.getElementById(random[i]).classList.add("bomb");
    }
    for(let i=0;i<=99;i++){
        let data = bombAround(i);
        document.getElementById(i).setAttribute("data",data);
    }
    document.getElementById("flagsLeft").innerHTML = flag;
}
createGrid();
function leftClick(event){
    let clickedCell = event.target;
    let cellID = Number(clickedCell.getAttribute("id"));
    // console.log(cellID);
    if(!random.includes(cellID)){
        points++;
        clickedCell.classList.add("checked");
        clickedCell.innerHTML = clickedCell.getAttribute("data");
    }
    else{
        document.querySelectorAll(".bomb").forEach((cell)=>{
            cell.classList.add("checked");
        });
        showBomb();
        document.getElementById("result").innerHTML = "YOU LOSE!";
        document.querySelectorAll(".valid").forEach((cell)=>cell.removeEventListener("click",leftClick));
        document.querySelectorAll(".bomb").forEach((cell)=>cell.removeEventListener("click",leftClick));
        document.querySelectorAll(".valid").forEach((cell)=>cell.removeEventListener("contextmenu",rightClick));
        document.querySelectorAll(".bomb").forEach((cell)=>cell.removeEventListener("contextmenu",rightClick));
    }
    if(points==90){
        document.getElementById("result").innerHTML = "YOU WIN!";
        document.querySelectorAll(".bomb").forEach((cell)=>cell.removeEventListener("click",leftClick));
        document.querySelectorAll(".bomb").forEach((cell)=>cell.removeEventListener("contextmenu",rightClick));
        showBomb();
    }
    clickedCell.removeEventListener("click",leftClick);
    clickedCell.removeEventListener("contextmenu",rightClick);
}
function rightClick(event){
    event.preventDefault();
    let rightClickedCell = event.target;
    if(rightClickedCell.classList.contains("flag")){
        rightClickedCell.classList.remove("flag");
        flag++;
        document.getElementById("flagsLeft").innerHTML = flag;
    }
    else if(flag>0){
        rightClickedCell.style.backgroundImage = 'url("data:image/jpeg;base64,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")';
        rightClickedCell.style.backgroundSize = "30px 30px";
        flag--;
        document.getElementById("flagsLeft").innerHTML = flag;
        rightClickedCell.classList.add("flag");
        if(flag==0){
            let flagBomp= true;
            document.querySelectorAll(".flag").forEach((cell)=>{
                let flagID = parseInt(cell.getAttribute("id"));
                if(random.includes(flagID)==false)
                    flagBomp = false;
            })
            if(flagBomp){
                document.getElementById("result").innerHTML = "YOU WIN!";
                document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("click", leftClick) );
                document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("click", leftClick) );
                document.querySelectorAll(".valid").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );
                document.querySelectorAll(".bomb").forEach((cell) => cell.removeEventListener("contextmenu", rightClick) );  
            }
        }
    }  
}
function bombAround(divID){
    let bombCount = 0;
    let arr = [];
    if(divID==0)
        arr = [1,10,11];
    else if(divID==9)
        arr = [-1,9,10];
    else if(divID==90)
        arr = [-9,-10,1];
    else if(divID==99)
        arr = [-11,-10,-1];
    else if(divID>0 && divID<9)
        arr = [-1,1,9,10,11];
    else if(divID>90 && divID<99)
        arr = [-11,-10,-9,-1,1];
    else if(divID%10 == 0 && divID!=0 && divID!=90)
        arr = [-9,-10,1,10,11];
    else if(divID%10 == 9 && divID!=9 && divID!=99)
        arr = [-11,-10,-1,9,10];
    else 
        arr = [-11,-10,-9,-1,1,9,10,11];
    for(let i=0;i<arr.length;i++){
        if(random.indexOf(divID+arr[i])!=-1)
            bombCount++;
    }
    return bombCount;
}
function randomNum() {
    while(random.length < 10){
        var num = Math.floor(Math.random()*99+0);
        if(!random.includes(num))
            random.push(num);
    }
    // console.log(random);
}
function showBomb(){
    for(let i=0;i<10;i++){
        document.getElementById(random[i]).style.backgroundImage = 'url("https://img.icons8.com/emoji/48/000000/bomb-emoji.png")';
        document.getElementById(random[i]).style.backgroundSize = "30px 30px";
        document.getElementById(random[i]).style.backgroundColor = "red";
    }
}