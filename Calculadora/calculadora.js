const pantalla = document.getElementById("pantalla");

function agregar(valor) {
  const ult = pantalla.value.slice(-1);
  const operadores = ['+', '-', '*', '/'];

  // Evitar operadores consecutivos
  if (operadores.includes(valor) && operadores.includes(ult)) return;

  pantalla.value += valor;
}

function calcular() {
  try {
    if (pantalla.value.trim() === "") return;
    pantalla.value = eval(pantalla.value);
  } catch (e) {
    pantalla.value = "Error";
  }
}

function borrarTodo() {
  pantalla.value = "";
}

function borrarCaracter() {
  pantalla.value = pantalla.value.slice(0, -1);
}

// Teclado físico
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ['+', '-', '*', '/', '.'].includes(e.key)) {
    agregar(e.key);
  } else if (e.key === "Enter") {
    calcular();
  } else if (e.key === "Backspace") {
    borrarCaracter();
  } else if (e.key === "Escape") {
    borrarTodo();
  }
});
