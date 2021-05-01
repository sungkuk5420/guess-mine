import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let startCheckTimeout = null;// 동작이 없으면 종료하는 타이머 10초
let gameTimerTimeout = null;// 시간초를 출력하는 타이머
let countThreeSecondTimeout = null;// 시간초를 출력하는 타이머
let gameEndDelayTimeout = null;// 시간초를 출력하는 타이머
let gameStartFlag = false;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];
const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    leader = chooseLeader();
    word = chooseWord();
    superBroadcast(events.gameStarted, { leader : leader.nickname });
    io.to(leader.id).emit(events.leaderNotif, { word });
    gameStartFlag = true;
    showGameTime(60);
    gameStartCheck();
  };

  const countThreeSeconds = (countData)=>{
    let count = countData;
    countThreeSecondTimeout = setTimeout(() => {
      console.log(count)
      if (count > 0) {
          superBroadcast(events.allNotif, `곧 게임이 시작됩니다. ${count}`);
          superBroadcast(events.allNotif2,  ``);
          superBroadcast(events.allNotif3,  ``);
          count--;
        countThreeSeconds(count);
      } else {
        startGame();
      }
    }, 1000);
  }

  const showGameTime = (time) => {
    showTime(time);
    function showTime(time){
      gameTimerTimeout = setTimeout(() => {
        if ((gameStartFlag) && (time > 1)){
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
          endGame({startTimerSecond:0,waitTimeSecond:0});
        }
      }, 1000 );
    }
    
  };

  const endGame = ({startTimerSecond=0,waitTimeSecond = 0}) => {
    inProgress = false;
    let start = startTimerSecond;
    let wait =  waitTimeSecond;
    
    superBroadcast(events.gameEnded, { word });
    if (startCheckTimeout !== null) {
      clearTimeout(startCheckTimeout);
      startCheckTimeout = null;
    }
    if (gameTimerTimeout !== null) {
      clearTimeout(gameTimerTimeout);
      gameTimerTimeout = null;
    }
    if (countThreeSecondTimeout !== null) {
      clearTimeout(countThreeSecondTimeout);
      countThreeSecondTimeout = null;
    }
    if (gameEndDelayTimeout !== null) {
      clearTimeout(gameEndDelayTimeout);
      gameEndDelayTimeout = null;
    }

    gameStartFlag = false;
    superBroadcast(events.allNotif2,  `${wait}초 후 게임이 재시작 됩니다.`);
    superBroadcast(events.allNotif3,  ``);
    gameEndDelayTimeout = setTimeout(() => {
      inProgress = true;
      countThreeSeconds(start);
    }, 1000*wait);
  };
  const addPoints = id => {
    sockets = sockets.map(socket => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
  };

  const gameStartCheck = ()=>{
    startCheckTimeout = setTimeout(() => {
        endGame(
          {
            startTimerSecond:3,
            waitTimeSecond:2
          }
        );
        superBroadcast(events.allNotif,  "플레이어가 동작이 없어 턴을 넘깁니다.");
        superBroadcast(events.allNotif2,  ``);
        superBroadcast(events.allNotif3,  ``);
    }, 12000);
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    if(!inProgress &&!gameStartFlag){
      superBroadcast(events.allNotif,  "플레이어를 기다리고 있습니다. (1 / 8)");
      superBroadcast(events.allNotif2,  ``);
      superBroadcast(events.allNotif3,  ``);
      if ((sockets.length > 1) ) {
        countThreeSeconds(3);
      }
    }else{
      if(leader){
        superBroadcast(events.notLeaderNotif, { message:`${leader.nickname}(이)가 문제를 내고 있습니다. 정답을 맞춰보아요.`, leader: leader });
      }
    }
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    if (sockets.length === 1) {
      endGame({startTimerSecond:3,waitTimeSecond:0});
    } else if (leader) {
      if (leader.id === socket.id) {
        endGame({startTimerSecond:0,waitTimeSecond:0});
      }
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    console.log(socket.nickname)
    superBroadcast(events.newMsg, { message, nickname: socket.nickname });
    if(!leader){
      return false;
    }
    
    if((socket.id !== leader.id) && (message === word)) {
      superBroadcast(events.newMsg, {
        message: `승자는 ${socket.nickname}입니다. 답: ${word}`,
        nickname: "안내봇"
      });
      addPoints(socket.id);
      endGame({startTimerSecond:3,waitTimeSecond:5});
    } 
  });

  socket.on(events.beginPath, ({ x, y, width, height }) =>
    broadcast(events.beganPath, { x, y, width, height })
  );

  socket.on(events.strokePath, ({ x, y, width, height, color }) => {
    if (startCheckTimeout !== null) {
      clearTimeout(startCheckTimeout);
      startCheckTimeout = null;
    }
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