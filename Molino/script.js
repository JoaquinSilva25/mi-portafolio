const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const turnoDisplay = document.getElementById("turno");

let turno = "negra"; // negra = ⚫, blanca = ⚪
let colocadas = { negra: 0, blanca: 0 };
const maxFichas = 9;

const posiciones = [
  [0, 0], [185, 0], [370, 0], [370, 185], [370, 370], [185, 370],
  [0, 370], [0, 185], [60, 60], [185, 60], [310, 60], [310, 185],
  [310, 310], [185, 310], [60, 310], [60, 185], [120, 120], [185, 120],
  [250, 120], [250, 185], [250, 250], [185, 250], [120, 250], [120, 185]
];

const molinos = [
  [0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 0],
  [8, 9,10], [10,11,12], [12,13,14], [14,15,8],
  [16,17,18], [18,19,20], [20,21,22], [22,23,16],
  [1, 9,17], [3,11,19], [5,13,21], [7,15,23],
  [0,8,16], [2,10,18], [4,12,20], [6,14,22]
];

// Crear los 24 puntos
posiciones.forEach((pos, index) => {
  const punto = document.createElement("div");
  punto.classList.add("punto");
  punto.style.left = pos[0] + "px";
  punto.style.top = pos[1] + "px";
  punto.dataset.index = index;
  punto.dataset.estado = "";
  punto.addEventListener("click", () => colocarFicha(punto));
  tablero.appendChild(punto);
});

function colocarFicha(punto) {
  if (punto.dataset.estado !== "") return;

  if (colocadas[turno] >= maxFichas) {
    mensaje.textContent = `Ya colocaste tus 9 fichas.`;
    return;
  }

  punto.classList.add(turno === "negra" ? "ficha-negra" : "ficha-blanca");
  punto.dataset.estado = turno;
  colocadas[turno]++;

  const index = parseInt(punto.dataset.index);
  if (formaMolino(index, turno)) {
    mensaje.textContent = `¡${turno === "negra" ? "⚫" : "⚪"} formó un molino! Elimina una ficha del oponente.`;
    permitirEliminarFicha(turno);
    return;
  }

  cambiarTurno();
}

function formaMolino(index, jugador) {
  return molinos.some(linea => {
    return linea.includes(index) &&
      linea.every(i => {
        const punto = document.querySelector(`.punto[data-index="${i}"]`);
        return punto.dataset.estado === jugador;
      });
  });
}

function permitirEliminarFicha(jugadorActual) {
  const rival = jugadorActual === "negra" ? "blanca" : "negra";
  const puntos = document.querySelectorAll(`.punto[data-estado="${rival}"]`);
  puntos.forEach(p => {
    p.classList.add("eliminable");
    p.addEventListener("click", eliminarFicha);
  });
}

function eliminarFicha(e) {
  const punto = e.currentTarget;
  const rival = punto.dataset.estado;

  punto.dataset.estado = "";
  punto.classList.remove("ficha-negra", "ficha-blanca", "eliminable");
  colocadas[rival]--;

  document.querySelectorAll(".eliminable").forEach(p => {
    p.classList.remove("eliminable");
    p.removeEventListener("click", eliminarFicha);
  });

  cambiarTurno();
}

function cambiarTurno() {
  turno = turno === "negra" ? "blanca" : "negra";
  turnoDisplay.textContent = `Turno: ${turno === "negra" ? "⚫" : "⚪"}`;
  mensaje.textContent = "";
}

