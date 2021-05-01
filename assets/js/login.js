import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");
const resetNickname = document.getElementById("jsResetNickname");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

window.nickname =null;

// eslint-disable-next-line no-undef
const socket = io("/");
const logIn = nickname => {
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

if (window.nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(window.nickname);
}

const handleFormSubmit = e => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  window.nickname = value
  body.className = LOGGED_IN;
  logIn(value);
};

// const handleResetNickname = e => {
//   localStorage.removeItem(NICKNAME);
//   location.reload();
// }

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}

// if(resetNickname) {
//   resetNickname.addEventListener("click", handleResetNickname);
// }