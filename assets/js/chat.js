import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");
let chatRemoveSetTimeoutArray = [];
const appendMsg = (text, nickname) => {

  console.log("user-li "+nickname)
  const currentUserInfo = document.getElementsByClassName("user-li "+nickname)[0];
  if(currentUserInfo){
    const currentUserBubble = currentUserInfo.querySelector(".chat-bubble")
    currentUserBubble.innerText = text;
    currentUserBubble.classList.add("is-show")
    
    console.log(chatRemoveSetTimeoutArray)
    const currentFunc = chatRemoveSetTimeoutArray.filter(item=>item.nickname ===nickname)[0]
    if(currentFunc){
      console.log("clear")
      clearTimeout(currentFunc.func);
      chatRemoveSetTimeoutArray = chatRemoveSetTimeoutArray.filter(item=>item.nickname !== nickname)
    }
    const setTimeoutFunc = setTimeout(() => {
      currentUserBubble.classList.remove("is-show")
    }, 2000);
    chatRemoveSetTimeoutArray.push({
      nickname,
      func :setTimeoutFunc
    });
  }
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname : "You"
  }:</span> ${text}
    `;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
};

const handleSendMsg = event => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMsg(value);
};

export const handleNewMessage = ({ message, nickname }) =>{
  // const myNickname = localStorage.getItem("nickname");
  // if(myNickname !== nickname ){
    appendMsg(message, nickname);
  // }
}

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

export const disableChat = () => (sendMsg.style.display = "none");
export const enableChat = () => (sendMsg.style.display = "flex");