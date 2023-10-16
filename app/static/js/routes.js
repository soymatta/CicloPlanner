// ----------------------------- ROUTES HTTP ----------------------------- //

// ----- GET ----- //
function getRoutes() {
  let options = { method: "GET", headers: { "User-Agent": "insomnia/8.1.0" } };

  fetch("http://localhost:5000/routes/get", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
// ----- POST ----- //
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
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body:
      '{"nombre":"' +
      nombre +
      '","distance":"' +
      distance +
      '","aprox_time":"' +
      aprox_time +
      '","start":"' +
      start +
      '","destiny":"' +
      destiny +
      '","state":"' +
      state +
      '","favorite":' +
      favorite +
      ',"user_id":' +
      user_id +
      "}",
  };

  fetch("http://localhost:5000/routes/post", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- PUT ----- //
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
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body:
      '{"nombre":"' +
      nombre +
      '","distance":"' +
      distance +
      '","aprox_time":"' +
      aprox_time +
      '","start":"' +
      start +
      '","destiny":"' +
      destiny +
      '","state":"' +
      state +
      '","favorite":' +
      favorite +
      ',"user_id":' +
      user_id +
      "}",
  };

  fetch("http://localhost:5000/routes/put/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- DELETE ----- //
function deleteRoute(id) {
  let options = {
    method: "DELETE",
    headers: { "User-Agent": "insomnia/8.1.0" },
  };

  fetch("http://localhost:5000/routes/delete/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
