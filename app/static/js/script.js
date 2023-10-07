console.log("Prueba de el JS");

function mostrarModal() {
  $("#modalWeb").modal("show"); // Muestra el modal con jQuery
}
function cerrarModal() {
  $("#modalWeb").modal("hide"); // Cierra el modal con jQuery
}
function cambiarTituloModal(titulo) {
  var elemento = document.getElementById("titulo_modal");
  elemento.innerHTML = titulo;
}
function cambiarContenidoModal(contenido) {
  var elemento = document.getElementById("contenido_modal");
  elemento.innerHTML = contenido;
}

function planificarRuta(posA, posB) {
  // Toma la direccion de inicio con la direccion final y muestra una ruta entre ambos puntos

  if (posA == "") {
    mostrarModal();
    cambiarTituloModal("Falta direccion");
    cambiarContenidoModal("Debes colocar una direccion de salida.");
  } else if (posB == "") {
    mostrarModal();
    cambiarTituloModal("Falta direccion");
    cambiarContenidoModal("Debes colocar una direccion de destino.");
  } else {
    // Codigo para generar la ruta
    console.log("Dirección de salida:", posA);
    console.log("Dirección de destino:", posB);
  }
}

function guardarRuta(posA, posB) {
  // Guarda los puntos A y B de una ruta

  // Codigo para guardarle la ruta al Usuario

  mostrarModal();
  cambiarTituloModal("Ruta guardada");
  cambiarContenidoModal(
    "La ruta desde ${posA} hasta ${posB} se ha guardado con éxito."
  );
}

function buscarRuta() {
  let direccionSalida = document.getElementById("dir_1").value;
  let direccionDestino = document.getElementById("dir_2").value;

  planificarRuta(direccionSalida, direccionDestino);

  if (document.getElementById("guardarRuta").checked) {
    // Checkbox Marcado
    guardarRuta(direccionSalida, direccionDestino);
  }

  // Para que no se actualize la pagina al Submit
  return false;
}

function validarLogIn() {}
function validadRegister() {}
