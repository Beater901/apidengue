const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dni: { type: Number, required: true },
  address: { type: String, required: true },
  symptoms: { type: String, required: true }
});

module.exports = mongoose.model('Person', personSchema);

