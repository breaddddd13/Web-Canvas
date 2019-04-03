var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
var setWidth = document.getElementById('lineWidth');
var widthVal = document.getElementById('widthVal')
var undoArr = new Array();
var redoArr = new Array();
var zoom = document.getElementById('zoom');
var drawVaild = false;
var isTexting = false;
var tool = 'pencil';

var colorPicker = document.getElementById('colorPicker');
var fontSize = document.getElementById('fontSize');
var setFont = document.getElementById('fontSlider');
var fontFace = document.getElementById('selectFont');
colorPicker.oninput = () =>{
  ctx.strokeStyle = colorPicker.value;
}
widthVal.innerHTML = setWidth.value;
setWidth.oninput = () =>{
  widthVal.innerHTML = setWidth.value;
}
fontSize.innerHTML = setFont.value;
setFont.oninput = () =>{
  fontSize.innerHTML = setFont.value;
}
 zoom.oninput = () =>{
  zoomImage(zoom.value);
}

c.addEventListener('mousedown', startDraw);
c.addEventListener('mousemove', isDraw);
window.addEventListener('mousedown', function(e){
  if(isTexting){
    if(e.target.id !== 'myCanvas' && e.target.id !== 'textBox'){
      clearText();
    }
  }
})

// fill white color 
window.onload = () =>{
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, c.clientWidth, c.clientHeight);
  redoArr.push(c.toDataURL());
}

// set canvas width and height
var body = document.getElementsByTagName('body');
c.width = body[0].clientWidth * 0.65;
c.height = c.width * 0.75;
c.style.cursor = `url('./assets/pencil.svg'), auto`;

// resise canvas width and height
window.onresize = () => {
  c.width = body[0].clientWidth * 0.65;
  c.height = c.width * 0.75;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, c.clientWidth, c.clientHeight);
  restoreTemp();
}

function setAttr(){
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = setWidth.value;
}

function setPoint(e) {
  startX = e.offsetX;
  startY = e.offsetY;
}

function storeTemp() {
  undoArr.push(redoArr.shift())
  redoArr.push(c.toDataURL());
}

function restoreTemp() {
  return new Promise((resolve,reject) =>{
    let temp = new Image();
    temp.src = redoArr[0];
    temp.onload = () =>{
      ctx.drawImage(temp, 0, 0);
      resolve(temp);
    }
  })
}
function startDraw(e) {
  if (tool !== 'text') {
    drawVaild = true;
    c.addEventListener('mouseout', finishDraw);
    c.addEventListener('mouseup', finishDraw);
  }
  switch (tool) {
    case 'pencil':
      isPencil(e);
      break;
    case 'eraser':
      isEraser(e);
      break;
    case 'text':
      if (isTexting) clearText();
      setPoint(e);
      text(e);
      break;
    default:
      setPoint(e);
      break;
  }

}
function clearText(){
  let text = document.getElementById('textBox');
  isTexting = false;
  text.remove();
}

function isDraw(e) {
  if (drawVaild) {
    redoArr.length = 1;
    switch (tool) {
      case 'pencil':
        pencilDraw(e);
        break;
      case 'eraser':
        eraserDraw(e);
        break;
      case 'triangle':
        triangleDraw(e);
        break;
      case 'rectangle':
        rectangleDraw(e);
        break;
      case 'circle':
        circleDraw(e);
        break;
      case 'line':
        lineDraw(e);
        break;
    }
  }
}

function finishDraw(e) {
  if (drawVaild) {
    ctx.closePath();
    storeTemp();
    ctx.strokeStyle = colorPicker.value;
    c.removeEventListener('mouseout', finishDraw);
    c.removeEventListener('mouseup', finishDraw);
    drawVaild = false;
  }
}
function clearCanvas(){
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, c.clientWidth, c.clientHeight)
  undoArr.length = 0;
  redoArr.length = 0;
  redoArr.push(c.toDataURL());
}
function selectTool(newTool){
  tool = newTool;
  c.style.cursor = `url('./assets/${newTool}.svg'), auto`;
}
function isPencil(e){
  setAttr();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.fill();
  ctx.stroke();
}
function pencilDraw(e){
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function isEraser(e){
  setAttr();
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function eraserDraw(e){
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

async function triangleDraw(e) {
  await restoreTemp();
  setAttr();
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(startX - (e.offsetX - startX), e.offsetY);
  ctx.lineTo(startX, startY);
  ctx.stroke();
}

async function rectangleDraw(e){
  await restoreTemp();
  setAttr();
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(e.offsetX, startY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(startX, e.offsetY);
  ctx.lineTo(startX, startY);
  ctx.stroke(); 
}

async function circleDraw(e){
  await restoreTemp();
  setAttr();
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow((startX - e.offsetX), 2) + Math.pow((startY - e.offsetY), 2));
  ctx.arc(startX, startY, radius, 0 * Math.PI, 2 * Math.PI);
  ctx.stroke();
}

async function lineDraw(e){
  await restoreTemp();
  setAttr();
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function undo(){
  return new Promise((resolve, reject) =>{
    if (undoArr.length > 0) {
      console.log('undo');
      let last = new Image();
      redoArr.unshift(undoArr[undoArr.length - 1]);
      last.src = undoArr.pop();
      last.onload = () => {
        ctx.drawImage(last, 0, 0);
        resolve();
      }
    }
  })
}

function redo(){
  return new Promise((resolve, reject) =>{
    if(redoArr.length > 1){
      console.log('redo');
      let last = new Image();
      undoArr.push(redoArr.shift());
      last.src = redoArr[0];
      last.onload = () => {
        ctx.drawImage(last, 0, 0);
        resolve();
      }
    }
  })
}

function highlight(id){
  btn = document.getElementById(id);
  highlightBtn = document.getElementsByClassName('highlightBtn');
  if (highlightBtn.length === 1) highlightBtn[0].classList.remove('highlightBtn');
  btn.classList.add('highlightBtn')
}

function downloadImage(){
  let link = document.createElement("a");
  link.href = c.toDataURL();
  link.download = 'image.png'
  link.click();
  link.remove();

}

function upload(e){
  let file = new FileReader();
  file.readAsDataURL(e.target.files[0]);
  file.onload = (e) =>{
    var img = new Image();
    img.src = e.target.result;
    img.onload = () =>{
      ctx.drawImage(img, 0, 0);
       storeTemp();
    }
  }
}

function text(e){
  let input = document.createElement('input');
  input.id = 'textBox';
  input.type = 'text';
  input.style.position = 'absolute'
  input.style.top = `${e.y}px`;
  input.style.left = `${e.x}px`;
  body[0].appendChild(input);
  isTexting = true;
  ctx.font = `${setFont.value}px ${fontFace.options[fontFace.selectedIndex].value}`;
  ctx.lineWidth = 1;
  ctx.fillStyle = colorPicker.value;
  input.addEventListener('keydown', function(evt){
    if(evt.keyCode == 13){
      ctx.fillText(`${input.value}`,e.offsetX, e.offsetY);
      isTexting = false;
      storeTemp();
      input.remove();
    }  
  });
  
}

async function zoomImage(scale) {
  let temp = await restoreTemp();
  let imgWidth = c.width * scale;
  let imgHeight = c.height * scale;
  let x = (c.width - imgWidth) / 2;
  let y = (c.height - imgHeight) / 2;
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
  ctx.drawImage(temp, x, y, imgWidth, imgHeight);
}