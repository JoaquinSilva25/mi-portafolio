const modoSelect = document.getElementById('modo');
const configDado = document.getElementById('config-dado');
const configRuleta = document.getElementById('config-ruleta');
const accionBtn = document.getElementById('accion');
const resultadoDiv = document.getElementById('resultado');

function cambiarModo() {
  const modo = modoSelect.value;
  if (modo === 'dado') {
    configDado.style.display = 'block';
    configRuleta.style.display = 'none';
    accionBtn.textContent = 'Lanzar 🎲';
  } else {
    configDado.style.display = 'none';
    configRuleta.style.display = 'block';
    accionBtn.textContent = 'Girar 🎡';
  }
  resultadoDiv.textContent = '';
}

function accion() {
  const modo = modoSelect.value;
  if (modo === 'dado') {
    const valor = Math.floor(Math.random() * 6) + 1;
    resultadoDiv.textContent = valor;
  } else {
    const n = parseInt(document.getElementById('sectores').value, 10);
    const valor = Math.floor(Math.random() * n) + 1;
    resultadoDiv.textContent = valor;
  }
}

// Inicialización
cambiarModo();
