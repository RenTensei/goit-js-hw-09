const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId = null;
stopBtn.disabled = true;

function startHandler() {
  if (intervalId) {
    return;
  }
  switchButtons();

  body.style.backgroundColor = getRandomHexColor();

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopHandler() {
  switchButtons();
  clearInterval(intervalId);
  intervalId = null;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function switchButtons() {
  stopBtn.disabled = !stopBtn.disabled;
  startBtn.disabled = !startBtn.disabled;
}

startBtn.addEventListener('click', startHandler);
stopBtn.addEventListener('click', stopHandler);
