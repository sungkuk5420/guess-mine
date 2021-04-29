import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";


const userInfo1 = document.querySelector(".user-1");
const userInfo2 = document.querySelector(".user-2");
const userInfo3 = document.querySelector(".user-3");
const userInfo4 = document.querySelector(".user-4");
const userInfo5 = document.querySelector(".user-5");
const userInfo6 = document.querySelector(".user-6");
const userInfo7 = document.querySelector(".user-7");
const userInfo8 = document.querySelector(".user-8");
const notifs = document.getElementById("jsNotifs");
const notifs2 = document.getElementById("jsNotifs2");
const notifs3 = document.getElementById("jsNotifs3");

const addPlayers = players => {
  let index  =1;
  players.forEach(player => {
    if(index ==1){
      userInfo1.querySelector(".name").innerText =player.nickname;
      userInfo1.querySelector(".score").innerText =player.points;
    }else if(index ==2){
      userInfo2.querySelector(".name").innerText =player.nickname;
      userInfo2.querySelector(".score").innerText =player.points;
    }else if(index ==3){
      userInfo3.querySelector(".name").innerText =player.nickname;
      userInfo3.querySelector(".score").innerText =player.points;
    }else if(index ==4){
      userInfo4.querySelector(".name").innerText =player.nickname;
      userInfo4.querySelector(".score").innerText =player.points;
    }else if(index ==5){
      userInfo5.querySelector(".name").innerText =player.nickname;
      userInfo5.querySelector(".score").innerText =player.points;
    }else if(index ==6){
      userInfo6.querySelector(".name").innerText =player.nickname;
      userInfo6.querySelector(".score").innerText =player.points;
    }else if(index ==7){
      userInfo7.querySelector(".name").innerText =player.nickname;
      userInfo7.querySelector(".score").innerText =player.points;
    }else if(index ==8){
      userInfo8.querySelector(".name").innerText =player.nickname;
      userInfo8.querySelector(".score").innerText =player.points;
    }
    index++;
  });
};

export const handleAllNotif = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handleAllNotif2 = text => {
  notifs2.innerText = "";
  notifs2.innerText = text;
};
export const handleAllNotif3 = text => {
  notifs3.innerText = "";
  notifs3.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = ({leader}) => {
  disableCanvas();
  hideControls();
  enableChat();
  notifs.innerText = `${leader}(이)가 문제를 내고 있습니다. 정답을 맞춰보아요.`;
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  enableChat();
  notifs.innerText = `당신은 출제자입니다. 답: ${word}`;
};

export const handleNotLeaderNotif = ({message,leader}) => {
  const nickname = localStorage.getItem("nickname");
  if(leader){
    if(nickname !=leader.nickname){
      notifs.innerText = `${message}`;
    }
  }
};
export const handleGameEnded = ({word}) => {
  handleAllNotif(`게임 끝. 답: ${word}`);
  disableCanvas();
  hideControls();
};
export const handleGameStarting = ({count}) => {
  resetCanvas();
};
