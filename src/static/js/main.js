(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableChat = exports.disableChat = exports.handleNewMessage = void 0;

var _sockets = require("./sockets");

var messages = document.getElementById("jsMessages");
var sendMsg = document.getElementById("jsSendMsg");
var chatRemoveSetTimeoutArray = [];

var appendMsg = function appendMsg(text, nickname) {
  console.log("user-li " + nickname);
  var currentUserInfo = document.getElementsByClassName("user-li " + nickname)[0];

  if (currentUserInfo) {
    var currentUserBubble = currentUserInfo.querySelector(".chat-bubble");
    currentUserBubble.innerText = text;
    currentUserBubble.classList.add("is-show");
    console.log(chatRemoveSetTimeoutArray);
    var currentFunc = chatRemoveSetTimeoutArray.filter(function (item) {
      return item.nickname === nickname;
    })[0];

    if (currentFunc) {
      console.log("clear");
      clearTimeout(currentFunc.func);
      chatRemoveSetTimeoutArray = chatRemoveSetTimeoutArray.filter(function (item) {
        return item.nickname !== nickname;
      });
    }

    var setTimeoutFunc = setTimeout(function () {
      currentUserBubble.classList.remove("is-show");
    }, 2000);
    chatRemoveSetTimeoutArray.push({
      nickname: nickname,
      func: setTimeoutFunc
    });
  }

  var li = document.createElement("li");
  li.innerHTML = "\n        <span class=\"author ".concat(nickname ? "out" : "self", "\">").concat(nickname ? nickname : "You", ":</span> ").concat(text, "\n    ");
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
};

var handleSendMsg = function handleSendMsg(event) {
  event.preventDefault();
  var input = sendMsg.querySelector("input");
  var value = input.value;
  (0, _sockets.getSocket)().emit(window.events.sendMsg, {
    message: value
  });
  input.value = "";
  appendMsg(value);
};

var handleNewMessage = function handleNewMessage(_ref) {
  var message = _ref.message,
      nickname = _ref.nickname;
  // const myNickname = localStorage.getItem("nickname");
  // if(myNickname !== nickname ){
  appendMsg(message, nickname); // }
};

exports.handleNewMessage = handleNewMessage;

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

var disableChat = function disableChat() {
  return sendMsg.style.display = "none";
};

exports.disableChat = disableChat;

var enableChat = function enableChat() {
  return sendMsg.style.display = "flex";
};

exports.enableChat = enableChat;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VuZE1zZyIsImNoYXRSZW1vdmVTZXRUaW1lb3V0QXJyYXkiLCJhcHBlbmRNc2ciLCJ0ZXh0Iiwibmlja25hbWUiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFVzZXJJbmZvIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImN1cnJlbnRVc2VyQnViYmxlIiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsImNsYXNzTGlzdCIsImFkZCIsImN1cnJlbnRGdW5jIiwiZmlsdGVyIiwiaXRlbSIsImNsZWFyVGltZW91dCIsImZ1bmMiLCJzZXRUaW1lb3V0RnVuYyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJwdXNoIiwibGkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJoYW5kbGVTZW5kTXNnIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwidmFsdWUiLCJlbWl0Iiwid2luZG93IiwiZXZlbnRzIiwibWVzc2FnZSIsImhhbmRsZU5ld01lc3NhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzYWJsZUNoYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJlbmFibGVDaGF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBakI7QUFDQSxJQUFNQyxPQUFPLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUNBLElBQUlFLHlCQUF5QixHQUFHLEVBQWhDOztBQUNBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUVwQ0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBV0YsUUFBdkI7QUFD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QUFHLFNBQWRBLFdBQWM7QUFBQSxTQUFPeEMsT0FBTyxDQUFDeUMsS0FBUixDQUFjQyxPQUFkLEdBQXdCLE1BQS9CO0FBQUEsQ0FBcEI7Ozs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLFNBQU8zQyxPQUFPLENBQUN5QyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBL0I7QUFBQSxDQUFuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNvY2tldCB9IGZyb20gXCIuL3NvY2tldHNcIjtcclxuXHJcbmNvbnN0IG1lc3NhZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc01lc3NhZ2VzXCIpO1xyXG5jb25zdCBzZW5kTXNnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1NlbmRNc2dcIik7XHJcbmxldCBjaGF0UmVtb3ZlU2V0VGltZW91dEFycmF5ID0gW107XHJcbmNvbnN0IGFwcGVuZE1zZyA9ICh0ZXh0LCBuaWNrbmFtZSkgPT4ge1xyXG5cclxuICBjb25zb2xlLmxvZyhcInVzZXItbGkgXCIrbmlja25hbWUpXHJcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInVzZXItbGkgXCIrbmlja25hbWUpWzBdO1xyXG4gIGlmKGN1cnJlbnRVc2VySW5mbyl7XHJcbiAgICBjb25zdCBjdXJyZW50VXNlckJ1YmJsZSA9IGN1cnJlbnRVc2VySW5mby5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtYnViYmxlXCIpXHJcbiAgICBjdXJyZW50VXNlckJ1YmJsZS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgY3VycmVudFVzZXJCdWJibGUuY2xhc3NMaXN0LmFkZChcImlzLXNob3dcIilcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coY2hhdFJlbW92ZVNldFRpbWVvdXRBcnJheSlcclxuICAgIGNvbnN0IGN1cnJlbnRGdW5jID0gY2hhdFJlbW92ZVNldFRpbWVvdXRBcnJheS5maWx0ZXIoaXRlbT0+aXRlbS5uaWNrbmFtZSA9PT1uaWNrbmFtZSlbMF1cclxuICAgIGlmKGN1cnJlbnRGdW5jKXtcclxuICAgICAgY29uc29sZS5sb2coXCJjbGVhclwiKVxyXG4gICAgICBjbGVhclRpbWVvdXQoY3VycmVudEZ1bmMuZnVuYyk7XHJcbiAgICAgIGNoYXRSZW1vdmVTZXRUaW1lb3V0QXJyYXkgPSBjaGF0UmVtb3ZlU2V0VGltZW91dEFycmF5LmZpbHRlcihpdGVtPT5pdGVtLm5pY2tuYW1lICE9PSBuaWNrbmFtZSlcclxuICAgIH1cclxuICAgIGNvbnN0IHNldFRpbWVvdXRGdW5jID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGN1cnJlbnRVc2VyQnViYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zaG93XCIpXHJcbiAgICB9LCAyMDAwKTtcclxuICAgIGNoYXRSZW1vdmVTZXRUaW1lb3V0QXJyYXkucHVzaCh7XHJcbiAgICAgIG5pY2tuYW1lLFxyXG4gICAgICBmdW5jIDpzZXRUaW1lb3V0RnVuY1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvciAke25pY2tuYW1lID8gXCJvdXRcIiA6IFwic2VsZlwifVwiPiR7XHJcbiAgICBuaWNrbmFtZSA/IG5pY2tuYW1lIDogXCJZb3VcIlxyXG4gIH06PC9zcGFuPiAke3RleHR9XHJcbiAgICBgO1xyXG4gIG1lc3NhZ2VzLmFwcGVuZENoaWxkKGxpKTtcclxuICBtZXNzYWdlcy5zY3JvbGxUb3AgPSBtZXNzYWdlcy5zY3JvbGxIZWlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVTZW5kTXNnID0gZXZlbnQgPT4ge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgaW5wdXQgPSBzZW5kTXNnLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcclxuICBjb25zdCB7IHZhbHVlIH0gPSBpbnB1dDtcclxuICBnZXRTb2NrZXQoKS5lbWl0KHdpbmRvdy5ldmVudHMuc2VuZE1zZywgeyBtZXNzYWdlOiB2YWx1ZSB9KTtcclxuICBpbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgYXBwZW5kTXNnKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVOZXdNZXNzYWdlID0gKHsgbWVzc2FnZSwgbmlja25hbWUgfSkgPT57XHJcbiAgLy8gY29uc3QgbXlOaWNrbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibmlja25hbWVcIik7XHJcbiAgLy8gaWYobXlOaWNrbmFtZSAhPT0gbmlja25hbWUgKXtcclxuICAgIGFwcGVuZE1zZyhtZXNzYWdlLCBuaWNrbmFtZSk7XHJcbiAgLy8gfVxyXG59XHJcblxyXG5pZiAoc2VuZE1zZykge1xyXG4gIHNlbmRNc2cuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVTZW5kTXNnKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc2FibGVDaGF0ID0gKCkgPT4gKHNlbmRNc2cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZUNoYXQgPSAoKSA9PiAoc2VuZE1zZy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCIpOyJdfQ==
},{"./sockets":7}],2:[function(require,module,exports){
"use strict";

require("./login");

require("./sockets");

require("./chat");

require("./paint");

document.addEventListener('DOMContentLoaded', function () {
  setPlatformInfo();
  var inputBox = document.querySelector('.safari #jsSendMsg input');

  if (inputBox) {
    inputBox.addEventListener('focus', function (e) {
      document.body.classList.add('keyboard');
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 200);
    });
    inputBox.addEventListener('blur', function (e) {
      document.body.classList.remove('keyboard');
    });
  }
});

function setPlatformInfo() {
  var ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      document.body.classList.add('chrome');
    } else {
      document.body.classList.add('safari');
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMWViZmE1ODQuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0UGxhdGZvcm1JbmZvIiwiaW5wdXRCb3giLCJxdWVyeVNlbGVjdG9yIiwiZSIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0Iiwid2luZG93Iiwic2Nyb2xsVG8iLCJyZW1vdmUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVTtBQUN0REMsRUFBQUEsZUFBZTtBQUNmLE1BQUlDLFFBQVEsR0FBR0gsUUFBUSxDQUFDSSxhQUFULENBQXVCLDBCQUF2QixDQUFmOztBQUNBLE1BQUdELFFBQUgsRUFBYTtBQUNUQSxJQUFBQSxRQUFRLENBQUNGLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQVNJLENBQVQsRUFBWTtBQUMvQ0wsTUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFVBQTVCO0FBQ0FDLE1BQUFBLFVBQVUsQ0FBQyxZQUFXO0FBQ2xCQyxRQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7QUFDSCxPQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0MsS0FMRDtBQU9BUixJQUFBQSxRQUFRLENBQUNGLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLFVBQVNJLENBQVQsRUFBWTtBQUM5Q0wsTUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFNBQWQsQ0FBd0JLLE1BQXhCLENBQStCLFVBQS9CO0FBQ0MsS0FGRDtBQUdIO0FBQ0YsQ0FmRDs7QUFpQkEsU0FBU1YsZUFBVCxHQUEyQjtBQUN6QixNQUFJVyxFQUFFLEdBQUdDLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsV0FBcEIsRUFBVDs7QUFDQSxNQUFJSCxFQUFFLENBQUNJLE9BQUgsQ0FBVyxRQUFYLEtBQXdCLENBQUMsQ0FBN0IsRUFBZ0M7QUFDOUIsUUFBSUosRUFBRSxDQUFDSSxPQUFILENBQVcsUUFBWCxJQUF1QixDQUFDLENBQTVCLEVBQStCO0FBQy9CakIsTUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFFBQTVCO0FBQ0MsS0FGRCxNQUVPO0FBQ1BSLE1BQUFBLFFBQVEsQ0FBQ00sSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixRQUE1QjtBQUNDO0FBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vbG9naW5cIjtcclxuaW1wb3J0IFwiLi9zb2NrZXRzXCI7XHJcbmltcG9ydCBcIi4vY2hhdFwiO1xyXG5pbXBvcnQgXCIuL3BhaW50XCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXsgXHJcbiAgc2V0UGxhdGZvcm1JbmZvKCk7XHJcbiAgdmFyIGlucHV0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhZmFyaSAjanNTZW5kTXNnIGlucHV0Jyk7XHJcbiAgaWYoaW5wdXRCb3gpIHtcclxuICAgICAgaW5wdXRCb3guYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgna2V5Ym9hcmQnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBpbnB1dEJveC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2tleWJvYXJkJyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXRQbGF0Zm9ybUluZm8oKSB7XHJcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBcclxuICBpZiAodWEuaW5kZXhPZignc2FmYXJpJykgIT0gLTEpIHsgXHJcbiAgICBpZiAodWEuaW5kZXhPZignY2hyb21lJykgPiAtMSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdjaHJvbWUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NhZmFyaScpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==
},{"./chat":1,"./login":3,"./paint":5,"./sockets":7}],3:[function(require,module,exports){
"use strict";

var _sockets = require("./sockets");

var body = document.querySelector("body");
var loginForm = document.getElementById("jsLogin");
var resetNickname = document.getElementById("jsResetNickname");
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";
window.nickname = null; // eslint-disable-next-line no-undef

var socket = io("/");

var logIn = function logIn(nickname) {
  socket.emit(window.events.setNickname, {
    nickname: nickname
  });
  (0, _sockets.initSockets)(socket);
};

if (window.nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(window.nickname);
}

var handleFormSubmit = function handleFormSubmit(e) {
  e.preventDefault();
  var input = loginForm.querySelector("input");
  var value = input.value;
  input.value = "";
  window.nickname = value;
  body.className = LOGGED_IN;
  logIn(value);
}; // const handleResetNickname = e => {
//   localStorage.removeItem(NICKNAME);
//   location.reload();
// }


if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
} // if(resetNickname) {
//   resetNickname.addEventListener("click", handleResetNickname);
// }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsInJlc2V0Tmlja25hbWUiLCJMT0dHRURfT1VUIiwiTE9HR0VEX0lOIiwid2luZG93Iiwibmlja25hbWUiLCJzb2NrZXQiLCJpbyIsImxvZ0luIiwiZW1pdCIsImV2ZW50cyIsInNldE5pY2tuYW1lIiwiY2xhc3NOYW1lIiwiaGFuZGxlRm9ybVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwidmFsdWUiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQU1BLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixTQUF4QixDQUFsQjtBQUNBLElBQU1DLGFBQWEsR0FBR0osUUFBUSxDQUFDRyxjQUFULENBQXdCLGlCQUF4QixDQUF0QjtBQUVBLElBQU1FLFVBQVUsR0FBRyxXQUFuQjtBQUNBLElBQU1DLFNBQVMsR0FBRyxVQUFsQjtBQUVBQyxNQUFNLENBQUNDLFFBQVAsR0FBaUIsSUFBakIsQyxDQUVBOztBQUNBLElBQU1DLE1BQU0sR0FBR0MsRUFBRSxDQUFDLEdBQUQsQ0FBakI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQUgsUUFBUSxFQUFJO0FBQ3hCQyxFQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FBWUwsTUFBTSxDQUFDTSxNQUFQLENBQWNDLFdBQTFCLEVBQXVDO0FBQUVOLElBQUFBLFFBQVEsRUFBUkE7QUFBRixHQUF2QztBQUNBLDRCQUFZQyxNQUFaO0FBQ0QsQ0FIRDs7QUFLQSxJQUFJRixNQUFNLENBQUNDLFFBQVAsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUJULEVBQUFBLElBQUksQ0FBQ2dCLFNBQUwsR0FBaUJWLFVBQWpCO0FBQ0QsQ0FGRCxNQUVPO0FBQ0xOLEVBQUFBLElBQUksQ0FBQ2dCLFNBQUwsR0FBaUJULFNBQWpCO0FBQ0FLLEVBQUFBLEtBQUssQ0FBQ0osTUFBTSxDQUFDQyxRQUFSLENBQUw7QUFDRDs7QUFFRCxJQUFNUSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUFDLENBQUMsRUFBSTtBQUM1QkEsRUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0EsTUFBTUMsS0FBSyxHQUFHakIsU0FBUyxDQUFDRCxhQUFWLENBQXdCLE9BQXhCLENBQWQ7QUFDQSxNQUFRbUIsS0FBUixHQUFrQkQsS0FBbEIsQ0FBUUMsS0FBUjtBQUNBRCxFQUFBQSxLQUFLLENBQUNDLEtBQU4sR0FBYyxFQUFkO0FBQ0FiLEVBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxHQUFrQlksS0FBbEI7QUFDQXJCLEVBQUFBLElBQUksQ0FBQ2dCLFNBQUwsR0FBaUJULFNBQWpCO0FBQ0FLLEVBQUFBLEtBQUssQ0FBQ1MsS0FBRCxDQUFMO0FBQ0QsQ0FSRCxDLENBVUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLElBQUlsQixTQUFKLEVBQWU7QUFDYkEsRUFBQUEsU0FBUyxDQUFDbUIsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUNMLGdCQUFyQztBQUNELEMsQ0FFRDtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0U29ja2V0cyB9IGZyb20gXCIuL3NvY2tldHNcIjtcclxuXHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0xvZ2luXCIpO1xyXG5jb25zdCByZXNldE5pY2tuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1Jlc2V0Tmlja25hbWVcIik7XHJcblxyXG5jb25zdCBMT0dHRURfT1VUID0gXCJsb2dnZWRPdXRcIjtcclxuY29uc3QgTE9HR0VEX0lOID0gXCJsb2dnZWRJblwiO1xyXG5cclxud2luZG93Lm5pY2tuYW1lID1udWxsO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbmNvbnN0IHNvY2tldCA9IGlvKFwiL1wiKTtcclxuY29uc3QgbG9nSW4gPSBuaWNrbmFtZSA9PiB7XHJcbiAgc29ja2V0LmVtaXQod2luZG93LmV2ZW50cy5zZXROaWNrbmFtZSwgeyBuaWNrbmFtZSB9KTtcclxuICBpbml0U29ja2V0cyhzb2NrZXQpO1xyXG59O1xyXG5cclxuaWYgKHdpbmRvdy5uaWNrbmFtZSA9PT0gbnVsbCkge1xyXG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX09VVDtcclxufSBlbHNlIHtcclxuICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9JTjtcclxuICBsb2dJbih3aW5kb3cubmlja25hbWUpO1xyXG59XHJcblxyXG5jb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IGlucHV0ID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcclxuICBjb25zdCB7IHZhbHVlIH0gPSBpbnB1dDtcclxuICBpbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgd2luZG93Lm5pY2tuYW1lID0gdmFsdWVcclxuICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9JTjtcclxuICBsb2dJbih2YWx1ZSk7XHJcbn07XHJcblxyXG4vLyBjb25zdCBoYW5kbGVSZXNldE5pY2tuYW1lID0gZSA9PiB7XHJcbi8vICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTklDS05BTUUpO1xyXG4vLyAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4vLyB9XHJcblxyXG5pZiAobG9naW5Gb3JtKSB7XHJcbiAgbG9naW5Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlRm9ybVN1Ym1pdCk7XHJcbn1cclxuXHJcbi8vIGlmKHJlc2V0Tmlja25hbWUpIHtcclxuLy8gICByZXNldE5pY2tuYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVSZXNldE5pY2tuYW1lKTtcclxuLy8gfSJdfQ==
},{"./sockets":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDisconnected = exports.handleNewUser = void 0;
var body = document.querySelector("body");

var fireNotification = function fireNotification(text, color) {
  var notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

var handleNewUser = function handleNewUser(_ref) {
  var nickname = _ref.nickname;
  return fireNotification("".concat(nickname, " \uB2D8\uC774 \uB4E4\uC5B4\uC654\uC2B5\uB2C8\uB2E4!"), "rgb(0, 122, 255)");
};

exports.handleNewUser = handleNewUser;

var handleDisconnected = function handleDisconnected(_ref2) {
  var nickname = _ref2.nickname;
  fireNotification("".concat(nickname, " \uB2D8\uC774 \uB098\uAC00\uC168\uC2B5\uB2C8\uB2E4!"), "rgb(255, 149, 0)");
};

exports.handleDisconnected = handleDisconnected;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuanMiXSwibmFtZXMiOlsiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZpcmVOb3RpZmljYXRpb24iLCJ0ZXh0IiwiY29sb3IiLCJub3RpZmljYXRpb24iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImhhbmRsZU5ld1VzZXIiLCJuaWNrbmFtZSIsImhhbmRsZURpc2Nvbm5lY3RlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjs7QUFFQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUN4QyxNQUFNQyxZQUFZLEdBQUdMLFFBQVEsQ0FBQ00sYUFBVCxDQUF1QixLQUF2QixDQUFyQjtBQUNBRCxFQUFBQSxZQUFZLENBQUNFLFNBQWIsR0FBeUJKLElBQXpCO0FBQ0FFLEVBQUFBLFlBQVksQ0FBQ0csS0FBYixDQUFtQkMsZUFBbkIsR0FBcUNMLEtBQXJDO0FBQ0FDLEVBQUFBLFlBQVksQ0FBQ0ssU0FBYixHQUF5QixjQUF6QjtBQUNBWCxFQUFBQSxJQUFJLENBQUNZLFdBQUwsQ0FBaUJOLFlBQWpCO0FBQ0QsQ0FORDs7QUFRTyxJQUFNTyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsTUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsU0FDM0JYLGdCQUFnQixXQUFJVyxRQUFKLDBEQUEyQixrQkFBM0IsQ0FEVztBQUFBLENBQXRCOzs7O0FBR0EsSUFBTUMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixRQUFpQjtBQUFBLE1BQWRELFFBQWMsU0FBZEEsUUFBYztBQUNqRFgsRUFBQUEsZ0JBQWdCLFdBQUlXLFFBQUosMERBQTJCLGtCQUEzQixDQUFoQjtBQUNELENBRk0iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcblxyXG5jb25zdCBmaXJlTm90aWZpY2F0aW9uID0gKHRleHQsIGNvbG9yKSA9PiB7XHJcbiAgY29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBub3RpZmljYXRpb24uaW5uZXJUZXh0ID0gdGV4dDtcclxuICBub3RpZmljYXRpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgbm90aWZpY2F0aW9uLmNsYXNzTmFtZSA9IFwibm90aWZpY2F0aW9uXCI7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZU5ld1VzZXIgPSAoeyBuaWNrbmFtZSB9KSA9PlxyXG4gIGZpcmVOb3RpZmljYXRpb24oYCR7bmlja25hbWV9IOuLmOydtCDrk6TslrTsmZTsirXri4jri6QhYCwgXCJyZ2IoMCwgMTIyLCAyNTUpXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZURpc2Nvbm5lY3RlZCA9ICh7IG5pY2tuYW1lIH0pID0+e1xyXG4gIGZpcmVOb3RpZmljYXRpb24oYCR7bmlja25hbWV9IOuLmOydtCDrgpjqsIDshajsirXri4jri6QhYCwgXCJyZ2IoMjU1LCAxNDksIDApXCIpO1xyXG59XHJcbiAgIl19
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetCanvas = exports.showControls = exports.hideControls = exports.enableCanvas = exports.disableCanvas = exports.handleFilled = exports.handleStrokedPath = exports.handleBeganPath = void 0;

var _sockets = require("./sockets");

var canvas = document.getElementById("jsCanvas");
var controls = document.getElementById("jsControls");
var main = document.getElementById("jsMain");
var chat = document.getElementById("jsChat");
var sendMsg = document.getElementById("jsSendMsg");
var ctx = canvas.getContext("2d");
var colors = document.getElementsByClassName("jsColor");
var mode = document.getElementById("jsMode");
var clearButton = document.getElementById("clearButton");
var INITIAL_COLOR = "#2c2c2c";
setTimeout(function () {
  hendleWindowResize();
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}, 2000);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
var painting = false;
var filling = false;
var timer;

var stopPainting = function stopPainting() {
  painting = false;
};

var startPainting = function startPainting() {
  (0, _sockets.getSocket)().emit(window.events.changeGameStartingFlag, {
    status: true
  });
  console.log("startPainting");
  ctx.beginPath();

  if (event.type === 'touchstart') {
    onMouseMove(event);
    sendMsg.blur();
  }

  if (!filling) {
    painting = true;
  } else {
    handleCanvasClick();
  }
};

var beginPath = function beginPath(x, y, width, height) {
  if (width && height) {
    x = canvas.width * (x / width);
    y = canvas.height * (y / height);
  }

  ctx.moveTo(x, y);
};

var strokePath = function strokePath(x, y, width, height) {
  var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  console.log("strokePath");

  if (width && height) {
    x = canvas.width * (x / width);
    y = canvas.height * (y / height);
  }

  var currentColor = ctx.strokeStyle;

  if (color !== null) {
    ctx.strokeStyle = color;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

var onMouseMove = function onMouseMove(event) {
  console.log("onMouseMove");
  var x = event.offsetX || event.touches[0].pageX - event.touches[0].target.offsetLeft;
  var y = event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop;
  var width = canvas.width;
  var height = canvas.height;

  if (!painting) {
    beginPath(x, y);
    (0, _sockets.getSocket)().emit(window.events.beginPath, {
      x: x,
      y: y,
      width: width,
      height: height
    });
  } else {
    strokePath(x, y);
    (0, _sockets.getSocket)().emit(window.events.strokePath, {
      x: x,
      y: y,
      width: width,
      height: height,
      color: ctx.strokeStyle
    });
  }
};

var handleColorClick = function handleColorClick(event) {
  var color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

var handleModeClick = function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "페인트로 변경";
  } else {
    filling = true;
    mode.innerText = "펜으로 변경";
  }
};

var fill = function fill() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var currentColor = ctx.fillStyle;

  if (color !== null) {
    ctx.fillStyle = color;
  }

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = currentColor;
};

var handleCanvasClick = function handleCanvasClick() {
  if (filling) {
    fill();
    handleModeClick();
    (0, _sockets.getSocket)().emit(window.events.fill, {
      color: ctx.fillStyle
    });
  }
};

var handleCM = function handleCM(event) {
  event.preventDefault();
};

var hendleWindowResize = function hendleWindowResize() {
  // main.style.width = "";
  // main.style.height = "";
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(function () {// let smallSize = canvas.offsetWidth <= canvas.offsetHeight ? canvas.offsetWidth : canvas.offsetHeight;
    // canvas.width = smallSize;
    // canvas.height = smallSize;
    // main.style.width = smallSize + "px";
    // main.style.height = smallSize + "px";
    // chat.style.height = "calc(100% - "+(smallSize+80) + "px)";
  }, 200);
};

Array.from(colors).forEach(function (color) {
  return color.addEventListener("click", handleColorClick);
});

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (window) {
  window.addEventListener("resize", hendleWindowResize);
}

var handleBeganPath = function handleBeganPath(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height;
  return beginPath(x, y, width, height);
};

exports.handleBeganPath = handleBeganPath;

var handleStrokedPath = function handleStrokedPath(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      width = _ref2.width,
      height = _ref2.height,
      color = _ref2.color;
  return strokePath(x, y, width, height, color);
};

exports.handleStrokedPath = handleStrokedPath;

var handleFilled = function handleFilled(_ref3) {
  var color = _ref3.color;
  return fill(color);
};

exports.handleFilled = handleFilled;

var disableCanvas = function disableCanvas() {
  canvas.removeEventListener("mousemove", onMouseMove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("click", handleCanvasClick);
  canvas.removeEventListener("touchmove", onMouseMove);
  canvas.removeEventListener("touchstart", startPainting);
  canvas.removeEventListener("touchend", stopPainting);
  canvas.removeEventListener("touchleave", stopPainting);
  canvas.removeEventListener("touchcancel", stopPainting);
};

exports.disableCanvas = disableCanvas;

var enableCanvas = function enableCanvas() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("touchmove", onMouseMove);
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
  canvas.addEventListener("touchleave", stopPainting);
  canvas.addEventListener("touchcancel", stopPainting);
};

exports.enableCanvas = enableCanvas;

var hideControls = function hideControls() {
  controls.classList.add("is-disabled");
};

exports.hideControls = hideControls;

var showControls = function showControls() {
  controls.classList.remove("is-disabled");
};

exports.showControls = showControls;

var resetCanvas = function resetCanvas() {
  ctx.beginPath();
  fill("#fff");
};

exports.resetCanvas = resetCanvas;

if (canvas) {
  canvas.addEventListener("contextmenu", handleCM);
  hideControls();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhaW50LmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250cm9scyIsIm1haW4iLCJjaGF0Iiwic2VuZE1zZyIsImN0eCIsImdldENvbnRleHQiLCJjb2xvcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibW9kZSIsImNsZWFyQnV0dG9uIiwiSU5JVElBTF9DT0xPUiIsInNldFRpbWVvdXQiLCJoZW5kbGVXaW5kb3dSZXNpemUiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwiaGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInBhaW50aW5nIiwiZmlsbGluZyIsInRpbWVyIiwic3RvcFBhaW50aW5nIiwic3RhcnRQYWludGluZyIsImVtaXQiLCJ3aW5kb3ciLCJldmVudHMiLCJjaGFuZ2VHYW1lU3RhcnRpbmdGbGFnIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsImJlZ2luUGF0aCIsImV2ZW50IiwidHlwZSIsIm9uTW91c2VNb3ZlIiwiYmx1ciIsImhhbmRsZUNhbnZhc0NsaWNrIiwieCIsInkiLCJtb3ZlVG8iLCJzdHJva2VQYXRoIiwiY29sb3IiLCJjdXJyZW50Q29sb3IiLCJsaW5lVG8iLCJzdHJva2UiLCJvZmZzZXRYIiwidG91Y2hlcyIsInBhZ2VYIiwidGFyZ2V0Iiwib2Zmc2V0TGVmdCIsIm9mZnNldFkiLCJwYWdlWSIsIm9mZnNldFRvcCIsImhhbmRsZUNvbG9yQ2xpY2siLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImhhbmRsZU1vZGVDbGljayIsImlubmVyVGV4dCIsImZpbGwiLCJoYW5kbGVDTSIsInByZXZlbnREZWZhdWx0IiwiY2xlYXJUaW1lb3V0IiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVCZWdhblBhdGgiLCJoYW5kbGVTdHJva2VkUGF0aCIsImhhbmRsZUZpbGxlZCIsImRpc2FibGVDYW52YXMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZW5hYmxlQ2FudmFzIiwiaGlkZUNvbnRyb2xzIiwiY2xhc3NMaXN0IiwiYWRkIiwic2hvd0NvbnRyb2xzIiwicmVtb3ZlIiwicmVzZXRDYW52YXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixVQUF4QixDQUFmO0FBQ0EsSUFBTUMsUUFBUSxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBakI7QUFDQSxJQUFNRSxJQUFJLEdBQUdILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsSUFBTUcsSUFBSSxHQUFHSixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLElBQU1JLE9BQU8sR0FBR0wsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQWhCO0FBQ0EsSUFBTUssR0FBRyxHQUFHUCxNQUFNLENBQUNRLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUNBLElBQU1DLE1BQU0sR0FBR1IsUUFBUSxDQUFDUyxzQkFBVCxDQUFnQyxTQUFoQyxDQUFmO0FBQ0EsSUFBTUMsSUFBSSxHQUFHVixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLElBQU1VLFdBQVcsR0FBR1gsUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0FBRUEsSUFBTVcsYUFBYSxHQUFHLFNBQXRCO0FBQ0FDLFVBQVUsQ0FBQyxZQUFNO0FBQ2ZDLEVBQUFBLGtCQUFrQjtBQUNsQmYsRUFBQUEsTUFBTSxDQUFDZ0IsS0FBUCxHQUFlaEIsTUFBTSxDQUFDaUIsV0FBdEI7QUFDQWpCLEVBQUFBLE1BQU0sQ0FBQ2tCLE1BQVAsR0FBZ0JsQixNQUFNLENBQUNtQixZQUF2QjtBQUNBWixFQUFBQSxHQUFHLENBQUNhLFNBQUosR0FBZ0IsT0FBaEI7QUFDQWIsRUFBQUEsR0FBRyxDQUFDYyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQnJCLE1BQU0sQ0FBQ2dCLEtBQTFCLEVBQWlDaEIsTUFBTSxDQUFDa0IsTUFBeEM7QUFDRCxDQU5TLEVBTVAsSUFOTyxDQUFWO0FBT0FYLEdBQUcsQ0FBQ2UsV0FBSixHQUFrQlQsYUFBbEI7QUFDQU4sR0FBRyxDQUFDYSxTQUFKLEdBQWdCUCxhQUFoQjtBQUNBTixHQUFHLENBQUNnQixTQUFKLEdBQWdCLEdBQWhCO0FBRUEsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxPQUFPLEdBQUcsS0FBZDtBQUNBLElBQUlDLEtBQUo7O0FBRUEsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUN6QkgsRUFBQUEsUUFBUSxHQUFHLEtBQVg7QUFDRCxDQUZEOztBQUlBLElBQU1JLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUMxQiw0QkFBWUMsSUFBWixDQUFpQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNDLHNCQUEvQixFQUF1RDtBQUNyREMsSUFBQUEsTUFBTSxFQUFHO0FBRDRDLEdBQXZEO0FBR0FDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFDQTVCLEVBQUFBLEdBQUcsQ0FBQzZCLFNBQUo7O0FBQ0EsTUFBR0MsS0FBSyxDQUFDQyxJQUFOLEtBQWUsWUFBbEIsRUFBK0I7QUFDN0JDLElBQUFBLFdBQVcsQ0FBQ0YsS0FBRCxDQUFYO0FBQ0EvQixJQUFBQSxPQUFPLENBQUNrQyxJQUFSO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDZixPQUFMLEVBQWM7QUFDWkQsSUFBQUEsUUFBUSxHQUFHLElBQVg7QUFDRCxHQUZELE1BRU87QUFDTGlCLElBQUFBLGlCQUFpQjtBQUNsQjtBQUNGLENBZkQ7O0FBaUJBLElBQU1MLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNNLENBQUQsRUFBSUMsQ0FBSixFQUFPM0IsS0FBUCxFQUFjRSxNQUFkLEVBQXlCO0FBQ3pDLE1BQUdGLEtBQUssSUFBSUUsTUFBWixFQUFtQjtBQUNqQndCLElBQUFBLENBQUMsR0FBRzFDLE1BQU0sQ0FBQ2dCLEtBQVAsSUFBZ0IwQixDQUFDLEdBQUMxQixLQUFsQixDQUFKO0FBQ0EyQixJQUFBQSxDQUFDLEdBQUczQyxNQUFNLENBQUNrQixNQUFQLElBQWlCeUIsQ0FBQyxHQUFDekIsTUFBbkIsQ0FBSjtBQUNEOztBQUNEWCxFQUFBQSxHQUFHLENBQUNxQyxNQUFKLENBQVdGLENBQVgsRUFBY0MsQ0FBZDtBQUNELENBTkQ7O0FBUUEsSUFBTUUsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0gsQ0FBRCxFQUFJQyxDQUFKLEVBQU8zQixLQUFQLEVBQWNFLE1BQWQsRUFBdUM7QUFBQSxNQUFqQjRCLEtBQWlCLHVFQUFULElBQVM7QUFDeERaLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVo7O0FBQ0EsTUFBR25CLEtBQUssSUFBSUUsTUFBWixFQUFtQjtBQUNqQndCLElBQUFBLENBQUMsR0FBRzFDLE1BQU0sQ0FBQ2dCLEtBQVAsSUFBZ0IwQixDQUFDLEdBQUMxQixLQUFsQixDQUFKO0FBQ0EyQixJQUFBQSxDQUFDLEdBQUczQyxNQUFNLENBQUNrQixNQUFQLElBQWlCeUIsQ0FBQyxHQUFDekIsTUFBbkIsQ0FBSjtBQUNEOztBQUVELE1BQUk2QixZQUFZLEdBQUd4QyxHQUFHLENBQUNlLFdBQXZCOztBQUNBLE1BQUl3QixLQUFLLEtBQUssSUFBZCxFQUFvQjtBQUNsQnZDLElBQUFBLEdBQUcsQ0FBQ2UsV0FBSixHQUFrQndCLEtBQWxCO0FBQ0Q7O0FBQ0R2QyxFQUFBQSxHQUFHLENBQUN5QyxNQUFKLENBQVdOLENBQVgsRUFBY0MsQ0FBZDtBQUNBcEMsRUFBQUEsR0FBRyxDQUFDMEMsTUFBSjtBQUVBMUMsRUFBQUEsR0FBRyxDQUFDZSxXQUFKLEdBQWtCeUIsWUFBbEI7QUFDRCxDQWZEOztBQWlCQSxJQUFNUixXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDRixLQUFELEVBQVc7QUFDN0JILEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7QUFDQSxNQUFNTyxDQUFDLEdBQUdMLEtBQUssQ0FBQ2EsT0FBTixJQUFrQmIsS0FBSyxDQUFDYyxPQUFOLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsR0FBeUJmLEtBQUssQ0FBQ2MsT0FBTixDQUFjLENBQWQsRUFBaUJFLE1BQWpCLENBQXdCQyxVQUE3RTtBQUNBLE1BQU1YLENBQUMsR0FBR04sS0FBSyxDQUFDa0IsT0FBTixJQUFrQmxCLEtBQUssQ0FBQ2MsT0FBTixDQUFjLENBQWQsRUFBaUJLLEtBQWpCLEdBQXlCbkIsS0FBSyxDQUFDYyxPQUFOLENBQWMsQ0FBZCxFQUFpQkUsTUFBakIsQ0FBd0JJLFNBQTdFO0FBQ0EsTUFBSXpDLEtBQUssR0FBR2hCLE1BQU0sQ0FBQ2dCLEtBQW5CO0FBQ0EsTUFBSUUsTUFBTSxHQUFHbEIsTUFBTSxDQUFDa0IsTUFBcEI7O0FBQ0EsTUFBSSxDQUFDTSxRQUFMLEVBQWU7QUFDYlksSUFBQUEsU0FBUyxDQUFDTSxDQUFELEVBQUlDLENBQUosQ0FBVDtBQUNBLDhCQUFZZCxJQUFaLENBQWlCQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0ssU0FBL0IsRUFBMEM7QUFDeENNLE1BQUFBLENBQUMsRUFBREEsQ0FEd0M7QUFFeENDLE1BQUFBLENBQUMsRUFBREEsQ0FGd0M7QUFHeEMzQixNQUFBQSxLQUFLLEVBQUxBLEtBSHdDO0FBSXhDRSxNQUFBQSxNQUFNLEVBQU5BO0FBSndDLEtBQTFDO0FBTUQsR0FSRCxNQVFPO0FBQ0wyQixJQUFBQSxVQUFVLENBQUNILENBQUQsRUFBSUMsQ0FBSixDQUFWO0FBQ0EsOEJBQVlkLElBQVosQ0FBaUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjYyxVQUEvQixFQUEyQztBQUN6Q0gsTUFBQUEsQ0FBQyxFQUFEQSxDQUR5QztBQUV6Q0MsTUFBQUEsQ0FBQyxFQUFEQSxDQUZ5QztBQUd6QzNCLE1BQUFBLEtBQUssRUFBTEEsS0FIeUM7QUFJekNFLE1BQUFBLE1BQU0sRUFBTkEsTUFKeUM7QUFLekM0QixNQUFBQSxLQUFLLEVBQUV2QyxHQUFHLENBQUNlO0FBTDhCLEtBQTNDO0FBT0Q7QUFDRixDQXhCRDs7QUEwQkEsSUFBTW9DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQXJCLEtBQUssRUFBSTtBQUNoQyxNQUFNUyxLQUFLLEdBQUdULEtBQUssQ0FBQ2dCLE1BQU4sQ0FBYU0sS0FBYixDQUFtQkMsZUFBakM7QUFDQXJELEVBQUFBLEdBQUcsQ0FBQ2UsV0FBSixHQUFrQndCLEtBQWxCO0FBQ0F2QyxFQUFBQSxHQUFHLENBQUNhLFNBQUosR0FBZ0IwQixLQUFoQjtBQUNELENBSkQ7O0FBTUEsSUFBTWUsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQUlwQyxPQUFPLEtBQUssSUFBaEIsRUFBc0I7QUFDcEJBLElBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0FkLElBQUFBLElBQUksQ0FBQ21ELFNBQUwsR0FBaUIsU0FBakI7QUFDRCxHQUhELE1BR087QUFDTHJDLElBQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0FkLElBQUFBLElBQUksQ0FBQ21ELFNBQUwsR0FBaUIsUUFBakI7QUFDRDtBQUNGLENBUkQ7O0FBVUEsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBa0I7QUFBQSxNQUFqQmpCLEtBQWlCLHVFQUFULElBQVM7QUFDN0IsTUFBSUMsWUFBWSxHQUFHeEMsR0FBRyxDQUFDYSxTQUF2Qjs7QUFDQSxNQUFJMEIsS0FBSyxLQUFLLElBQWQsRUFBb0I7QUFDbEJ2QyxJQUFBQSxHQUFHLENBQUNhLFNBQUosR0FBZ0IwQixLQUFoQjtBQUNEOztBQUNEdkMsRUFBQUEsR0FBRyxDQUFDYyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQnJCLE1BQU0sQ0FBQ2dCLEtBQTFCLEVBQWlDaEIsTUFBTSxDQUFDa0IsTUFBeEM7QUFDQVgsRUFBQUEsR0FBRyxDQUFDYSxTQUFKLEdBQWdCMkIsWUFBaEI7QUFDRCxDQVBEOztBQVNBLElBQU1OLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM5QixNQUFJaEIsT0FBSixFQUFhO0FBQ1hzQyxJQUFBQSxJQUFJO0FBQ0pGLElBQUFBLGVBQWU7QUFDZiw4QkFBWWhDLElBQVosQ0FBaUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjZ0MsSUFBL0IsRUFBcUM7QUFBRWpCLE1BQUFBLEtBQUssRUFBRXZDLEdBQUcsQ0FBQ2E7QUFBYixLQUFyQztBQUNEO0FBQ0YsQ0FORDs7QUFRQSxJQUFNNEMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQTNCLEtBQUssRUFBSTtBQUN4QkEsRUFBQUEsS0FBSyxDQUFDNEIsY0FBTjtBQUNELENBRkQ7O0FBSUEsSUFBTWxELGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsR0FBTTtBQUMvQjtBQUNBO0FBQ0EsTUFBSVcsS0FBSixFQUFXO0FBQ1R3QyxJQUFBQSxZQUFZLENBQUN4QyxLQUFELENBQVo7QUFDRDs7QUFDREEsRUFBQUEsS0FBSyxHQUFHWixVQUFVLENBQUMsWUFBVyxDQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxHQVBpQixFQU9mLEdBUGUsQ0FBbEI7QUFTRCxDQWZEOztBQWlCQXFELEtBQUssQ0FBQ0MsSUFBTixDQUFXM0QsTUFBWCxFQUFtQjRELE9BQW5CLENBQTJCLFVBQUF2QixLQUFLO0FBQUEsU0FDOUJBLEtBQUssQ0FBQ3dCLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDWixnQkFBaEMsQ0FEOEI7QUFBQSxDQUFoQzs7QUFJQSxJQUFJL0MsSUFBSixFQUFVO0FBQ1JBLEVBQUFBLElBQUksQ0FBQzJELGdCQUFMLENBQXNCLE9BQXRCLEVBQStCVCxlQUEvQjtBQUNEOztBQUVELElBQUkvQixNQUFKLEVBQVk7QUFDVkEsRUFBQUEsTUFBTSxDQUFDd0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0N2RCxrQkFBbEM7QUFDRDs7QUFFTSxJQUFNd0QsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUc3QixDQUFILFFBQUdBLENBQUg7QUFBQSxNQUFNQyxDQUFOLFFBQU1BLENBQU47QUFBQSxNQUFTM0IsS0FBVCxRQUFTQSxLQUFUO0FBQUEsTUFBZ0JFLE1BQWhCLFFBQWdCQSxNQUFoQjtBQUFBLFNBQTZCa0IsU0FBUyxDQUFDTSxDQUFELEVBQUlDLENBQUosRUFBTzNCLEtBQVAsRUFBY0UsTUFBZCxDQUF0QztBQUFBLENBQXhCOzs7O0FBQ0EsSUFBTXNELGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0I7QUFBQSxNQUFHOUIsQ0FBSCxTQUFHQSxDQUFIO0FBQUEsTUFBTUMsQ0FBTixTQUFNQSxDQUFOO0FBQUEsTUFBUzNCLEtBQVQsU0FBU0EsS0FBVDtBQUFBLE1BQWdCRSxNQUFoQixTQUFnQkEsTUFBaEI7QUFBQSxNQUF3QjRCLEtBQXhCLFNBQXdCQSxLQUF4QjtBQUFBLFNBQW9DRCxVQUFVLENBQUNILENBQUQsRUFBSUMsQ0FBSixFQUFPM0IsS0FBUCxFQUFjRSxNQUFkLEVBQXNCNEIsS0FBdEIsQ0FBOUM7QUFBQSxDQUExQjs7OztBQUNBLElBQU0yQixZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLE1BQUczQixLQUFILFNBQUdBLEtBQUg7QUFBQSxTQUFlaUIsSUFBSSxDQUFDakIsS0FBRCxDQUFuQjtBQUFBLENBQXJCOzs7O0FBRUEsSUFBTTRCLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUNqQzFFLEVBQUFBLE1BQU0sQ0FBQzJFLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDcEMsV0FBeEM7QUFDQXZDLEVBQUFBLE1BQU0sQ0FBQzJFLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDL0MsYUFBeEM7QUFDQTVCLEVBQUFBLE1BQU0sQ0FBQzJFLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDaEQsWUFBdEM7QUFDQTNCLEVBQUFBLE1BQU0sQ0FBQzJFLG1CQUFQLENBQTJCLFlBQTNCLEVBQXlDaEQsWUFBekM7QUFDQTNCLEVBQUFBLE1BQU0sQ0FBQzJFLG1CQUFQLENBQTJCLE9BQTNCLEVBQW9DbEMsaUJBQXBDO0FBRUF6QyxFQUFBQSxNQUFNLENBQUMyRSxtQkFBUCxDQUEyQixXQUEzQixFQUF3Q3BDLFdBQXhDO0FBQ0F2QyxFQUFBQSxNQUFNLENBQUMyRSxtQkFBUCxDQUEyQixZQUEzQixFQUF5Qy9DLGFBQXpDO0FBQ0E1QixFQUFBQSxNQUFNLENBQUMyRSxtQkFBUCxDQUEyQixVQUEzQixFQUF1Q2hELFlBQXZDO0FBQ0EzQixFQUFBQSxNQUFNLENBQUMyRSxtQkFBUCxDQUEyQixZQUEzQixFQUF5Q2hELFlBQXpDO0FBQ0EzQixFQUFBQSxNQUFNLENBQUMyRSxtQkFBUCxDQUEyQixhQUEzQixFQUEwQ2hELFlBQTFDO0FBQ0QsQ0FaTTs7OztBQWNBLElBQU1pRCxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ2hDNUUsRUFBQUEsTUFBTSxDQUFDc0UsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMvQixXQUFyQztBQUNBdkMsRUFBQUEsTUFBTSxDQUFDc0UsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMxQyxhQUFyQztBQUNBNUIsRUFBQUEsTUFBTSxDQUFDc0UsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMzQyxZQUFuQztBQUNBM0IsRUFBQUEsTUFBTSxDQUFDc0UsZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MzQyxZQUF0QztBQUNBM0IsRUFBQUEsTUFBTSxDQUFDc0UsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUM3QixpQkFBakM7QUFFQXpDLEVBQUFBLE1BQU0sQ0FBQ3NFLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDL0IsV0FBckM7QUFDQXZDLEVBQUFBLE1BQU0sQ0FBQ3NFLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDMUMsYUFBdEM7QUFDQTVCLEVBQUFBLE1BQU0sQ0FBQ3NFLGdCQUFQLENBQXdCLFVBQXhCLEVBQW9DM0MsWUFBcEM7QUFDQTNCLEVBQUFBLE1BQU0sQ0FBQ3NFLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDM0MsWUFBdEM7QUFDQTNCLEVBQUFBLE1BQU0sQ0FBQ3NFLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDM0MsWUFBdkM7QUFDRCxDQVpNOzs7O0FBY0EsSUFBTWtELFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFDOUIxRSxFQUFBQSxRQUFRLENBQUMyRSxTQUFULENBQW1CQyxHQUFuQixDQUF1QixhQUF2QjtBQUNELENBRkk7Ozs7QUFHQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ2hDN0UsRUFBQUEsUUFBUSxDQUFDMkUsU0FBVCxDQUFtQkcsTUFBbkIsQ0FBMEIsYUFBMUI7QUFDRCxDQUZNOzs7O0FBR0EsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUMvQjNFLEVBQUFBLEdBQUcsQ0FBQzZCLFNBQUo7QUFDQTJCLEVBQUFBLElBQUksQ0FBQyxNQUFELENBQUo7QUFDRCxDQUhNOzs7O0FBS1AsSUFBSS9ELE1BQUosRUFBWTtBQUNWQSxFQUFBQSxNQUFNLENBQUNzRSxnQkFBUCxDQUF3QixhQUF4QixFQUF1Q04sUUFBdkM7QUFDQWEsRUFBQUEsWUFBWTtBQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U29ja2V0IH0gZnJvbSBcIi4vc29ja2V0c1wiO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0NhbnZhc1wiKTtcclxuY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQ29udHJvbHNcIik7XHJcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTWFpblwiKTtcclxuY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNDaGF0XCIpO1xyXG5jb25zdCBzZW5kTXNnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1NlbmRNc2dcIik7XHJcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbmNvbnN0IGNvbG9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqc0NvbG9yXCIpO1xyXG5jb25zdCBtb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc01vZGVcIik7XHJcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhckJ1dHRvblwiKTtcclxuXHJcbmNvbnN0IElOSVRJQUxfQ09MT1IgPSBcIiMyYzJjMmNcIjtcclxuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgaGVuZGxlV2luZG93UmVzaXplKCk7XHJcbiAgY2FudmFzLndpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xyXG4gIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbn0sIDIwMDApO1xyXG5jdHguc3Ryb2tlU3R5bGUgPSBJTklUSUFMX0NPTE9SO1xyXG5jdHguZmlsbFN0eWxlID0gSU5JVElBTF9DT0xPUjtcclxuY3R4LmxpbmVXaWR0aCA9IDIuNTtcclxuXHJcbmxldCBwYWludGluZyA9IGZhbHNlO1xyXG5sZXQgZmlsbGluZyA9IGZhbHNlO1xyXG5sZXQgdGltZXI7XHJcblxyXG5jb25zdCBzdG9wUGFpbnRpbmcgPSAoKSA9PiB7XHJcbiAgcGFpbnRpbmcgPSBmYWxzZTtcclxufTtcclxuXHJcbmNvbnN0IHN0YXJ0UGFpbnRpbmcgPSAoKSA9PiB7XHJcbiAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLmNoYW5nZUdhbWVTdGFydGluZ0ZsYWcsIHtcclxuICAgIHN0YXR1cyA6IHRydWVcclxuICB9KTtcclxuICBjb25zb2xlLmxvZyhcInN0YXJ0UGFpbnRpbmdcIilcclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgaWYoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKXtcclxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KTtcclxuICAgIHNlbmRNc2cuYmx1cigpO1xyXG4gIH1cclxuICBpZiAoIWZpbGxpbmcpIHtcclxuICAgIHBhaW50aW5nID0gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgaGFuZGxlQ2FudmFzQ2xpY2soKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBiZWdpblBhdGggPSAoeCwgeSwgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gIGlmKHdpZHRoICYmIGhlaWdodCl7XHJcbiAgICB4ID0gY2FudmFzLndpZHRoICogKHgvd2lkdGgpO1xyXG4gICAgeSA9IGNhbnZhcy5oZWlnaHQgKiAoeS9oZWlnaHQpO1xyXG4gIH1cclxuICBjdHgubW92ZVRvKHgsIHkpO1xyXG59O1xyXG5cclxuY29uc3Qgc3Ryb2tlUGF0aCA9ICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciA9IG51bGwpID0+IHtcclxuICBjb25zb2xlLmxvZyhcInN0cm9rZVBhdGhcIilcclxuICBpZih3aWR0aCAmJiBoZWlnaHQpe1xyXG4gICAgeCA9IGNhbnZhcy53aWR0aCAqICh4L3dpZHRoKTtcclxuICAgIHkgPSBjYW52YXMuaGVpZ2h0ICogKHkvaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIGxldCBjdXJyZW50Q29sb3IgPSBjdHguc3Ryb2tlU3R5bGU7XHJcbiAgaWYgKGNvbG9yICE9PSBudWxsKSB7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICB9XHJcbiAgY3R4LmxpbmVUbyh4LCB5KTtcclxuICBjdHguc3Ryb2tlKCk7XHJcbiAgXHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY3VycmVudENvbG9yO1xyXG59O1xyXG5cclxuY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICBjb25zb2xlLmxvZyhcIm9uTW91c2VNb3ZlXCIpXHJcbiAgY29uc3QgeCA9IGV2ZW50Lm9mZnNldFggfHwgKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzBdLnRhcmdldC5vZmZzZXRMZWZ0KTtcclxuICBjb25zdCB5ID0gZXZlbnQub2Zmc2V0WSB8fCAoZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMF0udGFyZ2V0Lm9mZnNldFRvcCk7XHJcbiAgbGV0IHdpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gIGxldCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gIGlmICghcGFpbnRpbmcpIHtcclxuICAgIGJlZ2luUGF0aCh4LCB5KTtcclxuICAgIGdldFNvY2tldCgpLmVtaXQod2luZG93LmV2ZW50cy5iZWdpblBhdGgsIHsgXHJcbiAgICAgIHgsIFxyXG4gICAgICB5LCBcclxuICAgICAgd2lkdGgsIFxyXG4gICAgICBoZWlnaHQgXHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3Ryb2tlUGF0aCh4LCB5KTtcclxuICAgIGdldFNvY2tldCgpLmVtaXQod2luZG93LmV2ZW50cy5zdHJva2VQYXRoLCB7XHJcbiAgICAgIHgsXHJcbiAgICAgIHksXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGNvbG9yOiBjdHguc3Ryb2tlU3R5bGVcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUNvbG9yQ2xpY2sgPSBldmVudCA9PiB7XHJcbiAgY29uc3QgY29sb3IgPSBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZU1vZGVDbGljayA9ICgpID0+IHtcclxuICBpZiAoZmlsbGluZyA9PT0gdHJ1ZSkge1xyXG4gICAgZmlsbGluZyA9IGZhbHNlO1xyXG4gICAgbW9kZS5pbm5lclRleHQgPSBcIu2OmOyduO2KuOuhnCDrs4Dqsr1cIjtcclxuICB9IGVsc2Uge1xyXG4gICAgZmlsbGluZyA9IHRydWU7XHJcbiAgICBtb2RlLmlubmVyVGV4dCA9IFwi7Y6c7Jy866GcIOuzgOqyvVwiO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGZpbGwgPSAoY29sb3IgPSBudWxsKSA9PiB7XHJcbiAgbGV0IGN1cnJlbnRDb2xvciA9IGN0eC5maWxsU3R5bGU7XHJcbiAgaWYgKGNvbG9yICE9PSBudWxsKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgfVxyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVDYW52YXNDbGljayA9ICgpID0+IHtcclxuICBpZiAoZmlsbGluZykge1xyXG4gICAgZmlsbCgpO1xyXG4gICAgaGFuZGxlTW9kZUNsaWNrKCk7XHJcbiAgICBnZXRTb2NrZXQoKS5lbWl0KHdpbmRvdy5ldmVudHMuZmlsbCwgeyBjb2xvcjogY3R4LmZpbGxTdHlsZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVDTSA9IGV2ZW50ID0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG59O1xyXG5cclxuY29uc3QgaGVuZGxlV2luZG93UmVzaXplID0gKCkgPT4ge1xyXG4gIC8vIG1haW4uc3R5bGUud2lkdGggPSBcIlwiO1xyXG4gIC8vIG1haW4uc3R5bGUuaGVpZ2h0ID0gXCJcIjtcclxuICBpZiAodGltZXIpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgfVxyXG4gIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIC8vIGxldCBzbWFsbFNpemUgPSBjYW52YXMub2Zmc2V0V2lkdGggPD0gY2FudmFzLm9mZnNldEhlaWdodCA/IGNhbnZhcy5vZmZzZXRXaWR0aCA6IGNhbnZhcy5vZmZzZXRIZWlnaHQ7XHJcbiAgICAvLyBjYW52YXMud2lkdGggPSBzbWFsbFNpemU7XHJcbiAgICAvLyBjYW52YXMuaGVpZ2h0ID0gc21hbGxTaXplO1xyXG4gICAgLy8gbWFpbi5zdHlsZS53aWR0aCA9IHNtYWxsU2l6ZSArIFwicHhcIjtcclxuICAgIC8vIG1haW4uc3R5bGUuaGVpZ2h0ID0gc21hbGxTaXplICsgXCJweFwiO1xyXG4gICAgLy8gY2hhdC5zdHlsZS5oZWlnaHQgPSBcImNhbGMoMTAwJSAtIFwiKyhzbWFsbFNpemUrODApICsgXCJweClcIjtcclxuICB9LCAyMDApO1xyXG5cclxufVxyXG5cclxuQXJyYXkuZnJvbShjb2xvcnMpLmZvckVhY2goY29sb3IgPT5cclxuICBjb2xvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ29sb3JDbGljaylcclxuKTtcclxuXHJcbmlmIChtb2RlKSB7XHJcbiAgbW9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kZUNsaWNrKTtcclxufVxyXG5cclxuaWYgKHdpbmRvdykge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhlbmRsZVdpbmRvd1Jlc2l6ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVCZWdhblBhdGggPSAoeyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH0pID0+IGJlZ2luUGF0aCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuZXhwb3J0IGNvbnN0IGhhbmRsZVN0cm9rZWRQYXRoID0gKHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IgfSkgPT4gc3Ryb2tlUGF0aCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcik7XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVGaWxsZWQgPSAoeyBjb2xvciB9KSA9PiBmaWxsKGNvbG9yKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlQ2FudmFzID0gKCkgPT4ge1xyXG4gIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBzdGFydFBhaW50aW5nKTtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgc3RvcFBhaW50aW5nKTtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgc3RvcFBhaW50aW5nKTtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNhbnZhc0NsaWNrKTtcclxuXHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Nb3VzZU1vdmUpO1xyXG4gIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBzdGFydFBhaW50aW5nKTtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHN0b3BQYWludGluZyk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGxlYXZlXCIsIHN0b3BQYWludGluZyk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCBzdG9wUGFpbnRpbmcpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVuYWJsZUNhbnZhcyA9ICgpID0+IHtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RhcnRQYWludGluZyk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHN0b3BQYWludGluZyk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHN0b3BQYWludGluZyk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDYW52YXNDbGljayk7XHJcblxyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uTW91c2VNb3ZlKTtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgc3RhcnRQYWludGluZyk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hsZWF2ZVwiLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgc3RvcFBhaW50aW5nKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoaWRlQ29udHJvbHMgPSAoKSA9PiB7XHJcbiAgICBjb250cm9scy5jbGFzc0xpc3QuYWRkKFwiaXMtZGlzYWJsZWRcIik7XHJcbiAgfTtcclxuZXhwb3J0IGNvbnN0IHNob3dDb250cm9scyA9ICgpID0+IHtcclxuICBjb250cm9scy5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtZGlzYWJsZWRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZXNldENhbnZhcyA9ICgpID0+IHtcclxuICBjdHguYmVnaW5QYXRoKCk7ICBcclxuICBmaWxsKFwiI2ZmZlwiKTtcclxufVxyXG5cclxuaWYgKGNhbnZhcykge1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgaGFuZGxlQ00pO1xyXG4gIGhpZGVDb250cm9scygpO1xyXG59XHJcblxyXG4iXX0=
},{"./sockets":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGameStarting = exports.handleGameEnded = exports.handleNotLeaderNotif = exports.handleLeaderNotif = exports.handleGameStarted = exports.handlePlayerUpdate = exports.handleAllNotif3 = exports.handleAllNotif2 = exports.handleAllNotif = void 0;

var _paint = require("./paint");

var _chat = require("./chat");

var userInfo1 = document.querySelector(".user-1");
var userInfo2 = document.querySelector(".user-2");
var userInfo3 = document.querySelector(".user-3");
var userInfo4 = document.querySelector(".user-4");
var userInfo5 = document.querySelector(".user-5");
var userInfo6 = document.querySelector(".user-6");
var userInfo7 = document.querySelector(".user-7");
var userInfo8 = document.querySelector(".user-8");
var notifs = document.getElementById("jsNotifs");
var notifs2 = document.getElementById("jsNotifs2");
var notifs3 = document.getElementById("jsNotifs3");

var addPlayers = function addPlayers(players) {
  var index = 1;
  userInfo1.classList = "user-li user-1";
  userInfo1.querySelector(".name").innerText = "";
  userInfo1.querySelector(".score").innerText = "";
  userInfo1.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo2.classList = "user-li user-2";
  userInfo2.querySelector(".name").innerText = "";
  userInfo2.querySelector(".score").innerText = "";
  userInfo2.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo3.classList = "user-li user-3";
  userInfo3.querySelector(".name").innerText = "";
  userInfo3.querySelector(".score").innerText = "";
  userInfo3.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo4.classList = "user-li user-4";
  userInfo4.querySelector(".name").innerText = "";
  userInfo4.querySelector(".score").innerText = "";
  userInfo4.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo5.classList = "user-li user-5";
  userInfo5.querySelector(".name").innerText = "";
  userInfo5.querySelector(".score").innerText = "";
  userInfo5.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo6.classList = "user-li user-6";
  userInfo6.querySelector(".name").innerText = "";
  userInfo6.querySelector(".score").innerText = "";
  userInfo6.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo7.classList = "user-li user-7";
  userInfo7.querySelector(".name").innerText = "";
  userInfo7.querySelector(".score").innerText = "";
  userInfo7.querySelector(".user-info__photo").classList.remove("is-show");
  userInfo8.classList = "user-li user-8";
  userInfo8.querySelector(".name").innerText = "";
  userInfo8.querySelector(".score").innerText = "";
  userInfo8.querySelector(".user-info__photo").classList.remove("is-show");
  players.forEach(function (player) {
    if (index == 1) {
      userInfo1.classList.add(player.nickname);
      userInfo1.querySelector(".name").innerText = player.nickname;
      userInfo1.querySelector(".score").innerText = player.points;
      userInfo1.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 2) {
      userInfo2.classList.add(player.nickname);
      userInfo2.querySelector(".name").innerText = player.nickname;
      userInfo2.querySelector(".score").innerText = player.points;
      userInfo2.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 3) {
      userInfo3.classList.add(player.nickname);
      userInfo3.querySelector(".name").innerText = player.nickname;
      userInfo3.querySelector(".score").innerText = player.points;
      userInfo3.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 4) {
      userInfo4.classList.add(player.nickname);
      userInfo4.querySelector(".name").innerText = player.nickname;
      userInfo4.querySelector(".score").innerText = player.points;
      userInfo4.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 5) {
      userInfo5.classList.add(player.nickname);
      userInfo5.querySelector(".name").innerText = player.nickname;
      userInfo5.querySelector(".score").innerText = player.points;
      userInfo5.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 6) {
      userInfo6.classList.add(player.nickname);
      userInfo6.querySelector(".name").innerText = player.nickname;
      userInfo6.querySelector(".score").innerText = player.points;
      userInfo6.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 7) {
      userInfo7.classList.add(player.nickname);
      userInfo7.querySelector(".name").innerText = player.nickname;
      userInfo7.querySelector(".score").innerText = player.points;
      userInfo7.querySelector(".user-info__photo").classList.add("is-show");
    } else if (index == 8) {
      userInfo8.classList.add(player.nickname);
      userInfo8.querySelector(".name").innerText = player.nickname;
      userInfo8.querySelector(".score").innerText = player.points;
      userInfo8.querySelector(".user-info__photo").classList.add("is-show");
    }

    index++;
  });
};

var handleAllNotif = function handleAllNotif(text) {
  notifs.innerText = "";
  notifs.innerText = text;
};

exports.handleAllNotif = handleAllNotif;

var handleAllNotif2 = function handleAllNotif2(text) {
  notifs2.innerText = "";
  notifs2.innerText = text;
};

exports.handleAllNotif2 = handleAllNotif2;

var handleAllNotif3 = function handleAllNotif3(text) {
  notifs3.innerText = "";
  notifs3.innerText = text;
};

exports.handleAllNotif3 = handleAllNotif3;

var handlePlayerUpdate = function handlePlayerUpdate(_ref) {
  var sockets = _ref.sockets;
  return addPlayers(sockets);
};

exports.handlePlayerUpdate = handlePlayerUpdate;

var handleGameStarted = function handleGameStarted(_ref2) {
  var leader = _ref2.leader;
  (0, _paint.resetCanvas)();
  (0, _paint.disableCanvas)();
  (0, _paint.hideControls)();
  (0, _chat.enableChat)();
  console.log(leader);
  notifs.innerText = "".concat(leader, "\uB2D8\uC774 \uCD9C\uC81C\uC790 \uC785\uB2C8\uB2E4.");
  removeLeaderEffectToUserInfo();
  addLeaderEffectToUserInfo(leader);

  if (window.nickname != leader) {
    removeLeaderEffectToCanvas();
  } else {
    addLeaderEffectToCanvas();
  }
};

exports.handleGameStarted = handleGameStarted;

var handleLeaderNotif = function handleLeaderNotif(_ref3) {
  var word = _ref3.word;
  (0, _paint.enableCanvas)();
  (0, _paint.showControls)();
  (0, _chat.enableChat)();
  notifs.innerText = "\uB2F9\uC2E0\uC740 \uCD9C\uC81C\uC790 \uC785\uB2C8\uB2E4. \uBB38\uC81C: [ ".concat(word, " ]");
};

exports.handleLeaderNotif = handleLeaderNotif;

var handleNotLeaderNotif = function handleNotLeaderNotif(_ref4) {
  var message = _ref4.message,
      leader = _ref4.leader;

  if (leader) {
    if (window.nickname != leader.nickname) {
      notifs.innerText = "".concat(message);
    }
  }
};

exports.handleNotLeaderNotif = handleNotLeaderNotif;

var addLeaderEffectToCanvas = function addLeaderEffectToCanvas() {
  document.getElementById("jsCanvas").classList.add("is-leader");
  document.getElementById("jsChat").classList.add("is-leader");
};

var removeLeaderEffectToCanvas = function removeLeaderEffectToCanvas() {
  document.getElementById("jsCanvas").classList.remove("is-leader");
  document.getElementById("jsChat").classList.remove("is-leader");
};

var removeLeaderEffectToUserInfo = function removeLeaderEffectToUserInfo() {
  var leaderDOM = document.querySelector(".user-li.is-leader");

  if (leaderDOM) {
    leaderDOM.classList.remove("is-leader");
  }
};

var addLeaderEffectToUserInfo = function addLeaderEffectToUserInfo(leader) {
  var currentUserInfo = document.getElementsByClassName("user-li " + leader)[0];

  if (currentUserInfo) {
    currentUserInfo.classList.add("is-leader");
  }
};

var handleGameEnded = function handleGameEnded(_ref5) {
  var word = _ref5.word;
  handleAllNotif("\uAC8C\uC784 \uB05D. \uB2F5: ".concat(word));
  removeLeaderEffectToUserInfo();
  removeLeaderEffectToCanvas();
  handleAllNotif2("");
  handleAllNotif3("");
  (0, _paint.disableCanvas)();
  (0, _paint.hideControls)();
};

exports.handleGameEnded = handleGameEnded;

var handleGameStarting = function handleGameStarting(_ref6) {
  var count = _ref6.count;
  (0, _paint.resetCanvas)();
};

exports.handleGameStarting = handleGameStarting;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllcnMuanMiXSwibmFtZXMiOlsidXNlckluZm8xIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidXNlckluZm8yIiwidXNlckluZm8zIiwidXNlckluZm80IiwidXNlckluZm81IiwidXNlckluZm82IiwidXNlckluZm83IiwidXNlckluZm84Iiwibm90aWZzIiwiZ2V0RWxlbWVudEJ5SWQiLCJub3RpZnMyIiwibm90aWZzMyIsImFkZFBsYXllcnMiLCJwbGF5ZXJzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJpbm5lclRleHQiLCJyZW1vdmUiLCJmb3JFYWNoIiwicGxheWVyIiwiYWRkIiwibmlja25hbWUiLCJwb2ludHMiLCJoYW5kbGVBbGxOb3RpZiIsInRleHQiLCJoYW5kbGVBbGxOb3RpZjIiLCJoYW5kbGVBbGxOb3RpZjMiLCJoYW5kbGVQbGF5ZXJVcGRhdGUiLCJzb2NrZXRzIiwiaGFuZGxlR2FtZVN0YXJ0ZWQiLCJsZWFkZXIiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlTGVhZGVyRWZmZWN0VG9Vc2VySW5mbyIsImFkZExlYWRlckVmZmVjdFRvVXNlckluZm8iLCJ3aW5kb3ciLCJyZW1vdmVMZWFkZXJFZmZlY3RUb0NhbnZhcyIsImFkZExlYWRlckVmZmVjdFRvQ2FudmFzIiwiaGFuZGxlTGVhZGVyTm90aWYiLCJ3b3JkIiwiaGFuZGxlTm90TGVhZGVyTm90aWYiLCJtZXNzYWdlIiwibGVhZGVyRE9NIiwiY3VycmVudFVzZXJJbmZvIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImhhbmRsZUdhbWVFbmRlZCIsImhhbmRsZUdhbWVTdGFydGluZyIsImNvdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBT0E7O0FBRUEsSUFBTUEsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBbEI7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixTQUF2QixDQUFsQjtBQUNBLElBQU1F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O0FBQ3RDLE1BQU1TLFNBQVMsR0FBRzNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixvQkFBdkIsQ0FBbEI7O0FBQ0EsTUFBRzBDLFNBQUgsRUFBYTtBQUNYQSxJQUFBQSxTQUFTLENBQUMzQixTQUFWLENBQW9CRSxNQUFwQixDQUEyQixXQUEzQjtBQUNEO0FBQ0YsQ0FMRDs7QUFNQSxJQUFNaUIseUJBQXlCLEdBQUUsU0FBM0JBLHlCQUEyQixDQUFDSixNQUFELEVBQVU7QUFDekMsTUFBTWEsZUFBZSxHQUFHNUMsUUFBUSxDQUFDNkMsc0JBQVQsQ0FBZ0MsYUFBV2QsTUFBM0MsRUFBbUQsQ0FBbkQsQ0FBeEI7O0FBQ0EsTUFBR2EsZUFBSCxFQUFtQjtBQUNqQkEsSUFBQUEsZUFBZSxDQUFDNUIsU0FBaEIsQ0FBMEJLLEdBQTFCLENBQThCLFdBQTlCO0FBQ0Q7QUFDRixDQUxEOztBQU1PLElBQU15QixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLFFBQWM7QUFBQSxNQUFYTixJQUFXLFNBQVhBLElBQVc7QUFDM0NoQixFQUFBQSxjQUFjLHdDQUFhZ0IsSUFBYixFQUFkO0FBQ0FOLEVBQUFBLDRCQUE0QjtBQUM1QkcsRUFBQUEsMEJBQTBCO0FBQzFCWCxFQUFBQSxlQUFlLElBQWY7QUFDQUMsRUFBQUEsZUFBZSxJQUFmO0FBQ0E7QUFDQTtBQUNELENBUk07Ozs7QUFTQSxJQUFNb0Isa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixRQUFlO0FBQUEsTUFBWkMsS0FBWSxTQUFaQSxLQUFZO0FBQy9DO0FBQ0QsQ0FGTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgZGlzYWJsZUNhbnZhcyxcclxuICBoaWRlQ29udHJvbHMsXHJcbiAgZW5hYmxlQ2FudmFzLFxyXG4gIHNob3dDb250cm9scyxcclxuICByZXNldENhbnZhcyxcclxufSBmcm9tIFwiLi9wYWludFwiO1xyXG5pbXBvcnQgeyBkaXNhYmxlQ2hhdCwgZW5hYmxlQ2hhdCB9IGZyb20gXCIuL2NoYXRcIjtcclxuXHJcbmNvbnN0IHVzZXJJbmZvMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci0xXCIpO1xyXG5jb25zdCB1c2VySW5mbzIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItMlwiKTtcclxuY29uc3QgdXNlckluZm8zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLTNcIik7XHJcbmNvbnN0IHVzZXJJbmZvNCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci00XCIpO1xyXG5jb25zdCB1c2VySW5mbzUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItNVwiKTtcclxuY29uc3QgdXNlckluZm82ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLTZcIik7XHJcbmNvbnN0IHVzZXJJbmZvNyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci03XCIpO1xyXG5jb25zdCB1c2VySW5mbzggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItOFwiKTtcclxuY29uc3Qgbm90aWZzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc05vdGlmc1wiKTtcclxuY29uc3Qgbm90aWZzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNOb3RpZnMyXCIpO1xyXG5jb25zdCBub3RpZnMzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc05vdGlmczNcIik7XHJcblxyXG5jb25zdCBhZGRQbGF5ZXJzID0gKHBsYXllcnMpID0+IHtcclxuICBsZXQgaW5kZXggPSAxO1xyXG4gIHVzZXJJbmZvMS5jbGFzc0xpc3QgPSBcInVzZXItbGkgdXNlci0xXCI7XHJcbiAgdXNlckluZm8xLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvMS5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm8xLnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc2hvd1wiKTtcclxuICB1c2VySW5mbzIuY2xhc3NMaXN0ID0gXCJ1c2VyLWxpIHVzZXItMlwiO1xyXG4gIHVzZXJJbmZvMi5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzIucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvMi5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaW5mb19fcGhvdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIik7XHJcbiAgdXNlckluZm8zLmNsYXNzTGlzdCA9IFwidXNlci1saSB1c2VyLTNcIjtcclxuICB1c2VySW5mbzMucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm8zLnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzMucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zaG93XCIpO1xyXG4gIHVzZXJJbmZvNC5jbGFzc0xpc3QgPSBcInVzZXItbGkgdXNlci00XCI7XHJcbiAgdXNlckluZm80LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvNC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm80LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc2hvd1wiKTtcclxuICB1c2VySW5mbzUuY2xhc3NMaXN0ID0gXCJ1c2VyLWxpIHVzZXItNVwiO1xyXG4gIHVzZXJJbmZvNS5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzUucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvNS5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaW5mb19fcGhvdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIik7XHJcbiAgdXNlckluZm82LmNsYXNzTGlzdCA9IFwidXNlci1saSB1c2VyLTZcIjtcclxuICB1c2VySW5mbzYucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm82LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzYucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zaG93XCIpO1xyXG4gIHVzZXJJbmZvNy5jbGFzc0xpc3QgPSBcInVzZXItbGkgdXNlci03XCI7XHJcbiAgdXNlckluZm83LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvNy5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm83LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc2hvd1wiKTtcclxuICB1c2VySW5mbzguY2xhc3NMaXN0ID0gXCJ1c2VyLWxpIHVzZXItOFwiO1xyXG4gIHVzZXJJbmZvOC5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzgucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvOC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaW5mb19fcGhvdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIik7XHJcbiAgcGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcclxuICAgIGlmIChpbmRleCA9PSAxKSB7XHJcbiAgICAgIHVzZXJJbmZvMS5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvMS5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzEucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzEucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSAyKSB7XHJcbiAgICAgIHVzZXJJbmZvMi5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvMi5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzIucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzIucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSAzKSB7XHJcbiAgICAgIHVzZXJJbmZvMy5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvMy5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzMucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzMucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSA0KSB7XHJcbiAgICAgIHVzZXJJbmZvNC5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvNC5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzQucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzQucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSA1KSB7XHJcbiAgICAgIHVzZXJJbmZvNS5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvNS5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzUucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzUucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSA2KSB7XHJcbiAgICAgIHVzZXJJbmZvNi5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvNi5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzYucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzYucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSA3KSB7XHJcbiAgICAgIHVzZXJJbmZvNy5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvNy5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzcucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzcucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSA4KSB7XHJcbiAgICAgIHVzZXJJbmZvOC5jbGFzc0xpc3QuYWRkKHBsYXllci5uaWNrbmFtZSk7XHJcbiAgICAgIHVzZXJJbmZvOC5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICB1c2VySW5mbzgucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBwbGF5ZXIucG9pbnRzO1xyXG4gICAgICB1c2VySW5mbzgucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1zaG93XCIpO1xyXG4gICAgfVxyXG4gICAgaW5kZXgrKztcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVBbGxOb3RpZiA9ICh0ZXh0KSA9PiB7XHJcbiAgbm90aWZzLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgbm90aWZzLmlubmVyVGV4dCA9IHRleHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlQWxsTm90aWYyID0gKHRleHQpID0+IHtcclxuICBub3RpZnMyLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgbm90aWZzMi5pbm5lclRleHQgPSB0ZXh0O1xyXG59O1xyXG5leHBvcnQgY29uc3QgaGFuZGxlQWxsTm90aWYzID0gKHRleHQpID0+IHtcclxuICBub3RpZnMzLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgbm90aWZzMy5pbm5lclRleHQgPSB0ZXh0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZVBsYXllclVwZGF0ZSA9ICh7IHNvY2tldHMgfSkgPT4gYWRkUGxheWVycyhzb2NrZXRzKTtcclxuZXhwb3J0IGNvbnN0IGhhbmRsZUdhbWVTdGFydGVkID0gKHsgbGVhZGVyIH0pID0+IHtcclxuICByZXNldENhbnZhcygpO1xyXG4gIGRpc2FibGVDYW52YXMoKTtcclxuICBoaWRlQ29udHJvbHMoKTtcclxuICBlbmFibGVDaGF0KCk7XHJcbiAgY29uc29sZS5sb2cobGVhZGVyKVxyXG4gIG5vdGlmcy5pbm5lclRleHQgPSBgJHtsZWFkZXJ964uY7J20IOy2nOygnOyekCDsnoXri4jri6QuYDtcclxuICByZW1vdmVMZWFkZXJFZmZlY3RUb1VzZXJJbmZvKCk7XHJcbiAgYWRkTGVhZGVyRWZmZWN0VG9Vc2VySW5mbyhsZWFkZXIpO1xyXG4gIFxyXG4gICAgaWYgKHdpbmRvdy5uaWNrbmFtZSAhPSBsZWFkZXIpIHtcclxuICAgICAgcmVtb3ZlTGVhZGVyRWZmZWN0VG9DYW52YXMoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBhZGRMZWFkZXJFZmZlY3RUb0NhbnZhcygpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUxlYWRlck5vdGlmID0gKHsgd29yZCB9KSA9PiB7XHJcbiAgZW5hYmxlQ2FudmFzKCk7XHJcbiAgc2hvd0NvbnRyb2xzKCk7XHJcbiAgZW5hYmxlQ2hhdCgpO1xyXG4gIG5vdGlmcy5pbm5lclRleHQgPSBg64u57Iug7J2AIOy2nOygnOyekCDsnoXri4jri6QuIOusuOygnDogWyAke3dvcmR9IF1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZU5vdExlYWRlck5vdGlmID0gKHsgbWVzc2FnZSwgbGVhZGVyIH0pID0+IHtcclxuICBcclxuICBpZiAobGVhZGVyKSB7XHJcbiAgICBpZiAod2luZG93Lm5pY2tuYW1lICE9IGxlYWRlci5uaWNrbmFtZSkge1xyXG4gICAgICBub3RpZnMuaW5uZXJUZXh0ID0gYCR7bWVzc2FnZX1gO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGFkZExlYWRlckVmZmVjdFRvQ2FudmFzPSAoKT0+e1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNDYW52YXNcIikuY2xhc3NMaXN0LmFkZChcImlzLWxlYWRlclwiKVxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNDaGF0XCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1sZWFkZXJcIilcclxufVxyXG5jb25zdCByZW1vdmVMZWFkZXJFZmZlY3RUb0NhbnZhcz0gKCk9PntcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQ2FudmFzXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1sZWFkZXJcIilcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQ2hhdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtbGVhZGVyXCIpXHJcbn1cclxuY29uc3QgcmVtb3ZlTGVhZGVyRWZmZWN0VG9Vc2VySW5mbz0gKCk9PntcclxuICBjb25zdCBsZWFkZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItbGkuaXMtbGVhZGVyXCIpXHJcbiAgaWYobGVhZGVyRE9NKXtcclxuICAgIGxlYWRlckRPTS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtbGVhZGVyXCIpO1xyXG4gIH1cclxufVxyXG5jb25zdCBhZGRMZWFkZXJFZmZlY3RUb1VzZXJJbmZvPSAobGVhZGVyKT0+e1xyXG4gIGNvbnN0IGN1cnJlbnRVc2VySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ1c2VyLWxpIFwiK2xlYWRlcilbMF07XHJcbiAgaWYoY3VycmVudFVzZXJJbmZvKXtcclxuICAgIGN1cnJlbnRVc2VySW5mby5jbGFzc0xpc3QuYWRkKFwiaXMtbGVhZGVyXCIpXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVHYW1lRW5kZWQgPSAoeyB3b3JkIH0pID0+IHtcclxuICBoYW5kbGVBbGxOb3RpZihg6rKM7J6EIOuBnS4g64u1OiAke3dvcmR9YCk7XHJcbiAgcmVtb3ZlTGVhZGVyRWZmZWN0VG9Vc2VySW5mbygpO1xyXG4gIHJlbW92ZUxlYWRlckVmZmVjdFRvQ2FudmFzKCk7XHJcbiAgaGFuZGxlQWxsTm90aWYyKGBgKTtcclxuICBoYW5kbGVBbGxOb3RpZjMoYGApO1xyXG4gIGRpc2FibGVDYW52YXMoKTtcclxuICBoaWRlQ29udHJvbHMoKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGhhbmRsZUdhbWVTdGFydGluZyA9ICh7IGNvdW50IH0pID0+IHtcclxuICByZXNldENhbnZhcygpO1xyXG59O1xyXG4iXX0=
},{"./chat":1,"./paint":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSockets = exports.getSocket = void 0;

var _notifications = require("./notifications");

var _chat = require("./chat");

var _paint = require("./paint");

var _players = require("./players");

var socket = null;

var getSocket = function getSocket() {
  return socket;
};

exports.getSocket = getSocket;

var initSockets = function initSockets(aSocket) {
  var _window = window,
      events = _window.events;
  socket = aSocket;
  socket.on(events.newUser, _notifications.handleNewUser);
  socket.on(events.disconnected, _notifications.handleDisconnected);
  socket.on(events.newMsg, _chat.handleNewMessage);
  socket.on(events.beganPath, _paint.handleBeganPath);
  socket.on(events.strokedPath, _paint.handleStrokedPath);
  socket.on(events.filled, _paint.handleFilled);
  socket.on(events.playerUpdate, _players.handlePlayerUpdate);
  socket.on(events.gameStarted, _players.handleGameStarted);
  socket.on(events.leaderNotif, _players.handleLeaderNotif);
  socket.on(events.notLeaderNotif, _players.handleNotLeaderNotif);
  socket.on(events.allNotif, _players.handleAllNotif);
  socket.on(events.allNotif2, _players.handleAllNotif2);
  socket.on(events.allNotif3, _players.handleAllNotif3);
  socket.on(events.gameEnded, _players.handleGameEnded);
  socket.on(events.gameStarting, _players.handleGameStarting);
};

exports.initSockets = initSockets;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldHMuanMiXSwibmFtZXMiOlsic29ja2V0IiwiZ2V0U29ja2V0IiwiaW5pdFNvY2tldHMiLCJhU29ja2V0Iiwid2luZG93IiwiZXZlbnRzIiwib24iLCJuZXdVc2VyIiwiaGFuZGxlTmV3VXNlciIsImRpc2Nvbm5lY3RlZCIsImhhbmRsZURpc2Nvbm5lY3RlZCIsIm5ld01zZyIsImhhbmRsZU5ld01lc3NhZ2UiLCJiZWdhblBhdGgiLCJoYW5kbGVCZWdhblBhdGgiLCJzdHJva2VkUGF0aCIsImhhbmRsZVN0cm9rZWRQYXRoIiwiZmlsbGVkIiwiaGFuZGxlRmlsbGVkIiwicGxheWVyVXBkYXRlIiwiaGFuZGxlUGxheWVyVXBkYXRlIiwiZ2FtZVN0YXJ0ZWQiLCJoYW5kbGVHYW1lU3RhcnRlZCIsImxlYWRlck5vdGlmIiwiaGFuZGxlTGVhZGVyTm90aWYiLCJub3RMZWFkZXJOb3RpZiIsImhhbmRsZU5vdExlYWRlck5vdGlmIiwiYWxsTm90aWYiLCJoYW5kbGVBbGxOb3RpZiIsImFsbE5vdGlmMiIsImhhbmRsZUFsbE5vdGlmMiIsImFsbE5vdGlmMyIsImhhbmRsZUFsbE5vdGlmMyIsImdhbWVFbmRlZCIsImhhbmRsZUdhbWVFbmRlZCIsImdhbWVTdGFydGluZyIsImhhbmRsZUdhbWVTdGFydGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQVlBLElBQUlBLE1BQU0sR0FBRyxJQUFiOztBQUVPLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsU0FBTUQsTUFBTjtBQUFBLENBQWxCOzs7O0FBRUEsSUFBTUUsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQUMsT0FBTyxFQUFJO0FBQ3BDLGdCQUFtQkMsTUFBbkI7QUFBQSxNQUFRQyxNQUFSLFdBQVFBLE1BQVI7QUFDQUwsRUFBQUEsTUFBTSxHQUFHRyxPQUFUO0FBQ0FILEVBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRCxNQUFNLENBQUNFLE9BQWpCLEVBQTBCQyw0QkFBMUI7QUFDQVIsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQ0ksWUFBakIsRUFBK0JDLGlDQUEvQjtBQUNBVixFQUFBQSxNQUFNLENBQUNNLEVBQVAsQ0FBVUQsTUFBTSxDQUFDTSxNQUFqQixFQUF5QkMsc0JBQXpCO0FBQ0FaLEVBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRCxNQUFNLENBQUNRLFNBQWpCLEVBQTRCQyxzQkFBNUI7QUFDQWQsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQ1UsV0FBakIsRUFBOEJDLHdCQUE5QjtBQUNBaEIsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQ1ksTUFBakIsRUFBeUJDLG1CQUF6QjtBQUNBbEIsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQ2MsWUFBakIsRUFBK0JDLDJCQUEvQjtBQUNBcEIsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQ2dCLFdBQWpCLEVBQThCQywwQkFBOUI7QUFDQXRCLEVBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRCxNQUFNLENBQUNrQixXQUFqQixFQUE4QkMsMEJBQTlCO0FBQ0F4QixFQUFBQSxNQUFNLENBQUNNLEVBQVAsQ0FBVUQsTUFBTSxDQUFDb0IsY0FBakIsRUFBaUNDLDZCQUFqQztBQUNBMUIsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQ3NCLFFBQWpCLEVBQTJCQyx1QkFBM0I7QUFDQTVCLEVBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRCxNQUFNLENBQUN3QixTQUFqQixFQUE0QkMsd0JBQTVCO0FBQ0E5QixFQUFBQSxNQUFNLENBQUNNLEVBQVAsQ0FBVUQsTUFBTSxDQUFDMEIsU0FBakIsRUFBNEJDLHdCQUE1QjtBQUNBaEMsRUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVELE1BQU0sQ0FBQzRCLFNBQWpCLEVBQTRCQyx3QkFBNUI7QUFDQWxDLEVBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVRCxNQUFNLENBQUM4QixZQUFqQixFQUErQkMsMkJBQS9CO0FBQ0QsQ0FsQk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVOZXdVc2VyLCBoYW5kbGVEaXNjb25uZWN0ZWQgfSBmcm9tIFwiLi9ub3RpZmljYXRpb25zXCI7XHJcbmltcG9ydCB7IGhhbmRsZU5ld01lc3NhZ2UgfSBmcm9tIFwiLi9jaGF0XCI7XHJcbmltcG9ydCB7IGhhbmRsZUJlZ2FuUGF0aCwgaGFuZGxlU3Ryb2tlZFBhdGgsIGhhbmRsZUZpbGxlZCB9IGZyb20gXCIuL3BhaW50XCI7XHJcbmltcG9ydCB7XHJcbiAgaGFuZGxlUGxheWVyVXBkYXRlLFxyXG4gIGhhbmRsZUdhbWVTdGFydGVkLFxyXG4gIGhhbmRsZUxlYWRlck5vdGlmLFxyXG4gIGhhbmRsZU5vdExlYWRlck5vdGlmLFxyXG4gIGhhbmRsZUFsbE5vdGlmLFxyXG4gIGhhbmRsZUFsbE5vdGlmMixcclxuICBoYW5kbGVBbGxOb3RpZjMsXHJcbiAgaGFuZGxlR2FtZUVuZGVkLFxyXG4gIGhhbmRsZUdhbWVTdGFydGluZ1xyXG59IGZyb20gXCIuL3BsYXllcnNcIjtcclxuXHJcbmxldCBzb2NrZXQgPSBudWxsO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNvY2tldCA9ICgpID0+IHNvY2tldDtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0U29ja2V0cyA9IGFTb2NrZXQgPT4ge1xyXG4gIGNvbnN0IHsgZXZlbnRzIH0gPSB3aW5kb3c7XHJcbiAgc29ja2V0ID0gYVNvY2tldDtcclxuICBzb2NrZXQub24oZXZlbnRzLm5ld1VzZXIsIGhhbmRsZU5ld1VzZXIpO1xyXG4gIHNvY2tldC5vbihldmVudHMuZGlzY29ubmVjdGVkLCBoYW5kbGVEaXNjb25uZWN0ZWQpO1xyXG4gIHNvY2tldC5vbihldmVudHMubmV3TXNnLCBoYW5kbGVOZXdNZXNzYWdlKTtcclxuICBzb2NrZXQub24oZXZlbnRzLmJlZ2FuUGF0aCwgaGFuZGxlQmVnYW5QYXRoKTtcclxuICBzb2NrZXQub24oZXZlbnRzLnN0cm9rZWRQYXRoLCBoYW5kbGVTdHJva2VkUGF0aCk7XHJcbiAgc29ja2V0Lm9uKGV2ZW50cy5maWxsZWQsIGhhbmRsZUZpbGxlZCk7XHJcbiAgc29ja2V0Lm9uKGV2ZW50cy5wbGF5ZXJVcGRhdGUsIGhhbmRsZVBsYXllclVwZGF0ZSk7XHJcbiAgc29ja2V0Lm9uKGV2ZW50cy5nYW1lU3RhcnRlZCwgaGFuZGxlR2FtZVN0YXJ0ZWQpO1xyXG4gIHNvY2tldC5vbihldmVudHMubGVhZGVyTm90aWYsIGhhbmRsZUxlYWRlck5vdGlmKTtcclxuICBzb2NrZXQub24oZXZlbnRzLm5vdExlYWRlck5vdGlmLCBoYW5kbGVOb3RMZWFkZXJOb3RpZik7XHJcbiAgc29ja2V0Lm9uKGV2ZW50cy5hbGxOb3RpZiwgaGFuZGxlQWxsTm90aWYpO1xyXG4gIHNvY2tldC5vbihldmVudHMuYWxsTm90aWYyLCBoYW5kbGVBbGxOb3RpZjIpO1xyXG4gIHNvY2tldC5vbihldmVudHMuYWxsTm90aWYzLCBoYW5kbGVBbGxOb3RpZjMpO1xyXG4gIHNvY2tldC5vbihldmVudHMuZ2FtZUVuZGVkLCBoYW5kbGVHYW1lRW5kZWQpO1xyXG4gIHNvY2tldC5vbihldmVudHMuZ2FtZVN0YXJ0aW5nLCBoYW5kbGVHYW1lU3RhcnRpbmcpO1xyXG59OyJdfQ==
},{"./chat":1,"./notifications":4,"./paint":5,"./players":6}]},{},[2])