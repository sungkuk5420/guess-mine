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

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
  resetCanvas();
  notifs.innerText = `출제자가 문제를 내고 있습니다. 정답을 맞춰보아요.`;
};
export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  enableChat();
  notifs.innerText = `당신은 출제자입니다. 답: ${word}`;
};
export const handleGameEnded = ({word}) => {
  setNotifs(`게임 끝. 답: ${word}`);
  disableCanvas();
  hideControls();
};
export const handleGameStarting = ({count}) => {
  startTimer(count);
  function startTimer(count){
    setTimeout(() => {
      setNotifs(`곧 게임이 시작됩니다. ${count}` );
      if(count > 1){
        startTimer(count-1);
      }
    }, 1000 );
  }
};