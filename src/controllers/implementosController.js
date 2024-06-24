const Implemento = require('../models/Implementos');

exports.getImplementos = (req, res) => {
  // Obtener todos los implementos
  Implemento.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener los implementos."
      });
    } else {
      res.render('implementos', { implements: data });
    }
  });
};

exports.getImplementosById = (req, res) => {
  // un implemento por su ID
  Implemento.getById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener el implemento con id " + req.params.id
      });
    } else {
      res.render('implementosDetail', { implement: data });
    }
  });
};

exports.crearImplementos = (req, res) => {
  // crear un nuevo implemento
  const { nombre, tipo, descripcion } = req.body;

  // Validación de datos
  if (!nombre || !tipo || !descripcion) {
    return res.status(400).send({
      message: "Los campos nombre, tipo y descripción no pueden estar vacíos."
    });
  }

  // Crear un nuevo implemento
  const implemento = new Implemento({
    nombre: nombre,
    tipo: tipo,
    descripcion: descripcion
  });

  // Guardar el Implemento en la base de datos
  Implemento.create(implemento, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al crear el implemento."
      });
    } else {
      res.redirect('/implementos');
    }
  });
};

exports.updateImplementos = (req, res) => {
  // Actualizar un implemento por su ID
  const id = req.params.id;
  const { nombre, tipo, descripcion } = req.body;

  // Validación de datos
  if (!nombre || !tipo || !descripcion) {
    return res.status(400).send({
      message: "Los campos nombre, tipo y descripción no pueden estar vacíos."
    });
  }

  // Crear un Implemento
  const implemento = new Implemento({
    id: id,
    nombre: nombre,
    tipo: tipo,
    descripcion: descripcion
  });

  // Actualizar Implemento en la base de datos
  Implemento.updateById(id, implemento, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error al actualizar el implemento con id ${id}.`
      });
    } else {
      res.redirect('/implementos');
    }
  });
};

exports.deleteImplementos = (req, res) => {
  // Implementación para eliminar un implemento por su ID
  const id = req.params.id;

  Implemento.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error al eliminar el implemento con id ${id}.`
      });
    } else {
      res.redirect('/implementos');
    }
  });
};
