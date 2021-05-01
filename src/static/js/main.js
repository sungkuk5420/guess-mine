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
  return appendMsg(message, nickname);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VuZE1zZyIsImNoYXRSZW1vdmVTZXRUaW1lb3V0QXJyYXkiLCJhcHBlbmRNc2ciLCJ0ZXh0Iiwibmlja25hbWUiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFVzZXJJbmZvIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImN1cnJlbnRVc2VyQnViYmxlIiwicXVlcnlTZWxlY3RvciIsImlubmVyVGV4dCIsImNsYXNzTGlzdCIsImFkZCIsImN1cnJlbnRGdW5jIiwiZmlsdGVyIiwiaXRlbSIsImNsZWFyVGltZW91dCIsImZ1bmMiLCJzZXRUaW1lb3V0RnVuYyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJwdXNoIiwibGkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJoYW5kbGVTZW5kTXNnIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwidmFsdWUiLCJlbWl0Iiwid2luZG93IiwiZXZlbnRzIiwibWVzc2FnZSIsImhhbmRsZU5ld01lc3NhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzYWJsZUNoYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJlbmFibGVDaGF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBakI7QUFDQSxJQUFNQyxPQUFPLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUNBLElBQUlFLHlCQUF5QixHQUFHLEVBQWhDOztBQUNBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUVwQ0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBV0YsUUFBdkI7QUFD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LENBQUN5QyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBL0I7QUFBQSxDQUFwQjs7OztBQUNBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUEsU0FBTzNDLE9BQU8sQ0FBQ3lDLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixNQUEvQjtBQUFBLENBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U29ja2V0IH0gZnJvbSBcIi4vc29ja2V0c1wiO1xyXG5cclxuY29uc3QgbWVzc2FnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTWVzc2FnZXNcIik7XHJcbmNvbnN0IHNlbmRNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzU2VuZE1zZ1wiKTtcclxubGV0IGNoYXRSZW1vdmVTZXRUaW1lb3V0QXJyYXkgPSBbXTtcclxuY29uc3QgYXBwZW5kTXNnID0gKHRleHQsIG5pY2tuYW1lKSA9PiB7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwidXNlci1saSBcIituaWNrbmFtZSlcclxuICBjb25zdCBjdXJyZW50VXNlckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidXNlci1saSBcIituaWNrbmFtZSlbMF07XHJcbiAgaWYoY3VycmVudFVzZXJJbmZvKXtcclxuICAgIGNvbnN0IGN1cnJlbnRVc2VyQnViYmxlID0gY3VycmVudFVzZXJJbmZvLnF1ZXJ5U2VsZWN0b3IoXCIuY2hhdC1idWJibGVcIilcclxuICAgIGN1cnJlbnRVc2VyQnViYmxlLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICBjdXJyZW50VXNlckJ1YmJsZS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhjaGF0UmVtb3ZlU2V0VGltZW91dEFycmF5KVxyXG4gICAgY29uc3QgY3VycmVudEZ1bmMgPSBjaGF0UmVtb3ZlU2V0VGltZW91dEFycmF5LmZpbHRlcihpdGVtPT5pdGVtLm5pY2tuYW1lID09PW5pY2tuYW1lKVswXVxyXG4gICAgaWYoY3VycmVudEZ1bmMpe1xyXG4gICAgICBjb25zb2xlLmxvZyhcImNsZWFyXCIpXHJcbiAgICAgIGNsZWFyVGltZW91dChjdXJyZW50RnVuYy5mdW5jKTtcclxuICAgICAgY2hhdFJlbW92ZVNldFRpbWVvdXRBcnJheSA9IGNoYXRSZW1vdmVTZXRUaW1lb3V0QXJyYXkuZmlsdGVyKGl0ZW09Pml0ZW0ubmlja25hbWUgIT09IG5pY2tuYW1lKVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc2V0VGltZW91dEZ1bmMgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY3VycmVudFVzZXJCdWJibGUuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIilcclxuICAgIH0sIDIwMDApO1xyXG4gICAgY2hhdFJlbW92ZVNldFRpbWVvdXRBcnJheS5wdXNoKHtcclxuICAgICAgbmlja25hbWUsXHJcbiAgICAgIGZ1bmMgOnNldFRpbWVvdXRGdW5jXHJcbiAgICB9KTtcclxuICB9XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yICR7bmlja25hbWUgPyBcIm91dFwiIDogXCJzZWxmXCJ9XCI+JHtcclxuICAgIG5pY2tuYW1lID8gbmlja25hbWUgOiBcIllvdVwiXHJcbiAgfTo8L3NwYW4+ICR7dGV4dH1cclxuICAgIGA7XHJcbiAgbWVzc2FnZXMuYXBwZW5kQ2hpbGQobGkpO1xyXG4gIG1lc3NhZ2VzLnNjcm9sbFRvcCA9IG1lc3NhZ2VzLnNjcm9sbEhlaWdodDtcclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZVNlbmRNc2cgPSBldmVudCA9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBpbnB1dCA9IHNlbmRNc2cucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xyXG4gIGNvbnN0IHsgdmFsdWUgfSA9IGlucHV0O1xyXG4gIGdldFNvY2tldCgpLmVtaXQod2luZG93LmV2ZW50cy5zZW5kTXNnLCB7IG1lc3NhZ2U6IHZhbHVlIH0pO1xyXG4gIGlucHV0LnZhbHVlID0gXCJcIjtcclxuICBhcHBlbmRNc2codmFsdWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZU5ld01lc3NhZ2UgPSAoeyBtZXNzYWdlLCBuaWNrbmFtZSB9KSA9PlxyXG4gIGFwcGVuZE1zZyhtZXNzYWdlLCBuaWNrbmFtZSk7XHJcblxyXG5pZiAoc2VuZE1zZykge1xyXG4gIHNlbmRNc2cuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVTZW5kTXNnKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc2FibGVDaGF0ID0gKCkgPT4gKHNlbmRNc2cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZUNoYXQgPSAoKSA9PiAoc2VuZE1zZy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCIpOyJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZDEzY2M4YTguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0UGxhdGZvcm1JbmZvIiwiaW5wdXRCb3giLCJxdWVyeVNlbGVjdG9yIiwiZSIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0Iiwid2luZG93Iiwic2Nyb2xsVG8iLCJyZW1vdmUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVTtBQUN0REMsRUFBQUEsZUFBZTtBQUNmLE1BQUlDLFFBQVEsR0FBR0gsUUFBUSxDQUFDSSxhQUFULENBQXVCLDBCQUF2QixDQUFmOztBQUNBLE1BQUdELFFBQUgsRUFBYTtBQUNUQSxJQUFBQSxRQUFRLENBQUNGLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQVNJLENBQVQsRUFBWTtBQUMvQ0wsTUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFVBQTVCO0FBQ0FDLE1BQUFBLFVBQVUsQ0FBQyxZQUFXO0FBQ2xCQyxRQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7QUFDSCxPQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0MsS0FMRDtBQU9BUixJQUFBQSxRQUFRLENBQUNGLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLFVBQVNJLENBQVQsRUFBWTtBQUM5Q0wsTUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFNBQWQsQ0FBd0JLLE1BQXhCLENBQStCLFVBQS9CO0FBQ0MsS0FGRDtBQUdIO0FBQ0YsQ0FmRDs7QUFpQkEsU0FBU1YsZUFBVCxHQUEyQjtBQUN6QixNQUFJVyxFQUFFLEdBQUdDLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsV0FBcEIsRUFBVDs7QUFDQSxNQUFJSCxFQUFFLENBQUNJLE9BQUgsQ0FBVyxRQUFYLEtBQXdCLENBQUMsQ0FBN0IsRUFBZ0M7QUFDOUIsUUFBSUosRUFBRSxDQUFDSSxPQUFILENBQVcsUUFBWCxJQUF1QixDQUFDLENBQTVCLEVBQStCO0FBQy9CakIsTUFBQUEsUUFBUSxDQUFDTSxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFFBQTVCO0FBQ0MsS0FGRCxNQUVPO0FBQ1BSLE1BQUFBLFFBQVEsQ0FBQ00sSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixRQUE1QjtBQUNDO0FBQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vbG9naW5cIjtcclxuaW1wb3J0IFwiLi9zb2NrZXRzXCI7XHJcbmltcG9ydCBcIi4vY2hhdFwiO1xyXG5pbXBvcnQgXCIuL3BhaW50XCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXsgXHJcbiAgc2V0UGxhdGZvcm1JbmZvKCk7XHJcbiAgdmFyIGlucHV0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhZmFyaSAjanNTZW5kTXNnIGlucHV0Jyk7XHJcbiAgaWYoaW5wdXRCb3gpIHtcclxuICAgICAgaW5wdXRCb3guYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgna2V5Ym9hcmQnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBpbnB1dEJveC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2tleWJvYXJkJyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXRQbGF0Zm9ybUluZm8oKSB7XHJcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBcclxuICBpZiAodWEuaW5kZXhPZignc2FmYXJpJykgIT0gLTEpIHsgXHJcbiAgICBpZiAodWEuaW5kZXhPZignY2hyb21lJykgPiAtMSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdjaHJvbWUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NhZmFyaScpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==
},{"./chat":1,"./login":3,"./paint":5,"./sockets":7}],3:[function(require,module,exports){
"use strict";

var _sockets = require("./sockets");

var body = document.querySelector("body");
var loginForm = document.getElementById("jsLogin");
var resetNickname = document.getElementById("jsResetNickname");
var NICKNAME = "nickname";
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";
var nickname = localStorage.getItem(NICKNAME); // eslint-disable-next-line no-undef

var socket = io("/");

var logIn = function logIn(nickname) {
  socket.emit(window.events.setNickname, {
    nickname: nickname
  });
  (0, _sockets.initSockets)(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

var handleFormSubmit = function handleFormSubmit(e) {
  e.preventDefault();
  var input = loginForm.querySelector("input");
  var value = input.value;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  logIn(value);
};

var handleResetNickname = function handleResetNickname(e) {
  localStorage.removeItem(NICKNAME);
  location.reload();
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}

if (resetNickname) {
  resetNickname.addEventListener("click", handleResetNickname);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsInJlc2V0Tmlja25hbWUiLCJOSUNLTkFNRSIsIkxPR0dFRF9PVVQiLCJMT0dHRURfSU4iLCJuaWNrbmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzb2NrZXQiLCJpbyIsImxvZ0luIiwiZW1pdCIsIndpbmRvdyIsImV2ZW50cyIsInNldE5pY2tuYW1lIiwiY2xhc3NOYW1lIiwiaGFuZGxlRm9ybVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwidmFsdWUiLCJzZXRJdGVtIiwiaGFuZGxlUmVzZXROaWNrbmFtZSIsInJlbW92ZUl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtBQUNBLElBQU1DLFNBQVMsR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLFNBQXhCLENBQWxCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHSixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXRCO0FBRUEsSUFBTUUsUUFBUSxHQUFHLFVBQWpCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLFdBQW5CO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFVBQWxCO0FBRUEsSUFBTUMsUUFBUSxHQUFHQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUJMLFFBQXJCLENBQWpCLEMsQ0FFQTs7QUFDQSxJQUFNTSxNQUFNLEdBQUdDLEVBQUUsQ0FBQyxHQUFELENBQWpCOztBQUNBLElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUFMLFFBQVEsRUFBSTtBQUN4QkcsRUFBQUEsTUFBTSxDQUFDRyxJQUFQLENBQVlDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxXQUExQixFQUF1QztBQUFFVCxJQUFBQSxRQUFRLEVBQVJBO0FBQUYsR0FBdkM7QUFDQSw0QkFBWUcsTUFBWjtBQUNELENBSEQ7O0FBS0EsSUFBSUgsUUFBUSxLQUFLLElBQWpCLEVBQXVCO0FBQ3JCVCxFQUFBQSxJQUFJLENBQUNtQixTQUFMLEdBQWlCWixVQUFqQjtBQUNELENBRkQsTUFFTztBQUNMUCxFQUFBQSxJQUFJLENBQUNtQixTQUFMLEdBQWlCWCxTQUFqQjtBQUNBTSxFQUFBQSxLQUFLLENBQUNMLFFBQUQsQ0FBTDtBQUNEOztBQUVELElBQU1XLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQUMsQ0FBQyxFQUFJO0FBQzVCQSxFQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSxNQUFNQyxLQUFLLEdBQUdwQixTQUFTLENBQUNELGFBQVYsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBLE1BQVFzQixLQUFSLEdBQWtCRCxLQUFsQixDQUFRQyxLQUFSO0FBQ0FELEVBQUFBLEtBQUssQ0FBQ0MsS0FBTixHQUFjLEVBQWQ7QUFDQWQsRUFBQUEsWUFBWSxDQUFDZSxPQUFiLENBQXFCbkIsUUFBckIsRUFBK0JrQixLQUEvQjtBQUNBeEIsRUFBQUEsSUFBSSxDQUFDbUIsU0FBTCxHQUFpQlgsU0FBakI7QUFDQU0sRUFBQUEsS0FBSyxDQUFDVSxLQUFELENBQUw7QUFDRCxDQVJEOztBQVVBLElBQU1FLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQUwsQ0FBQyxFQUFJO0FBQy9CWCxFQUFBQSxZQUFZLENBQUNpQixVQUFiLENBQXdCckIsUUFBeEI7QUFDQXNCLEVBQUFBLFFBQVEsQ0FBQ0MsTUFBVDtBQUNELENBSEQ7O0FBS0EsSUFBSTFCLFNBQUosRUFBZTtBQUNiQSxFQUFBQSxTQUFTLENBQUMyQixnQkFBVixDQUEyQixRQUEzQixFQUFxQ1YsZ0JBQXJDO0FBQ0Q7O0FBRUQsSUFBR2YsYUFBSCxFQUFrQjtBQUNoQkEsRUFBQUEsYUFBYSxDQUFDeUIsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0NKLG1CQUF4QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdFNvY2tldHMgfSBmcm9tIFwiLi9zb2NrZXRzXCI7XHJcblxyXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbmNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNMb2dpblwiKTtcclxuY29uc3QgcmVzZXROaWNrbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNSZXNldE5pY2tuYW1lXCIpO1xyXG5cclxuY29uc3QgTklDS05BTUUgPSBcIm5pY2tuYW1lXCI7XHJcbmNvbnN0IExPR0dFRF9PVVQgPSBcImxvZ2dlZE91dFwiO1xyXG5jb25zdCBMT0dHRURfSU4gPSBcImxvZ2dlZEluXCI7XHJcblxyXG5jb25zdCBuaWNrbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKE5JQ0tOQU1FKTtcclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxyXG5jb25zdCBzb2NrZXQgPSBpbyhcIi9cIik7XHJcbmNvbnN0IGxvZ0luID0gbmlja25hbWUgPT4ge1xyXG4gIHNvY2tldC5lbWl0KHdpbmRvdy5ldmVudHMuc2V0Tmlja25hbWUsIHsgbmlja25hbWUgfSk7XHJcbiAgaW5pdFNvY2tldHMoc29ja2V0KTtcclxufTtcclxuXHJcbmlmIChuaWNrbmFtZSA9PT0gbnVsbCkge1xyXG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX09VVDtcclxufSBlbHNlIHtcclxuICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9JTjtcclxuICBsb2dJbihuaWNrbmFtZSk7XHJcbn1cclxuXHJcbmNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSBlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgaW5wdXQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xyXG4gIGNvbnN0IHsgdmFsdWUgfSA9IGlucHV0O1xyXG4gIGlucHV0LnZhbHVlID0gXCJcIjtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOSUNLTkFNRSwgdmFsdWUpO1xyXG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX0lOO1xyXG4gIGxvZ0luKHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZVJlc2V0Tmlja25hbWUgPSBlID0+IHtcclxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShOSUNLTkFNRSk7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbn1cclxuXHJcbmlmIChsb2dpbkZvcm0pIHtcclxuICBsb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVGb3JtU3VibWl0KTtcclxufVxyXG5cclxuaWYocmVzZXROaWNrbmFtZSkge1xyXG4gIHJlc2V0Tmlja25hbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVJlc2V0Tmlja25hbWUpO1xyXG59Il19
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
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhaW50LmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250cm9scyIsIm1haW4iLCJjaGF0Iiwic2VuZE1zZyIsImN0eCIsImdldENvbnRleHQiLCJjb2xvcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibW9kZSIsIklOSVRJQUxfQ09MT1IiLCJzZXRUaW1lb3V0IiwiaGVuZGxlV2luZG93UmVzaXplIiwid2lkdGgiLCJjbGllbnRXaWR0aCIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJwYWludGluZyIsImZpbGxpbmciLCJ0aW1lciIsInN0b3BQYWludGluZyIsInN0YXJ0UGFpbnRpbmciLCJlbWl0Iiwid2luZG93IiwiZXZlbnRzIiwiY2hhbmdlR2FtZVN0YXJ0aW5nRmxhZyIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJiZWdpblBhdGgiLCJldmVudCIsInR5cGUiLCJvbk1vdXNlTW92ZSIsImJsdXIiLCJoYW5kbGVDYW52YXNDbGljayIsIngiLCJ5IiwibW92ZVRvIiwic3Ryb2tlUGF0aCIsImNvbG9yIiwiY3VycmVudENvbG9yIiwibGluZVRvIiwic3Ryb2tlIiwib2Zmc2V0WCIsInRvdWNoZXMiLCJwYWdlWCIsInRhcmdldCIsIm9mZnNldExlZnQiLCJvZmZzZXRZIiwicGFnZVkiLCJvZmZzZXRUb3AiLCJoYW5kbGVDb2xvckNsaWNrIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoYW5kbGVNb2RlQ2xpY2siLCJpbm5lclRleHQiLCJmaWxsIiwiaGFuZGxlQ00iLCJwcmV2ZW50RGVmYXVsdCIsImNsZWFyVGltZW91dCIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQmVnYW5QYXRoIiwiaGFuZGxlU3Ryb2tlZFBhdGgiLCJoYW5kbGVGaWxsZWQiLCJkaXNhYmxlQ2FudmFzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVuYWJsZUNhbnZhcyIsImhpZGVDb250cm9scyIsImNsYXNzTGlzdCIsImFkZCIsInNob3dDb250cm9scyIsInJlbW92ZSIsInJlc2V0Q2FudmFzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBZjtBQUNBLElBQU1DLFFBQVEsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFlBQXhCLENBQWpCO0FBQ0EsSUFBTUUsSUFBSSxHQUFHSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLElBQU1HLElBQUksR0FBR0osUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQSxJQUFNSSxPQUFPLEdBQUdMLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUNBLElBQU1LLEdBQUcsR0FBR1AsTUFBTSxDQUFDUSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQSxJQUFNQyxNQUFNLEdBQUdSLFFBQVEsQ0FBQ1Msc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLElBQU1DLElBQUksR0FBR1YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFFQSxJQUFNVSxhQUFhLEdBQUcsU0FBdEI7QUFDQUMsVUFBVSxDQUFDLFlBQU07QUFDZkMsRUFBQUEsa0JBQWtCO0FBQ2xCZCxFQUFBQSxNQUFNLENBQUNlLEtBQVAsR0FBZWYsTUFBTSxDQUFDZ0IsV0FBdEI7QUFDQWhCLEVBQUFBLE1BQU0sQ0FBQ2lCLE1BQVAsR0FBZ0JqQixNQUFNLENBQUNrQixZQUF2QjtBQUNBWCxFQUFBQSxHQUFHLENBQUNZLFNBQUosR0FBZ0IsT0FBaEI7QUFDQVosRUFBQUEsR0FBRyxDQUFDYSxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQnBCLE1BQU0sQ0FBQ2UsS0FBMUIsRUFBaUNmLE1BQU0sQ0FBQ2lCLE1BQXhDO0FBQ0QsQ0FOUyxFQU1QLElBTk8sQ0FBVjtBQU9BVixHQUFHLENBQUNjLFdBQUosR0FBa0JULGFBQWxCO0FBQ0FMLEdBQUcsQ0FBQ1ksU0FBSixHQUFnQlAsYUFBaEI7QUFDQUwsR0FBRyxDQUFDZSxTQUFKLEdBQWdCLEdBQWhCO0FBRUEsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxPQUFPLEdBQUcsS0FBZDtBQUNBLElBQUlDLEtBQUo7O0FBRUEsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUN6QkgsRUFBQUEsUUFBUSxHQUFHLEtBQVg7QUFDRCxDQUZEOztBQUlBLElBQU1JLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUMxQiw0QkFBWUMsSUFBWixDQUFpQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNDLHNCQUEvQixFQUF1RDtBQUNyREMsSUFBQUEsTUFBTSxFQUFHO0FBRDRDLEdBQXZEO0FBR0FDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFDQTNCLEVBQUFBLEdBQUcsQ0FBQzRCLFNBQUo7O0FBQ0EsTUFBR0MsS0FBSyxDQUFDQyxJQUFOLEtBQWUsWUFBbEIsRUFBK0I7QUFDN0JDLElBQUFBLFdBQVcsQ0FBQ0YsS0FBRCxDQUFYO0FBQ0E5QixJQUFBQSxPQUFPLENBQUNpQyxJQUFSO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDZixPQUFMLEVBQWM7QUFDWkQsSUFBQUEsUUFBUSxHQUFHLElBQVg7QUFDRCxHQUZELE1BRU87QUFDTGlCLElBQUFBLGlCQUFpQjtBQUNsQjtBQUNGLENBZkQ7O0FBaUJBLElBQU1MLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNNLENBQUQsRUFBSUMsQ0FBSixFQUFPM0IsS0FBUCxFQUFjRSxNQUFkLEVBQXlCO0FBQ3pDLE1BQUdGLEtBQUssSUFBSUUsTUFBWixFQUFtQjtBQUNqQndCLElBQUFBLENBQUMsR0FBR3pDLE1BQU0sQ0FBQ2UsS0FBUCxJQUFnQjBCLENBQUMsR0FBQzFCLEtBQWxCLENBQUo7QUFDQTJCLElBQUFBLENBQUMsR0FBRzFDLE1BQU0sQ0FBQ2lCLE1BQVAsSUFBaUJ5QixDQUFDLEdBQUN6QixNQUFuQixDQUFKO0FBQ0Q7O0FBQ0RWLEVBQUFBLEdBQUcsQ0FBQ29DLE1BQUosQ0FBV0YsQ0FBWCxFQUFjQyxDQUFkO0FBQ0QsQ0FORDs7QUFRQSxJQUFNRSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDSCxDQUFELEVBQUlDLENBQUosRUFBTzNCLEtBQVAsRUFBY0UsTUFBZCxFQUF1QztBQUFBLE1BQWpCNEIsS0FBaUIsdUVBQVQsSUFBUztBQUN4RFosRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjs7QUFDQSxNQUFHbkIsS0FBSyxJQUFJRSxNQUFaLEVBQW1CO0FBQ2pCd0IsSUFBQUEsQ0FBQyxHQUFHekMsTUFBTSxDQUFDZSxLQUFQLElBQWdCMEIsQ0FBQyxHQUFDMUIsS0FBbEIsQ0FBSjtBQUNBMkIsSUFBQUEsQ0FBQyxHQUFHMUMsTUFBTSxDQUFDaUIsTUFBUCxJQUFpQnlCLENBQUMsR0FBQ3pCLE1BQW5CLENBQUo7QUFDRDs7QUFFRCxNQUFJNkIsWUFBWSxHQUFHdkMsR0FBRyxDQUFDYyxXQUF2Qjs7QUFDQSxNQUFJd0IsS0FBSyxLQUFLLElBQWQsRUFBb0I7QUFDbEJ0QyxJQUFBQSxHQUFHLENBQUNjLFdBQUosR0FBa0J3QixLQUFsQjtBQUNEOztBQUNEdEMsRUFBQUEsR0FBRyxDQUFDd0MsTUFBSixDQUFXTixDQUFYLEVBQWNDLENBQWQ7QUFDQW5DLEVBQUFBLEdBQUcsQ0FBQ3lDLE1BQUo7QUFFQXpDLEVBQUFBLEdBQUcsQ0FBQ2MsV0FBSixHQUFrQnlCLFlBQWxCO0FBQ0QsQ0FmRDs7QUFpQkEsSUFBTVIsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0YsS0FBRCxFQUFXO0FBQzdCSCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsTUFBTU8sQ0FBQyxHQUFHTCxLQUFLLENBQUNhLE9BQU4sSUFBa0JiLEtBQUssQ0FBQ2MsT0FBTixDQUFjLENBQWQsRUFBaUJDLEtBQWpCLEdBQXlCZixLQUFLLENBQUNjLE9BQU4sQ0FBYyxDQUFkLEVBQWlCRSxNQUFqQixDQUF3QkMsVUFBN0U7QUFDQSxNQUFNWCxDQUFDLEdBQUdOLEtBQUssQ0FBQ2tCLE9BQU4sSUFBa0JsQixLQUFLLENBQUNjLE9BQU4sQ0FBYyxDQUFkLEVBQWlCSyxLQUFqQixHQUF5Qm5CLEtBQUssQ0FBQ2MsT0FBTixDQUFjLENBQWQsRUFBaUJFLE1BQWpCLENBQXdCSSxTQUE3RTtBQUNBLE1BQUl6QyxLQUFLLEdBQUdmLE1BQU0sQ0FBQ2UsS0FBbkI7QUFDQSxNQUFJRSxNQUFNLEdBQUdqQixNQUFNLENBQUNpQixNQUFwQjs7QUFDQSxNQUFJLENBQUNNLFFBQUwsRUFBZTtBQUNiWSxJQUFBQSxTQUFTLENBQUNNLENBQUQsRUFBSUMsQ0FBSixDQUFUO0FBQ0EsOEJBQVlkLElBQVosQ0FBaUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSyxTQUEvQixFQUEwQztBQUN4Q00sTUFBQUEsQ0FBQyxFQUFEQSxDQUR3QztBQUV4Q0MsTUFBQUEsQ0FBQyxFQUFEQSxDQUZ3QztBQUd4QzNCLE1BQUFBLEtBQUssRUFBTEEsS0FId0M7QUFJeENFLE1BQUFBLE1BQU0sRUFBTkE7QUFKd0MsS0FBMUM7QUFNRCxHQVJELE1BUU87QUFDTDJCLElBQUFBLFVBQVUsQ0FBQ0gsQ0FBRCxFQUFJQyxDQUFKLENBQVY7QUFDQSw4QkFBWWQsSUFBWixDQUFpQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNjLFVBQS9CLEVBQTJDO0FBQ3pDSCxNQUFBQSxDQUFDLEVBQURBLENBRHlDO0FBRXpDQyxNQUFBQSxDQUFDLEVBQURBLENBRnlDO0FBR3pDM0IsTUFBQUEsS0FBSyxFQUFMQSxLQUh5QztBQUl6Q0UsTUFBQUEsTUFBTSxFQUFOQSxNQUp5QztBQUt6QzRCLE1BQUFBLEtBQUssRUFBRXRDLEdBQUcsQ0FBQ2M7QUFMOEIsS0FBM0M7QUFPRDtBQUNGLENBeEJEOztBQTBCQSxJQUFNb0MsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFBckIsS0FBSyxFQUFJO0FBQ2hDLE1BQU1TLEtBQUssR0FBR1QsS0FBSyxDQUFDZ0IsTUFBTixDQUFhTSxLQUFiLENBQW1CQyxlQUFqQztBQUNBcEQsRUFBQUEsR0FBRyxDQUFDYyxXQUFKLEdBQWtCd0IsS0FBbEI7QUFDQXRDLEVBQUFBLEdBQUcsQ0FBQ1ksU0FBSixHQUFnQjBCLEtBQWhCO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNZSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07QUFDNUIsTUFBSXBDLE9BQU8sS0FBSyxJQUFoQixFQUFzQjtBQUNwQkEsSUFBQUEsT0FBTyxHQUFHLEtBQVY7QUFDQWIsSUFBQUEsSUFBSSxDQUFDa0QsU0FBTCxHQUFpQixNQUFqQjtBQUNELEdBSEQsTUFHTztBQUNMckMsSUFBQUEsT0FBTyxHQUFHLElBQVY7QUFDQWIsSUFBQUEsSUFBSSxDQUFDa0QsU0FBTCxHQUFpQixPQUFqQjtBQUNEO0FBQ0YsQ0FSRDs7QUFVQSxJQUFNQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFrQjtBQUFBLE1BQWpCakIsS0FBaUIsdUVBQVQsSUFBUztBQUM3QixNQUFJQyxZQUFZLEdBQUd2QyxHQUFHLENBQUNZLFNBQXZCOztBQUNBLE1BQUkwQixLQUFLLEtBQUssSUFBZCxFQUFvQjtBQUNsQnRDLElBQUFBLEdBQUcsQ0FBQ1ksU0FBSixHQUFnQjBCLEtBQWhCO0FBQ0Q7O0FBQ0R0QyxFQUFBQSxHQUFHLENBQUNhLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CcEIsTUFBTSxDQUFDZSxLQUExQixFQUFpQ2YsTUFBTSxDQUFDaUIsTUFBeEM7QUFDQVYsRUFBQUEsR0FBRyxDQUFDWSxTQUFKLEdBQWdCMkIsWUFBaEI7QUFDRCxDQVBEOztBQVNBLElBQU1OLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM5QixNQUFJaEIsT0FBSixFQUFhO0FBQ1hzQyxJQUFBQSxJQUFJO0FBQ0osOEJBQVlsQyxJQUFaLENBQWlCQyxNQUFNLENBQUNDLE1BQVAsQ0FBY2dDLElBQS9CLEVBQXFDO0FBQUVqQixNQUFBQSxLQUFLLEVBQUV0QyxHQUFHLENBQUNZO0FBQWIsS0FBckM7QUFDRDtBQUNGLENBTEQ7O0FBT0EsSUFBTTRDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUEzQixLQUFLLEVBQUk7QUFDeEJBLEVBQUFBLEtBQUssQ0FBQzRCLGNBQU47QUFDRCxDQUZEOztBQUlBLElBQU1sRCxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLEdBQU07QUFDL0I7QUFDQTtBQUNBLE1BQUlXLEtBQUosRUFBVztBQUNUd0MsSUFBQUEsWUFBWSxDQUFDeEMsS0FBRCxDQUFaO0FBQ0Q7O0FBQ0RBLEVBQUFBLEtBQUssR0FBR1osVUFBVSxDQUFDLFlBQVcsQ0FDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsR0FQaUIsRUFPZixHQVBlLENBQWxCO0FBU0QsQ0FmRDs7QUFpQkFxRCxLQUFLLENBQUNDLElBQU4sQ0FBVzFELE1BQVgsRUFBbUIyRCxPQUFuQixDQUEyQixVQUFBdkIsS0FBSztBQUFBLFNBQzlCQSxLQUFLLENBQUN3QixnQkFBTixDQUF1QixPQUF2QixFQUFnQ1osZ0JBQWhDLENBRDhCO0FBQUEsQ0FBaEM7O0FBSUEsSUFBSTlDLElBQUosRUFBVTtBQUNSQSxFQUFBQSxJQUFJLENBQUMwRCxnQkFBTCxDQUFzQixPQUF0QixFQUErQlQsZUFBL0I7QUFDRDs7QUFFRCxJQUFJL0IsTUFBSixFQUFZO0FBQ1ZBLEVBQUFBLE1BQU0sQ0FBQ3dDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDdkQsa0JBQWxDO0FBQ0Q7O0FBRU0sSUFBTXdELGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFHN0IsQ0FBSCxRQUFHQSxDQUFIO0FBQUEsTUFBTUMsQ0FBTixRQUFNQSxDQUFOO0FBQUEsTUFBUzNCLEtBQVQsUUFBU0EsS0FBVDtBQUFBLE1BQWdCRSxNQUFoQixRQUFnQkEsTUFBaEI7QUFBQSxTQUE2QmtCLFNBQVMsQ0FBQ00sQ0FBRCxFQUFJQyxDQUFKLEVBQU8zQixLQUFQLEVBQWNFLE1BQWQsQ0FBdEM7QUFBQSxDQUF4Qjs7OztBQUNBLElBQU1zRCxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CO0FBQUEsTUFBRzlCLENBQUgsU0FBR0EsQ0FBSDtBQUFBLE1BQU1DLENBQU4sU0FBTUEsQ0FBTjtBQUFBLE1BQVMzQixLQUFULFNBQVNBLEtBQVQ7QUFBQSxNQUFnQkUsTUFBaEIsU0FBZ0JBLE1BQWhCO0FBQUEsTUFBd0I0QixLQUF4QixTQUF3QkEsS0FBeEI7QUFBQSxTQUFvQ0QsVUFBVSxDQUFDSCxDQUFELEVBQUlDLENBQUosRUFBTzNCLEtBQVAsRUFBY0UsTUFBZCxFQUFzQjRCLEtBQXRCLENBQTlDO0FBQUEsQ0FBMUI7Ozs7QUFDQSxJQUFNMkIsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxNQUFHM0IsS0FBSCxTQUFHQSxLQUFIO0FBQUEsU0FBZWlCLElBQUksQ0FBQ2pCLEtBQUQsQ0FBbkI7QUFBQSxDQUFyQjs7OztBQUVBLElBQU00QixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDakN6RSxFQUFBQSxNQUFNLENBQUMwRSxtQkFBUCxDQUEyQixXQUEzQixFQUF3Q3BDLFdBQXhDO0FBQ0F0QyxFQUFBQSxNQUFNLENBQUMwRSxtQkFBUCxDQUEyQixXQUEzQixFQUF3Qy9DLGFBQXhDO0FBQ0EzQixFQUFBQSxNQUFNLENBQUMwRSxtQkFBUCxDQUEyQixTQUEzQixFQUFzQ2hELFlBQXRDO0FBQ0ExQixFQUFBQSxNQUFNLENBQUMwRSxtQkFBUCxDQUEyQixZQUEzQixFQUF5Q2hELFlBQXpDO0FBQ0ExQixFQUFBQSxNQUFNLENBQUMwRSxtQkFBUCxDQUEyQixPQUEzQixFQUFvQ2xDLGlCQUFwQztBQUVBeEMsRUFBQUEsTUFBTSxDQUFDMEUsbUJBQVAsQ0FBMkIsV0FBM0IsRUFBd0NwQyxXQUF4QztBQUNBdEMsRUFBQUEsTUFBTSxDQUFDMEUsbUJBQVAsQ0FBMkIsWUFBM0IsRUFBeUMvQyxhQUF6QztBQUNBM0IsRUFBQUEsTUFBTSxDQUFDMEUsbUJBQVAsQ0FBMkIsVUFBM0IsRUFBdUNoRCxZQUF2QztBQUNBMUIsRUFBQUEsTUFBTSxDQUFDMEUsbUJBQVAsQ0FBMkIsWUFBM0IsRUFBeUNoRCxZQUF6QztBQUNBMUIsRUFBQUEsTUFBTSxDQUFDMEUsbUJBQVAsQ0FBMkIsYUFBM0IsRUFBMENoRCxZQUExQztBQUNELENBWk07Ozs7QUFjQSxJQUFNaUQsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUNoQzNFLEVBQUFBLE1BQU0sQ0FBQ3FFLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDL0IsV0FBckM7QUFDQXRDLEVBQUFBLE1BQU0sQ0FBQ3FFLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDMUMsYUFBckM7QUFDQTNCLEVBQUFBLE1BQU0sQ0FBQ3FFLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DM0MsWUFBbkM7QUFDQTFCLEVBQUFBLE1BQU0sQ0FBQ3FFLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDM0MsWUFBdEM7QUFDQTFCLEVBQUFBLE1BQU0sQ0FBQ3FFLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDN0IsaUJBQWpDO0FBRUF4QyxFQUFBQSxNQUFNLENBQUNxRSxnQkFBUCxDQUF3QixXQUF4QixFQUFxQy9CLFdBQXJDO0FBQ0F0QyxFQUFBQSxNQUFNLENBQUNxRSxnQkFBUCxDQUF3QixZQUF4QixFQUFzQzFDLGFBQXRDO0FBQ0EzQixFQUFBQSxNQUFNLENBQUNxRSxnQkFBUCxDQUF3QixVQUF4QixFQUFvQzNDLFlBQXBDO0FBQ0ExQixFQUFBQSxNQUFNLENBQUNxRSxnQkFBUCxDQUF3QixZQUF4QixFQUFzQzNDLFlBQXRDO0FBQ0ExQixFQUFBQSxNQUFNLENBQUNxRSxnQkFBUCxDQUF3QixhQUF4QixFQUF1QzNDLFlBQXZDO0FBQ0QsQ0FaTTs7OztBQWNBLElBQU1rRCxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQzlCekUsRUFBQUEsUUFBUSxDQUFDMEUsU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsYUFBdkI7QUFDRCxDQUZJOzs7O0FBR0EsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUNoQzVFLEVBQUFBLFFBQVEsQ0FBQzBFLFNBQVQsQ0FBbUJHLE1BQW5CLENBQTBCLGFBQTFCO0FBQ0QsQ0FGTTs7OztBQUdBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLEdBQU07QUFDL0IxRSxFQUFBQSxHQUFHLENBQUM0QixTQUFKO0FBQ0EyQixFQUFBQSxJQUFJLENBQUMsTUFBRCxDQUFKO0FBQ0QsQ0FITTs7OztBQUtQLElBQUk5RCxNQUFKLEVBQVk7QUFDVkEsRUFBQUEsTUFBTSxDQUFDcUUsZ0JBQVAsQ0FBd0IsYUFBeEIsRUFBdUNOLFFBQXZDO0FBQ0FhLEVBQUFBLFlBQVk7QUFDYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNvY2tldCB9IGZyb20gXCIuL3NvY2tldHNcIjtcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNDYW52YXNcIik7XHJcbmNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0NvbnRyb2xzXCIpO1xyXG5jb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc01haW5cIik7XHJcbmNvbnN0IGNoYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQ2hhdFwiKTtcclxuY29uc3Qgc2VuZE1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNTZW5kTXNnXCIpO1xyXG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5jb25zdCBjb2xvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianNDb2xvclwiKTtcclxuY29uc3QgbW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNNb2RlXCIpO1xyXG5cclxuY29uc3QgSU5JVElBTF9DT0xPUiA9IFwiIzJjMmMyY1wiO1xyXG5zZXRUaW1lb3V0KCgpID0+IHtcclxuICBoZW5kbGVXaW5kb3dSZXNpemUoKTtcclxuICBjYW52YXMud2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XHJcbiAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxufSwgMjAwMCk7XHJcbmN0eC5zdHJva2VTdHlsZSA9IElOSVRJQUxfQ09MT1I7XHJcbmN0eC5maWxsU3R5bGUgPSBJTklUSUFMX0NPTE9SO1xyXG5jdHgubGluZVdpZHRoID0gMi41O1xyXG5cclxubGV0IHBhaW50aW5nID0gZmFsc2U7XHJcbmxldCBmaWxsaW5nID0gZmFsc2U7XHJcbmxldCB0aW1lcjtcclxuXHJcbmNvbnN0IHN0b3BQYWludGluZyA9ICgpID0+IHtcclxuICBwYWludGluZyA9IGZhbHNlO1xyXG59O1xyXG5cclxuY29uc3Qgc3RhcnRQYWludGluZyA9ICgpID0+IHtcclxuICBnZXRTb2NrZXQoKS5lbWl0KHdpbmRvdy5ldmVudHMuY2hhbmdlR2FtZVN0YXJ0aW5nRmxhZywge1xyXG4gICAgc3RhdHVzIDogdHJ1ZVxyXG4gIH0pO1xyXG4gIGNvbnNvbGUubG9nKFwic3RhcnRQYWludGluZ1wiKVxyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBpZihldmVudC50eXBlID09PSAndG91Y2hzdGFydCcpe1xyXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpO1xyXG4gICAgc2VuZE1zZy5ibHVyKCk7XHJcbiAgfVxyXG4gIGlmICghZmlsbGluZykge1xyXG4gICAgcGFpbnRpbmcgPSB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBoYW5kbGVDYW52YXNDbGljaygpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGJlZ2luUGF0aCA9ICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgaWYod2lkdGggJiYgaGVpZ2h0KXtcclxuICAgIHggPSBjYW52YXMud2lkdGggKiAoeC93aWR0aCk7XHJcbiAgICB5ID0gY2FudmFzLmhlaWdodCAqICh5L2hlaWdodCk7XHJcbiAgfVxyXG4gIGN0eC5tb3ZlVG8oeCwgeSk7XHJcbn07XHJcblxyXG5jb25zdCBzdHJva2VQYXRoID0gKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yID0gbnVsbCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwic3Ryb2tlUGF0aFwiKVxyXG4gIGlmKHdpZHRoICYmIGhlaWdodCl7XHJcbiAgICB4ID0gY2FudmFzLndpZHRoICogKHgvd2lkdGgpO1xyXG4gICAgeSA9IGNhbnZhcy5oZWlnaHQgKiAoeS9oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgbGV0IGN1cnJlbnRDb2xvciA9IGN0eC5zdHJva2VTdHlsZTtcclxuICBpZiAoY29sb3IgIT09IG51bGwpIHtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIH1cclxuICBjdHgubGluZVRvKHgsIHkpO1xyXG4gIGN0eC5zdHJva2UoKTtcclxuICBcclxuICBjdHguc3Ryb2tlU3R5bGUgPSBjdXJyZW50Q29sb3I7XHJcbn07XHJcblxyXG5jb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwib25Nb3VzZU1vdmVcIilcclxuICBjb25zdCB4ID0gZXZlbnQub2Zmc2V0WCB8fCAoZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMF0udGFyZ2V0Lm9mZnNldExlZnQpO1xyXG4gIGNvbnN0IHkgPSBldmVudC5vZmZzZXRZIHx8IChldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1swXS50YXJnZXQub2Zmc2V0VG9wKTtcclxuICBsZXQgd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgbGV0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgaWYgKCFwYWludGluZykge1xyXG4gICAgYmVnaW5QYXRoKHgsIHkpO1xyXG4gICAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLmJlZ2luUGF0aCwgeyBcclxuICAgICAgeCwgXHJcbiAgICAgIHksIFxyXG4gICAgICB3aWR0aCwgXHJcbiAgICAgIGhlaWdodCBcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzdHJva2VQYXRoKHgsIHkpO1xyXG4gICAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLnN0cm9rZVBhdGgsIHtcclxuICAgICAgeCxcclxuICAgICAgeSxcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgY29sb3I6IGN0eC5zdHJva2VTdHlsZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlQ29sb3JDbGljayA9IGV2ZW50ID0+IHtcclxuICBjb25zdCBjb2xvciA9IGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlTW9kZUNsaWNrID0gKCkgPT4ge1xyXG4gIGlmIChmaWxsaW5nID09PSB0cnVlKSB7XHJcbiAgICBmaWxsaW5nID0gZmFsc2U7XHJcbiAgICBtb2RlLmlubmVyVGV4dCA9IFwiRmlsbFwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmaWxsaW5nID0gdHJ1ZTtcclxuICAgIG1vZGUuaW5uZXJUZXh0ID0gXCJQYWludFwiO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGZpbGwgPSAoY29sb3IgPSBudWxsKSA9PiB7XHJcbiAgbGV0IGN1cnJlbnRDb2xvciA9IGN0eC5maWxsU3R5bGU7XHJcbiAgaWYgKGNvbG9yICE9PSBudWxsKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgfVxyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVDYW52YXNDbGljayA9ICgpID0+IHtcclxuICBpZiAoZmlsbGluZykge1xyXG4gICAgZmlsbCgpO1xyXG4gICAgZ2V0U29ja2V0KCkuZW1pdCh3aW5kb3cuZXZlbnRzLmZpbGwsIHsgY29sb3I6IGN0eC5maWxsU3R5bGUgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlQ00gPSBldmVudCA9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxufTtcclxuXHJcbmNvbnN0IGhlbmRsZVdpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcclxuICAvLyBtYWluLnN0eWxlLndpZHRoID0gXCJcIjtcclxuICAvLyBtYWluLnN0eWxlLmhlaWdodCA9IFwiXCI7XHJcbiAgaWYgKHRpbWVyKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gIH1cclxuICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBsZXQgc21hbGxTaXplID0gY2FudmFzLm9mZnNldFdpZHRoIDw9IGNhbnZhcy5vZmZzZXRIZWlnaHQgPyBjYW52YXMub2Zmc2V0V2lkdGggOiBjYW52YXMub2Zmc2V0SGVpZ2h0O1xyXG4gICAgLy8gY2FudmFzLndpZHRoID0gc21hbGxTaXplO1xyXG4gICAgLy8gY2FudmFzLmhlaWdodCA9IHNtYWxsU2l6ZTtcclxuICAgIC8vIG1haW4uc3R5bGUud2lkdGggPSBzbWFsbFNpemUgKyBcInB4XCI7XHJcbiAgICAvLyBtYWluLnN0eWxlLmhlaWdodCA9IHNtYWxsU2l6ZSArIFwicHhcIjtcclxuICAgIC8vIGNoYXQuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSBcIisoc21hbGxTaXplKzgwKSArIFwicHgpXCI7XHJcbiAgfSwgMjAwKTtcclxuXHJcbn1cclxuXHJcbkFycmF5LmZyb20oY29sb3JzKS5mb3JFYWNoKGNvbG9yID0+XHJcbiAgY29sb3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNvbG9yQ2xpY2spXHJcbik7XHJcblxyXG5pZiAobW9kZSkge1xyXG4gIG1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGVDbGljayk7XHJcbn1cclxuXHJcbmlmICh3aW5kb3cpIHtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoZW5kbGVXaW5kb3dSZXNpemUpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlQmVnYW5QYXRoID0gKHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSA9PiBiZWdpblBhdGgoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTdHJva2VkUGF0aCA9ICh7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yIH0pID0+IHN0cm9rZVBhdGgoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpO1xyXG5leHBvcnQgY29uc3QgaGFuZGxlRmlsbGVkID0gKHsgY29sb3IgfSkgPT4gZmlsbChjb2xvcik7XHJcblxyXG5leHBvcnQgY29uc3QgZGlzYWJsZUNhbnZhcyA9ICgpID0+IHtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RhcnRQYWludGluZyk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHN0b3BQYWludGluZyk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHN0b3BQYWludGluZyk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDYW52YXNDbGljayk7XHJcblxyXG4gIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uTW91c2VNb3ZlKTtcclxuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgc3RhcnRQYWludGluZyk7XHJcbiAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hsZWF2ZVwiLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgc3RvcFBhaW50aW5nKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlbmFibGVDYW52YXMgPSAoKSA9PiB7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHN0YXJ0UGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBzdG9wUGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2FudmFzQ2xpY2spO1xyXG5cclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHN0YXJ0UGFpbnRpbmcpO1xyXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgc3RvcFBhaW50aW5nKTtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobGVhdmVcIiwgc3RvcFBhaW50aW5nKTtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHN0b3BQYWludGluZyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGlkZUNvbnRyb2xzID0gKCkgPT4ge1xyXG4gICAgY29udHJvbHMuY2xhc3NMaXN0LmFkZChcImlzLWRpc2FibGVkXCIpO1xyXG4gIH07XHJcbmV4cG9ydCBjb25zdCBzaG93Q29udHJvbHMgPSAoKSA9PiB7XHJcbiAgY29udHJvbHMuY2xhc3NMaXN0LnJlbW92ZShcImlzLWRpc2FibGVkXCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRDYW52YXMgPSAoKSA9PiB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpOyAgXHJcbiAgZmlsbChcIiNmZmZcIik7XHJcbn1cclxuXHJcbmlmIChjYW52YXMpIHtcclxuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGhhbmRsZUNNKTtcclxuICBoaWRlQ29udHJvbHMoKTtcclxufVxyXG5cclxuIl19
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
  var nickname = localStorage.getItem("nickname");

  if (nickname != leader) {
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
  var nickname = localStorage.getItem("nickname");

  if (leader) {
    if (nickname != leader.nickname) {
      notifs.innerText = "".concat(message);
    }
  }
};

exports.handleNotLeaderNotif = handleNotLeaderNotif;

var addLeaderEffectToCanvas = function addLeaderEffectToCanvas() {
  document.getElementById("jsCanvas").classList.add("is-leader");
};

var removeLeaderEffectToCanvas = function removeLeaderEffectToCanvas() {
  document.getElementById("jsCanvas").classList.remove("is-leader");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllcnMuanMiXSwibmFtZXMiOlsidXNlckluZm8xIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidXNlckluZm8yIiwidXNlckluZm8zIiwidXNlckluZm80IiwidXNlckluZm81IiwidXNlckluZm82IiwidXNlckluZm83IiwidXNlckluZm84Iiwibm90aWZzIiwiZ2V0RWxlbWVudEJ5SWQiLCJub3RpZnMyIiwibm90aWZzMyIsImFkZFBsYXllcnMiLCJwbGF5ZXJzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJpbm5lclRleHQiLCJyZW1vdmUiLCJmb3JFYWNoIiwicGxheWVyIiwiYWRkIiwibmlja25hbWUiLCJwb2ludHMiLCJoYW5kbGVBbGxOb3RpZiIsInRleHQiLCJoYW5kbGVBbGxOb3RpZjIiLCJoYW5kbGVBbGxOb3RpZjMiLCJoYW5kbGVQbGF5ZXJVcGRhdGUiLCJzb2NrZXRzIiwiaGFuZGxlR2FtZVN0YXJ0ZWQiLCJsZWFkZXIiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlTGVhZGVyRWZmZWN0VG9Vc2VySW5mbyIsImFkZExlYWRlckVmZmVjdFRvVXNlckluZm8iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicmVtb3ZlTGVhZGVyRWZmZWN0VG9DYW52YXMiLCJhZGRMZWFkZXJFZmZlY3RUb0NhbnZhcyIsImhhbmRsZUxlYWRlck5vdGlmIiwid29yZCIsImhhbmRsZU5vdExlYWRlck5vdGlmIiwibWVzc2FnZSIsImxlYWRlckRPTSIsImN1cnJlbnRVc2VySW5mbyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJoYW5kbGVHYW1lRW5kZWQiLCJoYW5kbGVHYW1lU3RhcnRpbmciLCJjb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQU9BOztBQUVBLElBQU1BLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFNBQXZCLENBQWxCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsU0FBdkIs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LENBQWxCOztBQUNBLE1BQUcyQyxTQUFILEVBQWE7QUFDWEEsSUFBQUEsU0FBUyxDQUFDNUIsU0FBVixDQUFvQkUsTUFBcEIsQ0FBMkIsV0FBM0I7QUFDRDtBQUNGLENBTEQ7O0FBTUEsSUFBTWlCLHlCQUF5QixHQUFFLFNBQTNCQSx5QkFBMkIsQ0FBQ0osTUFBRCxFQUFVO0FBQ3pDLE1BQU1jLGVBQWUsR0FBRzdDLFFBQVEsQ0FBQzhDLHNCQUFULENBQWdDLGFBQVdmLE1BQTNDLEVBQW1ELENBQW5ELENBQXhCOztBQUNBLE1BQUdjLGVBQUgsRUFBbUI7QUFDakJBLElBQUFBLGVBQWUsQ0FBQzdCLFNBQWhCLENBQTBCSyxHQUExQixDQUE4QixXQUE5QjtBQUNEO0FBQ0YsQ0FMRDs7QUFNTyxJQUFNMEIsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixRQUFjO0FBQUEsTUFBWE4sSUFBVyxTQUFYQSxJQUFXO0FBQzNDakIsRUFBQUEsY0FBYyx3Q0FBYWlCLElBQWIsRUFBZDtBQUNBUCxFQUFBQSw0QkFBNEI7QUFDNUJJLEVBQUFBLDBCQUEwQjtBQUMxQlosRUFBQUEsZUFBZSxJQUFmO0FBQ0FDLEVBQUFBLGVBQWUsSUFBZjtBQUNBO0FBQ0E7QUFDRCxDQVJNOzs7O0FBU0EsSUFBTXFCLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsUUFBZTtBQUFBLE1BQVpDLEtBQVksU0FBWkEsS0FBWTtBQUMvQztBQUNELENBRk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGRpc2FibGVDYW52YXMsXHJcbiAgaGlkZUNvbnRyb2xzLFxyXG4gIGVuYWJsZUNhbnZhcyxcclxuICBzaG93Q29udHJvbHMsXHJcbiAgcmVzZXRDYW52YXMsXHJcbn0gZnJvbSBcIi4vcGFpbnRcIjtcclxuaW1wb3J0IHsgZGlzYWJsZUNoYXQsIGVuYWJsZUNoYXQgfSBmcm9tIFwiLi9jaGF0XCI7XHJcblxyXG5jb25zdCB1c2VySW5mbzEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItMVwiKTtcclxuY29uc3QgdXNlckluZm8yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLTJcIik7XHJcbmNvbnN0IHVzZXJJbmZvMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci0zXCIpO1xyXG5jb25zdCB1c2VySW5mbzQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItNFwiKTtcclxuY29uc3QgdXNlckluZm81ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLTVcIik7XHJcbmNvbnN0IHVzZXJJbmZvNiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci02XCIpO1xyXG5jb25zdCB1c2VySW5mbzcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItN1wiKTtcclxuY29uc3QgdXNlckluZm84ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLThcIik7XHJcbmNvbnN0IG5vdGlmcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNOb3RpZnNcIik7XHJcbmNvbnN0IG5vdGlmczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTm90aWZzMlwiKTtcclxuY29uc3Qgbm90aWZzMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNOb3RpZnMzXCIpO1xyXG5cclxuY29uc3QgYWRkUGxheWVycyA9IChwbGF5ZXJzKSA9PiB7XHJcbiAgbGV0IGluZGV4ID0gMTtcclxuICB1c2VySW5mbzEuY2xhc3NMaXN0ID0gXCJ1c2VyLWxpIHVzZXItMVwiO1xyXG4gIHVzZXJJbmZvMS5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzEucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvMS5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaW5mb19fcGhvdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIik7XHJcbiAgdXNlckluZm8yLmNsYXNzTGlzdCA9IFwidXNlci1saSB1c2VyLTJcIjtcclxuICB1c2VySW5mbzIucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm8yLnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzIucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zaG93XCIpO1xyXG4gIHVzZXJJbmZvMy5jbGFzc0xpc3QgPSBcInVzZXItbGkgdXNlci0zXCI7XHJcbiAgdXNlckluZm8zLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvMy5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm8zLnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc2hvd1wiKTtcclxuICB1c2VySW5mbzQuY2xhc3NMaXN0ID0gXCJ1c2VyLWxpIHVzZXItNFwiO1xyXG4gIHVzZXJJbmZvNC5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzQucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvNC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaW5mb19fcGhvdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIik7XHJcbiAgdXNlckluZm81LmNsYXNzTGlzdCA9IFwidXNlci1saSB1c2VyLTVcIjtcclxuICB1c2VySW5mbzUucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm81LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzUucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zaG93XCIpO1xyXG4gIHVzZXJJbmZvNi5jbGFzc0xpc3QgPSBcInVzZXItbGkgdXNlci02XCI7XHJcbiAgdXNlckluZm82LnF1ZXJ5U2VsZWN0b3IoXCIubmFtZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvNi5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm82LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc2hvd1wiKTtcclxuICB1c2VySW5mbzcuY2xhc3NMaXN0ID0gXCJ1c2VyLWxpIHVzZXItN1wiO1xyXG4gIHVzZXJJbmZvNy5xdWVyeVNlbGVjdG9yKFwiLm5hbWVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzcucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKS5pbm5lclRleHQgPSBcIlwiO1xyXG4gIHVzZXJJbmZvNy5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaW5mb19fcGhvdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNob3dcIik7XHJcbiAgdXNlckluZm84LmNsYXNzTGlzdCA9IFwidXNlci1saSB1c2VyLThcIjtcclxuICB1c2VySW5mbzgucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgdXNlckluZm84LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gXCJcIjtcclxuICB1c2VySW5mbzgucXVlcnlTZWxlY3RvcihcIi51c2VyLWluZm9fX3Bob3RvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1zaG93XCIpO1xyXG4gIHBsYXllcnMuZm9yRWFjaCgocGxheWVyKSA9PiB7XHJcbiAgICBpZiAoaW5kZXggPT0gMSkge1xyXG4gICAgICB1c2VySW5mbzEuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzEucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm8xLnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm8xLnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gMikge1xyXG4gICAgICB1c2VySW5mbzIuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzIucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm8yLnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm8yLnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gMykge1xyXG4gICAgICB1c2VySW5mbzMuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzMucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm8zLnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm8zLnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gNCkge1xyXG4gICAgICB1c2VySW5mbzQuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzQucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm80LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm80LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gNSkge1xyXG4gICAgICB1c2VySW5mbzUuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzUucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm81LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm81LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gNikge1xyXG4gICAgICB1c2VySW5mbzYuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzYucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm82LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm82LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gNykge1xyXG4gICAgICB1c2VySW5mbzcuY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzcucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm83LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm83LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gOCkge1xyXG4gICAgICB1c2VySW5mbzguY2xhc3NMaXN0LmFkZChwbGF5ZXIubmlja25hbWUpO1xyXG4gICAgICB1c2VySW5mbzgucXVlcnlTZWxlY3RvcihcIi5uYW1lXCIpLmlubmVyVGV4dCA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgdXNlckluZm84LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIikuaW5uZXJUZXh0ID0gcGxheWVyLnBvaW50cztcclxuICAgICAgdXNlckluZm84LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1pbmZvX19waG90b1wiKS5jbGFzc0xpc3QuYWRkKFwiaXMtc2hvd1wiKTtcclxuICAgIH1cclxuICAgIGluZGV4Kys7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlQWxsTm90aWYgPSAodGV4dCkgPT4ge1xyXG4gIG5vdGlmcy5pbm5lclRleHQgPSBcIlwiO1xyXG4gIG5vdGlmcy5pbm5lclRleHQgPSB0ZXh0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUFsbE5vdGlmMiA9ICh0ZXh0KSA9PiB7XHJcbiAgbm90aWZzMi5pbm5lclRleHQgPSBcIlwiO1xyXG4gIG5vdGlmczIuaW5uZXJUZXh0ID0gdGV4dDtcclxufTtcclxuZXhwb3J0IGNvbnN0IGhhbmRsZUFsbE5vdGlmMyA9ICh0ZXh0KSA9PiB7XHJcbiAgbm90aWZzMy5pbm5lclRleHQgPSBcIlwiO1xyXG4gIG5vdGlmczMuaW5uZXJUZXh0ID0gdGV4dDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVQbGF5ZXJVcGRhdGUgPSAoeyBzb2NrZXRzIH0pID0+IGFkZFBsYXllcnMoc29ja2V0cyk7XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVHYW1lU3RhcnRlZCA9ICh7IGxlYWRlciB9KSA9PiB7XHJcbiAgcmVzZXRDYW52YXMoKTtcclxuICBkaXNhYmxlQ2FudmFzKCk7XHJcbiAgaGlkZUNvbnRyb2xzKCk7XHJcbiAgZW5hYmxlQ2hhdCgpO1xyXG4gIGNvbnNvbGUubG9nKGxlYWRlcilcclxuICBub3RpZnMuaW5uZXJUZXh0ID0gYCR7bGVhZGVyfeuLmOydtCDstpzsoJzsnpAg7J6F64uI64ukLmA7XHJcbiAgcmVtb3ZlTGVhZGVyRWZmZWN0VG9Vc2VySW5mbygpO1xyXG4gIGFkZExlYWRlckVmZmVjdFRvVXNlckluZm8obGVhZGVyKTtcclxuICBcclxuICBjb25zdCBuaWNrbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibmlja25hbWVcIik7XHJcbiAgICBpZiAobmlja25hbWUgIT0gbGVhZGVyKSB7XHJcbiAgICAgIHJlbW92ZUxlYWRlckVmZmVjdFRvQ2FudmFzKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgYWRkTGVhZGVyRWZmZWN0VG9DYW52YXMoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMZWFkZXJOb3RpZiA9ICh7IHdvcmQgfSkgPT4ge1xyXG4gIGVuYWJsZUNhbnZhcygpO1xyXG4gIHNob3dDb250cm9scygpO1xyXG4gIGVuYWJsZUNoYXQoKTtcclxuICBub3RpZnMuaW5uZXJUZXh0ID0gYOuLueyLoOydgCDstpzsoJzsnpAg7J6F64uI64ukLiDrrLjsoJw6IFsgJHt3b3JkfSBdYDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVOb3RMZWFkZXJOb3RpZiA9ICh7IG1lc3NhZ2UsIGxlYWRlciB9KSA9PiB7XHJcbiAgY29uc3Qgbmlja25hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm5pY2tuYW1lXCIpO1xyXG4gIGlmIChsZWFkZXIpIHtcclxuICAgIGlmIChuaWNrbmFtZSAhPSBsZWFkZXIubmlja25hbWUpIHtcclxuICAgICAgbm90aWZzLmlubmVyVGV4dCA9IGAke21lc3NhZ2V9YDtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhZGRMZWFkZXJFZmZlY3RUb0NhbnZhcz0gKCk9PntcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQ2FudmFzXCIpLmNsYXNzTGlzdC5hZGQoXCJpcy1sZWFkZXJcIilcclxufVxyXG5jb25zdCByZW1vdmVMZWFkZXJFZmZlY3RUb0NhbnZhcz0gKCk9PntcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQ2FudmFzXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1sZWFkZXJcIilcclxufVxyXG5jb25zdCByZW1vdmVMZWFkZXJFZmZlY3RUb1VzZXJJbmZvPSAoKT0+e1xyXG4gIGNvbnN0IGxlYWRlckRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1saS5pcy1sZWFkZXJcIilcclxuICBpZihsZWFkZXJET00pe1xyXG4gICAgbGVhZGVyRE9NLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1sZWFkZXJcIik7XHJcbiAgfVxyXG59XHJcbmNvbnN0IGFkZExlYWRlckVmZmVjdFRvVXNlckluZm89IChsZWFkZXIpPT57XHJcbiAgY29uc3QgY3VycmVudFVzZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInVzZXItbGkgXCIrbGVhZGVyKVswXTtcclxuICBpZihjdXJyZW50VXNlckluZm8pe1xyXG4gICAgY3VycmVudFVzZXJJbmZvLmNsYXNzTGlzdC5hZGQoXCJpcy1sZWFkZXJcIilcclxuICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUdhbWVFbmRlZCA9ICh7IHdvcmQgfSkgPT4ge1xyXG4gIGhhbmRsZUFsbE5vdGlmKGDqsozsnoQg64GdLiDri7U6ICR7d29yZH1gKTtcclxuICByZW1vdmVMZWFkZXJFZmZlY3RUb1VzZXJJbmZvKCk7XHJcbiAgcmVtb3ZlTGVhZGVyRWZmZWN0VG9DYW52YXMoKTtcclxuICBoYW5kbGVBbGxOb3RpZjIoYGApO1xyXG4gIGhhbmRsZUFsbE5vdGlmMyhgYCk7XHJcbiAgZGlzYWJsZUNhbnZhcygpO1xyXG4gIGhpZGVDb250cm9scygpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaGFuZGxlR2FtZVN0YXJ0aW5nID0gKHsgY291bnQgfSkgPT4ge1xyXG4gIHJlc2V0Q2FudmFzKCk7XHJcbn07XHJcbiJdfQ==
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