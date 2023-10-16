// ----------------------------- COMMENTS HTTP ----------------------------- //

// ----- GET ----- //
function getComment() {
  let options = {
    method: "GET",
    headers: { "User-Agent": "insomnia/8.1.0" },
  };

  fetch("http://localhost:5000/comments/get", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
// ----- POST ----- //
function postComment(content, date, user_id) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body:
      '{"content":"' +
      content +
      '","date":"' +
      date +
      '","user_id":' +
      user_id +
      "}",
  };

  fetch("http://localhost:5000/comments/post", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- PUT ----- //
function putComment(id, content, date, user_id) {
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.1.0",
    },
    body:
      '{"content":"' +
      content +
      '","date":"' +
      date +
      '","user_id":' +
      user_id +
      "}",
  };

  fetch("http://localhost:5000/comments/put/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// ----- DELETE ----- //
function deleteComment(id) {
  let options = {
    method: "DELETE",
    headers: { "User-Agent": "insomnia/8.1.0" },
  };

  fetch("http://localhost:5000/comments/delete/" + id, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
