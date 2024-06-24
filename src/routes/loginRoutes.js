const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.getLogin);
router.post('/auth', loginController.postLogin);


module.exports = router;

