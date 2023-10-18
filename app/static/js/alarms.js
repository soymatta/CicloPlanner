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
