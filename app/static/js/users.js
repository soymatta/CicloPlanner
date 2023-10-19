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
  callApi("PUT", `${urlApi}/user s/put/${id}`, data);
}

// ----- DELETE -----
function deleteUser(id) {
  callApi("DELETE", `${urlApi}/users/delete/${id}`);
}

async function getUserIDSession() {
  try {
    const response = await fetch("/getUserIDSession", {
      method: "GET",
    });
    const data = await response.json();
    const user_id = data.user_id;

    if (user_id !== null) {
      console.log("User ID:", user_id);
      return user_id;
    } else {
      console.log("No se encontró user_id en la sesión");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener user_id:", error);
    return null;
  }
}
