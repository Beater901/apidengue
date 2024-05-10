const express = require('express');
const router = express.Router();
const {registerPeople, loginPeople } = require('../controllers/FormDataController');

router.post ('/register', registerPeople); 

router.post ('/login', loginPeople);

module.exports = router;