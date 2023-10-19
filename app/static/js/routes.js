// ----------------------------- ROUTES HTTP ----------------------------- //

// ----- GET -----
function getRoutes() {
  callApi("GET", `${urlApi}/routes/get`);
}

// ----- POST -----
function postRoute(nombre, start, destiny, user_id) {
  callApi("POST", `${urlApi}/routes/post`, {
    nombre,
    start,
    destiny,
    user_id,
  });
}

// ----- PUT -----
function putRoute(id, nombre, start, destiny, user_id) {
  callApi("PUT", `${urlApi}/routes/put/${id}`, {
    nombre,
    start,
    destiny,
    user_id,
  });
}

// ----- DELETE -----
function deleteRoute(id) {
  callApi("DELETE", `${urlApi}/routes/delete/${id}`);
}
