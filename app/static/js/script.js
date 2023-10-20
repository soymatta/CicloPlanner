// ------  METODOS HTTP ------ //
let urlApi = "";

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
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ------  FUNCIONES AUXILIARES ------ //

function mostrarModal(titulo, contenido) {
  document.getElementById("titulo_modal").innerHTML = titulo;
  document.getElementById("contenido_modal").innerHTML = contenido;
  $("#modalWeb").modal("show"); // Muestra el modal con jQuery
}

function mostrarModalMapa(posA, posB) {
  document.getElementById("titulo_modal").innerHTML = "Mapa";

  // Configuracion Inicial de GMAPS
  let mapOptions = {
    center: { lat: 10.988609, lng: -74.7913632 }, // Cords de Barranquilla
    zoom: 12,
  };

  let mapModal = document.getElementById("mapModal");

  // Agrega las dimensiones del mapa
  mapModal.setAttribute("style", "width: 560px; height: 400px");

  // Crear un mapa en el elemento con id "mapa"
  let mapa = new google.maps.Map(mapModal, mapOptions);

  planificarRuta(posA, posB, mapa);

  $("#modalWeb").modal("show"); // Muestra el modal con jQuery
}

function cerrarModal() {
  $("#modalWeb").modal("hide"); // Cierra el modal con jQuery
}

function getDataTimeNow() {
  let fecha = new Date();
  let año = fecha.getFullYear();
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let dia = fecha.getDate().toString().padStart(2, "0");
  let hora = fecha.getHours().toString().padStart(2, "0");
  let minutos = fecha.getMinutes().toString().padStart(2, "0");
  let segundos = fecha.getSeconds().toString().padStart(2, "0");

  // Formatea la fecha y hora en el formato deseado
  return `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}

function planificarRuta(posA, posB, mapObject) {
  // Crear un objeto Promesa
  return new Promise((resolve, reject) => {
    let geocoder = new google.maps.Geocoder();
    let requestA = { address: posA };
    let requestB = { address: posB };
    let salidaLatLng, destinoLatLng;

    // Geocodificar la dirección de salida
    geocoder.geocode(requestA, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        salidaLatLng = results[0].geometry.location;
        // Geocodificar la dirección de destino
        geocoder.geocode(requestB, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            destinoLatLng = results[0].geometry.location;

            // Crear una ruta entre la dirección de salida y destino
            let directionsService = new google.maps.DirectionsService();
            let directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(mapObject);

            let solicitudRuta = {
              origin: salidaLatLng,
              destination: destinoLatLng,
              travelMode: google.maps.TravelMode.DRIVING,
            };

            // Solicitar la ruta
            directionsService.route(solicitudRuta, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result); // Imprime la ruta que solicito
                resolve(); // Resuelve la promesa cuando la ruta se ha planificado con éxito
              } else {
                reject("No se pudo planificar la ruta.");
              }
            });
          } else {
            reject("No se pudo geolocalizar la dirección de destino.");
          }
        });
      } else {
        reject("No se pudo geolocalizar la dirección de salida.");
      }
    });
  });
}

function mostrarModalInput(titulo, labelInput, labelButton) {
  return new Promise((resolve) => {
    mostrarModal(
      titulo,
      `<label for="inputModal" class="col-form-label">${labelInput}</label>
      <input type="text" class="form-control my-2" id="inputModal" />
      <button id="btnInputModal" class="btn btn-primary btn-block" type="button">${labelButton}</button>`
    );

    let btnInputModal = document.getElementById("btnInputModal");
    btnInputModal.addEventListener("click", () => {
      let inputModalValue = document.getElementById("inputModal").value;
      $("#modalWeb").modal("hide");
      resolve(inputModalValue);
    });
  });
}

async function editarNombreRuta(idRuta, start, destiny, idUser) {
  let newName = await mostrarModalInput(
    "Rutas",
    "¿Cual sera el nuevo nombre de esta ruta?",
    "Cambiar"
  );

  putRoute(idRuta, newName, start, destiny, idUser);

  window.location.href = "/community/routes";
}

// ------  FUNCIONES DIRECTAS ------ //

async function buscarRuta(event) {
  event.preventDefault();

  // Obtener valor del checkbox
  let checkboxGuardar = document.getElementById("guardarRuta");
  let user_id = await getUserIDSession();

  // Si seleccciono guardar ruta y no esta en session
  if (checkboxGuardar.checked && getUserIDSession() == null) {
    window.location.href = "/login";
  } else {
    // Obtener las direcciones de salida y destino
    let direccionSalida = document.getElementById("dir_1").value;
    let direccionDestino = document.getElementById("dir_2").value;

    let mapOptions = {
      center: { lat: 10.988609, lng: -74.7913632 }, // Coordenadas de Barranquilla
      zoom: 12,
    };

    let mapa = new google.maps.Map(document.getElementById("mapa"), mapOptions);

    planificarRuta(direccionSalida, direccionDestino, mapa);

    // Verifica para gfuardar la ruta y que las direcciones no esten vacias
    if (
      checkboxGuardar.checked &&
      direccionSalida != "" &&
      direccionDestino != ""
    ) {
      postRoute(
        `${direccionSalida} --> ${direccionDestino}`,
        direccionSalida,
        direccionDestino,
        user_id
      );
      console.log(`Ruta guardada al usuarioID: ${user_id}`);
      mostrarModal("Planificador de rutas", "Ruta guardada con exito");
    }
  }
  return false;
}

async function generarContenidoRuta() {
  let container = document.querySelector(".container");

  let rutas = await callApi("GET", `${urlApi}/routes/get`);
  let userIDSession = await getUserIDSession();

  for (let i = 0; i < rutas.length; i++) {
    let ruta = rutas[i];
    console.log("destiny:", ruta.destiny);
    console.log("id:", ruta.id);
    console.log("nombre:", ruta.nombre);
    console.log("start:", ruta.start);
    console.log("user_id:", ruta.user_id);

    if (userIDSession == ruta.user_id) {
      // Generar IDs únicos para esta iteración
      let dirAId = `dirA_${i}`;
      let dirBId = `dirB_${i}`;

      // Crear elementos HTML para cada ruta
      let card = document.createElement("div");
      card.className = "card m-4";

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      let cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.innerHTML = ruta.nombre;

      let buttonEditar = document.createElement("button");
      buttonEditar.className = "btn btn-outline-info";
      buttonEditar.innerHTML = '<i class="bx bx-edit"></i>';
      buttonEditar.onclick = async () => {
        editarNombreRuta(
          ruta.id,
          ruta.start,
          ruta.destiny,
          await getUserIDSession()
        );
      };

      let cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.innerHTML = `
      Direccion de salida: <span id="${dirAId}">${ruta.start}</span> <br />
      Direccion de destino: <span id="${dirBId}">${ruta.destiny}</span>
    `;

      let cardButton = document.createElement("p");
      cardButton.className = "text-muted";

      let buttonMostrar = document.createElement("button");
      buttonMostrar.className = "btn btn-primary btn-block";
      buttonMostrar.innerHTML = 'Mostrar ruta <i class="bx bx-map-alt"></i>';
      buttonMostrar.onclick = () => {
        mostrarModalMapa(
          document.getElementById(dirAId).textContent,
          document.getElementById(dirBId).textContent
        );
      };

      let buttonEliminar = document.createElement("button");
      buttonEliminar.className = "btn btn-danger btn-block mx-3";
      buttonEliminar.innerHTML = 'Eliminar ruta <i class="bx bx-trash"></i>';
      buttonEliminar.onclick = () => {
        deleteRoute(ruta.id);
        mostrarModal("Rutas", "Ruta eliminada con exito");
      };

      // Agregar elementos al DOM
      cardButton.appendChild(buttonMostrar);
      cardButton.appendChild(buttonEliminar);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(buttonEditar);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardButton);
      card.appendChild(cardBody);
      container.appendChild(card);
    }
  }
}

async function nuevoComentario() {
  let commentContent = await mostrarModalInput(
    "Comunidad",
    "¿Cual es tu comentario?",
    "Subir"
  );

  postComment(commentContent, getDataTimeNow(), await getUserIDSession());

  mostrarModal("Comunidad", "Comentario subido");
}

async function generarContenidoComentarios() {
  let container = document.querySelector(".container");

  let comentarios = await callApi("GET", `${urlApi}/comments/get`);
  let usuarios = await callApi("GET", `${urlApi}/users/get`);

  for (let i = 0; i < comentarios.length; i++) {
    let comentario = comentarios[i];
    console.log("id:", comentario.id);
    console.log("user_id:", comentario.user_id);
    console.log("content:", comentario.content);
    console.log("date:", comentario.date);

    for (let j = 0; j < usuarios.length; j++) {
      let usuario = usuarios[j];
      console.log("id:", usuario.id);
      console.log("username:", usuario.username);
      console.log("image:", usuario.image);

      if (comentario.user_id == usuario.id) {
        // Crear elementos HTML para cada comentario
        let card = document.createElement("div");
        card.className = "card m-4";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Condicionar solo para que le salga al dueño del comentario
        let btnEliminarComentario = "";
        if ((await getUserIDSession()) == usuario.id) {
          btnEliminarComentario = `<button type="button" class="btn btn-outline-danger" onclick='deleteComment(${comentario.id}),mostrarModal("Comunidad","Comentario eliminado");window.location.href = "/community";'><i class="bx bx-trash"></i></button>`;
        } else btnEliminarComentario = "";

        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = `${usuario.username} ${btnEliminarComentario}`;
        cardBody.appendChild(cardTitle);

        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = comentario.content;

        // Formatear fecha
        let fechaObjeto = new Date(comentario.date);

        let dia = fechaObjeto.getDate().toString().padStart(2, "0");
        let mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
        let año = fechaObjeto.getFullYear();

        let fechaFormateada = `${dia}/${mes}/${año}`;

        let cardFooter = document.createElement("p");
        cardFooter.className = "text-muted";
        cardFooter.innerHTML = `Comentó el <span class="text-secondary font-weight-bold">${fechaFormateada}</span>`;

        // Agregar elementos al DOM
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardFooter);
        card.appendChild(cardBody);
        container.appendChild(card);
      }
    }
  }
}

function initializeAutocomplete(inputId) {
  let input = document.getElementById(inputId);
  let autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"],
    componentRestrictions: { country: "CO" },
  });
}

async function cambiarUsername() {
  let userIDSession = await getUserIDSession();
  let newUsername = await mostrarModalInput(
    "Cuenta",
    "¿Cual será tu nuevo nombre de usuario? (Debe ser mayor a 3 caracteres)",
    "Cambiar"
  );
  let userNameRepetido = false;

  if (newUsername.length > 3) {
    let usuarios = await callApi("GET", `${urlApi}/users/get`);

    for (let i = 0; i < usuarios.length; i++) {
      let usuario = usuarios[i];
      if (usuario.username == newUsername) {
        mostrarModal(
          "Cuenta",
          "Este nombre de usuario ya esta en uso, deberias usar otro"
        );
        userNameRepetido = true;
        break;
      }
    }

    if (!userNameRepetido) {
      for (let j = 0; j < usuarios.length; j++) {
        let usuario = usuarios[j];
        console.log("id:", usuario.id);
        console.log("username:", usuario.username);
        console.log("password:", usuario.password);
        console.log("image:", usuario.image);

        if (userIDSession == usuario.id) {
          putUser(usuario.id, newUsername, usuario.password, usuario.image);
          mostrarModal("Cuenta", "Tu nombre de usuario se actualizo");
          break;
        }
      }
    }
  } else console.log("El nombre de usuario es menor a 4 caracteres");
}

async function cambiarPassword() {
  let userIDSession = await getUserIDSession();
  let newPassword = document.getElementById("changePassword").value;
  let passwordVerification = await mostrarModalInput(
    "Cuenta",
    "Repite la nueva contraseña, debe ser mayor a 3 caracteres",
    "Verificar contraseña"
  );

  if (newPassword == passwordVerification && newPassword.length > 3) {
    let usuarios = await callApi("GET", `${urlApi}/users/get`);

    for (let j = 0; j < usuarios.length; j++) {
      let usuario = usuarios[j];
      console.log("id:", usuario.id);
      console.log("username:", usuario.username);
      console.log("password:", usuario.password);
      console.log("image:", usuario.image);

      if (userIDSession == usuario.id) {
        putUser(usuario.id, usuario.username, newPassword, usuario.image);
        mostrarModal("Cuenta", "Tu contraseña se actualizo");
        break;
      }
    }
  } else {
    console.log("La contraseña es menor a 4 caracteres");
    console.log(
      "O la contraseña y su verificaicon no coincide, reintentalo nuevamente"
    );
  }
}

async function cambiarImage() {
  let userIDSession = await getUserIDSession();

  let newImgRoute; // Pedir imagen

  let usuarios = await callApi("GET", `${urlApi}/users/get`);

  for (let j = 0; j < usuarios.length; j++) {
    let usuario = usuarios[j];
    console.log("id:", usuario.id);
    console.log("username:", usuario.username);
    console.log("password:", usuario.password);
    console.log("image:", usuario.image);

    if (userIDSession == usuario.id) {
      putUser(usuario.id, usuario.username, usuario.password, newImgRoute);
      mostrarModal("Cuenta", "Tu foto de perfil se actualizo");
      break;
    }
  }
}

async function eliminarRutas() {
  let userIDSession = await getUserIDSession();
  let confirmacion = await mostrarModalInput(
    "Cuenta",
    'Esta accion borrara todas las rutas vinculadas con tu usuario, para continuar introduce "ACEPTO"',
    "Introduce la palabra"
  );
  if (confirmacion == "ACEPTO") {
    let usuarios = await callApi("GET", `${urlApi}/users/get`);
    let rutas = await callApi("GET", `${urlApi}/routes/get`);

    for (let j = 0; j < usuarios.length; j++) {
      let usuario = usuarios[j];
      console.log("id:", usuario.id);
      console.log("username:", usuario.username);
      console.log("password:", usuario.password);
      console.log("image:", usuario.image);

      if (userIDSession == usuario.id) {
        for (let i = 0; i < rutas.length; i++) {
          let ruta = rutas[i];
          console.log("id:", ruta.id);
          console.log("user_id", ruta.user_id);
          if (userIDSession == ruta.user_id) {
            deleteRoute(ruta.id);
          }
        }
        mostrarModal("Cuenta", "Todas tus rutas han sido eliminadas");
        break;
      }
    }
  } else console.log('La palabra "ACEPTO" no fue reconocida');
}

async function eliminarComentarios() {
  let userIDSession = await getUserIDSession();
  let confirmacion = await mostrarModalInput(
    "Cuenta",
    'Esta accion borrara todas las comentarios vinculadas con tu usuario, para continuar introduce "ACEPTO"',
    "Introduce la palabra"
  );
  if (confirmacion == "ACEPTO") {
    let usuarios = await callApi("GET", `${urlApi}/users/get`);
    let comentarios = await callApi("GET", `${urlApi}/comments/get`);

    for (let j = 0; j < usuarios.length; j++) {
      let usuario = usuarios[j];
      console.log("id:", usuario.id);
      console.log("username:", usuario.username);
      console.log("password:", usuario.password);
      console.log("image:", usuario.image);

      if (userIDSession == usuario.id) {
        for (let i = 0; i < comentarios.length; i++) {
          let comentario = comentarios[i];
          console.log("id:", comentario.id);
          console.log("user_id", comentario.user_id);
          if (userIDSession == comentario.user_id) {
            deleteComment(comentario.id);
          }
        }
        mostrarModal("Cuenta", "Todas tus comentarios han sido eliminadas");
        break;
      }
    }
  } else console.log('La palabra "ACEPTO" no fue reconocida');
}

async function eliminarCuenta() {
  let userIDSession = await getUserIDSession();
  let confirmacion = await mostrarModalInput(
    "Cuenta",
    'Esta accion borrara tu cuenta, para continuar introduce "ACEPTO"',
    "Introduce la palabra"
  );

  if (confirmacion == "ACEPTO") {
    let usuarios = await callApi("GET", `${urlApi}/users/get`);

    for (let j = 0; j < usuarios.length; j++) {
      let usuario = usuarios[j];
      console.log("id:", usuario.id);
      console.log("username:", usuario.username);
      console.log("password:", usuario.password);
      console.log("image:", usuario.image);

      if (userIDSession == usuario.id) {
        let rutas = await callApi("GET", `${urlApi}/routes/get`);
        let comentarios = await callApi("GET", `${urlApi}/comments/get`);

        for (let i = 0; i < rutas.length; i++) {
          let ruta = rutas[i];
          console.log("id:", ruta.id);
          console.log("user_id", ruta.user_id);
          if (userIDSession == ruta.user_id) {
            deleteRoute(ruta.id);
          }
        }
        console.log("Todas las rutas eliminadas");
        for (let k = 0; k < comentarios.length; k++) {
          let comentario = comentarios[k];
          console.log("id:", comentario.id);
          console.log("user_id", comentario.user_id);
          if (userIDSession == comentario.user_id) {
            deleteComment(comentario.id);
            console.log("Eliminado el comentario");
            console.log("id:", comentario.id);
            console.log("user_id", comentario.user_id);
          }
        }
        console.log("Todas los comentarios eliminados");

        deleteUser(userIDSession);
        mostrarModal("Cuenta", "Cuenta eliminada con exito");
        window.location.href = "/logout";
        break;
      }
    }
  } else console.log('La palabra "ACEPTO" no fue reconocida');
}
// INICIO DE LA EJECUCION

window.onload = function () {
  initializeAutocomplete("dir_1");
  initializeAutocomplete("dir_2");

  // Configuracion Inicial de GMAPS
  let mapOptions = {
    center: { lat: 10.988609, lng: -74.7913632 }, // Cords de Barranquilla
    zoom: 12,
  };

  // Crear un mapa en el elemento con id "mapa"
  let mapa = new google.maps.Map(document.getElementById("mapa"), mapOptions);
};
