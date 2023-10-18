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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// ------  FUNCIONES AUXILIARES ------ //

function mostrarModal(titulo, contenido) {
  document.getElementById("titulo_modal").innerHTML = titulo;
  document.getElementById("contenido_modal").innerHTML = contenido;
  $("#modalWeb").modal("show"); // Muestra el modal con jQuery
}

function cerrarModal() {
  $("#modalWeb").modal("hide"); // Cierra el modal con jQuery
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

// ------  FUNCIONES DIRECTAS ------ //

async function buscarRuta(event) {
  event.preventDefault();
  // Obtener valor del checkbox
  let checkboxGuardar = document.getElementById("guardarRuta");

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

    let user_id = await getUserIDSession();

    if (checkboxGuardar.checked) {
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

function initializeAutocomplete(inputId) {
  const input = document.getElementById(inputId);
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"],
    componentRestrictions: { country: "CO" },
  });
}

// INICIO DE LA EJECUCION
let mapa;

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
