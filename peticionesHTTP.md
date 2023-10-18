GET, POST, PUT, y DELETE

1. GET - Obtener todos los Usuarios

   - Método: GET
   - URL: `http://localhost:5000/users/get`
   - Descripción: Obtener todos los Usuarios de la base de datos.
   - Resultado esperado: Lista de Usuarios en formato JSON.

2. POST - Crear un nuevo Usuario

   - Método: POST
   - URL: `http://localhost:5000/users/post`
   - Cuerpo (JSON):
     ```json
     {
       "username": "nombre_de_usuario",
       "password": "contraseña",
       "image": "url_de_la_imagen"
     }
     ```
   - Descripción: Crear un nuevo Usuario en la base de datos.
   - Resultado esperado: Usuario recién creado en formato JSON.

3. PUT - Actualizar un Usuario existente

   - Método: PUT
   - URL: `http://localhost:5000/users/put/{id}`
   - Sustituye `{id}` por el ID real del Usuario a actualizar.
   - Cuerpo (JSON):
     ```json
     {
       "username": "nuevo_nombre_de_usuario",
       "password": "nueva_contraseña",
       "image": "nueva_url_de_la_imagen"
     }
     ```
   - Descripción: Actualizar un Usuario existente por ID.
   - Resultado esperado: Mensaje de confirmación de la actualización.

4. DELETE - Eliminar un Usuario
   - Método: DELETE
   - URL: `http://localhost:5000/users/delete/{id}`
   - Sustituye `{id}` por el ID real del Usuario a eliminar.
   - Descripción: Eliminar un Usuario por ID.
   - Resultado esperado: Mensaje de confirmación de eliminación.
