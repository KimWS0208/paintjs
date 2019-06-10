const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
///////////
// const rectan = document.getElementById('jsRectangle');
///////////
const INITIAL_COLOR="#2c2c2c";

canvas.width = 700;
canvas.height = 700;

//save file background-color
ctx.fillStyle='white';
// ctx.rectStyle='white';
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle=INITIAL_COLOR;
// ctx.rectStyle=INITIAL_COLOR;

let painting = false;
let filling = false;
// let rectangle= false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y)
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if(painting){
        ctx.lineTo(x, y);
        ctx.stroke();
        
    }
}

function startPainting(){
    painting=true;
}

function stopPainting(){
    painting = false;
}


function changeColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
    // console.log(event);
}

function handleleModeClick(){
    if(filling === true){
        filling = false;
        painting=false;
        // painting = false;
        mode.innerText = 'Fill'
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleleMode2Click(){
    if(rectangle === true){
        rectangle = false;
        filling=false;
        painting=false;
        rectan.innerText = 'Rect On'
    } else {
        rectangle = true;
        rectan.innerText = 'rect off';
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    // const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL(); //png
    const link = document.createElement("a");
    link.href = image;
    link.download = 'image';
    link.click();
}
///////////
// function handleRectangleClick(){
//     const x = event.offsetX;
//     const y = event.offsetY;
//     const x2 = event.offsetX;
//     const y2 = event.offsetY;

//     var circle = new Path2D();
//     // circle.moveTo(x, y);
//     circle.arc(x, y, x2-x, 0, 5 * Math.PI);
//     console.log('aa=',x2,y2)

//     if(rectangle){
//         // ctx.fillRect(x, y, x2-x, y2-y);
//         ctx.fill(circle);
//         // ctx.clearRect(45, 45, 60, 60);
//         // ctx.strokeRect(50, 50, 50, 50);
//     }

//     // ctx.strokeRect();
// }
////////////
if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousesleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    // canvas.addEventListener('click', handleRectangleClick);
    canvas.addEventListener('contextmenu', handleCM);
    // canvas.addEventListener('click', handleRect)
}
Array.from(colors).forEach(color =>
     color.addEventListener("click", changeColorClick));
// colors.forEach(color => color.addEventListener("click", changeColorClick));
// console.log(Array.from(colors));
// console.log(colors);

if(range){
    range.addEventListener('input', handleRangeChange);
}

if(mode){
    mode.addEventListener('click', handleleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}

// if(rectan){
//     rectan.addEventListener('click', handleleMode2Click);
// }