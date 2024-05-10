const express = require('express');
const router = express.Router();
const { addPerson, getAllPeople, getPersonById, updatePerson, deletePerson } = require('../controllers/peopleController');


// Obtener todas las personas
router.get('/people', getAllPeople);

/* 
    Obtener una persona por ID
router.get('/people/:id', getPersonById);
*/ 

// Agregar una nueva persona
router.post('/people', addPerson);

// Modificar una persona
router.put('/people/:id', updatePerson);

// Eliminar una persona
router.delete('/people/:id', deletePerson);

module.exports = router;

