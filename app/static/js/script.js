// ------  METODOS HTTP ------ //
const urlApi = "";

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

  // Agrega los estilos utilizando el método setAttribute
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
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const dia = fecha.getDate().toString().padStart(2, "0");
  const hora = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");

  // Formatea la fecha y hora en el formato deseado
  return `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}

function checkSession() {
  fetch("/checkSession", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.session_started) {
        console.log("Sesión iniciada. Usuario ID:", data.user_id);
        return true;
      } else {
        console.log("No hay sesión iniciada");
        return false;
      }
    })
    .catch((error) => {
      console.error("Error al verificar la sesión:", error);
    });
}

function planificarRuta(posA, posB, mapObject) {
  // Crear objetos para las direcciones de salida y destino
  let geocoder = new google.maps.Geocoder();

  // Geocodificar la dirección de salida
  geocoder.geocode({ address: posA }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      let salidaLatLng = results[0].geometry.location;

      // Geocodificar la dirección de destino
      geocoder.geocode({ address: posB }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let destinoLatLng = results[0].geometry.location;

          // Crear una ruta entre la dirección de salida y destino
          let directionsService = new google.maps.DirectionsService();
          let directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(mapObject);

          let solicitudRuta = {
            origin: salidaLatLng,
            destination: destinoLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          directionsService.route(solicitudRuta, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });
        } else {
          mostrarModal(
            "Planificador de rutas",
            "No se pudo geo-localizar la dirección de destino."
          );
        }
      });
    } else {
      mostrarModal(
        "Planificador de rutas",
        "No se pudo geo-localizar la dirección de salida."
      );
    }
  });
}

function mostrarModalInput(titulo, labelInput, labelButton) {
  return new Promise((resolve, reject) => {
    mostrarModal(
      titulo,
      `<label for="inputModal" class="col-form-label">${labelInput}</label>
      <input type="text" class="form-control my-2" id="inputModal" />
      <button id="btnInputModal" class="btn btn-primary btn-block" type="button">${labelButton}</button>`
    );

    const btnInputModal = document.getElementById("btnInputModal");
    btnInputModal.addEventListener("click", () => {
      const inputModalValue = document.getElementById("inputModal").value;
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
  const container = document.querySelector(".container");

  let rutas = await callApi("GET", `${urlApi}/community/routes/byUser`);
  for (let i = 0; i < rutas.length; i++) {
    let ruta = rutas[i];
    console.log("destiny:", ruta.destiny);
    console.log("id:", ruta.id);
    console.log("nombre:", ruta.nombre);
    console.log("start:", ruta.start);

    // Generar IDs únicos para esta iteración
    let dirAId = `dirA_${i}`;
    let dirBId = `dirB_${i}`;

    // Crear elementos HTML para cada ruta
    const card = document.createElement("div");
    card.className = "card m-4";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = ruta.nombre;

    const buttonEditar = document.createElement("button");
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

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = `
      Direccion de salida: <span id="${dirAId}">${ruta.start}</span> <br />
      Direccion de destino: <span id="${dirBId}">${ruta.destiny}</span>
    `;

    const cardButton = document.createElement("p");
    cardButton.className = "text-muted";

    const buttonMostrar = document.createElement("button");
    buttonMostrar.className = "btn btn-primary btn-block";
    buttonMostrar.innerHTML = 'Mostrar ruta <i class="bx bx-map-alt"></i>';
    buttonMostrar.onclick = () => {
      mostrarModalMapa(
        document.getElementById(dirAId).textContent,
        document.getElementById(dirBId).textContent
      );
    };

    const buttonEliminar = document.createElement("button");
    buttonEliminar.className = "btn btn-danger btn-block mx-3";
    buttonEliminar.innerHTML = 'Eliminar ruta <i class="bx bx-trash"></i>';
    buttonEliminar.onclick = () => {
      deleteRoute(ruta.id);
      mostrarModal("Rutas", "Ruta eliminada con exito");
      window.location.href = "/community/routes";
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

async function nuevoComentario() {
  let commentContent = await mostrarModalInput(
    "Comunidad",
    "¿Cual es tu comentario?",
    "Subir"
  );

  postComment(commentContent, getDataTimeNow(), await getUserIDSession());

  mostrarModal("Comunidad", "Comentario subido");

  window.location.href = "/community";
}

async function generarContenidoComentarios() {
  const container = document.querySelector(".container");

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
        const card = document.createElement("div");
        card.className = "card m-4";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Condicionar solo para que le salga al dueño del comentario
        let btnEliminarComentario = "";
        if ((await getUserIDSession()) == usuario.id) {
          btnEliminarComentario = `<button type="button" class="btn btn-outline-danger" onclick='deleteComment(${comentario.id}),mostrarModal("Comunidad","Comentario eliminado");window.location.href = "/community";'><i class="bx bx-trash"></i></button>`;
        } else btnEliminarComentario = "";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = `${usuario.username} ${btnEliminarComentario}`;
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = comentario.content;

        // Formatear fecha
        const fechaObjeto = new Date(comentario.date);

        const dia = fechaObjeto.getDate().toString().padStart(2, "0");
        const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
        const año = fechaObjeto.getFullYear();

        const fechaFormateada = `${dia}/${mes}/${año}`;

        const cardFooter = document.createElement("p");
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
  const input = document.getElementById(inputId);
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"],
    componentRestrictions: { country: "CO" },
  });
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
