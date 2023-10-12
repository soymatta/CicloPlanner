// ----- GET ----- //
function getUsers() {
  let json;

  fetch("/users/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      consol.log(data);
    })
    .catch((error) => {
      console.error("Error (Get User):", error);
    });

  return json;
}

// ----- POST ----- //
function postUsers() {
  let json;
  return json;
}

// ----- PUT ----- //
function putUsers() {
  let json;
  return json;
}

// ----- DELETE ----- //
function deleteUsers() {
  let json;
  return json;
}
