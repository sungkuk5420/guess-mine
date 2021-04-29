import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./paint";
import {
  handlePlayerUpdate,
  handleGameStarted,
  handleLeaderNotif,
  handleNotLeaderNotif,
  handleAllNotif,
  handleAllNotif2,
  handleAllNotif3,
  handleGameEnded,
  handleGameStarting
} from "./players";

let socket = null;

export const getSocket = () => socket;

export const initSockets = aSocket => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMessage);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFilled);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.gameStarted, handleGameStarted);
  socket.on(events.leaderNotif, handleLeaderNotif);
  socket.on(events.notLeaderNotif, handleNotLeaderNotif);
  socket.on(events.allNotif, handleAllNotif);
  socket.on(events.allNotif2, handleAllNotif2);
  socket.on(events.allNotif3, handleAllNotif3);
  socket.on(events.gameEnded, handleGameEnded);
  socket.on(events.gameStarting, handleGameStarting);
};