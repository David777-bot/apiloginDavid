const express = require('express');
const router = express.Router();
const tractorController = require('../controllers/tractorController');

router.get('/', tractorController.getTractors);
router.get('/:id', tractorController.getTractorById);
router.post('/', tractorController.crearTractor);
router.put('/:id', tractorController.updateTractor);
router.delete('/:id', tractorController.deleteTractor);

module.exports = router;

