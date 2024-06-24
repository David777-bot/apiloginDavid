const express = require('express');
const router = express.Router();
const implementosController = require('../controllers/implementosController');

router.get('/', implementosController.getImplementos);
router.get('/:id', implementosController.getImplementosById);
router.post('/', implementosController.crearImplementos);
router.put('/:id', implementosController.updateImplementos);
router.delete('/:id', implementosController.deleteImplementos);

module.exports = router;

