import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas,
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

const addPlayers = (players) => {
  let index = 1;
  players.forEach((player) => {
    if (index == 1) {
      userInfo1.classList = "user-li user-1";
      userInfo1.classList.add(player.nickname);
      userInfo1.querySelector(".name").innerText = player.nickname;
      userInfo1.querySelector(".score").innerText = player.points;
      userInfo1.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 2) {
      userInfo2.classList = "user-li user-2";
      userInfo2.classList.add(player.nickname);
      userInfo2.querySelector(".name").innerText = player.nickname;
      userInfo2.querySelector(".score").innerText = player.points;
      userInfo2.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 3) {
      userInfo3.classList = "user-li user-3";
      userInfo3.classList.add(player.nickname);
      userInfo3.querySelector(".name").innerText = player.nickname;
      userInfo3.querySelector(".score").innerText = player.points;
      userInfo3.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 4) {
      userInfo4.classList = "user-li user-4";
      userInfo4.classList.add(player.nickname);
      userInfo4.querySelector(".name").innerText = player.nickname;
      userInfo4.querySelector(".score").innerText = player.points;
      userInfo4.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 5) {
      userInfo5.classList = "user-li user-5";
      userInfo5.classList.add(player.nickname);
      userInfo5.querySelector(".name").innerText = player.nickname;
      userInfo5.querySelector(".score").innerText = player.points;
      userInfo5.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 6) {
      userInfo6.classList = "user-li user-6";
      userInfo6.classList.add(player.nickname);
      userInfo6.querySelector(".name").innerText = player.nickname;
      userInfo6.querySelector(".score").innerText = player.points;
      userInfo6.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 7) {
      userInfo7.classList = "user-li user-7";
      userInfo7.classList.add(player.nickname);
      userInfo7.querySelector(".name").innerText = player.nickname;
      userInfo7.querySelector(".score").innerText = player.points;
      userInfo7.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 8) {
      userInfo8.classList = "user-li user-8";
      userInfo8.classList.add(player.nickname);
      userInfo8.querySelector(".name").innerText = player.nickname;
      userInfo8.querySelector(".score").innerText = player.points;
      userInfo8.querySelector(".user-info__photo").classList.add("is-show");
    }
    index++;
  });
};

export const handleAllNotif = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handleAllNotif2 = (text) => {
  notifs2.innerText = "";
  notifs2.innerText = text;
};
export const handleAllNotif3 = (text) => {
  notifs3.innerText = "";
  notifs3.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = ({ leader }) => {
  disableCanvas();
  hideControls();
  enableChat();
  notifs.innerText = `${leader}님이 출제자 입니다.`;
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  enableChat();
  notifs.innerText = `문제: ${word}`;
};

export const handleNotLeaderNotif = ({ message, leader }) => {
  const nickname = localStorage.getItem("nickname");
  if (leader) {
    if (nickname != leader.nickname) {
      notifs.innerText = `${message}`;
    }
  }
};
export const handleGameEnded = ({ word }) => {
  handleAllNotif(`게임 끝. 답: ${word}`);
  disableCanvas();
  hideControls();
};
export const handleGameStarting = ({ count }) => {
  resetCanvas();
};
