const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) =>
  fireNotification(`${nickname} 님이 들어왔습니다!`, "rgb(0, 122, 255)");

export const handleDisconnected = ({ nickname }) =>{
  fireNotification(`${nickname} 님이 나가셨습니다!`, "rgb(255, 149, 0)");
}
  