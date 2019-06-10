import "./login";
import "./sockets";
import "./chat";
import "./paint";

document.addEventListener('DOMContentLoaded', function(){ 
  setPlatformInfo();
  var inputBox = document.querySelector('.safari #jsSendMsg input');
  if(inputBox) {
      inputBox.addEventListener('focus', function(e) {
      document.body.classList.add('keyboard');
      setTimeout(function() {
          window.scrollTo(0, 0);
      }, 200);
      });
      
      inputBox.addEventListener('blur', function(e) {
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