// ------  METODOS HTTP ------ //
const urlApi = "http://localhost:5000";

async function callApi(method, url, data = null) {
  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error en métodos HTTP! : ${response.status}`);
    }
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------- USERS HTTP ----------------------------- //

// ----- GET -----
function getUsers() {
  callApi("GET", `${urlApi}/users/get`);
}

// ----- POST -----
function postUser(username, email, password, image, address) {
  let data = { username, email, password, image, address };
  callApi("POST", `${urlApi}/users/post`, data);
}

// ----- PUT -----
function putUser(id, username, email, password, image, address) {
  let data = { username, email, password, image, address };
  callApi("PUT", `${urlApi}/users/put/${id}`, data);
}

// ----- DELETE -----
function deleteUser(id) {
  callApi("DELETE", `${urlApi}/users/delete/${id}`);
}

// ----------------------------- ALARMS HTTP ----------------------------- //

// ----- GET -----
function getAlarms() {
  callApi("GET", `${urlApi}/alarms/get`);
}

// ----- POST -----
function postAlarm(title, description) {
  let data = { titulo: title, description };
  callApi("POST", `${urlApi}/alarms/post`, data);
}

// ----- PUT -----
function putAlarm(id, title, description) {
  let data = { id, titulo: title, description };
  callApi("PUT", `${urlApi}/alarms/put/${id}`, data);
}

// ----- DELETE -----
function deleteAlarm(id) {
  callApi("DELETE", `${urlApi}/alarms/put/${id}`);
}

// ----------------------------- COMMENTS HTTP ----------------------------- //

// ----- GET -----
function getComments() {
  callApi("GET", `${urlApi}/comments/get`);
}

// ----- POST -----
function postComment(content, date, user_id) {
  let data = { content, date, user_id };
  callApi("POST", `${urlApi}/comments/post`, data);
}

// ----- PUT -----
function putComment(id, content, date, user_id) {
  let data = { content, date, user_id };
  callApi("PUT", `${urlApi}/comments/put/${id}`, data);
}

// ----- DELETE -----
function deleteComment(id) {
  callApi("DELETE", `${urlApi}/comments/delete/${id}`);
}

// ----------------------------- ROUTES HTTP ----------------------------- //

// ----- GET -----
function getRoutes() {
  callApi("GET", `${urlApi}/routes/get`);
}

// ----- POST -----
function postRoute(
  nombre,
  distance,
  aprox_time,
  start,
  destiny,
  state,
  favorite,
  user_id
) {
  callApi("POST", `${urlApi}/routes/post`, {
    nombre,
    distance,
    aprox_time,
    start,
    destiny,
    state,
    favorite,
    user_id,
  });
}

// ----- PUT -----
function putRoute(
  id,
  nombre,
  distance,
  aprox_time,
  start,
  destiny,
  state,
  favorite,
  user_id
) {
  callApi("PUT", `${urlApi}/routes/put/${id}`, {
    nombre,
    distance,
    aprox_time,
    start,
    destiny,
    state,
    favorite,
    user_id,
  });
}

// ----- DELETE -----
function deleteRoute(id) {
  callApi("DELETE", `${urlApi}/routes/delete/${id}`);
}

// ------  FIN METODOS HTTP ------ //

// Fucniones auxiliares
function mostrarModal() {
  $("#modalWeb").modal("show"); // Muestra el modal con jQuery
}
function cerrarModal() {
  $("#modalWeb").modal("hide"); // Cierra el modal con jQuery
}
function cambiarTituloModal(titulo) {
  var elemento = document.getElementById("titulo_modal");
  elemento.innerHTML = titulo;
}
function cambiarContenidoModal(contenido) {
  var elemento = document.getElementById("contenido_modal");
  elemento.innerHTML = contenido;
}

// Funciones directas

function planificarRuta(posA, posB) {
  // Toma la direccion de inicio con la direccion final y muestra una ruta entre ambos puntos

  if (posA == "") {
    mostrarModal();
    cambiarTituloModal("Falta direccion");
    cambiarContenidoModal("Debes colocar una direccion de salida.");
  } else if (posB == "") {
    mostrarModal();
    cambiarTituloModal("Falta direccion");
    cambiarContenidoModal("Debes colocar una direccion de destino.");
  } else {
    // TODO: Codigo para generar la ruta
    console.log("Dirección de salida:", posA);
    console.log("Dirección de destino:", posB);
  }
}

function guardarRuta(posA, posB) {
  // Guarda los puntos A y B de una ruta

  // Codigo para guardarle la ruta al Usuario

  mostrarModal();
  cambiarTituloModal("Ruta guardada");
  cambiarContenidoModal(
    "La ruta desde ${posA} hasta ${posB} se ha guardado con éxito."
  );
}

function buscarRuta() {
  let direccionSalida = document.getElementById("dir_1").value;
  let direccionDestino = document.getElementById("dir_2").value;

  planificarRuta(direccionSalida, direccionDestino);

  if (document.getElementById("guardarRuta").checked) {
    // Checkbox Marcado
    guardarRuta(direccionSalida, direccionDestino);
  }

  // Para que no se actualize la pagina al Submit
  return false;
}

function validarLogIn() {
  let usuario = document.getElementById("loginUser").value;
  let contrasena = document.getElementById("loginPassword").value;

  // Codigo para verificar si algun si ese usuario concide con esa contraseña

  console.log("Usuario: " + usuario);
  console.log("Contraseña: " + contrasena);

  return false;
}

function validadRegister() {
  let usuario = document.getElementById("loginUser").value;
  let contrasena = document.getElementById("loginPassword").value;
  let contrasenRepeat = document.getElementById(
    "loginPasswordVerification"
  ).value;

  if (contrasena != contrasenRepeat) {
    mostrarModal();
    cambiarTituloModal("Verificacion de seguridad");
    cambiarContenidoModal(
      "Su contraseña no concide con la verificacion de contraseña, por favor vuelva a introducir la misma contraseña en ambos campos."
    );
  }

  // Codigo para verificar si algun si ese usuario concide con esa contraseña

  console.log("Usuario: " + usuario);
  console.log("Contraseña: " + contrasena);

  return false;
}
