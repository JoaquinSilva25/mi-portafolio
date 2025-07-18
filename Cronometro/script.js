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

// Actualiza el reloj en pantalla
function updateDisplay() {
  const currentTime = mode === 'pomodoro' ? timeLeft : elapsed;
  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Inicia el temporizador
function startTimer() {
  if (running) return;
  running = true;

  interval = setInterval(() => {
    if (mode === 'pomodoro') {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        running = false;
        alert("¡Pomodoro terminado!");
        // new Audio("ding.mp3").play(); // Puedes agregar un sonido si lo deseas
      }
    } else {
      elapsed++;
    }
    updateDisplay();
  }, 1000);
}

// Pausa el temporizador
function pauseTimer() {
  clearInterval(interval);
  running = false;
}

// Reinicia el modo actual
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

// Cambia entre Pomodoro y Cronómetro
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

// Eventos de los botones
startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
switchModeBtn.onclick = switchMode;

// Muestra la hora inicial al cargar
updateDisplay();
