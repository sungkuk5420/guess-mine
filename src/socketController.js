import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let playingTimeout = null;// 게임을실행한후 60초
let startCheckTimeout = null;// 동작이 없으면 종료하는 타이머 10초
let howGameTimeout = null;// 시간초를 출력하는 타이머
let gameStartFlag = false;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];
const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });
  const startGame = (count) => {
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        leader = chooseLeader();
        word = chooseWord();
        superBroadcast(events.gameStarting, { count });
        gameStartFlag = false;
        setTimeout(() => {
          superBroadcast(events.gameStarted, { leader : leader.nickname });
          io.to(leader.id).emit(events.leaderNotif, { word });
          playingTimeout = setTimeout(endGame, 62000);
          showGameTime(60);
          gameStartCheck();
        }, 1000 * (count+1));
      }
    }
  };

  const showGameTime = (time) => {
    showTime(time);
    function showTime(time){
      howGameTimeout = setTimeout(() => {
        if ((playingTimeout !== null) && (time > 1)){
          superBroadcast(events.allNotif2,  `남은시간 : ${time}초`);
          showTime(time-1);
          if(time == 30){
            let wordSlice = word.slice(0,1);
            let remainderWord = word.slice(1,word.length);
            let circleText = "";
            for (let i = 0; i <remainderWord.length; i++) {
              circleText += "O";
            }
            superBroadcast(events.allNotif3,  ` [ O${circleText} ]`);
          }
          if(time == 15){
            if(word.length !== 1){
              let wordSlice = word.slice(0,1);
              let remainderWord = word.slice(1,word.length);
              let circleText = "";
              for (let i = 0; i <remainderWord.length; i++) {
                circleText += "O";
              }
              superBroadcast(events.allNotif3,  ` [ ${wordSlice}${circleText} ]`);
            }
          }
        }else{
          superBroadcast(events.allNotif2,  ``);
          superBroadcast(events.allNotif3,  ``);
        }
      }, 1000 );
    }
    
  };

  const endGame = (startTime,delayTime) => {
    inProgress = false;
    let start = (startTime !== 0) ? 3 : startTime;
    let delay = (delayTime !== 0) ? 5 : delayTime;
    
    superBroadcast(events.gameEnded, { word });
    if (startCheckTimeout !== null) {
      clearTimeout(startCheckTimeout);
      startCheckTimeout = null;
    }
    if (playingTimeout !== null) {
      clearTimeout(playingTimeout);
      playingTimeout = null;
    }
    if (howGameTimeout !== null) {
      clearTimeout(howGameTimeout);
      howGameTimeout = null;
    }
    superBroadcast(events.allNotif2,  ``);
    superBroadcast(events.allNotif3,  ``);
    setTimeout(() => {
      startGame(start)
    }, 1000*delay);
  };
  const addPoints = id => {
    sockets = sockets.map(socket => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    endGame(1,5);
  };

  const gameStartCheck = ()=>{
    startCheckTimeout = setTimeout(() => {
      if(!gameStartFlag){
        endGame(3,0);
        superBroadcast(events.allNotif,  "플레이어가 동작이 없어 턴을 넘깁니다.");
      }
    }, 12000);
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    startGame(3);
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    if (sockets.length === 1) {
      endGame();
    } else if (leader) {
      if (leader.id === socket.id) {
        endGame();
      }
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        message: `승자는 ${socket.nickname}입니다. 답: ${word}`,
        nickname: "안내봇"
      });
      addPoints(socket.id);
    } else {
      broadcast(events.newMsg, { message, nickname: socket.nickname });
    }
  });

  socket.on(events.beginPath, ({ x, y, width, height }) =>
    broadcast(events.beganPath, { x, y, width, height })
  );

  socket.on(events.strokePath, ({ x, y, width, height, color }) => {
    broadcast(events.strokedPath, { x, y, width, height, color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });

  socket.on(events.changeGameStartingFlag, ({status}) => {
    gameStartFlag = status;
  })
};



export default socketController;