const express = require('express')
const routesPeliculas = express.Router()

routesPeliculas.get('/', (req, res)=>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)

      conn.query('SELECT Nombre, URL FROM peliculas', (err, rows)=>{
          if(err) return res.send(err)

          res.json(rows)
      })
  })
})

routesPeliculas.get('/populares', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
    SELECT Nombre, URL
    FROM peliculas
    ORDER BY Vistas DESC
    LIMIT 10;
    `;
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      // Crear un array para almacenar los datos de populares
      const populares = [];

      // Recorre las filas y crea objetos para cada película
      rows.forEach(peliculas => {
        const popularesimg = {
          nombre: peliculas.Nombre,
          imagen: peliculas.URL
        };

        populares.push(popularesimg);
      });

      // Enviar los datos como JSON
      res.json(populares);
    });
  });
});





routesPeliculas.get('/Calificacion', (req, res) => {
  const peliculaId = req.params.id; // Obtener el ID de la serie desde los parámetros de la URL

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Consulta para obtener las calificaciones por ID de la serie
    const query = 'SELECT Calificacion FROM peliculas WHERE idPeliculas = ?';
    
    conn.query(query, [peliculaId], (err, rows) => {
      if (err) return res.send(err);

      // Verificar si se encontraron calificaciones
      if (rows.length === 0) {
        return res.status(404).json({ mensaje: 'Calificaciones no encontradas para la pelicula con ID ' + peliculaId });
      }

      // Devolver las calificaciones en formato JSON
      res.json(rows);
    });
  });
});


routesPeliculas.get('/detalles/:id', (req, res) => {
  const peliculaId = req.params.id; // Obtener el ID de la película desde los parámetros de la URL

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    // Consulta para obtener los detalles de la película por su ID
    const query = 'SELECT URL, Nombre, Director, FechasDeEstreno, Duracion, Descripcion, Calificacion FROM peliculas INNER JOIN categorias ON peliculas.idCategoria = categorias.idCategoria WHERE peliculas.idPeliculas = ?';

    conn.query(query, [peliculaId], (err, rows) => {
      if (err) return res.send(err);

      // Verificar si se encontraron detalles de la película
      if (rows.length === 0) {
        return res.status(404).json({ mensaje: 'Detalles de la película no encontrados para la película con ID ' + peliculaId });
      }

      // Devolver los detalles de la película en formato JSON
      res.json(rows[0]); // Suponiendo que solo se espera una fila de resultados
    });
  });
});




routesPeliculas.get('/terror', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
      SELECT Nombre, URL, idPeliculas
      FROM peliculas
      WHERE idCategoria = 1
      ORDER BY Nombre DESC
      LIMIT 10;  
    `;
    
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      // Crear un array para almacenar los datos de terror
      const terror = [];

      // Recorre las filas y crea objetos para cada película
      rows.forEach(peliculas => {
        const terrorimg = {
          nombre: peliculas.Nombre,
          imagen: peliculas.URL,
          id: peliculas.idPeliculas
        };

        terror.push(terrorimg);
      });

      // Enviar los datos como JSON
      res.json(terror);
    });
  });
});

routesPeliculas.get('/amor', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
      SELECT Nombre, URL, idPeliculas
      FROM peliculas
      WHERE idCategoria = 2
      ORDER BY Nombre DESC
      LIMIT 10;  
    `;
    
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      // Crear un array para almacenar los datos de terror
      const amor = [];

      // Recorre las filas y crea objetos para cada película
      rows.forEach(peliculas => {
        const amorimg = {
          nombre: peliculas.Nombre,
          imagen: peliculas.URL,
          id: peliculas.idPeliculas
        };

        amor.push(amorimg);
      });

      // Enviar los datos como JSON
      res.json(amor);
    });
  });
});

routesPeliculas.get('/accion', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
      SELECT Nombre, URL, idPeliculas
      FROM peliculas
      WHERE idCategoria = 3
      ORDER BY Nombre DESC
      LIMIT 10;  
    `;
    
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      // Crear un array para almacenar los datos de terror
      const accion = [];

      // Recorre las filas y crea objetos para cada película
      rows.forEach(peliculas => {
        const accionimg = {
          nombre: peliculas.Nombre,
          imagen: peliculas.URL,
          id: peliculas.idPeliculas
        };

        accion.push(accionimg);
      });

      // Enviar los datos como JSON
      res.json(accion);
    });
  });
});

module.exports = routesPeliculas;