// ----------------------------- ALARMS HTTP ----------------------------- //

// ----- GET ----- //
function getAlarms() {
  const options = {
    method: "GET",
    headers: { "User-Agent": "insomnia/8.1.0" },
  };

  fetch("http://localhost:5000/alarms/get", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
// ----- POST ----- //
function postAlarm(title, description) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body: '{"titulo":"' + title + '","description":"' + description + '"}',
  };

  fetch("http://localhost:5000/alarms/post", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- PUT ----- //
function putAlarm(id, title, description) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body: '{"titulo":"' + title + '","description":"' + description + '"}',
  };

  fetch("http://localhost:5000/alarms/put/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- DELETE ----- //
function deleteAlarm(id) {
  const options = {
    method: "DELETE",
    headers: { "User-Agent": "insomnia/8.1.0" },
  };

  fetch("http://localhost:5000/alarms/delete/1", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
