function updateLength(val) {
  document.getElementById('length-value').innerText = val;
}

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const useUppercase = document.getElementById('uppercase').checked;
  const useLowercase = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=<>?/{}[]";

  let allChars = "";
  if (useUppercase) allChars += upper;
  if (useLowercase) allChars += lower;
  if (useNumbers) allChars += numbers;
  if (useSymbols) allChars += symbols;

  if (allChars === "") {
    alert("Selecciona al menos una opción");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randIndex];
  }

  document.getElementById('password').value = password;
}

function copyPassword() {
  const passInput = document.getElementById('password');
  if (!passInput.value) return;

  navigator.clipboard.writeText(passInput.value)
    .then(() => alert("¡Contraseña copiada al portapapeles!"))
    .catch(() => alert("No se pudo copiar"));
}
