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

// ----------------------------- COMMENTS HTTP ----------------------------- //

// ----- GET -----
function getComments() {
  callApi("GET", `${urlApi}/comments/get`);
}

// ----- POST -----
function postComment(content, date, user_id) {
  let data = { content, date, user_id };
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
