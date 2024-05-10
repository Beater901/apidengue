const Person = require('../models/Person');

exports.addPerson = async (req, res) => {
  const { name, age,dni, address, symptoms } = req.body;

  try {
    const newPerson = new Person({
      name: name,
      age: age,
      dni:dni,
      address: address,
      symptoms: symptoms
    });

    await newPerson.save();

    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar persona', error: error });
  }
};

exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modificar una persona
exports.updatePerson = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una persona
exports.deletePerson = async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Persona eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};