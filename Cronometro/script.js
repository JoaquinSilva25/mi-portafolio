let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo = null;
let enMarcha = false;
let modo = "cronometro";
let cuentaAtras = 0;
let cicloPomodoro = 0;
let esDescanso = false;

const sonidoAlarma = new Audio('alarma.wav');

function formato(valor) {
  return valor < 10 ? '0' + valor : valor;
}

function actualizarDisplay() {
  document.getElementById("display").textContent =
    `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
}

function cambiarModo() {
  modo = document.getElementById("modo").value;
  reiniciar();

  document.getElementById("input-tiempo").style.display =
    (modo === "temporizador") ? "block" : "none";

  if (document.getElementById("estado-pomodoro")) {
    document.getElementById("estado-pomodoro").textContent = "";
  }

  cicloPomodoro = 0;
  esDescanso = false;
}

function iniciar() {
  if (enMarcha) return;

  const contenedor = document.querySelector(".reloj-container");
  contenedor.className = "reloj-container estado-activo";

  if (modo === "cronometro") {
    iniciarCronometro();
  } else if (modo === "temporizador") {
    iniciarTemporizador();
  } else if (modo === "pomodoro") {
    iniciarPomodoro();
  }

  enMarcha = true;
}

function iniciarCronometro() {
  intervalo = setInterval(() => {
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
      if (minutos === 60) {
        minutos = 0;
        horas++;
      }
    }
    actualizarDisplay();
  }, 1000);
}

function iniciarTemporizador() {
  const input = parseInt(document.getElementById("tiempo-inicial").value);
  if (isNaN(input) || input <= 0) {
    alert("Ingresa un número válido de segundos.");
    return;
  }

  cuentaAtras = input;
  horas = Math.floor(cuentaAtras / 3600);
  minutos = Math.floor((cuentaAtras % 3600) / 60);
  segundos = cuentaAtras % 60;
  actualizarDisplay();

  intervalo = setInterval(() => {
    if (cuentaAtras > 0) {
      cuentaAtras--;
      horas = Math.floor(cuentaAtras / 3600);
      minutos = Math.floor((cuentaAtras % 3600) / 60);
      segundos = cuentaAtras % 60;
      actualizarDisplay();
    } else {
      clearInterval(intervalo);
      document.querySelector(".reloj-container").className = "reloj-container estado-finalizado";
      sonidoAlarma.play();
      if (navigator.vibrate) navigator.vibrate(400);
      alert("¡Tiempo terminado!");
      enMarcha = false;
    }
  }, 1000);
}

function iniciarPomodoro() {
  let duracion = esDescanso
    ? (cicloPomodoro % 4 === 0 ? 15 * 60 : 5 * 60)
    : 25 * 60;

  cuentaAtras = duracion;
  actualizarPomodoroLabel();

  horas = Math.floor(cuentaAtras / 3600);
  minutos = Math.floor((cuentaAtras % 3600) / 60);
  segundos = cuentaAtras % 60;
  actualizarDisplay();

  intervalo = setInterval(() => {
    if (cuentaAtras > 0) {
      cuentaAtras--;
      horas = Math.floor(cuentaAtras / 3600);
      minutos = Math.floor((cuentaAtras % 3600) / 60);
      segundos = cuentaAtras % 60;
      actualizarDisplay();
    } else {
      clearInterval(intervalo);
      sonidoAlarma.play();
      esDescanso = !esDescanso;
      if (!esDescanso) cicloPomodoro++;
      iniciarPomodoro();
    }
  }, 1000);
}

function actualizarPomodoroLabel() {
  const estado = document.getElementById("estado-pomodoro");
  if (!estado) return;

  estado.textContent = esDescanso
    ? (cicloPomodoro % 4 === 0 ? "Descanso largo (15 min)" : "Descanso corto (5 min)")
    : "Trabajo (25 min)";
}

function pausar() {
  clearInterval(intervalo);
  enMarcha = false;
  document.querySelector(".reloj-container").className = "reloj-container estado-pausado";
}

function reiniciar() {
  clearInterval(intervalo);
  sonidoAlarma.pause();
  sonidoAlarma.currentTime = 0;
  const contenedor = document.querySelector(".reloj-container");
  contenedor.className = "reloj-container estado-inicial";

  const actual = `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
  if (actual !== "00:00:00") {
    document.getElementById("ultimo-tiempo").textContent = "Último tiempo: " + actual;
  }

  segundos = 0;
  minutos = 0;
  horas = 0;
  cuentaAtras = 0;
  actualizarDisplay();
  enMarcha = false;
  document.getElementById("tiempo-inicial").value = "";

  if (document.getElementById("estado-pomodoro")) {
    document.getElementById("estado-pomodoro").textContent = "";
  }
}

function detenerAlarma() {
  sonidoAlarma.pause();
  sonidoAlarma.currentTime = 0;
}
