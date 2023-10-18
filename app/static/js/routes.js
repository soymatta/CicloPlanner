// ------  METODOS HTTP ------ //
const urlApi = "http://127.0.0.1:5000";

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
