let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function renderizarTareas() {
  const lista = document.getElementById('lista-tareas');
  lista.innerHTML = '';

  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    li.className = tarea.completada ? 'completed' : '';

    li.innerHTML = `
      <span onclick="alternarCompletado(${index})">${tarea.texto}</span>
      <button onclick="eliminarTarea(${index})">🗑️</button>
    `;

    lista.appendChild(li);
  });

  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function agregarTarea() {
  const input = document.getElementById('nueva-tarea');
  const texto = input.value.trim();

  if (texto !== '') {
    tareas.push({ texto, completada: false });
    input.value = '';
    renderizarTareas();
  }
}

function eliminarTarea(index) {
  tareas.splice(index, 1);
  renderizarTareas();
}

function alternarCompletado(index) {
  tareas[index].completada = !tareas[index].completada;
  renderizarTareas();
}

// Inicializar
renderizarTareas();
