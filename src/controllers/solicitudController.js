const Solicitud = require('../models/Solicitudes');

exports.getSolicitudes = (req, res) => {
  // Obtener todas las solicitudes
  Solicitud.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener las solicitudes."
      });
    } else {
      res.render('solicitudes', { solicitudes: data });
    }
  });
};

exports.getSolicitudById = (req, res) => {
  // Obtener una solicitud por su ID
  Solicitud.getById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al obtener la solicitud con id " + req.params.id
      });
    } else {
      res.render('solicitudDetail', { solicitud: data });
    }
  });
};

exports.createSolicitud = (req, res) => {
  // Crear una nueva solicitud
  const { usuario_id, objeto_id, hora_inicio, hora_fin, chequeo_preoperacional } = req.body;

  // Validación de datos
  if (!usuario_id || !objeto_id || !hora_inicio || !hora_fin || !chequeo_preoperacional) {
    return res.status(400).send({
      message: "Los campos son obligatorios."
    });
  }

  // Crear una solicitud
  const solicitud = new Solicitud({
    usuario_id: usuario_id,
    objeto_id: objeto_id,
    hora_inicio: hora_inicio,
    hora_fin: hora_fin,
    chequeo_preoperacional: chequeo_preoperacional
  });

  // Guardar la Solicitud en la base de datos
  Solicitud.create(solicitud, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al crear la solicitud."
      });
    } else {
      res.redirect('/solicitudes');
    }
  });
};

exports.updateSolicitud = (req, res) => {
  //actualizar una solicitud por su ID
  const id = req.params.id;
  const { usuario_id, objeto_id, hora_inicio, hora_fin, chequeo_preoperacional, chequeo_posoperacional } = req.body;

  // Validación de datos
  if (!usuario_id || !objeto_id || !hora_inicio || !hora_fin || !chequeo_preoperacional || !chequeo_posoperacional) {
    return res.status(400).send({
      message: "Los campos son obligatorios."
    });
  }

  // Crear un objeto Solicitud
  const solicitud = new Solicitud({
    id: id,
    usuario_id: usuario_id,
    objeto_id: objeto_id,
    hora_inicio: hora_inicio,
    hora_fin: hora_fin,
    chequeo_preoperacional: chequeo_preoperacional,
    chequeo_posoperacional: chequeo_posoperacional
  });

  // Actualiza la solicitud en la base de datos
  Solicitud.updateById(id, solicitud, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error al actualizar la solicitud con id ${id}.`
      });
    } else {
      res.redirect('/solicitudes');
    }
  });
};


