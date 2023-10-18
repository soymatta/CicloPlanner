// ----------------------------- ROUTES HTTP ----------------------------- //

// ----- GET -----
function getRoutes() {
  callApi("GET", `${urlApi}/routes/get`);
}

// ----- POST -----
function postRoute(nombre, start, destiny, user_id) {
  callApi("POST", `${urlApi}/routes/post`, {
    nombre,
    start,
    destiny,
    user_id,
  });
}

// ----- PUT -----
function putRoute(id, nombre, start, destiny, user_id) {
  callApi("PUT", `${urlApi}/routes/put/${id}`, {
    nombre,
    start,
    destiny,
    user_id,
  });
}

// ----- DELETE -----
function deleteRoute(id) {
  callApi("DELETE", `${urlApi}/routes/delete/${id}`);
}

// Obtener todas las rutas de un Usuario por su ID
async function getRoutesByUserId(userId) {
  try {
    const response = await fetch(`${urlApi}/routes/get?user_id=${userId}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener rutas para el usuario con ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener rutas:", error);
    return null;
  }
}
