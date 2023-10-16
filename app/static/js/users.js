// ----------------------------- USERS HTTP ----------------------------- //

// ----- GET ----- //
function getUsers() {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body: "false",
  };

  fetch("http://localhost:5000/users/get", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
// ----- POST ----- //
function postUser(username, email, password, image, address) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body:
      '{"username":"' +
      username +
      '","email":"' +
      email +
      '","password":"' +
      password +
      '","image":"' +
      image +
      '","address":"' +
      address +
      '"}',
  };

  fetch("http://localhost:5000/users/post", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- PUT ----- //
function putUser(id, username, email, password, image, address) {
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body:
      '{"username":"' +
      username +
      '","email":"' +
      email +
      '","password":"' +
      password +
      '","image":"' +
      image +
      '","address":"' +
      address +
      '"}',
  };

  fetch("http://localhost:5000/users/put/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- DELETE ----- //
function deleteUser(id) {
  let options = {
    method: "DELETE",
    headers: { "User-Agent": "insomnia/8.1.0" },
  };

  fetch("http://localhost:5000/users/delete/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
