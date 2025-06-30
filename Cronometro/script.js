let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo = null;
let enMarcha = false;
let modo = "cronometro";
let cuentaAtras = 0;

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
  if (modo === "temporizador") {
    document.getElementById("input-tiempo").style.display = "block";
  } else {
    document.getElementById("input-tiempo").style.display = "none";
  }
}

function iniciar() {
  if (enMarcha) return;

  if (modo === "cronometro") {
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
  } else if (modo === "temporizador") {
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
        alert("¡Tiempo terminado!");
        enMarcha = false;
      }
    }, 1000);
  }

  enMarcha = true;
}

function pausar() {
  clearInterval(intervalo);
  enMarcha = false;
}

function reiniciar() {
  clearInterval(intervalo);
  segundos = 0;
  minutos = 0;
  horas = 0;
  cuentaAtras = 0;
  actualizarDisplay();
  enMarcha = false;
}

