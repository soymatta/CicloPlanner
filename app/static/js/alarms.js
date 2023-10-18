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
