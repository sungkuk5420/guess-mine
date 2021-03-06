import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const controls = document.getElementById("jsControls");
const main = document.getElementById("jsMain");
const chat = document.getElementById("jsChat");
const sendMsg = document.getElementById("jsSendMsg");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const clearButton = document.getElementById("clearButton");


const INITIAL_COLOR = "#2c2c2c";
setTimeout(() => {
  hendleWindowResize();
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}, 2000);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let timer;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  getSocket().emit(window.events.changeGameStartingFlag, {
    status : true
  });
  ctx.beginPath();
  if(event.type === 'touchstart'){
    onMouseMove(event);
    sendMsg.blur();
  }
  if (!filling) {
    painting = true;
  } else {
    handleCanvasClick();
  }
};

const beginPath = (x, y, width, height) => {
  if(width && height){
    x = canvas.width * (x/width);
    y = canvas.height * (y/height);
  }
  ctx.moveTo(x, y);
};

const strokePath = (x, y, width, height, color = null) => {
  if(width && height){
    x = canvas.width * (x/width);
    y = canvas.height * (y/height);
  }

  let currentColor = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  
  ctx.strokeStyle = currentColor;
};

const onMouseMove = (event) => {
  const x = event.offsetX || (event.touches[0].pageX - event.touches[0].target.offsetLeft);
  const y = event.offsetY || (event.touches[0].pageY - event.touches[0].target.offsetTop);
  let width = canvas.width;
  let height = canvas.height;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { 
      x, 
      y, 
      width, 
      height 
    });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      width,
      height,
      color: ctx.strokeStyle
    });
  }
};

const handleColorClick = event => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "페인트로 변경";
  } else {
    filling = true;
    mode.innerText = "펜으로 변경";
  }
};

const fill = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = currentColor;
};

const handleCanvasClick = () => {
  if (filling) {
    fill();
    handleModeClick();
    getSocket().emit(window.events.fill, { color: ctx.fillStyle });
  }
};

const handleCM = event => {
  event.preventDefault();
};

const hendleWindowResize = () => {
  // main.style.width = "";
  // main.style.height = "";
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    // let smallSize = canvas.offsetWidth <= canvas.offsetHeight ? canvas.offsetWidth : canvas.offsetHeight;
    // canvas.width = smallSize;
    // canvas.height = smallSize;
    // main.style.width = smallSize + "px";
    // main.style.height = smallSize + "px";
    // chat.style.height = "calc(100% - "+(smallSize+80) + "px)";
  }, 200);

}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (window) {
  window.addEventListener("resize", hendleWindowResize);
}

if(clearButton){
  clearButton.addEventListener("click",function(){
    resetCanvas();
    getSocket().emit(window.events.fill, { color: "#ffffff" });
  })
}
export const handleBeganPath = ({ x, y, width, height }) => beginPath(x, y, width, height);
export const handleStrokedPath = ({ x, y, width, height, color }) => strokePath(x, y, width, height, color);
export const handleFilled = ({ color }) => {
  fill(color); 
  if(color ==="#ffffff"){
    resetCanvas();
  }
}

export const disableCanvas = () => {
  canvas.removeEventListener("mousemove", onMouseMove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("click", handleCanvasClick);

  canvas.removeEventListener("touchmove", onMouseMove);
  canvas.removeEventListener("touchstart", startPainting);
  canvas.removeEventListener("touchend", stopPainting);
  canvas.removeEventListener("touchleave", stopPainting);
  canvas.removeEventListener("touchcancel", stopPainting);
};

export const enableCanvas = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);

  canvas.addEventListener("touchmove", onMouseMove);
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
  canvas.addEventListener("touchleave", stopPainting);
  canvas.addEventListener("touchcancel", stopPainting);
};

export const hideControls = () => {
    controls.classList.add("is-disabled");
  };
export const showControls = () => {
  controls.classList.remove("is-disabled");
};
export const resetCanvas = () => {
  ctx.beginPath();  
  fill("#fff");
}

if (canvas) {
  canvas.addEventListener("contextmenu", handleCM);
  hideControls();
}

