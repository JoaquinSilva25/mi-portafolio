let mode = 'pomodoro';
let timerDisplay = document.getElementById('timer');
let title = document.getElementById('title');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');
let switchModeBtn = document.getElementById('switchMode');

let interval;
let running = false;
let timeLeft = 1500; // 25 min en segundos
let elapsed = 0;

function updateDisplay() {
  let time = mode === 'pomodoro' ? timeLeft : elapsed;
  let minutes = String(Math.floor(time / 60)).padStart(2, '0');
  let seconds = String(time % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (running) return;
  running = true;

  interval = setInterval(() => {
    if (mode === 'pomodoro') {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        alert("¡Tiempo terminado!");
        running = false;
      }
    } else {
      elapsed++;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  running = false;
}

function resetTimer() {
  clearInterval(interval);
  running = false;
  if (mode === 'pomodoro') {
    timeLeft = 1500;
  } else {
    elapsed = 0;
  }
  updateDisplay();
}

function switchMode() {
  clearInterval(interval);
  running = false;
  if (mode === 'pomodoro') {
    mode = 'cronometro';
    title.textContent = "Modo Cronómetro";
    switchModeBtn.textContent = "Cambiar a Pomodoro";
    elapsed = 0;
  } else {
    mode = 'pomodoro';
    title.textContent = "Modo Pomodoro";
    switchModeBtn.textContent = "Cambiar a Cronómetro";
    timeLeft = 1500;
  }
  updateDisplay();
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
switchModeBtn.onclick = switchMode;

updateDisplay();
