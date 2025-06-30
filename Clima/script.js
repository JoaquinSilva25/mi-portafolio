const apiKey = "efd142cc6dd6170fdc2086b2ef6700c6";

function buscarClima() {
  const ciudad = document.getElementById("ciudad").value.trim();
  if (!ciudad) {
    alert("Por favor ingresa una ciudad.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("nombreCiudad").textContent = data.name;
      document.getElementById("temp").textContent = data.main.temp.toFixed(1);
      document.getElementById("descripcion").textContent = data.weather[0].description;
      document.getElementById("humedad").textContent = data.main.humidity;
      document.getElementById("resultado").style.display = "block";
    })
    .catch(error => {
      alert("No se pudo obtener el clima. Verifica la ciudad.");
      document.getElementById("resultado").style.display = "none";
    });
}

