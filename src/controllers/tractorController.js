const Tractor = require('../models/Tractores');

exports.getTractors = (req, res) => {
  //obtener todos los tractores
  Tractor.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener los tractores."
      });
    } else {
      res.render('tractors', { tractors: data });
    }
  });
};

exports.getTractorById = (req, res) => {
  //obtener un tractor por su ID
  Tractor.getById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener el tractor con id " + req.params.id
      });
    } else {
      res.render('tractorDetail', { tractor: data });
    }
  });
};

exports.crearTractor = (req, res) => {
  //crear un nuevo tractor
  const { marca, modelo, anio } = req.body;

  // Validación de datos
  if (!marca || !modelo || !anio) {
    return res.status(400).send({
      message: "Los campos marca, modelo y año no pueden estar vacíos."
    });
  }

  // Crear un objeto Tractor
  const tractor = new Tractor({
    marca: marca,
    modelo: modelo,
    anio: anio
  });

  // Guardar Tractor en la base de datos
  Tractor.crear(tractor, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al crear el tractor."
      });
    } else {
      res.redirect('/tractores');
    }
  });
};

exports.updateTractor = (req, res) => {
  //actualizar un tractor por su ID
  const id = req.params.id;
  const { marca, modelo, anio } = req.body;

  // Validación de datos
  if (!marca || !modelo || !anio) {
    return res.status(400).send({
      message: "Los campos marca, modelo y año no pueden estar vacíos."
    });
  }

  // Crear un Tractor
  const tractor = new Tractor({
    id: id,
    marca: marca,
    modelo: modelo,
    anio: anio
  });

  // Actualizar Tractor en la base de datos
  Tractor.updateById(id, tractor, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error al actualizar el tractor con id ${id}.`
      });
    } else {
      res.redirect('/tractores');
    }
  });
};

exports.deleteTractor = (req, res) => {
  // Eliminar un tractor por su ID
  const id = req.params.id;

  Tractor.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error al eliminar el tractor con id ${id}.`
      });
    } else {
      res.redirect('/tractores');
    }
  });
};

