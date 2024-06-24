const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

router.get('/', solicitudController.getSolicitudes);
router.get('/:id', solicitudController.getSolicitudById);
router.post('/', solicitudController.createSolicitud);
router.put('/:id', solicitudController.updateSolicitud);

module.exports = router;
