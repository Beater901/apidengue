const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el módulo 'cors'
const peopleRouter = require('./routes/people');
const FormDataRouter = require('./routes/formData');

const app = express();
app.use(express.json());
app.use(cors()); // Utiliza 'cors' como middleware

mongoose.connect('mongodb://localhost:27017/dengue-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión establecida a la base de datos');
});

app.use('/api',FormDataRouter);
app.use('/api', peopleRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
