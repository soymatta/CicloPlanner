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
function mostrarModal(titulo, contenido) {
  document.getElementById("titulo_modal").innerHTML = titulo;
  document.getElementById("contenido_modal").innerHTML = contenido;
  $("#modalWeb").modal("show"); // Muestra el modal con jQuery
}
function cerrarModal() {
  $("#modalWeb").modal("hide"); // Cierra el modal con jQuery
}

// Funciones directas

function planificarRuta(posA, posB) {
  // Toma la direccion de inicio con la direccion final y muestra una ruta entre ambos puntos

  if (posA == "") {
    mostrarModal("Falta direccion", "Debes colocar una direccion de salida.");
  } else if (posB == "") {
    mostrarModal("Falta direccion", "Debes colocar una direccion de destino.");
  } else {
    // TODO: Codigo para generar la ruta
    console.log("Dirección de salida:", posA);
    console.log("Dirección de destino:", posB);
  }
}

function guardarRuta(posA, posB) {
  // Guarda los puntos A y B de una ruta

  // Codigo para guardarle la ruta al Usuario

  mostrarModal(
    "Ruta guardada",
    `La ruta desde ${posA} hasta ${posB} se ha guardado con éxito.`
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

async function validarLogin() {
  let usuario = document.getElementById("loginUser").value;
  let contrasena = document.getElementById("loginPassword").value;

  try {
    let response = await callApi("POST", `${urlApi}/login`, {
      username: usuario,
      password: contrasena,
    });

    if (response.success) {
      mostrarModal("Ingreso a Cicloplanner", "ingreso correctamente");
      return false;
    } else {
      console.log("Credenciales incorrectas");
      mostrarModal(
        "Ingreso a Cicloplanner",
        "Sus credenciales son incorrecta, por favor intente otra vez o registrese si no tiene un usuario o contraseña asignado."
      );
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function validarRegister() {
  let usuario = document.getElementById("loginUser").value;

  try {
    let response = await callApi("POST", `${urlApi}/register`, {
      username: usuario,
    });

    if (response.success) {
      console.log("Usuario existente");
      return false;
    } else {
      console.log("Usuario inexistente");

      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
