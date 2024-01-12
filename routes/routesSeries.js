const express = require('express')
const routesSeries = express.Router()



routesSeries.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT URL, Nombre FROM series', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


  routesSeries.get('/Calificacion/:id', (req, res) => {
    const serieId = req.params.id; // Obtener el ID de la serie desde los parámetros de la URL
  
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      // Consulta para obtener las calificaciones por ID de la serie
      const query = 'SELECT Calificacion FROM series WHERE idSerie = ?';
      
      conn.query(query, [serieId], (err, rows) => {
        if (err) return res.send(err);
  
        // Verificar si se encontraron calificaciones
        if (rows.length === 0) {
          return res.status(404).json({ mensaje: 'Calificaciones no encontradas para la serie con ID ' + serieId });
        }
  
        // Devolver las calificaciones en formato JSON
        res.json(rows);
      });
    });
  });
  
  routesSeries.get('/Detalles', (req, res) => {
    const serieId = req.params.id; // Obtener el ID de la serie desde los parámetros de la URL
  
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      // Consulta para obtener los detalles de la serie por su ID
      const query = 'SELECT Nombre, Director, Temporada, Capitulos, Descripcion, Vistas,URL, Calificacion FROM series INNER JOIN categorias ON series.idCategoria = categorias.idCategorias WHERE series.idSeries = ?';     
      conn.query(query, [serieId], (err, rows) => {
        if (err) return res.send(err);
  
        // Verificar si se encontraron detalles de la serie
        if (rows.length === 0) {
          return res.status(404).json({ mensaje: 'Detalles de la serie no encontrados para la serie con ID ' + serieId });
        }
  
        // Devolver los detalles de la serie en formato JSON
        res.json(rows[0]); // Suponiendo que solo se espera una fila de resultados
      });
    });
  });




  routesSeries.get('/recientes',(req,res)=>{
    req.getConnection((err,conn)=>{
      if (err) return res.send(err);
  
      const query = `
      SELECT Nombre, URL, idSeries
      FROM series
      ORDER BY Capitulos DESC
      LIMIT 10;
      `;
      conn.query(query, (err, rows) => {
        if (err) return res.send(err);
  
        // Crear un array para almacenar los datos de recientes
        const recientes = [];
  
        // Recorre las filas y crea objetos para cada series
        rows.forEach(series => {
          const recientesimg = {
            nombre: series.Nombre,
            imagen: series.URL,
            id: series.idSeries
          };
  
          recientes.push(recientesimg);
        });
  
        // Enviar los datos como JSON
        res.json(recientes);
      });
    });
  });


  routesSeries.get('/populares', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const query = `
      SELECT Nombre, URL, idSeries
      FROM series
      ORDER BY Vistas DESC
      LIMIT 10;
      `;
      conn.query(query, (err, rows) => {
        if (err) return res.send(err);
  
        // Crear un array para almacenar los datos de populares
        const populares = [];
  
        // Recorre las filas y crea objetos para cada película
        rows.forEach(series => {
          const popularesimg = {
            nombre: series.Nombre,
            imagen: series.URL,
            id: series.idSeries
          };
  
          populares.push(popularesimg);
        });
  
        // Enviar los datos como JSON
        res.json(populares);
      });
    });
  });
  
  
  routesSeries.get('/terror', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const query = `
      SELECT Nombre, URL, idSeries
      FROM series
      WHERE idCategoria = 1
      ORDER BY Nombre DESC
      LIMIT 10;  
    `;
    
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      // Crear un array para almacenar los datos de terror
      const terror = [];

      // Recorre las filas y crea objetos para cada película
      rows.forEach(series => {
        const terrorimg = {
          nombre: series.Nombre,
          imagen: series.URL,
          id: series.idSeries
        };

        terror.push(terrorimg);
      });

      // Enviar los datos como JSON
      res.json(terror);
    });
  });
});
  
routesSeries.get('/amor', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
    SELECT Nombre, URL, idSeries
    FROM series
    WHERE idCategoria = 2
    ORDER BY Nombre DESC
    LIMIT 10;  
  `;
  
  conn.query(query, (err, rows) => {
    if (err) return res.send(err);

    // Crear un array para almacenar los datos de amor
    const amor = [];

    // Recorre las filas y crea objetos para cada película
    rows.forEach(series => {
      const amorimg = {
        nombre: series.Nombre,
        imagen: series.URL,
        id: series.idSeries
      };

      amor.push(amorimg);
    });

    // Enviar los datos como JSON
    res.json(amor);
  });
});
});
  
  routesSeries.get('/accion', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const query = `
      SELECT Nombre, URL, idSeries
      FROM series
      WHERE idCategoria = 3
      ORDER BY Nombre DESC
      LIMIT 10;  
    `;
    
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);
  
      // Crear un array para almacenar los datos de accion
      const accion = [];
  
      // Recorre las filas y crea objetos para cada película
      rows.forEach(series => {
        const accionimg = {
          nombre: series.Nombre,
          imagen: series.URL,
          id: series.idSeries
        };
  
        accion.push(accionimg);
      });
  
      // Enviar los datos como JSON
      res.json(accion);
    });
  });
  });

module.exports = routesSeries;