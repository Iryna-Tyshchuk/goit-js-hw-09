function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStoptBtnClick);
let timeoutId = null;
function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStoptBtnClick() {
  clearInterval(timeoutId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
