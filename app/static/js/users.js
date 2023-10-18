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

// ----------------------------- USERS HTTP ----------------------------- //

// ----- GET -----
function getUsers() {
  callApi("GET", `${urlApi}/users/get`);
}

// ----- POST -----
function postUser(username, password) {
  let data = { username, password };
  callApi("POST", `${urlApi}/users/post`, data);
}

// ----- PUT -----
function putUser(id, username, password, image) {
  let data = { username, password, image };
  callApi("PUT", `${urlApi}/users/put/${id}`, data);
}

// ----- DELETE -----
function deleteUser(id) {
  callApi("DELETE", `${urlApi}/users/delete/${id}`);
}
