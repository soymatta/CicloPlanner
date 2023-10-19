// ----------------------------- COMMENTS HTTP ----------------------------- //

// ----- GET -----
function getComments() {
  callApi("GET", `${urlApi}/comments/get`);
}

// ----- POST -----
function postComment(content, date, user_id) {
  let data = { content, date, user_id };+
  callApi("POST", `${urlApi}/comments/post`, data);
}

// ----- PUT -----
function putComment(id, content, date, user_id) {
  let data = { content, date, user_id };
  callApi("PUT", `${urlApi}/comments/put/${id}`, data);
}

// ----- DELETE -----
function deleteComment(id) {
  callApi("DELETE", `${urlApi}/comments/delete/${id}`);
}
