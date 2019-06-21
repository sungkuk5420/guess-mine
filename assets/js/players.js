import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const notifs2 = document.getElementById("jsNotifs2");
const notifs3 = document.getElementById("jsNotifs3");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
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
  handleAllNotif(`${leader}が 問題を提出しています。正解を当ててみましょう。`);
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  enableChat();
  notifs.innerText = `あなたは.提出者です。 問題: ${word}`;
};
export const handleGameEnded = ({word}) => {
  handleAllNotif(`ゲーム終了. 正解: ${word}`);
  disableCanvas();
  hideControls();
};
export const handleGameStarting = ({count}) => {
  startTimer(count);
  setTimeout(() => {
    resetCanvas();
  }, 1000);
  function startTimer(count){
    setTimeout(() => {
      handleAllNotif(`まもなくゲームが始めます。 ${count}` );
      if(count > 1){
        startTimer(count-1);
      }
    }, 1000 );
  }
};
