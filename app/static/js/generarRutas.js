window.onload = async function () {
  generarContenidoRuta(await getRoutesByUserId(await getUserIDSession()));
};
